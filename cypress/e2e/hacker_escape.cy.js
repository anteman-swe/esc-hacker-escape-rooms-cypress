// Eftersom baseUrl är satt i konfigurationen, så vi kan bara köra cy.visit('/')

describe("Hacker Escape Rooms - UI Tester", () => {

  it("Kontrollerar att startsidan är uppe och har rätt h1-rubrik", () => {
    // Besök startsidan (localhost eller den URL som skickats med som argument)
    cy.visit("/");

    cy.get("h1")
      .should("be.visible")
      .and("contain.text", "Hacker Escape Rooms");
  });

  it('Navigerar från startsidan till sidan "The Story"', () => {
    cy.visit("/");

    cy.contains("The Story").click();

      cy.url().should("include", "/storypage");
      
    cy.get("h1").should("be.visible").and("contain.text", "Story Page");
  });

  it("Filtrerar challenges och letar efter ett specifikt element", () => {
    cy.visit("/challenges.html");

    cy.get(".cards-grid").should("be.visible");

    // Kontrollerar att en specifik challenge finns i listan
    cy.contains(".card", "Linux demystified").should("exist");
  });

  it("Testar sökning på datum i bokning (både giltigt och ogiltigt resultat)", () => {
    cy.visit("/challenges.html");

    cy.contains("Book this room").click();

    cy.get(".booking-modal").should("be.visible");

    const dateInput = 'input[type="date"]';

    // Provar att söka bokningsbara tider i det förflutna, ska inte finnas några tillgängliga
    cy.get(dateInput).type("2020-01-01");

    cy.contains(".card__button", "Search available times").click();

    cy.get(".booking-status")
      .should("be.visible")
      .and("contain.text", "Could not load available times.");

    // Kontrollera att man får tillgängliga tider på ett givet datum i framtiden
    cy.get(dateInput).clear().type("2026-08-17");
    cy.contains(".card__button", "Search available times").click();
    cy.get("#booking-time", { timeout: 1000 })
      .find("option")
      .should("have.length.at.least", 1);
  });
});
