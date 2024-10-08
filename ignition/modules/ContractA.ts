import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const ContractAModule = buildModule("ContractAModule", (m) => {

  const contractA = m.contract("ContractA");

  return { contractA };
});

export default ContractAModule;
