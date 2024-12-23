import { Base } from "./Base";
import { erc20Abi } from "viem";
import { formatUnits, parseUnits } from "../utils/formatUnits";

export default class ERC20 extends Base {
  constructor(address, ...extendedAbis) {
    super(address, [...erc20Abi, ...extendedAbis]);

    this.address = address;
  }

  static async createInstance(address) {
    const instance = new ERC20(address);

    const [name, symbol, decimals] = await Promise.all([
      instance.read("name"),
      instance.read("symbol"),
      instance.read("decimals"),
    ]);

    instance.name = name;
    instance.symbol = symbol;
    instance.decimals = decimals;

    return instance;
  }

  ///////////////////////////
  // WRITE FUNCTIONS
  /////////////////////////

  async approve(spender, amount) {
    return this.write("approve", [spender, amount]);
  }

  ///////////////////////////
  // READ FUNCTIONS
  /////////////////////////

  async allowance(owner, spender) {
    return this.read("allowance", [owner, spender]);
  }

  async balanceOf(account) {
    return this.read("balanceOf", [account]);
  }
}
