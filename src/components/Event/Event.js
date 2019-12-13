import React, { useState, Fragment } from "react";
import { gql } from "apollo-boost";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useMutation } from "@apollo/react-hooks";
import "./Event.css";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import Modal from "../Modal/Modal";

const Event = props => {
  const [isBooking, setIsBooking] = useState(false);
  const [onDetails, setOnDetails] = useState(false);

  let bookEventQuery = gql`
    mutation bookEvent($eventId: ID!) {
      bookEvent(eventId: $eventId) {
        event {
          title
        }
      }
    }
  `;

  const [
    bookEvent,
    { loading: mutationLoading, error: mutationError, data: mutationData }
  ] = useMutation(bookEventQuery);
  const bookThisEvent = e => {
    setIsBooking(false);
    setOnDetails(false);
    bookEvent({ variables: { eventId: props.eventId } }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="event">
      {mutationLoading && <p className="bookingLoading">Wird gebucht..</p>}
      {mutationData && <p className="bookingSuccess">Erfolgreich gebucht.</p>}
      {mutationError && <ErrorMessage message={mutationError.message} />}
      <h1 className="title">{props.title}</h1>
      <p className="date">
        {new Date(props.date).toLocaleDateString()}{" "}
        {new Date(props.date).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })}
      </p>
      {/* <p className="price">{props.price}$</p> */}
      {/* <p className="description">{props.description}</p> */}
      {/* Nur anzeigen, wenn userId von Creator im token ist <button>Bearbeiten </button> */}
      <button
        onClick={() => {
          setOnDetails(true);
        }}
        data-hover={props.price + "$"}
        className="btn btn-light detailsButton"
      >
        <span>Details</span>
      </button>
      <button
        onClick={() => {
          setIsBooking(true);
        }}
        data-hover={props.price + "$"}
        className="btn bookButton"
      >
        <span>Buchen</span>
      </button>
      {isBooking && (
        <ConfirmationPopup
          buttonColor="green"
          confirm={e => {
            bookThisEvent(e);
          }}
          cancel={() => {
            setIsBooking(false);
          }}
          question={`Wollen Sie "${props.title}" wirklich buchen?`}
        />
      )}
      {onDetails && (
        <Modal
          cssposition="fixed"
          title="Details"
          btn1="Buchen"
          btn2="Zurück"
          btn2Class="btn btn-green"
          submit={() => {
            bookThisEvent();
          }}
          cancel={() => {
            setOnDetails(false);
          }}
        >
          <div className="details">
            <h1 className="details_title">{props.title}</h1>
            <div className="details_description">{props.description}</div>
            <div className="details_location">
              <i class="fas fa-map-marker-alt fa-lg"></i> Hamburg, Angelburger
              Straße 17
            </div>
            <div className="details_date">
              <i class="far fa-clock fa-lg"></i>
              {"  "}
              {new Date(props.date).toLocaleDateString()}{" "}
              {new Date(props.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </div>
            <div className="details_price">{props.price}$</div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Event;
