// ! ITEMS ANY EMPTY ARRAY BY DEFAULT
let items = [];
// ! STRUCTURE OF ITEMS OBJECT
function Constructor(id, name, description, price, url) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.price = price;
  this.url = url;
}

// ! TO ADD ITEMS TO LOCALSTORAGE
function addItem() {
  const itemName = document.getElementById("itemName").value;
  const itemDescription = document.getElementById("itemDescription").value;
  const itemPrice = parseFloat(document.getElementById("itemPrice").value);
  const itemUrl = document.getElementById("itemUrl").value;

  const newItem = new Constructor(
    items.length + 1,
    itemName,
    itemDescription,
    itemPrice,
    itemUrl
  );
  items.push(newItem);

  // ! CLEAR INPUT AFTER ADDED
  document.getElementById("itemName").value = "";
  document.getElementById("itemDescription").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemUrl").value = "";

  updateTable();
  saveToLocalStorage();
}

// ! DISPLAY ITEMES ADDED
function updateTable() {
  let table = document.getElementById("itemTable");
  let products = items.map(function (item, index) {
    return `
    <div class="product-card">
    <span>${item.id}</span>
     <img src="${item.url}" alt="${item.name}" class="product-image"/>
        <h1>${item.name}</h1>
        <p>R${item.price}</p>
        <p>${item.description}</p>
          <div>
            <button onclick="editItem(${index})">Edit</button>
            <button class="delete" value='${index}'>Delete</button>
          </div>
      </div>
    `;
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
  const saveButton = document.getElementById("saveEdit");

  editedNameInput.value = items[index].name;
  editedDescriptionInput.value = items[index].description;
  editedPriceInput.value = items[index].price;
  editedUrlInput.value = items[index].url;

  modal.style.display = "block";

  saveButton.onclick = function () {
    const editedName = editedNameInput.value;
    const editedDescription = editedDescriptionInput.value;
    const editedPrice = parseFloat(editedPriceInput.value);
    const editedUrl = editedUrlInput.value;

    if (editedName && editedDescription && !isNaN(editedPrice) && editedUrl) {
      items[index].name = editedName;
      items[index].description = editedDescription;
      items[index].price = editedPrice;
      items[index].url = editedUrl;

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
  if (storedItems) {
    items = storedItems;
    updateTable();
  }
}

loadFromLocalStorage();
