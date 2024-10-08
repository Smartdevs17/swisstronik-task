const { ethers } = require("ethers");
import { abi } from "./ABI.json";
import dotenv from "dotenv";

dotenv.config();

// Replace with your own values
const providerUrl = "https://json-rpc.testnet.swisstronik.com";
const privateKey = process.env.PRIVATE_KEY; // Ensure your private key is set correctly
const contractAddress = "0xdAA2a4Aa7A8096e9C70A8069A62775bA22138A4e";
const contractABI = abi;

async function main() {
  // Connect to the Ethereum network
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  console.log("Provider:", provider);
  console.log("Wallet Address:", wallet.address);
  console.log("Contract Address:", contractAddress);
  console.log("Provider URL:", providerUrl);

  // Create a contract instance
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);

  try {
    // Mint 100 tokens
    const mintAmount = ethers.parseUnits("10", 18); // Assuming 18 decimals
    const mintTx = await contract.mint(mintAmount, {
      gasLimit: 100000, // Adjust as necessary
    });
    await mintTx.wait();
    console.log(`Minted 100 tokens to ${wallet.address}`);

    // Transfer 1 token to the specified address
    const transferAmount = ethers.parseUnits("1", 18); // Assuming 18 decimals
    const recipientAddress = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";
    const transferTx = await contract.transfer(recipientAddress, transferAmount, {
      gasLimit: 100000, // Adjust as necessary
    });
    console.log("transferTx", transferTx);
    await transferTx.wait();
    console.log(`Transferred 1 token to ${recipientAddress}`);
  } catch (error) {
    console.error("Error during transaction:", error);
  }
}

main().catch((error) => {
  console.error("Main error:", error);
  process.exit(1);
});
