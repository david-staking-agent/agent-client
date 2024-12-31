import data from "./marketData.json";
import { websiteUrl } from "./api.json";
import { arbitrumSepolia } from "thirdweb/chains";

export const getSupportedTokens = () => {
  const supportedTokens = {};
  supportedTokens[arbitrumSepolia.id] = [];

  [...data.yieldBearingTokens, ...data.baseTokens].forEach((token) => {
    if (token.type === "ERC20") {
      token.icon =
        "https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/fd17377a-34f5-4c3a-873e-2586898880b2.svg";

      supportedTokens[arbitrumSepolia.id].push(token);
    }
  });

  return supportedTokens;
};

export const getSupportedContracts = () => {
  const OPEN_OCEAN_ROUTER = "0x6352a56caadC4F1E25CD6c75970Fa768A3304e64";
  const supportedContracts = [OPEN_OCEAN_ROUTER];

  [...data.yieldBearingTokens, ...data.baseTokens].forEach((token) => {
    if (token.type === "ERC20") {
      token.icon =
        "https://storage.googleapis.com/prod-pendle-bucket-a/images/uploads/fd17377a-34f5-4c3a-873e-2586898880b2.svg";

      supportedContracts.push(token.address);
    }
  });

  return supportedContracts;
};
