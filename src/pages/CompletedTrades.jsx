import { useParams } from "react-router-dom";
import { useAccount } from "wagmi";
import { getCompletedTrades, updateUserWallet } from "../api/user";
import Trade from "../components/Trade";
import { useEffect, useState } from "react";

const CompletedTrades = () => {
  const [completedTrades, setCompletedTrades] = useState();

  const { username } = useParams();
  const { address } = useAccount();

  useEffect(() => {
    if (!address || !username) return;
    updateUserWallet(username, address);
  }, [address]);

  useEffect(() => {
    if (!username) return;

    const gettingCompletedTrades = async () => {
      const completedTrades = await getCompletedTrades(username);
      setCompletedTrades(completedTrades.reverse());
    };

    gettingCompletedTrades();
  }, []);

  return (
    <div className="trades">
      {completedTrades ? (
        completedTrades.length ? (
          <>
            <h1 className="page-heading">From the Past</h1>
            {completedTrades.map((trade, index) => (
              <Trade key={index} trade={trade} pastTrade={true} />
            ))}
          </>
        ) : (
          <h1 className="page-heading">No Completed Trades</h1>
        )
      ) : (
        <h2 className="page-heading">Fetching ...</h2>
      )}
    </div>
  );
};

export default CompletedTrades;
