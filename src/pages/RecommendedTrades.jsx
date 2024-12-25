import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAccount, useChainId } from "wagmi";
import { getRecommendedTrades, updateUserCompletedTrades, updateUserWallet } from "../api/user";
import Trade from "../components/Trade";
import "../styles/Trade.css";
import { addTradeDetails } from "../utils/addTradeDetails";
import truncateStr from "../utils/truncateStr";
import { estimateGas, getAccount, signTypedData, sendTransaction } from "wagmi/actions";
import { wagmiConfig as config } from "../config/wagmiConfig";
import Success from "../components/Success";

const RecommededTrades = () => {
  const [recommendationExpired, setRecommendationExpired] = useState(false);
  const [recommendedTrades, setRecommendedTrades] = useState();
  const [success, setSuccess] = useState(false);

  const { username, chatId } = useParams();
  const { address, chainId } = useAccount();
  const appChainId = useChainId();

  useEffect(() => {
    if (!address || !username) return;
    updateUserWallet(username, chatId, address);
  }, [address]);

  useEffect(() => {
    if (!username || !address) return;

    const gettingRecommededTrades = async () => {
      let trades = await getRecommendedTrades(username);

      if (!trades.length || trades[0].from !== address) {
        return setRecommendedTrades([]);
      }

      if (recommendedTradesExpired(trades)) {
        setRecommendedTrades([]);
        return setRecommendationExpired(true);
      }

      trades = await addTradeDetails(trades, address, chainId);
      setRecommendedTrades(trades);
    };

    gettingRecommededTrades();
  }, [address]);

  const execute = async () => {
    if (chainId !== appChainId) return;

    try {
      for (let trade of recommendedTrades) {
        const { amountSell, sellToken, transaction, issues } = trade;

        if (issues?.allowance) {
          const { spender, actual } = issues.allowance;
          await sellToken.approve(spender, amountSell);
        }

        const estimatedGas = await estimateGas(config, {
          address,
          to: transaction.to,
          data: transaction.data,
          value: transaction.value,
        });

        const txHash = await sendTransaction(config, {
          address,
          to: transaction.to,
          data: transaction.data,
          value: transaction.value,
        });

        setRecommendedTrades((prevTrades) => {
          return prevTrades.filter((rTrade) => rTrade.id !== trade.id);
        });

        updateUserCompletedTrades(username, chatId, { ...trade, txHash });
      }

      setSuccess(true);
    } catch (error) {
      console.log("Execution Failed", error.message);
    }
  };

  const recommendedTradesExpired = (trades) => {
    const RECOMMENDED_TRADES_EXPIRY_THRESHOLD = 30 * 60; // 30 minutes ... Needs to change
    const currentTimestampInSeconds = Date.now() / 1000;

    if (currentTimestampInSeconds > trades[0].timestamp + RECOMMENDED_TRADES_EXPIRY_THRESHOLD) {
      return true;
    }
  };

  return address ? (
    !success ? (
      <div className="trades">
        {!recommendationExpired ? (
          recommendedTrades ? (
            recommendedTrades.length ? (
              <>
                <h1 className="page-heading">Recommendation</h1>
                {recommendedTrades.map((trade, index) => (
                  <Trade key={index} trade={trade} />
                ))}
                <button onClick={execute} className="btn btn--primary btn--execute">
                  Execute
                </button>
              </>
            ) : (
              <>
                <h1 className="page-heading">No Recommended Trades</h1>
                <h5 style={{ textAlign: "center" }}>for {truncateStr(address, 11)}</h5>
                <p style={{ marginTop: "20px" }} className="text-center">
                  <span className="bold">Please Continue Chatting!!</span>
                </p>
              </>
            )
          ) : (
            <h2 className="page-heading">Prepping ...</h2>
          )
        ) : (
          <>
            <h1 className="page-heading">Recommendation Expired</h1>
            <p className="text-center">
              Time to chat & <br /> <span className="bold"></span>
            </p>
          </>
        )}
      </div>
    ) : (
      <Success username={username} chatId={chatId} />
    )
  ) : (
    <>
      <h1 className="page-heading">Please re-connect</h1>
      <p>
        <span className="bold"> Ahhhh!! </span> Not Again
      </p>
    </>
  );
};

export default RecommededTrades;
