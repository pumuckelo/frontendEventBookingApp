import React from "react";
import "./SuccessMessage.css";

const SuccessMessage = props => {
  return <div className="successMessage">{props.message}</div>;
};

export default SuccessMessage;
