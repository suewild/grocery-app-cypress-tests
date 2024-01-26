// cypress/e2e/groceryList.page.js

export const GroceryListPage = {
  getClearItemsBtn() {
    return cy.get("[data-testid=clear-btn]");
  },
  getAlert(message) {
    return cy.contains(message);
  },
  getInput() {
    return cy.get("[data-testid=grocery-input]");
  },
  getItem(item) {
    return cy.contains(item);
  },
  getList() {
    return cy.get(".grocery-list");
  },
  getListItems() {
    return cy.get(".grocery-list .grocery-item");
  },
  getLastItemInTheList() {
    return cy.get(".grocery-item .title").last();
  },
  getSubmitBtn() {
    return cy.get("[data-testid=submit-btn]");
  },
  getTitlesOfListItems() {
    return GroceryListPage.getListItems().find(".title");
  },
  addItem(item) {
    GroceryListPage.getInput().type(`${item}{enter}`);
  },
  addTextToInput(item) {
    GroceryListPage.getInput().type(item);
  },
  clearItems() {
    GroceryListPage.getClearItemsBtn().click();
  },
  clearTextFromInput() {
    GroceryListPage.getInput().clear();
  },
  clickDeleteBtn(item) {
    GroceryListPage.getItem(item).parent().find(".delete-btn").click();
  },
  clickEditButton(item) {
    GroceryListPage.getItem(item).parent().find(".edit-btn").click();
  },
};
