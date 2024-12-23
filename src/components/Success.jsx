import { Link } from "react-router-dom";
import greenTick from "../assets/images/green-tick.svg";

const Success = ({ username, chatId }) => {
  return (
    <>
      <img style={{ width: "100px" }} src={greenTick} alt="" />
      <h1 className="page-heading">Success</h1>
      <Link to={`/${username}/${chatId}/trades/completed`}>
        <button className="btn btn--primary">Check Completed Trades</button>
      </Link>
    </>
  );
};

export default Success;
