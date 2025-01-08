import http from "./http";

const apiEndpoint = `${import.meta.env.VITE_API_URL}/quote`;

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
