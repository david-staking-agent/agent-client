import { ConnectButton, useDisconnect, useSiweAuth } from "thirdweb/react";
import { chain, client, factoryAddress } from "../config/thirdweb";

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
      client={client}
      supportedTokens={getSupportedTokens()}
      accountAbstraction={{
        chain: chain,
        sponsorGas: true,
        factoryAddress: "0x3320d9018ae22D3E7d6c3b812b26366080E086FD",
      }}
    />
  );
};

export default ConnectWalletBtn;
