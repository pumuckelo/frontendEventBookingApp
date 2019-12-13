import "./LoadingCircle.css";
import React from "react";

const LoadingCircle = () => {
  return (
    <div className="flex-row-100">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingCircle;
