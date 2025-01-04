import { createThirdwebClient, defineChain } from "thirdweb";

export const chain = defineChain({
  id: 34443,
  name: "Mode Mainnet",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  blockExplorers: [
    {
      name: "Modescan",
      url: "https://modescan.io",
      apiUrl: "https://api.modescan.org/api",
    },
  ],
});

export const factoryAddress = "0x49476bC3271dfb93A6Bcb4F2403B5b568fAd969d";

export const client = createThirdwebClient({
  clientId: "8e590d8043e92068542e513fa8932779",
});
