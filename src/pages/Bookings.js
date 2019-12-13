import React, { Fragment, useState, useEffect } from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import Booking from "../components/Booking/Booking";
import "./Bookings.css";
import LoadingCircle from "../components/LoadingCircle/LoadingCircle";
import allBookingsQuery from "../queries/allBookingsQuery";
const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [errorState, setError] = useState({ hasError: false, message: "" });

  const { loading, error, data } = useQuery(allBookingsQuery);

  if (loading) {
    return <LoadingCircle />;
  }
  if (error) {
    // setError({ hasError: true, message: error.message });
    console.log(error.message);
    return `Error!: ${error.message}`;
  }

  //

  const bookingComponents = data.bookings.map(
    ({ createdAt, _id, event }, index) => {
      return (
        <Booking
          key={createdAt + index}
          bookingId={_id}
          title={event.title}
          description={event.description}
          eventdate={+event.date}
          bookingdate={+createdAt}
        />
      );
    }
  );
  console.log(bookingComponents);

  return (
    <div className="bookings-all">
      <h1>Alle Buchungen</h1>
      {bookingComponents}
    </div>
  );
};

export default BookingPage;
