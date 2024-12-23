import React from "react";
import "../styles/NotFound.css";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1 className="page-heading">404 - Not Found</h1>
      <p className="not-found__message">Oops! The page you're looking for doesn't exist.</p>
      <p className="not-found__subtext">Maybe you mistyped the URL</p>
    </div>
  );
};

export default NotFoundPage;
