import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = props => {
  return (
    <div className="errormessage">
      <p>{props.message}</p>
    </div>
  );
};

export default ErrorMessage;
