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
        factoryAddress,
      }}
    />
  );
};

export default ConnectWalletBtn;
