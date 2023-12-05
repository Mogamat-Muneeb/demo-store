// ! ITEMS ANY EMPTY ARRAY BY DEFAULT

let items = [];
// ! STRUCTURE OF ITEMS OBJECT
function Constructor(id, name, description, price, url, type) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.price = price;
  this.url = url;
  this.type = type;
}

// ! TO ADD ITEMS TO LOCALSTORAGE
function addItem() {
  const itemName = document.getElementById("itemName").value;
  const itemDescription = document.getElementById("itemDescription").value;
  const itemPrice = parseFloat(document.getElementById("itemPrice").value);
  const itemUrl = document.getElementById("itemUrl").value;
  const itemType = document.getElementById("itemType").value;

  if (
    !itemName ||
    !itemDescription ||
    isNaN(itemPrice) ||
    !itemUrl ||
    !itemType
  ) {
    alert("Please fill in all fields before adding an item.");
    return; // Stop execution if any field is empty
  }

  const newItem = new Constructor(
    items.length + 1,
    itemName,
    itemDescription,
    itemPrice,
    itemUrl,
    itemType
  );
  items.push(newItem);

  // ! CLEAR INPUT AFTER ADDED
  document.getElementById("itemName").value = "";
  document.getElementById("itemDescription").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemUrl").value = "";
  document.getElementById("itemType").value = "";

  updateTable();
  saveToLocalStorage();
}

// ! DISPLAY ITEMES ADDED
function updateTable() {
  let table = document.getElementById("itemTable");
  let products = items.map(function (item, index) {
    // <span>${item.id}</span>
    return `
    <div class="product-card">
     <img src="${item.url}" alt="${item.name}" class="product-image"/>
        <h1 class="product-name">${item.name}</h1>
        <p  class="product-desc">${item.description}</p>
        <p class="product-price">R${item.price}</p>
        <div>
        <button onclick="editItem(${index})">Edit</button>
        <button class="delete" value='${index}'>Delete</button>
        </div>
        </div>
        `;
    // <p class="product-type">${item.type}</p>
  });

  table.innerHTML = products.join("");

  let deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      removeItem(button.value);
    });
  });
}

// ! EDIT ITEM AND THEN UPDATE IN LOCALSTORAGE AS WELL
function editItem(index) {
  const modal = document.getElementById("editModal");
  const editedNameInput = document.getElementById("editedName");
  const editedDescriptionInput = document.getElementById("editedDescription");
  const editedPriceInput = document.getElementById("editedPrice");
  const editedUrlInput = document.getElementById("editedUrl");
  const editedType = document.getElementById("editedType");
  const saveButton = document.getElementById("saveEdit");

  editedNameInput.value = items[index].name;
  editedDescriptionInput.value = items[index].description;
  editedPriceInput.value = items[index].price;
  editedUrlInput.value = items[index].url;
  editedType.value = items[index].type;

  modal.style.display = "block";

  saveButton.onclick = function () {
    const editedName = editedNameInput.value;
    const editedDescription = editedDescriptionInput.value;
    const editedPrice = parseFloat(editedPriceInput.value);
    const editedUrl = editedUrlInput.value;
    const editedTypes = editedType.value;

    if (
      editedName &&
      editedDescription &&
      !isNaN(editedPrice) &&
      editedUrl &&
      editedType
    ) {
      items[index].name = editedName;
      items[index].description = editedDescription;
      items[index].price = editedPrice;
      items[index].url = editedUrl;
      items[index].type = editedTypes;

      updateTable();
      saveToLocalStorage();
      modal.style.display = "none";
    } else {
      alert("Invalid input. Editing canceled.");
    }
  };
}

// ! REMOVE ITEM FROM LOCAL STORAGE AND DISPLAYING
function removeItem(position) {
  items.splice(position, 1);
  updateTable();
  saveToLocalStorage();
}

// ! SAVE ITEM TO LOCAL STORAGE
function saveToLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}

// ! GET ITEM FROM LOCAL STORAGE
function loadFromLocalStorage() {
  const storedItems = JSON.parse(localStorage.getItem("items"));
  // && storedItems.length === 0
  if (storedItems) {
    items = storedItems;
    updateTable();
  }
  // else {
  //   // If no items in localStorage, set default items
  //   items = [
  //     new Constructor(1, "New Bal", "Item that has a description here", 10.99, "https://i.postimg.cc/Jhgh06Zm/image.png", "Default"),
  //     new Constructor(2, "RANGE LOOSE TAPERED SALT WASH TROUSERS", "DItem that has a description here", 19.99, "https://i.postimg.cc/sggfcdJs/image.png", "Shoes"),
  //   ];
  //   saveToLocalStorage();
  // }
  // updateTable();
}

loadFromLocalStorage();
