// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WelfareFund {
    address public admin;
    mapping(address => bool) public isBeneficiary;
    mapping(address => bool) public hasReceivedFund;

    event BeneficiaryAdded(address user);
    event FundDistributed(address user, uint amount);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    function addBeneficiary(address user) external onlyAdmin {
        isBeneficiary[user] = true;
        emit BeneficiaryAdded(user);
    }

    function distributeFund(address payable user) external onlyAdmin {
        require(isBeneficiary[user], "Not a beneficiary");
        require(!hasReceivedFund[user], "Already received");

        uint amount = 0.01 ether;
        hasReceivedFund[user] = true;
        user.transfer(amount);

        emit FundDistributed(user, amount);
    }

    // Accept ETH to fund the contract
    receive() external payable {}
}
