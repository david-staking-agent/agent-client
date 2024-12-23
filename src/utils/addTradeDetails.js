import ERC20 from "../web3Hooks/ERC20";
import { parseUnits } from "./formatUnits";
import { getQuote } from "../api/quote";

const NATIVE = {
  native: true,
  address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

export const addTradeDetails = async (trades, address, chainId) => {
  // Adding Token Metadata and formatting
  trades = await Promise.all(
    trades.map(async (trade, index) => {
      const { buyTokenAddress, sellTokenAddress } = trade;
      let buyToken, sellToken;

      if (buyTokenAddress === NATIVE.address) {
        buyToken = NATIVE;
      } else {
        buyToken = await ERC20.createInstance(buyTokenAddress);
      }

      if (sellTokenAddress === NATIVE.address) {
        sellToken = NATIVE;
      } else {
        sellToken = await ERC20.createInstance(sellTokenAddress);
      }

      return {
        id: trade.id,
        action: trade.action,
        sellToken,
        buyToken,
        amountInUsd: trade.amountInUsd,
        amountSell: parseUnits(trade.amountInSellToken, sellToken.decimals).toString(),
        atApy: trade.buyTokenApy,
      };
    })
  );

  // Getting txn Quote
  return addQuote(trades, address, chainId);
};

const addQuote = (trades, address, chainId) => {
  return Promise.all(
    trades.map(async (trade) => {
      const { sellToken, buyToken, amountSell } = trade;

      const {
        buyAmount: amountBuy,
        transaction,
        issues,
      } = await getQuote(chainId, sellToken.address, buyToken.address, amountSell, address);

      return { ...trade, amountBuy, transaction, issues };
    })
  );
};
