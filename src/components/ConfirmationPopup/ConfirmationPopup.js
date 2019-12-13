import React, { Fragment } from "react";

import "./ConfirmationPopup.css";

const ConfirmationPopup = props => {
  return (
    <Fragment>
      <div className="backdrop"></div>
      <div className="popup">
        <p className="question">{props.question}</p>
        <button className="btn btn-light" onClick={props.cancel}>
          Abbrechen
        </button>
        {props.buttonColor == "green" && (
          <button className="btn btn-green" onClick={props.confirm}>
            Bestätigen
          </button>
        )}
        {props.buttonColor == "red" && (
          <button className="btn btn-red" onClick={props.confirm}>
            Bestätigen
          </button>
        )}
      </div>
    </Fragment>
  );
};

export default ConfirmationPopup;
