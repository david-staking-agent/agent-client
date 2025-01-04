import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import ConnectWalletBtn from "./ConnectWalletBtn";

const Navbar = ({ setSwitchingNetwork }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <nav className="navbar">
      <Link to="/pools">
        <div className="logo">
          <img className="logo__img" src={"/logo/0xdavid.png"} alt="" />
          <span className="bold">0xDavid</span>
        </div>
      </Link>

      <ConnectWalletBtn />
    </nav>
  );
};

export default Navbar;
