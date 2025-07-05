// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/WelfareFund.sol";

contract DeployWelfareFund is Script {
    function run() external {
        // Load your wallet key from environment variables
        vm.startBroadcast();
        new WelfareFund(); // Contract gets deployed here
        vm.stopBroadcast();
    }
}
