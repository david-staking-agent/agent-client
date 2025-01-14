import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateUserWallet } from "../api/user";
import { PayEmbed, useActiveAccount, useWalletBalance } from "thirdweb/react";
import ConnectWalletBtn from "../components/ConnectWalletBtn";
import { addSessionKey } from "thirdweb/extensions/erc4337";
import {
  getContract,
  readContract,
  resolveMethod,
  sendTransaction,
  waitForReceipt,
} from "thirdweb";
import { chain, client } from "../config/thirdweb";
import { getSupportedContracts, getSupportedTokens } from "../config/supported";
import { ClipLoader } from "react-spinners";

const Connect = ({ setNavbarVisible }) => {
  const [authorized, setAuthorized] = useState(false);
  const [authorizing, setAuthorizing] = useState(false);
  const [loading, setLoading] = useState(true);

  const { username, chatId } = useParams();
  const smartAccount = useActiveAccount(); // This is for smart account

  const selectProtocols = ["Ether Fi", "Renzo", "Kelp Dao", "Ethena"];

  useEffect(() => {
    console.log(smartAccount);
    if (!smartAccount) return setLoading(false);

    checkAuthorized();
  }, [smartAccount]);

  useEffect(() => {
    if (!authorized || !username || !smartAccount) return;
    updateUserWallet(username, chatId, smartAccount.address);
  }, [authorized, smartAccount]);

  useEffect(() => {
    if (smartAccount) {
      setNavbarVisible(true);
    } else {
      setNavbarVisible(false);
    }
  }, [smartAccount]);

  const checkAuthorized = async () => {
    setLoading(true);

    try {
      const contract = getContract({
        address: smartAccount.address,
        chain,
        client,
      });

      const signersList = await readContract({
        contract,
        method: resolveMethod("getAllActiveSigners"),
      });

      setAuthorized(signersList.length > 0);
    } catch (error) {
      setAuthorized(false);
    }

    setLoading(false);
  };

  const authorize = async () => {
    setAuthorizing(true);

    try {
      const contract = getContract({
        chain,
        client,
        address: smartAccount.address,
      });

      const transaction = addSessionKey({
        contract,
        account: smartAccount,
        sessionKeyAddress: "0xa38f9740e716405542d90fef1479eBe8815314E3", // Needs to change in production
        permissions: {
          approvedTargets: getSupportedContracts(),
          nativeTokenLimitPerTransaction: 1, // Needs to change in prodcution
          permissionStartTimestamp: new Date(),
          permissionEndTimestamp: new Date(Date.now() + 1 * 60 * 60 * 1000), // Needs to change in production
        },
      });

      const tx = await sendTransaction({ account: smartAccount, transaction });
      await waitForReceipt(tx);
      setAuthorized(true);
    } catch (error) {
      console.log(error);
    } finally {
      setAuthorizing(false);
    }
  };

  return loading ? (
    <ClipLoader color="var(--color-primary)" size="30px" />
  ) : !smartAccount ? (
    <>
      <h1 className="page-heading">Hello, David here 👋</h1>
      <p style={{ textAlign: "center" }}>Connect your wallet to get the best suggestions.</p>
      <ConnectWalletBtn />
    </>
  ) : !authorized ? (
    <>
      <h1 className="page-heading">Authorize David</h1>
      <p className="text--secondary text-center">
        To manage your smart account, only with select protocols
      </p>
      <ul style={{ marginBottom: "20px", paddingLeft: "20px", listStyleType: "none" }}>
        {selectProtocols.map((name, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
              fontSize: "1rem",
            }}
            className="text--secondary"
          >
            <span style={{ color: "green", marginRight: "12px", fontSize: "1.5rem" }}>✔</span>
            {name}
          </li>
        ))}
      </ul>

      <button onClick={authorize} className="btn btn--connect" disabled={authorizing}>
        {!authorizing ? (
          "Authorize"
        ) : (
          <>
            <span style={{ marginRight: "10px" }}>Authorizing</span>
            <ClipLoader color="var(--color-primary)" size="20px" />
          </>
        )}
      </button>
    </>
  ) : (
    <>
      <h1 className="page-heading">You're all set!</h1>
      <p style={{ textAlign: "center" }}>
        Add funds to your smart account and continue the chat on Telegram
      </p>
      <PayEmbed
        client={client}
        payOptions={{
          mode: "fund_wallet",
          metadata: { name: "Deposit funds" },
          prefillBuy: { chain, amount: "0.01" },
        }}
        supportedTokens={getSupportedTokens()}
      />
    </>
  );
};

export default Connect;
