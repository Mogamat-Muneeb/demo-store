const purchased = JSON.parse(localStorage.getItem("purchased")) || [];
const main = document.querySelector("main");
const items = JSON.parse(localStorage.getItem("items"));
const pantsButton = document.querySelector("#pantsButton");
const tshirtButton = document.querySelector("#tshirtButton");
const clearButton = document.querySelector("#clearButton");
const shoesButton = document.querySelector("#shoesButton");

// Separate items into pants and t-shirts
const pants = items.filter((item) => item.type === "pants");
const tshirts = items.filter((item) => item.type === "tshirt");
const shoes = items.filter((item) => item.type === "Shoes");


// Initial rendering
renderItems(items);

// Function to render items
function renderItems(itemsToRender) {
  main.innerHTML = itemsToRender
    .map(function (item, index) {
      return `
       <div>
          <h2>${item.name}</h2>
          <p>${item.description}</p>
          <p>${item.price}</p>
          <p>${item.type}</p>
          <button value='${index}' data-add>Add To Cart</button>
       </div>
       `;
    })
    .join("");
}

function add(index) {
  purchased.push(items[index]);
  localStorage.setItem("purchased", JSON.stringify(purchased));
}

main.addEventListener("click", function (event) {
  if (event.target.hasAttribute("data-add")) {
    add(event.target.value);
  }
});

// Event listener for sorting by pants
pantsButton.addEventListener("click", function () {
  renderItems(pants);
});

// Event listener for sorting by t-shirts
tshirtButton.addEventListener("click", function () {
  renderItems(tshirts);
});


clearButton.addEventListener("click", function () {
  renderItems(items);
});
shoesButton.addEventListener("click", function () {
  renderItems(shoes);
});
