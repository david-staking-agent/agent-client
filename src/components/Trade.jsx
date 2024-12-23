import React from "react";
import { displayAmount, formatUnits } from "../utils/formatUnits";
import ybtData from "../marketData/ybtData.json";
import { useChainId } from "wagmi";
import { chainConfig } from "../config/chainConfig";

const Trade = ({ trade, pastTrade }) => {
  const chainId = useChainId();
  const ybtIcon = ybtData[trade.buyToken.address]?.icon;
  const blockExplorerUrl = chainConfig[chainId].blockExplorers.default.url;

  return (
    <div className={`trade ${pastTrade && "trade--past"}`}>
      <div className="trade__tag tag--sell bold">
        {!pastTrade && "From: "}
        {displayAmount(trade.amountSell, trade.sellToken.decimals)} {trade.sellToken.symbol}{" "}
        {`($${trade.amountInUsd})`}
      </div>

      {ybtIcon && <img className="trade__icon" src={ybtIcon} alt="" />}

      <h4 className="trade__apy">
        {displayAmount(trade.amountBuy, trade.buyToken.decimals)} {trade.buyToken.symbol}
      </h4>

      <div>
        {trade.atApy && (
          <>
            <span className="bold trade__apy">APY:</span> {trade.atApy}
          </>
        )}
      </div>
      {trade.txHash && (
        <a className="trade__link" target="_blank" href={`${blockExplorerUrl}tx/${trade.txHash}`}>
          View
        </a>
      )}
    </div>
  );
};

export default Trade;
