// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SimpleTokenSwapModule = buildModule("SimpleTokenSwapModule", (m) => {
  const swapRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const weth = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  const simpleTokenSwap = m.contract("SimpleTokenSwap", [swapRouter, weth]);
  return { simpleTokenSwap };
});

export default SimpleTokenSwapModule;
