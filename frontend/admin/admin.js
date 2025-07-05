// 👇 Paste these two lines at the top instead of importing from config
const CONTRACT_ADDRESS = "0x3ABEC8e46470b850AC1A000ff149Be3e4B0eF10F";
const CONTRACT_ABI = [
  {
    "type": "constructor",
    "inputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "receive",
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "addBeneficiary",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "admin",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "distributeFund",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address payable"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "hasReceivedFund",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isBeneficiary",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "BeneficiaryAdded",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "FundDistributed",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  }];

let provider;
let signer;
let contract;

// DOM Elements
const connectBtn = document.getElementById("connectAdminWallet");
const walletDisplay = document.getElementById("adminWallet");
const feedback = document.getElementById("adminFeedback");

const beneficiaryInput = document.getElementById("beneficiaryAddress");
const registerBtn = document.getElementById("registerBtn");

const recipientInput = document.getElementById("recipientAddress");
const distributeBtn = document.getElementById("distributeBtn");

// Connect Admin Wallet
connectBtn.onclick = async () => {
  try {
    if (!window.ethereum) throw new Error("🦊 MetaMask is not installed.");
    provider = new ethers.providers.Web3Provider(window.ethereum); // ✅ correct for v5
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const address = await signer.getAddress();
    walletDisplay.textContent = address;
    feedback.textContent = "✅ Admin wallet connected";
  } catch (err) {
    feedback.textContent = `❌ Connection failed: ${err.message}`;
  }
};

// Register Beneficiary
registerBtn.onclick = async () => {
  const userAddr = beneficiaryInput.value.trim();
  if (!userAddr) return (feedback.textContent = "⚠️ Enter a valid beneficiary address.");

  try {
    const tx = await contract.addBeneficiary(userAddr);
    feedback.textContent = "⏳ Registering beneficiary...";
    await tx.wait();
    feedback.textContent = `✅ Beneficiary ${userAddr} registered`;
  } catch (err) {
    feedback.textContent = `❌ Registration failed: ${err.message}`;
  }
};

// Distribute Funds
distributeBtn.onclick = async () => {
  const recipientAddr = recipientInput.value.trim();
  if (!recipientAddr) return (feedback.textContent = "⚠️ Enter a valid recipient address.");

  try {
    const tx = await contract.distributeFund(recipientAddr);
    feedback.textContent = "⏳ Distributing funds...";
    await tx.wait();
    feedback.textContent = `💸 Funds sent to ${recipientAddr}`;
  } catch (err) {
    feedback.textContent = `❌ Distribution failed: ${err.message}`;
  }
};
