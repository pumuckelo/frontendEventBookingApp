import React, { Component } from "react";
import Modal from "../components/Modal/Modal";
import "./Events.css";
import AuthContext from "../context/auth-context";
import Event from "../components/Event/Event";

class EventPage extends Component {
  state = {
    isCreating: false,
    events: []
  };

  constructor(props) {
    super(props);
    this.titleElemet = React.createRef();
    this.descriptionElement = React.createRef();
    this.priceElement = React.createRef();
    this.dateElement = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount() {
    this.getAllEvents();
  }

  startCreateEventHandler = () => {
    this.setState({ isCreating: true });
  };
  stopCreateEventHandler = () => {
    this.setState({ isCreating: false });
  };

  //Method to Create the Event that was entered in the modal
  modalSubmitHandler = () => {
    this.setState({ isCreating: false });
    const title = this.titleElemet.current.value;
    const description = this.descriptionElement.current.value;
    const price = +this.priceElement.current.value;
    const date = this.dateElement.current.value;
    let body = {
      query: `
        mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!){
          createEvent(eventInput:{title:$title, description:$description, price:$price, date:$date}){
            title
            description

          }
        
        }
      `,
      variables: {
        title,
        description,
        price,
        date
      }
    };
    fetch("http://localhost:8000/graphql", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token
      },
      body: JSON.stringify(body)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.getAllEvents();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Method to get all Events from the API
  getAllEvents = () => {
    let query = {
      query: `
      query {
        events {
          title
          description
          price
          date
          _id
        }
      }
      `
    };
    fetch("http://localhost:8000/graphql", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(query)
    })
      .then(res => res.json())
      .then(data => {
        let events = data.data.events;
        console.log(events);
        // console.log(events);
        this.setState({
          events: events
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let events = this.state.events.map((event, index) => {
      return (
        <Event
          key={event._id}
          title={event.title}
          date={event.date}
          price={event.price}
          description={event.description}
          // creator={event.creator._id}
          eventId={event._id}
        ></Event>
      );
    });

    return (
      <div className="events-all">
        <h1>Events</h1>
        {this.context.token && (
          <button className="btn" onClick={this.startCreateEventHandler}>
            Create Event
          </button>
        )}
        {this.state.isCreating && (
          <Modal
            title="Create a new event"
            btn1="Save"
            btn2="Cancel"
            submit={this.modalSubmitHandler}
            cancel={this.stopCreateEventHandler}
          >
            <form action="">
              <div className="form-control">
                <label htmlFor="title">Titel</label>
                <input type="text" id="title" ref={this.titleElemet} />
              </div>
              <div className="form-control">
                <label htmlFor="description">Beschreibung</label>
                <textarea
                  name=""
                  id="description"
                  cols="30"
                  rows="10"
                  ref={this.descriptionElement}
                ></textarea>
              </div>
              <div className="form-control">
                <label htmlFor="price">Preis</label>
                <input
                  type="number"
                  name=""
                  id="price"
                  ref={this.priceElement}
                />
              </div>
              <div className="form-control">
                <label htmlFor="date">Datum / Uhrzeit</label>
                <input
                  type="datetime-local"
                  name=""
                  id="date"
                  ref={this.dateElement}
                />
              </div>
            </form>
          </Modal>
        )}
        {events}
      </div>
    );
  }
}

export default EventPage;
