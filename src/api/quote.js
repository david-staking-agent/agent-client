import http from "./http";
import config from "../config/api.json";

const apiEndpoint = `${config.apiUrl}/quote`;

export const getQuote = async (chainId, sellToken, buyToken, amountSell, taker) => {
  return (
    await http.post(apiEndpoint, {
      chainId,
      sellToken,
      buyToken,
      amountSell,
      taker,
    })
  ).data;
};
