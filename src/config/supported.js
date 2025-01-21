import tokenData from "../config/tokenData.json";
import { chain } from "./thirdweb";

export const getSupportedTokens = () => {
  const supportedTokens = {};
  supportedTokens[chain.id] = [];

  Object.values(tokenData).forEach((token) => {
    if (token.symbol === "STONE") return; // Needs to change temporary

    if (token.type === "ERC20") {
      supportedTokens[chain.id].push(token);
    }
  });

  return supportedTokens;
};

export const getSupportedContracts = () => {
  const OPEN_OCEAN_ROUTER = "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64";
  const ZEROX_API_ROUTER = "0x0000000000001fF3684f28c67538d4D072C22734";
  const RUBIC_API_ROUTER = "0x3335733c454805df6a77f825f266e136FB4a3333";

  const supportedContracts = [OPEN_OCEAN_ROUTER, ZEROX_API_ROUTER, RUBIC_API_ROUTER];

  Object.values(tokenData).forEach((token) => {
    if (token.type === "ERC20") {
      supportedContracts.push(token.address);
      if (token.depositAddress) supportedContracts.push(token.depositAddress);
    }
  });

  return supportedContracts;
};

export const getSupportedProtocols = () => {
  return Object.values(tokenData)
    .filter((token) => token.protocol)
    .map((token) => {
      return { name: token.protocol, tokenSymbol: token.symbol, tokenIcon: token.icon };
    });
};
