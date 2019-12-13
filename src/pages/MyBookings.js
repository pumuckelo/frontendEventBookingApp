import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Booking from "../components/Booking/Booking";
import LoadingCircle from "../components/LoadingCircle/LoadingCircle";
import myBookingsQuery from "../queries/myBookingsQuery";
const MyBookings = () => {
  let { loading, error, data } = useQuery(myBookingsQuery);

  if (loading) {
    return <LoadingCircle />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const userBookings = data.myBookings.map(({ event, createdAt, _id }) => {
    return (
      <Booking
        key={_id}
        title={event.title}
        description={event.description}
        eventdate={+event.date}
        bookingdate={+createdAt}
        bookingId={_id}
      />
    );
  });
  return (
    <div className="flex-row-100">
      <h1>My Bookings</h1>
      {userBookings}
    </div>
  );
};

export default MyBookings;
