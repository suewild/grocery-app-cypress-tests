import { GroceryListPage } from "./groceryList.page";

describe("grocery list with PO", () => {
  const GROCERY_LIST = ["butter", "bread", "sausages", "bagels"];
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
    GroceryListPage.getInput().should("be.visible");
    GroceryListPage.addItem(GROCERY_LIST[0]);
    GroceryListPage.addItem(GROCERY_LIST[1]);
    GroceryListPage.getListItems().should("have.length", 2);
  });

  it("can add an item", () => {
    cy.log("*** adds an item ***");
    GroceryListPage.addItem(GROCERY_LIST[2]);
    cy.log("*** checks for 3 items in the list ***");
    GroceryListPage.getListItems().should("have.length", 3);
    cy.log(`*** checks last item is ${GROCERY_LIST[2]} ***`);
    GroceryListPage.getLastItemInTheList().should("have.text", GROCERY_LIST[2]);
    cy.log("*** checks alert displays with correct message and class ***");
    GroceryListPage.getAlert("item added to the list").should(
      "have.class",
      "alert-success"
    );
  });

  it("can delete an item", () => {
    cy.log("*** find and delete item ***");
    GroceryListPage.clickDeleteBtn(GROCERY_LIST[1]);
    cy.log("*** check alert displays correct message and class ***");
    GroceryListPage.getAlert("item removed").should(
      "have.class",
      "alert-danger"
    );
  });

  it("cannot add an empty item", () => {
    cy.log("*** add an empty string to the input ***");
    GroceryListPage.addItem("");
    cy.log("*** check alert displays expected message and class ***");
    GroceryListPage.getAlert("please enter value").should(
      "have.class",
      "alert-danger"
    );
    cy.log("*** check number of items is still 2 ***");
    GroceryListPage.getListItems().should("have.length", 2);
  });

  it("can clear items", () => {
    cy.log("*** clear items ***");
    GroceryListPage.clearItems();
    cy.log("*** check alert message and class are correct ***");
    GroceryListPage.getAlert("empty list").should("have.class", "alert-danger");
    cy.log("*** check list is empty ***");
    GroceryListPage.getListItems().should("have.length", 0);
  });

  it("can update an item", () => {
    cy.log("*** find item and click on edit icon ***");
    GroceryListPage.clickEditButton(GROCERY_LIST[1]);
    cy.log(`*** confirm input contains ${GROCERY_LIST[1]} ***`);
    GroceryListPage.getInput().should("have.value", GROCERY_LIST[1]);
    cy.log("*** update item in input ***");
    GroceryListPage.clearTextFromInput();
    GroceryListPage.addTextToInput(GROCERY_LIST[3]);
    cy.log("*** confirm submit is renamed to edit ***");
    GroceryListPage.getSubmitBtn().should("have.text", "edit").as("editBtn");
    cy.log("*** click on edit ***");
    cy.get("@editBtn").click();
    cy.log("*** confirm updated item displays");
    GroceryListPage.getListItems().should("contain", GROCERY_LIST[3]);

    cy.log("*** confirm original item does not ***");
    GroceryListPage.getList().should("not.contain", GROCERY_LIST[1]);

    cy.log("*** check number of items is still 2 ***");
    GroceryListPage.getListItems().should("have.length", 2);

    cy.log("*** check alert displays expected message and class ***");
    GroceryListPage.getAlert("value changed").should(
      "have.class",
      "alert-success"
    );
  });
});
