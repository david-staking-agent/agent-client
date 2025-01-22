import { ConnectButton, useDisconnect, useSiweAuth } from "thirdweb/react";
import { chain, client, factoryAddress } from "../config/thirdweb";
import { getSupportedTokens } from "../config/supported";
import { createWallet } from "thirdweb/wallets";

const wallets = [createWallet("walletConnect"), createWallet("com.thirdweb")];

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
      wallets={wallets}
      client={client}
      recommendedWallets={[wallets[0]]}
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
