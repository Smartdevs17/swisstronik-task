import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const PERC20Module = buildModule("PERC20Module", (m) => {

  const perc20 = m.contract("SmartPERC20");

  return { perc20 };
});

export default PERC20Module;
