// Select DOM elements
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
const deleteBtn = document.querySelector(".delete-btn");

// Edit option state variables
let editElement;
let editFlag = false;
let editID = "";

// Event listeners
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setUpItems);

// Functions
// Adds a new item or edits an existing one
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  // Unique Id for each item
  // this is a cheat to get a unique id, you wouldn't use this approach in a real project
  const id = new Date().getTime().toString();
  // Add new item logic
  if (value !== "" && editFlag === false) {
    createListItem(id, value);
    // UI feedback and local storage update
    displayAlert("item added to the list", "success");
    container.classList.add("show-container");
    addToLocalStorage(id, value);
    setBackToDefault();
  } else if (value !== "" && editFlag === true) {
    // Edit existing item logic, UI feedback and local storage update
    editElement.innerHTML = value;
    displayAlert("value changed", "success");
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    // Handle empty inputs value case via UI feedback
    displayAlert("please enter value", "danger");
  }
}

// Create and appends a new list item to the DOM
function createListItem(id, value) {
  // Construct a new list item and append it to the list
  const element = document.createElement("article");
  element.classList.add("grocery-item");
  // set dataid
  const attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.innerHTML = `<p class="title" data-testid="grocery-item-title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn" data-testid="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn" data-testid="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");
  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);
  list.appendChild(element);
}

// Resets form and state variables to default
function setBackToDefault() {
  // Reset form fields and state variables
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// Displayes a temporary alert message
function displayAlert(text, action) {
  // Display and auto-hide alert message
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(function () {
    alert.textContent = text;
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// Makes container visible
function displayGroceryContainer() {
  container.classList.add("show-container");
}

// Clears all items from the list
function clearItems() {
  // Logic to remove all items from the DOM and local storage
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
    localStorage.removeItem("list");
  }
}

// Deletes a specific item from the list
function deleteItem(e) {
  // Remove specific item from DOM and local storage
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  removeFromLocalStorage(id);
}

// Enables editing of a specigic item
function editItem(e) {
  // Setup form for editing an existing item
  const element = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling; //p.title
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}

// Local Storage Functions
// Add a new item to local storage
function addToLocalStorage(id, value) {
  const grocery = { id: id, value: value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

// Remove an item from locaL storage by ID
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

// Update an existing an item in local storage
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  items = items.filter(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

// Retrieve items from local storage
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

// clear all items from local storage
function clearLocalStorage() {
  localStorage.setItem("list", JSON.stringify([]));
}

// setup initial list from items from local storage on page load
function setUpItems() {
  // Load and display items from local storage on startup
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}
