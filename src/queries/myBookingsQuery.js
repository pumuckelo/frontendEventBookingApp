import { gql } from "apollo-boost";

export default gql`
  {
    myBookings {
      event {
        title
        description
        date
        _id
      }
      createdAt
      _id
    }
  }
`;
