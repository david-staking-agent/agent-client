import data from "./marketData.json";
import { chain } from "./thirdweb";

export const getSupportedTokens = () => {
  const supportedTokens = {};
  supportedTokens[chain.id] = [];

  [...data.yieldBearingTokens, ...data.baseTokens].forEach((token) => {
    if (token.type === "ERC20") {
      token.icon =
        "https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/fd17377a-34f5-4c3a-873e-2586898880b2.svg";

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

  [...data.yieldBearingTokens, ...data.baseTokens].forEach((token) => {
    if (token.type === "ERC20") {
      token.icon =
        "https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/fd17377a-34f5-4c3a-873e-2586898880b2.svg";

      supportedContracts.push(token.address);
    }
  });

  return supportedContracts;
};
