import { useContext } from "react";
import { useQuery } from "react-query";
import { ClientContext } from "./Provider";

/**
 * @param {any[]} query
 * @param {Object} variables
 * @returns {Promise}
 */
export default function useGraphQLQuery(query, options) {
  const client = useContext(ClientContext);

  async function fetcher() {
    return await client.request(...query);
  }

  return useQuery({
    ...options,
    queryKey: query,
    queryFn: fetcher
  });
}
