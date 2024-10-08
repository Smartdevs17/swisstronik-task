const { ethers } = require("ethers");
import { abi } from "./ERC71-ABI.json";
import dotenv from "dotenv";

dotenv.config();

// Replace with your own values
const providerUrl = "https://json-rpc.testnet.swisstronik.com";
// const providerUrl = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const privateKey = process.env.PRIVATE_KEY; // Ensure your private key is set correctly
const contractAddress = "0x75555B112AE62ba1106BF6f014705b5A580E0B24";
const contractABI = abi;
 

async function mintToken() {
  // Connect to the Ethereum network
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  console.log("Provider:", provider);
  console.log("Wallet Address:", wallet.address);
  console.log("Contract Address:", contractAddress);
  console.log("Provider URL:", providerUrl);

  try {
  // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    const tokenId = 1; // Example token ID
    const tokenURI = "https://example.com/token/1";
    const mintTx = await contract.safeMint(wallet.address, tokenId, tokenURI,{
        gasLimit: 1000000, // Adjust as necessary
      });
    await mintTx.wait();
    console.log("mintTx", mintTx)
    console.log(`Minted token ID ${tokenId} to ${wallet.address}`);
  } catch (error) {
    console.error("Error during transaction:", error);
  }
}



mintToken().catch((error) => {
    console.error("Main error:", error);
    process.exit(1);
  });