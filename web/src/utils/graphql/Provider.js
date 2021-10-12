import { createContext } from "react";
import { GraphQLClient } from "graphql-request";

export const ClientContext = createContext();

const Provider = ({ children, endpoint }) => {
  const client = new GraphQLClient(endpoint);

  return (
    <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
  );
};

export default Provider;
