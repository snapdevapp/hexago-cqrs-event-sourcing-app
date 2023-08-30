import gql from 'graphql-tag';

export const sendClientEventMutation = gql`
  mutation sendClientEvent($clientId: String!, $eventName: String!) {
    sendClientEvent(clientId: $clientId, eventName: $eventName) {
      clientId
      eventName
    }
  }
`;

export const sendClientEventMutationWithResource = gql`
  mutation sendClientEvent($clientId: String!, $eventName: String!, $resourceId: String) {
    sendClientEvent(clientId: $clientId, eventName: $eventName, resourceId: $resourceId) {
      clientId
      eventName
      resourceId
    }
  }
`;
