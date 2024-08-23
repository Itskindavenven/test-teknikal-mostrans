import { gql } from '@apollo/client';

export const ASSIGN_LOCATION = gql`
  mutation AssignLocation($characterId: ID!, $locationName: String!) {
    assignLocation(characterId: $characterId, locationName: $locationName) {
      id
      name
      location {
        name
      }
    }
  }
`;
