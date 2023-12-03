const purchased = JSON.parse(localStorage.getItem("purchased"));
const table = document.querySelector("table");
const totalAmountE = document.getElementById("totalAmount");

// !DISPLAYING ITEMS IN CHECKOUT FROM LOCAL STORAGE
table.innerHTML = purchased.map((item, index) => {
  return `
    <div>
    <td>${index + 1}</td>
    <td>${item.name}</td>
    <td>${item.description}</td>
    <td>R${item.price}</td>
    </div>
    `;
});


// ! CALCULATED ITEMS IN CHECKOUT FROM LOCAL STORAGE
const totalAmount = purchased.reduce(
  (total, item) => total + parseFloat(item.price),
  0
);

totalAmountE.textContent = `R${totalAmount.toFixed(2)}`;
