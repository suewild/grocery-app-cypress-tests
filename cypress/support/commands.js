// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("displayItemsFromLocalStorage", () => {
  cy.window().then((win) => {
    const items = JSON.parse(win.localStorage.getItem("list"));
    if (items && Array.isArray(items)) {
      items.forEach((itemData) => {
        win.createListItem(itemData.id, itemData.value);
      });
    }
    win.displayGroceryContainer();
  });
});

Cypress.Commands.add("setItemsInLocalStorage", (items) => {
  return cy.window().then((win) => {
    localStorage.setItem("list", JSON.stringify(items));
  });
});

Cypress.Commands.add("addItemsToLocalStorage", (items, number) => {
  return cy.window().then((win) => {
    const firstTwoItems = items.slice(0, number);
    win.localStorage.setItem("list", JSON.stringify(firstTwoItems));
  });
});
