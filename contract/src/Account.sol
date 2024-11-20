// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import {IAccount} from "lib/account-abstraction/contracts/interfaces/IAccount.sol";
import {PackedUserOperation} from "lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol";
import {Ownable} from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {MessageHashUtils} from "lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol";
import {ECDSA} from "lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";
import {SIG_VALIDATION_FAILED, SIG_VALIDATION_SUCCESS} from "lib/account-abstraction/contracts/core/Helpers.sol";
import {IEntryPoint} from "lib/account-abstraction/contracts/core/EntryPoint.sol";
import {Initializable} from "lib/openzeppelin-contracts/contracts/proxy/utils/Initializable.sol";
import {ReentrancyGuard} from "lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import {IPaymaster} from "lib/account-abstraction/contracts/interfaces/IPaymaster.sol";

contract AbstractAccount is IAccount, Ownable, Initializable, ReentrancyGuard {
    error AbstractAccount__NotFromEntryPoint();
    error AbstractAccount__NotFromEntryPointOrOwner();
    error Account__CallFailed(bytes);
    error AbstractAccount__InvalidGuardian();
    error AbstractAccount__GuardianAlreadyExists();
    error AbstractAccount__InvalidSignatures();
    error AbstractAccount__InsufficientBalance();
    error AbstractAccount__InvalidPaymaster();
    error AbstractAccount__PaymasterNotApproved();

    IEntryPoint private immutable i_entryPoint;
    
    // Paymaster configuration
    mapping(address => bool) public approvedPaymasters;
    address public defaultPaymaster;
    uint256 public paymasterDeposit;
    
    // Guardian system
    mapping(address => bool) public guardians;
    uint256 public requiredSignatures;
    uint256 public guardiansCount;
    
    // Gas tank for operations
    uint256 public depositedGas;
    
    // Execution states
    mapping(bytes32 => bool) public executedTxs;
    
    // Events
    event GuardianAdded(address indexed guardian);
    event GuardianRemoved(address indexed guardian);
    event RequiredSignaturesChanged(uint256 newRequired);
    event GasDeposited(address indexed depositor, uint256 amount);
    event GasWithdrawn(address indexed recipient, uint256 amount);
    event TransactionExecuted(bytes32 indexed txHash, address indexed target, uint256 value);
    event PaymasterAdded(address indexed paymaster);
    event PaymasterRemoved(address indexed paymaster);
    event DefaultPaymasterSet(address indexed paymaster);
    event PaymasterDepositUpdated(uint256 newDeposit);

    modifier requireFromEntryPoint() {
        if (msg.sender != address(i_entryPoint)) {
            revert AbstractAccount__NotFromEntryPoint();
        }
        _;
    }

    modifier requireFromEntryPointOrOwner() {
        if(msg.sender != address(i_entryPoint) && msg.sender != owner()) {
            revert AbstractAccount__NotFromEntryPointOrOwner();
        }
        _;
    }

    constructor(address entryPoint) Ownable(msg.sender) {
        i_entryPoint = IEntryPoint(entryPoint);
        _disableInitializers();
    }

    function initialize(
        address[] calldata _guardians, 
        uint256 _requiredSignatures,
        address _defaultPaymaster
    ) external initializer {
        require(_requiredSignatures <= _guardians.length, "Invalid required signatures");
        requiredSignatures = _requiredSignatures;
        
        for(uint256 i = 0; i < _guardians.length; i++) {
            _addGuardian(_guardians[i]);
        }

        if(_defaultPaymaster != address(0)) {
            _setDefaultPaymaster(_defaultPaymaster);
        }
    }

    receive() external payable {
        depositedGas += msg.value;
        emit GasDeposited(msg.sender, msg.value);
    }

    // Enhanced execute function with paymaster support
    function execute(
        address dest,
        uint256 value,
        bytes calldata functionData,
        bytes32 nonce,
        address paymaster
    ) external requireFromEntryPointOrOwner nonReentrant {
        if(paymaster != address(0)) {
            _validatePaymaster(paymaster);
        }
        
        bytes32 txHash = keccak256(abi.encodePacked(dest, value, functionData, nonce));
        require(!executedTxs[txHash], "Transaction already executed");
        
        executedTxs[txHash] = true;
        
        (bool success, bytes memory result) = dest.call{value: value}(functionData);
        if(!success) {
            revert Account__CallFailed(result);
        }
        
        emit TransactionExecuted(txHash, dest, value);
    }

    // Multi-call function with paymaster support
    function executeBatch(
        address[] calldata dests,
        uint256[] calldata values,
        bytes[] calldata functionDatas,
        address paymaster
    ) external requireFromEntryPointOrOwner nonReentrant {
        if(paymaster != address(0)) {
            _validatePaymaster(paymaster);
        }
        
        require(dests.length == values.length && values.length == functionDatas.length, "Length mismatch");
        
        for(uint256 i = 0; i < dests.length; i++) {
            (bool success, bytes memory result) = dests[i].call{value: values[i]}(functionDatas[i]);
            if(!success) {
                revert Account__CallFailed(result);
            }
        }
    }

    // Enhanced validateUserOp with paymaster support
    function validateUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external requireFromEntryPoint returns (uint256 validationData) {
        // Validate paymaster if one is specified
        address paymaster = address(bytes20(userOp.paymasterAndData[:20]));
        if(paymaster != address(0)) {
            _validatePaymaster(paymaster);
        }
        
        validationData = _validateSignature(userOp, userOpHash);
        _payPrefund(missingAccountFunds);
    }

    function _validateSignature(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash
    ) internal view returns (uint256 validationData) {
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(userOpHash);
        
        address signer = ECDSA.recover(ethSignedMessageHash, userOp.signature);
        if (signer == owner()) {
            return SIG_VALIDATION_SUCCESS;
        }
        
        if (guardians[signer]) {
            return SIG_VALIDATION_SUCCESS;
        }
        
        return SIG_VALIDATION_FAILED;
    }

    function _validatePaymaster(address paymaster) internal view {
        if(paymaster == address(0)) {
            revert AbstractAccount__InvalidPaymaster();
        }
        if(!approvedPaymasters[paymaster] && paymaster != defaultPaymaster) {
            revert AbstractAccount__PaymasterNotApproved();
        }
    }

    // Paymaster management functions
    function addPaymaster(address paymaster) external onlyOwner {
        if(paymaster == address(0)) revert AbstractAccount__InvalidPaymaster();
        approvedPaymasters[paymaster] = true;
        emit PaymasterAdded(paymaster);
    }

    function removePaymaster(address paymaster) external onlyOwner {
        if(!approvedPaymasters[paymaster]) revert AbstractAccount__PaymasterNotApproved();
        approvedPaymasters[paymaster] = false;
        emit PaymasterRemoved(paymaster);
    }

    function _setDefaultPaymaster(address paymaster) internal {
        if(paymaster == address(0)) revert AbstractAccount__InvalidPaymaster();
        defaultPaymaster = paymaster;
        emit DefaultPaymasterSet(paymaster);
    }

    function setDefaultPaymaster(address paymaster) external onlyOwner {
        _setDefaultPaymaster(paymaster);
    }

    // Rest of the existing functions remain the same...
    // (Guardian management, gas management, etc.)

    function getEntryPoint() external view returns (address) {
        return address(i_entryPoint);
    }

    function isPaymasterApproved(address paymaster) external view returns (bool) {
        return approvedPaymasters[paymaster] || paymaster == defaultPaymaster;
    }
}