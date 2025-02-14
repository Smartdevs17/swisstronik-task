import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const ERC20Module = buildModule("ERC20Module", (m) => {
    
  const erc20 = m.contract("ShegzToken");

  return { erc20 };
});

export default ERC20Module;