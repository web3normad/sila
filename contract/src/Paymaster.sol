// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IPaymaster} from "lib/account-abstraction/contracts/interfaces/IPaymaster.sol";
import {IEntryPoint} from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {PackedUserOperation} from "contract/lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol";
import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import {Address} from "lib/openzeppelin-contracts/contracts/utils/Address.sol";

contract TokenPaymaster is IPaymaster, Ownable {
    using SafeERC20 for IERC20;
    using Address for address;

    IEntryPoint public immutable entryPoint;
    IERC20 public immutable token;

    // Price oracle related
    uint256 public priceMarkup = 110; // 10% markup over base price
    uint256 public constant PRICE_DENOMINATOR = 100;

    // Gas usage calculations
    uint256 public constant PAYMASTER_VALIDATION_GAS = 50000;
    uint256 public constant POST_OP_GAS = 50000;

    // User configuration
    mapping(address => bool) public allowedUsers;
    mapping(address => uint256) public userDeposits;
    bool public requireAllowlist;

    event UserAllowed(address indexed user);
    event UserRemoved(address indexed user);
    event TokensDeposited(address indexed user, uint256 amount);
    event TokensWithdrawn(address indexed user, uint256 amount);
    event PriceMarkupUpdated(uint256 newMarkup);

    error TokenPaymaster__InvalidEntryPoint();
    error TokenPaymaster__InsufficientToken();
    error TokenPaymaster__UserNotAllowed();
    error TokenPaymaster__InvalidMarkup();
    error TokenPaymaster__TransferFailed();

    constructor(
        address _entryPoint,
        address _token,
        bool _requireAllowlist
    ) Ownable(msg.sender) {
        if (_entryPoint == address(0) || _token == address(0)) 
            revert TokenPaymaster__InvalidEntryPoint();
        
        entryPoint = IEntryPoint(_entryPoint);
        token = IERC20(_token);
        requireAllowlist = _requireAllowlist;
    }

    function validatePaymasterUserOp(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 maxCost
    ) external returns (bytes memory context, uint256 validationData) {
        _requireFromEntryPoint();

        address sender = userOp.sender;
        if (requireAllowlist && !allowedUsers[sender]) {
            revert TokenPaymaster__UserNotAllowed();
        }

      
        uint256 tokenAmount = _calculateTokenAmount(maxCost);
       
        if (userDeposits[sender] < tokenAmount) {
            revert TokenPaymaster__InsufficientToken();
        }

       
        return (abi.encode(tokenAmount), 0); 
    }

    function postOp(
        PostOpMode mode,
        bytes calldata context,
        uint256 actualGasCost
    ) external {
        _requireFromEntryPoint();

    
        if (mode == PostOpMode.postOpReverted) {
            return;
        }

     
        uint256 tokenAmount = abi.decode(context, (uint256));
        address sender = msg.sender;
        userDeposits[sender] -= tokenAmount;
    }

  
    function depositTokens(uint256 amount) external {
        token.safeTransferFrom(msg.sender, address(this), amount);
        userDeposits[msg.sender] += amount;
        emit TokensDeposited(msg.sender, amount);
    }

   
    function withdrawTokens(uint256 amount) external {
        if (userDeposits[msg.sender] < amount) {
            revert TokenPaymaster__InsufficientToken();
        }
        userDeposits[msg.sender] -= amount;
        token.safeTransfer(msg.sender, amount);
        emit TokensWithdrawn(msg.sender, amount);
    }

    function addAllowedUser(address user) external onlyOwner {
        allowedUsers[user] = true;
        emit UserAllowed(user);
    }

    function removeAllowedUser(address user) external onlyOwner {
        allowedUsers[user] = false;
        emit UserRemoved(user);
    }

    function setPriceMarkup(uint256 newMarkup) external onlyOwner {
        if (newMarkup < 100) revert TokenPaymaster__InvalidMarkup();
        priceMarkup = newMarkup;
        emit PriceMarkupUpdated(newMarkup);
    }

 
    function _calculateTokenAmount(uint256 maxCost) internal view returns (uint256) {
        return (maxCost * priceMarkup) / PRICE_DENOMINATOR;
    }

    function _requireFromEntryPoint() internal view {
        if (msg.sender != address(entryPoint)) 
            revert TokenPaymaster__InvalidEntryPoint();
    }

    function getUserDeposit(address user) external view returns (uint256) {
        return userDeposits[user];
    }

    function isUserAllowed(address user) external view returns (bool) {
        return !requireAllowlist || allowedUsers[user];
    }
}