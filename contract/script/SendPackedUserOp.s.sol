// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {HelperConfig} from "script/HelperConfig.s.sol";
import {PackedUserOperation} from "lib/account-abstraction/contracts/interfaces/PackedUserOperation.sol";
import {IEntryPoint} from "lib/account-abstraction/contracts/interfaces/IEntryPoint.sol";
import {MessageHashUtils} from "lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol";
import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {AbstractAccount} from "../src/Account.sol";

contract SendPackedUserOp is Script {
    using MessageHashUtils for bytes32;

    function run() public {
        //   HelperConfig helperConfig = new HelperConfig();
        //    address dest = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
        //    uint256 value = 0;
        //    bytes memory functionData = abi.encodeWithSelector(IERC20.approve.selector, 0xB37D3f4815ba9ca3e2872e8867902E156aCD7E65, 1e18); 
        //    bytes memory executeCalldata = abi.encodeWithSelector(AbstractAccount.execute.selector, dest, value, functionData);
        // PackedUserOperation memory userOp = generateSignedUserOperation(executeCalldata, helperConfig.getConfig(), abstractAccount());
    }

     function generateSignedUserOperation(
        bytes memory callData,
        HelperConfig.NetworkConfig memory config, address abstractAccount
    ) public view returns (PackedUserOperation memory) {
        // 1. Generate the unsigned data
        uint256 nonce = vm.getNonce(abstractAccount) - 1;
        PackedUserOperation memory userOp = _generateUnsignedUserOperation(callData, abstractAccount, nonce);
    
        //2. Get user OpHash
        bytes32 userOpHash = IEntryPoint(config.entryPoint).getUserOpHash(userOp);
        bytes32 disgest = userOpHash.toEthSignedMessageHash();

        //3. sign Transaction
        uint8 v;
        bytes32 r; 
        bytes32 s;
        uint256 ANVIL_DEFAULT_KEY = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        
        if (block.chainid == 31337){
            (v, r, s) = vm.sign(ANVIL_DEFAULT_KEY, disgest);
        } else {
        (v, r, s) = vm.sign(config.account, disgest);
        }
        userOp.signature = abi.encodePacked(r, s, v);
        return userOp;   
      }

    function _generateUnsignedUserOperation(bytes memory callData, address sender, uint256 nonce) internal pure returns(PackedUserOperation memory) {
        uint128 verificationGasLimit =16777216;
        uint128 callGasLimit = verificationGasLimit;
        uint128 maxPriorityFeePerGas = 256;
        uint128 maxFeePerGas = maxPriorityFeePerGas;

        return PackedUserOperation ({
            sender: sender,
            nonce: nonce,
            initCode: hex"",
            callData: callData,
            accountGasLimits: bytes32(uint256(verificationGasLimit) << 128 | callGasLimit), preVerificationGas: verificationGasLimit, 
            gasFees: bytes32(uint256(maxPriorityFeePerGas) << 128 | maxFeePerGas),
            paymasterAndData: hex"",
            signature: hex""
        });
    }
}