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

  it("Page shows a list of all people with delete buttons", () => {
    cy.visit("/");
    cy.get("tr").should("have.length", 4);
    cy.get("button:contains(Delete)").should("have.length", 4);
  });

  it("Page shows an add person form", () => {
    cy.get("input[placeholder='Name (Required)']").should("exist");
    cy.get("textarea[placeholder='Description']").should("exist");
    cy.get('button').contains('Add new person').should("exist");
  });

  it("I can delete a person by clicking on the delete button", () => {
    cy.get('button').contains('Delete').click();
    cy.get("tr").should("have.length", 3);
  });

  it("I try to add a person without populating the name, an error should show", () => {
    cy.get('button').contains('Add new person').click();
    cy.get("div").contains("Name cannot be empty").should("be.visible");
  });

  it("I can add a person with name populated, fields should be cleared after submit", () => {
    cy.get("input[placeholder='Name (Required)']").type("Jane Doe");
    cy.get("textarea[placeholder='Description']").type("I love spider!");
    cy.get('button').contains('Add new person').click();

    cy.get("input[placeholder='Name (Required)']").should('have.value', '');
    cy.get("textarea[placeholder='Description']").should('have.value', '');
    cy.contains('Jane Doe').should('be.visible');
  });

  it("I can visit person details page", () => {
    cy.contains('Jane Doe').click();
    cy.url().should('include', '/person/')
    cy.contains('I love spider!').should('be.visible');
    cy.contains('Poor Jane Doe doesn\'t have any pet').should('be.visible');
  });
});
