// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "forge-std/Script.sol";
import {AbstractAccount} from "../src/Account.sol"; 
import {HelperConfig} from "./HelperConfig.s.sol";

contract DeployAccount is Script {
      function run() public {
        deployAbstractAccount();
    }

    function deployAbstractAccount() public returns (HelperConfig, AbstractAccount) {
        HelperConfig helperConfig = new HelperConfig();
        HelperConfig.NetworkConfig memory config = helperConfig.getConfig();

        vm.startBroadcast(config.account);
        AbstractAccount abstractAccount = new AbstractAccount(config.entryPoint);
        abstractAccount.transferOwnership(config.account);
        vm.stopBroadcast();
        return (helperConfig, abstractAccount);
    }
}
