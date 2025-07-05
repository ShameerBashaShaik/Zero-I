import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../config/contractDetails.js";

window.addEventListener("DOMContentLoaded", () => {
  let provider;
  let signer;
  let contract;

  const connectBtn = document.getElementById("connectWallet");
  const walletField = document.getElementById("walletAddress");
  const eligibilityField = document.getElementById("eligibilityStatus");
  const fundsField = document.getElementById("availableFunds");
  const feedback = document.getElementById("feedback");

  const checkEligibilityBtn = document.getElementById("checkEligibility");
  const requestFundsBtn = document.getElementById("requestFunds");

  // Connect Wallet
  connectBtn.onclick = async () => {
    try {
      if (!window.ethereum) {
        feedback.textContent = "❌ MetaMask not detected.";
        return;
      }

      provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = await provider.getSigner();
      contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const address = await signer.getAddress();
      walletField.textContent = address;
      feedback.textContent = "✅ Wallet connected";

      const balance = await provider.getBalance(address);
      fundsField.textContent = `${parseFloat(ethers.formatEther(balance)).toFixed(4)} ETH`;
    } catch (err) {
      console.error("Wallet connection error:", err);
      feedback.textContent = `❌ Connection error: ${err.message}`;
    }
  };

  // Check Eligibility
  checkEligibilityBtn.onclick = async () => {
    try {
      if (!contract) return (feedback.textContent = "⚠️ Please connect wallet first.");

      const address = await signer.getAddress();
      const eligible = await contract.isBeneficiary(address);
      const received = await contract.hasReceivedFund(address);

      eligibilityField.textContent = eligible
        ? received
          ? "✅ Already Received"
          : "✅ Eligible"
        : "❌ Not a Beneficiary";

      feedback.textContent = "🔍 Eligibility checked";
    } catch (err) {
      console.error("Eligibility error:", err);
      feedback.textContent = `❌ Error: ${err.message}`;
    }
  };

  // Disable request funds (since not supported)
  requestFundsBtn.onclick = () => {
    feedback.textContent =
      "⚠️ Funds can only be distributed by the admin. Please wait for distribution.";
  };
});
