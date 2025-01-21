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
import {
  getSupportedContracts,
  getSupportedProtocols,
  getSupportedTokens,
} from "../config/supported";
import { ClipLoader } from "react-spinners";
import { Copy } from "../components/Copy";

const Connect = ({ setNavbarVisible }) => {
  const [authorized, setAuthorized] = useState(false);
  const [authorizing, setAuthorizing] = useState(false);
  const [loading, setLoading] = useState(true);

  const { username, chatId } = useParams();
  const smartAccount = useActiveAccount();

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
        sessionKeyAddress: "0x8Aa9c2f97c279147a3B8fF7df105Ab3C906Ab8aD",
        permissions: {
          approvedTargets: getSupportedContracts(),
          nativeTokenLimitPerTransaction: 5, // Might need to change in future
          permissionStartTimestamp: new Date(),
          permissionEndTimestamp: new Date(Date.now() + 5 * 60 * 1000), // Needs to change in production
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
        To manage your smart account, <br />
        only with select protocols
      </p>
      <ul style={{ marginBottom: "20px", paddingLeft: "20px", listStyleType: "none" }}>
        {getSupportedProtocols().map((protocol, index) => (
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
            <img className="icon icon--round" src={protocol.tokenIcon} alt="" />

            {protocol.name}
          </li>
        ))}
      </ul>

      <button onClick={authorize} className="btn btn--connect" disabled={authorizing}>
        {!authorizing ? (
          "Authorize"
        ) : (
          <>
            <span style={{ marginRight: "10px" }}>Awaiting Sign 1/2</span>
            <ClipLoader color="var(--color-primary)" size="20px" />
          </>
        )}
      </button>
    </>
  ) : (
    <>
      <h1 className="page-heading">You're all set!</h1>
      <p style={{ textAlign: "center" }}>
        Add funds to your smart account address and continue the chat on Telegram
      </p>
      <p style={{ fontSize: "16px" }} className="text-center btn btn--connect">
        Your Address:
        <Copy text={smartAccount.address} />
      </p>
    </>
  );
};

// Removed temporary was getting error - Needs to change

{
  /* <PayEmbed
client={client}
payOptions={{
  mode: "fund_wallet",
  metadata: { name: "Deposit funds" },
  prefillBuy: { chain, amount: "0.01" },
}}
supportedTokens={getSupportedTokens()}
/> */
}

export default Connect;
