let purchased = JSON.parse(localStorage.getItem("purchased"));
const totalAmountE = document.getElementById("totalAmount");
const payNow = document.getElementById("payNow");

// DISPLAYING ITEMS IN CHECKOUT FROM LOCAL STORAGE
function renderCheckoutItems() {
  let checkoutTable = document.querySelector("#checkoutTable");
  let purchaseItems = purchased.map(function (item, index) {
    return `
      <div class="checkoutItems">
        <p>${index + 1}</p>
        <p>${item.name}</p>
        <p>${item.description}</p>
        <p>R${item.price}</p>
      </div>
    `;
  });

  checkoutTable.innerHTML = purchaseItems.join("");
}

const totalAmount = purchased.reduce(
  (total, item) => total + parseFloat(item.price),
  0
);

totalAmountE.textContent = `R${totalAmount.toFixed(2)}`;

renderCheckoutItems();

const paymentBtn = () => {
  localStorage.removeItem("purchased");
  purchased = [];
  totalAmountE.textContent = "R0.00";
  alert("Payment successful!");
  renderCheckoutItems();
};

payNow.addEventListener("click", paymentBtn);

renderCheckoutItems();
