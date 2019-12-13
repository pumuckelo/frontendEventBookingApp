import React, { useState } from "react";
import "./Booking.css";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import LoadingCircle from "../LoadingCircle/LoadingCircle";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
const Booking = props => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [wasCancelled, setWasCancelled] = useState(false);
  const cancelBookingMutationString = gql`
    mutation cancelBooking($bookingId: ID!) {
      cancelBooking(bookingId: $bookingId) {
        title
      }
    }
  `;

  const [
    cancelBookingGQL,
    { loading: cancelLoading, error: cancelError, data: cancelData }
  ] = useMutation(cancelBookingMutationString);

  const cancelBooking = () => {
    cancelBookingGQL({ variables: { bookingId: props.bookingId } }).catch(err =>
      console.log(err)
    );
    console.log(`BOOKING ID: ${props.bookingId}`);
    setIsCancelling(false);
  };

  if (cancelLoading) {
    return <LoadingCircle />;
  }
  if (cancelError) {
    console.log(`ERROR BEIM STORNIEREN: ${cancelError.message}`);
  }
  if (wasCancelled) {
    return "";
  }
  if (cancelData) {
    setTimeout(() => {
      setWasCancelled(true);
    }, 3000);
    return <SuccessMessage message="Erfolgreich storniert." />;
  }

  return (
    <div className="booking">
      <h1 className="event-title">{props.title}</h1>
      <p className="event-description">{props.description}</p>
      <p className="event-date">
        {new Date(props.eventdate).toLocaleDateString()}
      </p>

      <p className="booking-date">
        Gebucht am {new Date(+props.bookingdate).toLocaleDateString()}
      </p>
      <button
        onClick={() => setIsCancelling(true)}
        className="btn storno-button"
      >
        Stornieren
      </button>
      {isCancelling && (
        <ConfirmationPopup
          question={`Sind Sie sicher, dass Sie "${props.title}" stornieren möchten?`}
          buttonColor="red"
          cancel={() => setIsCancelling(false)}
          confirm={cancelBooking}
        />
      )}
    </div>
  );
};

export default Booking;
