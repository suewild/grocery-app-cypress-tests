/// <reference types='cypress' />

describe("grocery list", () => {
  const GROCERY_LIST = ["butter", "bread", "sausages", "bagels"];

  beforeEach(() => {
    cy.log("*** visit ***");
    cy.visit("http://localhost:8080/");

    cy.log("*** adds two items ***");
    cy.get("[data-testid=grocery-input]").type(`${GROCERY_LIST[0]}{enter}`);
    cy.get("[data-testid=grocery-input]").type(`${GROCERY_LIST[1]}{enter}`);

    cy.log("*** checks they display ***");
    cy.get(".grocery-list .grocery-item").should("have.length", 2);
  });

  it("can add new grocery list item", () => {
    cy.log("*** adds an item ***");
    cy.get("[data-testid=grocery-input]").type(`${GROCERY_LIST[2]}{enter}`);

    cy.get(".grocery-list").within(() => {
      cy.log("*** checks for 3 items in the list ***");
      cy.get(".grocery-item").should("have.length", 3);

      cy.log(`*** checks text of last item is ${GROCERY_LIST[2]} ****`);
      cy.get(".grocery-item .title")
        .last()
        .should("have.text", GROCERY_LIST[2]);
    });

    cy.log("*** checks alert displays with correct message and class ***");
    cy.contains("item added to the list").should("have.class", "alert-success");
  });

  it("can delete an item", () => {
    cy.log("*** find and delete item ***");
    cy.contains(GROCERY_LIST[1]).parent().find(".delete-btn").click();

    cy.log("*** check alert displays correct message and class ***");
    cy.contains("item removed").should("have.class", "alert-danger");
  });

  it("can update an item", () => {
    cy.log("*** find item and click on edit icon ***");
    cy.contains(GROCERY_LIST[1]).parent().find(".edit-btn").click();

    cy.log("*** update item in input ***");
    cy.get("[data-testid=grocery-input]")
      .should("have.value", GROCERY_LIST[1])
      .clear()
      .type(GROCERY_LIST[3]);

    cy.log("*** confirm submit is renamed to edit ***");
    cy.get("[data-testid=submit-btn]")
      .should("have.text", "edit")
      .as("editBtn");

    cy.log("*** click on edit ***");
    cy.get("@editBtn").click();

    cy.log("*** confirm updated item displays");
    cy.get(".grocery-list .grocery-item").should("contain", GROCERY_LIST[3]);

    cy.log("*** confirm original item does not ***");
    cy.get(".grocery-list").should("not.contain", GROCERY_LIST[1]);

    cy.log("*** check number of items is still 2 ***");
    cy.get(".grocery-list .grocery-item").should("have.length", 2);

    cy.log("*** check alert displays expected message and class ***");
    cy.contains("value changed").should("have.class", "alert-success");
  });

  it("cannot add an empty item", () => {
    const emptyItem = "";
    cy.log("*** add an empty string to the input ***");
    cy.get("[data-testid=grocery-input]").type(`${emptyItem}{enter}`);

    cy.log("*** check alert displays expected message and class ***");
    cy.contains("please enter value").should("have.class", "alert-success");

    cy.log("*** check number of items is still 2 ***");
    cy.get(".grocery-list .grocery-item").should("have.length", 2);
  });

  it("can clear items", () => {
    cy.log("*** clear items ***");
    cy.get("[data-testid=clear-btn]").click();

    cy.log("*** check alert message and class are correct ***");
    cy.contains("empty list").should("have.class", "alert-danger");

    cy.log("*** check list is empty ***");
    cy.get(".grocery-list .grocery-item").should("have.length", 0);
  });
});
