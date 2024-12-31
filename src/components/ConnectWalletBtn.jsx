import { ConnectButton, useSiweAuth } from "thirdweb/react";
import { thirdWebClient } from "../config/thirdweb";
import { arbitrumSepolia } from "thirdweb/chains";
import { getSupportedTokens } from "../config/supported";

const ConnectWalletBtn = () => {
  return (
    <ConnectButton
      connectModal={{ size: "wide", showThirdwebBranding: false }}
      connectButton={{
        label: "Connect",
        className: "",
        style: {
          borderRadius: "10px",
        },
      }}
      client={thirdWebClient}
      supportedTokens={getSupportedTokens()}
      accountAbstraction={{
        chain: arbitrumSepolia,
        sponsorGas: true,
        factoryAddress: "0x3320d9018ae22D3E7d6c3b812b26366080E086FD",
      }}
    />
  );
};

export default ConnectWalletBtn;
