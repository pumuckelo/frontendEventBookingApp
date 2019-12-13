import { gql } from "apollo-boost";
export default gql`
  {
    bookings {
      event {
        title
        description
        date
      }
      createdAt
      _id
    }
  }
`;
