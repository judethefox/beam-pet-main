import { useContext } from "react";
import { useMutation } from "react-query";
import { ClientContext } from "./Provider";

/**
 * @param {any[]} mutation
 * @param {Object} variables
 * @returns {Promise}
 */
export default function useGraphQLMutation(mutation, options) {
  const client = useContext(ClientContext);

  async function mutator(variables) {
    return await client.request(mutation, variables);
  }

  return useMutation({
    ...options,
    mutationKey: mutation,
    mutationFn: mutator
  });
}
