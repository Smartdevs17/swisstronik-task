// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const { ethers } = require("hardhat");

const SmartdevTokenModule = buildModule("SmartdevTokenModule", (m) => {
  const initialSupply = ethers.parseEther("1000000000000000000000000");
  const smartdevToken = m.contract("SmartdevToken", [initialSupply]);
  return { smartdevToken };
});

export default SmartdevTokenModule;
