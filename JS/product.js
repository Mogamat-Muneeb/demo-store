let purchased = JSON.parse(localStorage.getItem("purchased")) || [];
function Constructor(id, name, description, price, url, type) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.price = price;
  this.url = url;
  this.type = type;
}

const main = document.querySelector("main");
let items = JSON.parse(localStorage.getItem("items"));
const pantsButton = document.querySelector("#pantsButton");
const tshirtButton = document.querySelector("#tshirtButton");
const clearButton = document.querySelector("#clearButton");
const shoesButton = document.querySelector("#shoesButton");
const topsButton = document.querySelector("#topsButton");
const purchaseCount = document.getElementById("purchaseCount");
const searchInput = document.querySelector("#searchBar");
const searchButton = document.querySelector("#searchBtn");

loadFromLocalStorage();

function handleSearch() {
  const searchValue = searchInput.value.toLowerCase();
  const currentItems = getCurrentItems();
  const filteredItems = currentItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchValue) ||
      item.type.toLowerCase().includes(searchValue)
  );
  renderItems(filteredItems);
}

// ! ATTACH THE FUNCTION TO BOTH ONCHANGE AND ONCLICK EVENTS TO SEARCH
searchInput.addEventListener("change", handleSearch);
searchButton.addEventListener("click", handleSearch);

// ! THE AMOUNT OF ITEMS ABOUT TO BE PURCHASED
purchaseCount.textContent = `${purchased.length}`;

// ! THE FILTERS FOR THE SORT FUCTION
const pants = items?.filter((item) => item.type.toLowerCase() === "pants");
const tshirts = items?.filter((item) => item.type.toLowerCase() === "tshirt");
const shoes = items?.filter((item) => item.type.toLowerCase() === "shoes");
const tops = items?.filter((item) => item.type.toLowerCase() === "top");

renderItems(items);

// ! RENDERING THE ITEMS ON THE DOM

function renderItems(itemsToRender) {
  if (itemsToRender?.length === 0) {
    main.innerHTML = "<p>No matching products found.</p>";
  } else {
    main.innerHTML = itemsToRender
      ?.map(function (item, index) {
        return `
         <div class="product-card ">
         <img src="${item.url}" alt="${item.name}" class="product-image"/>
            <h2 class="product-name">${item.name}</h2>
            <p class="product-desc">${item.description}</p>
            <p class="product-price">R${item.price}</p>
            <button value='${index}' data-add class="addToCartBtn">Add To Cart</button>
            </div>
            `;
      })
      .join("");
  }
}

// ! UPDATE THE PURCHASE COUNTER IN REALTIME
function updatePurchaseCount() {
  purchaseCount.textContent = `${purchased.length}`;
}

// ! ADDING ITEMS TO THE PURCHASE LOCAL STORAGE
function add(itemsArray, index) {
  purchased.push(itemsArray[index]);
  localStorage.setItem("purchased", JSON.stringify(purchased));
  updatePurchaseCount();
}

main.addEventListener("click", function (event) {
  if (event.target.hasAttribute("data-add")) {
    const currentItems = getCurrentItems();
    add(currentItems, event.target.value);
  }
});

// ! CHECKING THE CURRENT ITEMS TO SET ACTIVE FOR WHICH ITEMS THAT ARE SHOWING WHEN SORTING SO IF ADDED TO   PURCHASE LOCAL STORAGE IT ADDS THE CORRECT ITEM
function getCurrentItems() {
  if (pantsButton.classList.contains("active")) {
    return pants;
  } else if (tshirtButton.classList.contains("active")) {
    return tshirts;
  } else if (shoesButton.classList.contains("active")) {
    return shoes;
  } else if (topsButton.classList.contains("active")) {
    return tops;
  } else {
    return items;
  }
}

// ! SORT BUTTONS (START)

pantsButton.addEventListener("click", function () {
  renderItems(pants);
  activateButton(pantsButton);
});

tshirtButton.addEventListener("click", function () {
  renderItems(tshirts);
  activateButton(tshirtButton);
});

clearButton.addEventListener("click", function () {
  renderItems(items);
  deactivateAllButtons();
});

shoesButton.addEventListener("click", function () {
  renderItems(shoes);
  activateButton(shoesButton);
});

topsButton.addEventListener("click", function () {
  renderItems(tops);
  activateButton(topsButton);
});

function activateButton(button) {
  deactivateAllButtons();
  button.classList.add("active");
}

function deactivateAllButtons() {
  pantsButton.classList.remove("active");
  tshirtButton.classList.remove("active");
  shoesButton.classList.remove("active");
  topsButton.classList.remove("active");
}
// ! SORT BUTTONS (END)

function saveToLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}

// ! GET ITEM FROM LOCAL STORAGE AND ALSO RUNNING A  CHECK TO SEE IF ITEMS EXIST IN LOCAL STORAGE ALREADY IF NOT THE DISPLAY THE DEFAULT ITEMS SO THAT THE PAGE IS NOT EMPTY AND DISPLAYING NOTHING
function loadFromLocalStorage() {
  const storedItems = JSON.parse(localStorage.getItem("items"));
  // && storedItems.length === 0
  if (storedItems) {
    items = storedItems;
    renderItems(items);
  } else {
    // ! IF NO ITEMS IN LOCAL STORAGE SET THESE ITEMS
    items = [
      new Constructor(
        1,
        "New Bal",
        "Item that has a description here",
        10.99,
        "https://i.postimg.cc/Jhgh06Zm/image.png",
        "Default"
      ),
      new Constructor(
        2,
        "RANGE LOOSE TAPERED SALT WASH TROUSERS",
        "DItem that has a description here",
        19.99,
        "https://i.postimg.cc/sggfcdJs/image.png",
        "Shoes"
      ),
      new Constructor(
        3,
        "RANGE LOOSE TAPERED SALT WASH TROUSERS",
        "loreem ipsumd",
        19.99,
        "https://i.postimg.cc/j5nT8NXz/image.png",
        "top"
      ),
      new Constructor(
        4,
        "RANGE LOOSE TAPERED SALT WASH TROUSERS",
        "loreem ipsumd",
        19.99,
        "https://i.postimg.cc/LXP485wv/image.png",
        "top"
      ),
      new Constructor(
        5,
        "RANGE LOOSE TAPERED SALT WASH TROUSERS",
        "loreem ipsumd",
        19.99,
        "https://i.postimg.cc/9MDbR5YL/image.png",
        "Pants"
      ),
      new Constructor(
        6,
        "RANGE LOOSE TAPERED SALT WASH TROUSERS",
        "loreem ipsumd",
        19.99,
        "https://i.postimg.cc/Xvzc016d/image.png",
        "tshirt"
      ),
      new Constructor(
        7,
        "SAMBA DECO SPZL SHOES",
        "loreem ipsumd",
        200.99,
        "https://i.postimg.cc/903mVPFL/image.png",
        "Shoes"
      ),
      new Constructor(
        7,
        "Addida shorts",
        "loreem ipsumd",
        50.99,
        "https://i.postimg.cc/JnxxCxqL/image.png",
        "Pants"
      ),
      // renderItems(items)
    ];
    console.log(items);
    saveToLocalStorage();
  }
}

loadFromLocalStorage();
