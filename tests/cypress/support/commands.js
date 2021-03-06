Cypress.Commands.add("resetDatabase", () => {
  return cy.request({
    url: `${Cypress.env("API_HOST")}/reset`,
    method: "POST",
  });
});

Cypress.Commands.add("seed", (query, input) => {
  const mutation = {
    query,
    variables: { input },
  };

  return cy
    .request({
      url: `${Cypress.env("API_HOST")}/graphql`,
      method: "POST",
      body: mutation,
    })
    .then((response) => {
      const errors = response.body.errors ?? [];
      const organisation = response?.body?.data?.seedOrganisation ?? {};
      return { organisation, errors };
    });
});
