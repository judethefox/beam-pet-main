describe("People", () => {
  before(() => {
    cy.resetDatabase();

    const SEED = /* GraphQL */ `
      mutation Seed($input: SeedInput!) {
        seed(input: $input) {
          id
          name
        }
      }
    `;

    const input = {
      hasPeople: 4,
    };

    cy.seed(SEED, input);
  });

  it("shows me a list of all people", () => {
    cy.visit("/");
    cy.get("li").should("have.length", 4);
  });
});
