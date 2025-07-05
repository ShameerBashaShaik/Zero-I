// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/WelfareFund.sol";

contract WelfareFundTest is Test {
    WelfareFund public fund;
    address public user = address(0xABCD);

    function setUp() public {
        fund = new WelfareFund();
        vm.deal(address(fund), 1 ether); // fund contract with ETH
    }

    function testAddBeneficiary() public {
        fund.addBeneficiary(user);
        assertTrue(fund.isBeneficiary(user));
    }

    function testDistributeFund() public {
        fund.addBeneficiary(user);
        fund.distributeFund(payable(user));
        assertTrue(fund.hasReceivedFund(user));
    }

    function test_RevertWhen_NotBeneficiary() public {
        vm.expectRevert();
        fund.distributeFund(payable(user));
    }
}
