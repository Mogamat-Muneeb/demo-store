const purchased = JSON.parse(localStorage.getItem("purchased")) || [];
const main = document.querySelector("main");
const items = JSON.parse(localStorage.getItem("items"));
const pantsButton = document.querySelector("#pantsButton");
const tshirtButton = document.querySelector("#tshirtButton");
const clearButton = document.querySelector("#clearButton");
const shoesButton = document.querySelector("#shoesButton");
const topsButton = document.querySelector("#topsButton");
const purchaseCount = document.getElementById("purchaseCount");
const searchInput = document.querySelector("#searchBar");
const searchButton = document.querySelector("#searchBtn");

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

purchaseCount.textContent = `${purchased.length}`;
const pants = items.filter((item) => item.type.toLowerCase() === "pants");
const tshirts = items.filter((item) => item.type.toLowerCase() === "tshirt");
const shoes = items.filter((item) => item.type.toLowerCase() === "shoes");
const tops = items.filter((item) => item.type.toLowerCase() === "top");

renderItems(items);

function renderItems(itemsToRender) {
  if (itemsToRender.length === 0) {
    main.innerHTML = "<p>No matching products found.</p>";
  } else {
    main.innerHTML = itemsToRender
      .map(function (item, index) {
        return `
         <div class="product-card ">
         <img src="${item.url}" alt="${item.name}" class="product-image"/>
            <h2 class="product-name">${item.name}</h2>
            <p class="product-desc">${item.description}</p>
            <p class="product-price">R${item.price}</p>
            <button value='${index}' data-add class="addToCartBtn">Add To Cart</button>
            </div>
            `;
        // <p class="product-type">${item.type}</p>
      })
      .join("");
  }
}

function add(itemsArray, index) {
  purchased.push(itemsArray[index]);
  localStorage.setItem("purchased", JSON.stringify(purchased));
}

main.addEventListener("click", function (event) {
  if (event.target.hasAttribute("data-add")) {
    const currentItems = getCurrentItems();
    add(currentItems, event.target.value);
  }
});

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
