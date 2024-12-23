import { http } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mode } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "David Staking Agent",
  projectId: "49bdf41453b575598177350acab135bd",
  chains: [mode],
  transports: {
    [34443]: http(),
  },
});
