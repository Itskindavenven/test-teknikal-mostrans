import { gql } from '@apollo/client';

export const GET_CHARACTER = gql`
  query($id: ID!) {
    character(id: $id) {
      id
      name
      status
      image
      location {
        name
      }
    }
  }
`;