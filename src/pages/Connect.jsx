import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateUserWallet } from "../api/user";
import { PayEmbed, useActiveAccount, useSendTransaction, useWalletBalance } from "thirdweb/react";
import ConnectWalletBtn from "../components/ConnectWalletBtn";
import { addSessionKey } from "thirdweb/extensions/erc4337";
import {
  getContract,
  readContract,
  resolveMethod,
  sendTransaction,
  waitForReceipt,
} from "thirdweb";
import { arbitrumSepolia } from "thirdweb/chains";
import { thirdWebClient } from "../config/thirdweb";
import { getSupportedContracts, getSupportedTokens } from "../config/supported";

const Connect = ({ setNavbarVisible }) => {
  const [authorized, setAuthorized] = useState(false);

  const { username, chatId } = useParams();
  const smartAccount = useActiveAccount(); // This is for smart account

  // const {
  //   data: walletBalance,
  //   isLoading,
  //   isError,
  // } = useWalletBalance({
  //   chain: arbitrumSepolia,
  //   address: smartAccount?.address,
  //   client: thirdWebClient,
  // });

  useEffect(() => {
    if (!smartAccount) return;

    checkAuthorized();
  }, [smartAccount]);

  useEffect(() => {
    if (!authorized || !username) return;
    updateUserWallet(username, chatId, smartAccount.address);
  }, [authorized]);

  useEffect(() => {
    if (smartAccount) {
      setNavbarVisible(true);
    } else {
      setNavbarVisible(false);
    }
  }, [smartAccount]);

  const checkAuthorized = async () => {
    try {
      const contract = getContract({
        address: smartAccount.address,
        chain: arbitrumSepolia,
        client: thirdWebClient,
      });

      const signersList = await readContract({
        contract,
        method: resolveMethod("getAllActiveSigners"),
      });

      setAuthorized(signersList.length > 0);
    } catch (error) {
      setAuthorized(false);
    }
  };

  const authorize = async () => {
    try {
      const contract = getContract({
        address: smartAccount.address,
        chain: arbitrumSepolia,
        client: thirdWebClient,
      });

      const transaction = addSessionKey({
        contract,
        account: smartAccount,
        sessionKeyAddress: "0xa38f9740e716405542d90fef1479eBe8815314E3",
        permissions: {
          approvedTargets: getSupportedContracts(),
          nativeTokenLimitPerTransaction: 10,
          permissionStartTimestamp: new Date(),
          permissionEndTimestamp: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      const tx = await sendTransaction({ account: smartAccount, transaction });
      await waitForReceipt(tx);
      setAuthorized(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (!smartAccount) {
    return (
      <>
        <h1 className="page-heading">Hello, David here 👋</h1>
        <p style={{ textAlign: "center" }}>Connect your wallet to get the best suggestions.</p>
        <ConnectWalletBtn />
      </>
    );
  }

  if (!authorized) {
    return (
      <>
        <h1 className="page-heading">Authorize David</h1>
        <p style={{ textAlign: "center" }}>
          To manage your smart account, only with trusted protocols
        </p>
        <button onClick={authorize} className="btn btn--connect">
          Authorize
        </button>
      </>
    );
  }

  // if (!walletBalance?.value && !isLoading && !isError) {
  //   return (
  //     <PayEmbed
  //       client={thirdWebClient}
  //       payOptions={{
  //         mode: "fund_wallet",
  //         metadata: { name: "Deposit funds" },
  //         prefillBuy: { chain: arbitrumSepolia, amount: "0.01" },
  //       }}
  //       supportedTokens={getSupportedTokens()}
  //     />
  //   );
  // }

  return (
    <div>
      <h1 className="page-heading">You're all set!</h1>
      <p style={{ textAlign: "center" }}>Please close this window and continue on Telegram chat.</p>
    </div>
  );
};

export default Connect;
