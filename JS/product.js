let purchased = JSON.parse(localStorage.getItem("purchased")) || [];
let main = document.querySelector("main");
let items = JSON.parse(localStorage.getItem("items"));

main.innerHTML = items
  .map(function (item, index) {
    return `
     <div>
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <p>${item.price}</p>
        <button value='${index}' data-add>Add To Cart</button>
     </div>
     `;
  })
  .join("");

function add(index) {
  console.log("🚀 ~ file: product.js:18 ~ add ~ index:", items[index]);
  purchased.push(items[index]);
  localStorage.setItem("purchased", JSON.stringify(purchased));
}

main.addEventListener("click", function (event) {
  if (event.target.hasAttribute("data-add")) {
    add(event.target.value);
  }
});

let a = items.filter((item) => {
  return item.name == "Nike Dunk";
});
