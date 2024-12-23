import { defineChain } from "../../node_modules/viem/utils/chain/defineChain.ts";

const mode = defineChain({
  id: 34443,
  name: "Mode",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.mode.network/"],
    },
  },
  blockExplorers: {
    default: {
      url: "https://explorer.mode.network/",
    },
  },
  logo: "/logo/mode-logo.png",
});

export const chainConfig = {
  34443: mode,
};
