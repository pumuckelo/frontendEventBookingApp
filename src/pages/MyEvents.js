import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Event from "../components/Event/Event";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import LoadingCircle from "../components/LoadingCircle/LoadingCircle";

const MyEvents = props => {
  //Defining the query string thats used in the function below
  let myEventsQuery = gql`
    {
      myEvents {
        title
        description
        date
      }
    }
  `;

  //Object destructuring the returned object froom useQuery
  let { loading, error, data } = useQuery(myEventsQuery);

  // While the request is still in progress "Loading.." will be displayed
  if (loading) {
    return <LoadingCircle />;
  }
  // If theres an error in the request to the api, the Error
  //Component will be rendered
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  //Create Array of Event components that will be rendered below
  let myEvents = data.myEvents.map(event => {
    return (
      <Event
        title={event.title}
        date={+event.date}
        description={event.description}
        price={event.price}
      />
    );
  });

  return (
    <div className="flex-row-100">
      <h1>My Events</h1>
      {myEvents}
    </div>
  );
};

export default MyEvents;
