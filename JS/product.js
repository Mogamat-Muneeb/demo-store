// JavaScript (product.js)
const purchased = JSON.parse(localStorage.getItem("purchased")) || [];
const main = document.querySelector("main");
const items = JSON.parse(localStorage.getItem("items"));
const pantsButton = document.querySelector("#pantsButton");
const tshirtButton = document.querySelector("#tshirtButton");
const clearButton = document.querySelector("#clearButton");
const shoesButton = document.querySelector("#shoesButton");
const topsButton = document.querySelector("#topsButton");
const purchaseCount = document.getElementById("purchaseCount");
purchaseCount.textContent = `${purchased.length}`;

const pants = items.filter((item) => item.type.toLowerCase() === "pants");
const tshirts = items.filter((item) => item.type.toLowerCase() === "tshirt");
const shoes = items.filter((item) => item.type.toLowerCase() === "shoes");
const tops = items.filter((item) => item.type.toLowerCase() === "top");

renderItems(items);

function renderItems(itemsToRender) {
  main.innerHTML = itemsToRender
    .map(function (item, index) {
      return `
       <div class="product-card ">
       <img src="${item.url}" alt="${item.name}" class="product-image"/>
          <h2>${item.name}</h2>
          <p>${item.description}</p>
          <p>${item.price}</p>
          <p>${item.type}</p>
          <button value='${index}' data-add class="addToCartBtn">Add To Cart</button>
       </div>
       `;
    })
    .join("");
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
