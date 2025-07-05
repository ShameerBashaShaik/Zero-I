# Zero-I -Team
This repository is created for the purpose of web3ssh IIIT Sri City Hackathon.

A blockchain-powered platform built on Ethereum tools to ensure transparent, traceable, and fair distribution of government subsidies, pensions, and relief funds. Smart contracts enforce eligibility, automate disbursement, and eliminate middlemen.

# 💸 WelfareConnect – Decentralized Public Welfare Distribution System

WelfareConnect is a blockchain-based dApp built to ensure *transparent, **secure, and **tamper-proof* distribution of public welfare funds. It eliminates middlemen and empowers beneficiaries by enabling them to directly check eligibility and receive aid through smart contracts.

---

## 🚀 What We Built

- ✅ A smart contract that:
  - Registers eligible beneficiaries
  - Tracks fund distribution to avoid double claiming
  - Ensures only the admin can trigger fund transfers

- ✅ Two user interfaces:
  - *Admin Dashboard*: Add beneficiaries and distribute funds.
  - *Beneficiary Portal*: Connect wallet, check eligibility, and request funds (view-only).

- ✅ Wallet integration using MetaMask and *ethers.js* for seamless blockchain interaction.

---

## ⚙ How It Works

### 🔐 Smart Contract (Solidity)
- Written in Solidity and deployed on a testnet.
- Stores:
  - List of beneficiaries
  - Records of who has already received funds
- Restricts access to critical functions using require(msg.sender == admin).

### 🧠 Frontend (HTML, JS, CSS)
- Built using basic *HTML, **CSS, and **JavaScript* (no frameworks).
- Uses *Ethers.js* to:
  - Connect wallets via MetaMask
  - Interact with contract functions (isBeneficiary(), hasReceivedFund(), distributeFund())

### 🛠 Tools & Libraries
- [ethers.js](https://docs.ethers.org/)
- MetaMask Wallet
- Solidity (0.8.x)
- Hardhat (optional for local testing)
- Deployed on [Goerli / Sepolia / other testnet]

---

## 🧑‍💻 Project Structure

WelfareConnect/
│
├── admin/ # Admin panel files
│ ├── admin.html
│ └── admin.js
│
├── user/ # Beneficiary interface
│ ├── index.html
│ └── user.js
│
├── config/
│ └── contractDetails.js # Contains CONTRACT_ABI and CONTRACT_ADDRESS
│
├── indexs.css # Shared styling
└── README.md


---

## 📦 How to Use

1. *Clone the repo* and install MetaMask.
2. *Connect your wallet* using "Connect Wallet" button.
3. Admin uses admin.html to:
   - Register new beneficiary
   - Distribute funds (ensure contract has ETH)
4. Beneficiary uses index.html to:
   - Connect wallet
   - Check eligibility
   - View received funds

---

## 💡 Future Improvements

- Add transaction history logs
- Enable email/SMS alerts for beneficiaries
- Add support for multiple admins using role-based access control
- Optimize gas fees for batch distribution

---

## 👥 Team

- *Smart Contract Developer*: Sundhara Sai Ganesh Vangara
- *Deployment and Integration*: Sai Teja Mothukuri
- *Platform management*: Akhi Valluru
- *Frontend & Integration*: Shameer Basha Shaik

---

✅ Built during [Web3ssh] 2025 to empower transparency in public fund distribution using Web3.
