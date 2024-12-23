import { useEffect } from "react";
import ConnectWalletBtn from "../components/ConnectWalletBtn";
import { useAccount } from "wagmi";
import { useParams } from "react-router-dom";
import { updateUserWallet } from "../api/user";

const Connect = ({ setNavbarVisible }) => {
  const { username, chatId } = useParams();
  const { address } = useAccount();

  useEffect(() => {
    if (!address || !username) return;
    updateUserWallet(username, chatId, address);
  }, [address]);

  useEffect(() => {
    if (address) {
      setNavbarVisible(true);
    } else {
      setNavbarVisible(false);
    }
  }, [address]);

  return !address ? (
    <>
      <h1 className="page-heading">Hello, David here 👋</h1>
      <p style={{ textAlign: "center" }}>Connect your wallet to get the best suggestions.</p>
      <ConnectWalletBtn className={"btn btn--connect"} />
    </>
  ) : (
    <>
      <h1 className="page-heading">You're all set!</h1>
      <p style={{ textAlign: "center" }}>Please close this window and continue on telegram chat.</p>
    </>
  );
};

export default Connect;
