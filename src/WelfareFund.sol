// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract WelfareFund {
    address public admin;
    mapping(address => bool) public isBeneficiary;
    mapping(address => bool) public hasReceivedFund;

    event BeneficiaryAdded(address user);
    event FundDistributed(address user, uint amount);
    event Received(address sender, uint amount); // 🔔 for fallback and receive()

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    // ✅ Public function to allow user to check eligibility
    function checkEligibility() external view returns (bool) {
        return isBeneficiary[msg.sender] && !hasReceivedFund[msg.sender];
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

    // Accept ETH sent directly to contract (via send/transfer/call)
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    // Catch invalid calls and log them
    fallback() external payable {
        emit Received(msg.sender, msg.value);
    }
}
