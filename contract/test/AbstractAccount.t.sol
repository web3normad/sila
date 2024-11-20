// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {AbstractAccount} from "../src/Account.sol";
import {DeployAccount} from "../script/DeployAccount.s.sol";
import {HelperConfig} from "../script/HelperConfig.s.sol";
import {ERC20Mock} from "lib/openzeppelin-contracts/contracts/mocks/token/ERC20Mock.sol";
import {SendPackedUserOp, PackedUserOperation, IEntryPoint} from "script/SendPackedUserOp.s.sol";
import {ECDSA} from "lib/openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";
import {MessageHashUtils} from "lib/openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol";


contract AbstractAccountTest is Test{
    using MessageHashUtils for bytes32;

    HelperConfig helperConfig;
    AbstractAccount abstractAccount;
    ERC20Mock usdt;
    SendPackedUserOp sendPackedUserOp;

    address randomuser = makeAddr("randomUser");

    uint256 constant AMOUNT = 1e18;

    function setUp() public {
        DeployAccount deployAccount = new DeployAccount();
        (helperConfig, abstractAccount) = deployAccount.deployAbstractAccount();
        usdt = new ERC20Mock();
        sendPackedUserOp = new SendPackedUserOp();
        
    }

  
    function testOwnerCanExecuteCommands() public {
        
        assertEq(usdt.balanceOf(address(abstractAccount)), 0);
        address dest = address(usdt);
        uint256 value = 0;
        bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(abstractAccount), AMOUNT);
       
        vm.prank(abstractAccount.owner());
        abstractAccount.execute(dest, value, functionData);

        assertEq(usdt.balanceOf(address(abstractAccount)), AMOUNT);
    }

    function testNonOwnerCannotExecuteCommands() public{
       
        assertEq(usdt.balanceOf(address(abstractAccount)), 0);
        address dest = address(usdt);
        uint256 value = 0;
        bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(abstractAccount), AMOUNT);
        
        vm.prank(randomuser);
        vm.expectRevert(AbstractAccount.AbstractAccount__NotFromEntryPointOrOwner.selector);
        abstractAccount.execute(dest, value, functionData);
    }

    function testRecoverSignedOp() public{
    
        assertEq(usdt.balanceOf(address(abstractAccount)), 0);
        address dest = address(usdt);
        uint256 value = 0;
        bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(abstractAccount), AMOUNT);
        bytes memory executeCallData =
            abi.encodeWithSelector(AbstractAccount.execute.selector, dest, value, functionData);
        PackedUserOperation memory packedUserOp = sendPackedUserOp.generateSignedUserOperation(executeCallData, helperConfig.getConfig(), address (abstractAccount));
        bytes32 userOperationHash = IEntryPoint(helperConfig.getConfig().entryPoint).getUserOpHash(packedUserOp);

      
        address actualSigner = ECDSA.recover(userOperationHash.toEthSignedMessageHash(), packedUserOp.signature);

       
        assertEq(actualSigner, abstractAccount.owner());
    }

    
    function testValidationOfUserOps() public {
        assertEq(usdt.balanceOf(address(abstractAccount)), 0);
        address dest = address(usdt);
        uint256 value = 0;
        bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(abstractAccount), AMOUNT);
        bytes memory executeCallData =
            abi.encodeWithSelector(AbstractAccount.execute.selector, dest, value, functionData);
        PackedUserOperation memory packedUserOp = sendPackedUserOp.generateSignedUserOperation(executeCallData, helperConfig.getConfig(), address (abstractAccount));
        bytes32 userOperationHash = IEntryPoint(helperConfig.getConfig().entryPoint).getUserOpHash(packedUserOp);
        uint256 missingAccountFunds = 1e18;

      
        vm.prank(helperConfig.getConfig().entryPoint);
        uint256 validationData = abstractAccount.validateUserOp(packedUserOp, userOperationHash, missingAccountFunds);
        assertEq(validationData, 0);
    }

    function testEntryPointCanExecuteCommands() public {
      
        assertEq(usdt.balanceOf(address(abstractAccount)), 0);
        address dest = address(usdt);
        uint256 value = 0;
        bytes memory functionData = abi.encodeWithSelector(ERC20Mock.mint.selector, address(abstractAccount), AMOUNT);
        bytes memory executeCallData =
            abi.encodeWithSelector(AbstractAccount.execute.selector, dest, value, functionData);
        PackedUserOperation memory packedUserOp = sendPackedUserOp.generateSignedUserOperation(executeCallData, helperConfig.getConfig(), address (abstractAccount));
        

        vm.deal(address(abstractAccount), 1e18);

        PackedUserOperation[] memory ops = new PackedUserOperation[](1);
        ops[0] = packedUserOp;

        vm.prank(randomuser);
        IEntryPoint(helperConfig.getConfig().entryPoint).handleOps(ops, payable(randomuser));

    
        assertEq(usdt.balanceOf(address(abstractAccount)), AMOUNT);
    }
}