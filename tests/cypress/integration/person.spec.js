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
      hasPeople: 1,
    };

    cy.seed(SEED, input);
  });

  it("Page shows person name and desc", () => {
    cy.visit("/person/1");
    cy.get("h1").contains('Meet ').should("be.visible");
    cy.get("p").should("be.visible");
  });

  it("Page shows an add pet form", () => {
    cy.get("input[placeholder='Name (Required)']").should("exist");
    cy.get("input[placeholder='Age (Required)']").should("exist");
    cy.get("input[placeholder='Species (Required)']").should("exist");
    cy.get('button').contains('Add new pet').should("exist");
  });

  it("I try to add a pet without populating mandatory fields, validation errors should show", () => {
    cy.get('button').contains('Add new pet').click();
    cy.get("div").contains("Name cannot be empty").should("be.visible");
    cy.get("div").contains("Species cannot be empty").should("be.visible");
    cy.get("div").contains("Please enter positive integer or 0 as age").should("be.visible");
  });

  it("I can add a pet with mandatory fields populated, fields should be cleared after submit", () => {
    cy.get("input[placeholder='Name (Required)']").type("Treehugger");
    cy.get("input[placeholder='Age (Required)']").type("10");
    cy.get("input[placeholder='Species (Required)']").type("monkey");
    cy.get('button').contains('Add new pet').click();

    cy.get("input[placeholder='Name (Required)']").should('have.value', '');
    cy.get("input[placeholder='Age (Required)']").should('have.value', '');
    cy.get("input[placeholder='Species (Required)']").should('have.value', '');

    cy.contains('Treehugger').should('be.visible');
    cy.contains('10').should('be.visible');
    cy.contains('monkey').should('be.visible');

    cy.get("button:contains(Delete)").should("be.visible");
  });

  it("I can delete a pet", () => {
    cy.get("button:contains(Delete)").click();
    cy.contains("doesn't have any pet").should('be.visible');
    cy.get('tr').should('not.exist');
  });

  it("I can go back to the people list page", () => {
    cy.get("a:contains(Back to the people list)").click();
    cy.url().should('eq', 'http://localhost:3000/')
    cy.contains('Welcome to Beam Pets!').should('be.visible')
  });
});
