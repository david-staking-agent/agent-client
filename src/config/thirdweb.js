import { createThirdwebClient, defineChain } from "thirdweb";

export const mode = defineChain({
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

export const thirdWebClient = createThirdwebClient({
  clientId: "8e590d8043e92068542e513fa8932779",
});
