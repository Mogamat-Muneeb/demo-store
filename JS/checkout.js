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

// CALCULATED ITEMS IN CHECKOUT FROM LOCAL STORAGE
const totalAmount = purchased.reduce(
  (total, item) => total + parseFloat(item.price),
  0
);

totalAmountE.textContent = `R${totalAmount.toFixed(2)}`;

renderCheckoutItems();

const paymentBtn = () => {
  // Clear localStorage
  localStorage.removeItem("purchased");
  // Update the purchased variable
  purchased = [];

  totalAmountE.textContent = "R0.00";
  // Display an alert
  alert("Payment successful!");
  renderCheckoutItems();
  // You can add additional logic or redirect the user after payment
};

// Attach the paymentBtn function to the click event of the Pay Now button
payNow.addEventListener("click", paymentBtn);

renderCheckoutItems();
