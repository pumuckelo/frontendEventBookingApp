import React, { Fragment } from "react";

import "./Modal.css";

const Modal = props => {
  return (
    <Fragment>
      <div className="backdrop"></div>
      <div className={`modal ${props.cssposition}`}>
        <header className="modal_header">
          <h1>{props.title}</h1>
        </header>
        <section className="modal_content">{props.children}</section>
        <section className="modal_actions">
          {props.btn3 && <button>{props.btn3}</button>}
          {props.btn2 && (
            <button
              onClick={props.cancel}
              className="btn btn-light mg-bottom-0"
            >
              {props.btn2}
            </button>
          )}
          {props.btn1 && (
            <button
              onClick={props.submit}
              className={`${props.btn2Class} btn mg-bottom-0`}
            >
              {props.btn1}
            </button>
          )}
        </section>
      </div>
    </Fragment>
  );
};

export default Modal;
