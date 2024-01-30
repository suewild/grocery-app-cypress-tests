import { GroceryListPage } from "./groceryList.page";

const GROCERIES = [
  {
    id: 1,
    value: "coffee",
  },
  {
    id: 2,
    value: "croissant",
  },
  {
    id: 3,
    value: "orange juice",
  },
];

describe("sets state before tests", () => {
  beforeEach(() => {
    cy.log("*** open url ***");
    cy.visit("http://localhost:8080/");
    cy.log("*** set grocery items in local storage ***");
    cy.addItemsToLocalStorage(GROCERIES, 2);
    cy.log(
      "*** display items using createListItem() and displayGroceryContainer"
    );
    cy.displayItemsFromLocalStorage();
    cy.log("*** check number of items in the list ***");
    GroceryListPage.getListItems().should("have.length", 2);
  });

  it("adds an item", () => {
    cy.log("*** adds an item ***");
    GroceryListPage.addItem(GROCERIES[2].value);
    cy.log("*** checks for 3 items in the list ***");
    GroceryListPage.getListItems().should("have.length", 3);
    cy.log(`*** checks last item is ${GROCERIES[2].value} ***`);
    GroceryListPage.getLastItemInTheList().should(
      "have.text",
      GROCERIES[2].value
    );
    cy.log("*** checks alert displays with correct message and class ***");
    GroceryListPage.getAlert("item added to the list").should(
      "have.class",
      "alert-success"
    );
    cy.log("*** check items in UI match localStorage items");
    cy.window()
      .its("localStorage")
      .invoke("getItem", "list")
      .then(JSON.parse)
      .then((itemsFromStorage) => {
        console.log("items from storage:", itemsFromStorage);
        // Extract only the 'value' from each item in local storage
        const valuesFromStorage = itemsFromStorage.map((item) => item.value);
        console.log("values from storage: ", valuesFromStorage);
        // Create an array of values that are in the UI
        GroceryListPage.getTitlesOfListItems().then(($titles) => {
          const expectedValues = $titles
            .map((index, el) => el.textContent)
            .get();
          console.log("text of titles", expectedValues);

          // Perform the comparison
          expect(valuesFromStorage).to.deep.equal(expectedValues);
        });
      });
  });
});
