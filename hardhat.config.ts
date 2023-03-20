import dotenv from 'dotenv'
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config()
const { RPC_OPAL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      optimizer: {
        enabled: true,
        runs: 800,
      },
      viaIR : true,
    },
  },
  networks: {
    hardhat: {},
    opal: {
      url: RPC_OPAL,
      accounts: [`${PRIVATE_KEY}`],
      // blockGasLimit: "2986383925193087415632", // Network block gasLimit
      // gas: "auto",
      // gasPrice: "auto",
    },
  }
};

export default config;
