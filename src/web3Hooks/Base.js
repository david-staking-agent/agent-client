import {
  readContract,
  prepareTransactionRequest,
  writeContract,
  simulateContract,
  getAccount,
  waitForTransactionReceipt,
} from "wagmi/actions";
import { wagmiConfig as config } from "../config/wagmiConfig";
const { connector } = getAccount(config);

export class Base {
  constructor(address, abi) {
    this.address = address;
    this.abi = abi;
  }

  async read(functionName, args = [], chainId) {
    const res = await readContract(config, {
      abi: this.abi,
      address: this.address,
      functionName,
      args,
      chainId,
    });

    return res;
  }

  async simulate(functionName, args = [], value = "0", chainId) {
    return (
      await simulateContract(config, {
        abi: this.abi,
        address: this.address,
        functionName: functionName,
        args,
        account: connector || "0x0000000000000000000000000000000000000000",
        value,
        chainId,
      })
    ).result;
  }

  async write(functionName, args = [], value = "0") {
    const hash = await writeContract(config, {
      abi: this.abi,
      address: this.address,
      functionName,
      args,
      value,
    });

    return waitForTransactionReceipt(config, { hash, confirmations: 1 });
  }
}
