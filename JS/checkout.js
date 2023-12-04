let purchased = JSON.parse(localStorage.getItem("purchased"));
const totalAmountE = document.getElementById("totalAmount");
const payNow = document.getElementById("payNow");

// !DISPLAYING ITEMS IN CHECKOUT FROM LOCAL STORAGE
function renderCheckoutItems() {
  let checkoutTable = document.querySelector("#checkoutTable");

  // Check if the cart is empty and hide the "Pay Now" button accordingly
  if (!purchased || purchased.length === 0) {
    payNow.style.display = "none";
  } else {
    payNow.style.display = "flex";
  }

  let purchaseItems = purchased.map(function (item, index) {
    return `
    <div class="product-card ">
      <img src="${item.url}" alt="${item.name}" class="product-image"/>
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <p>${item.price}</p>
      <p>${item.type}</p>
      <button class="removeFromCheckout" onclick="removeFromCheckout(${item.id})" >Remove from Checkout</button>
    </div>
    `;
  });

  checkoutTable.innerHTML = purchaseItems.join("");

  // !Add event listeners for the remove buttons
  document.querySelectorAll(".removeFromCheckout").forEach((btn) => {
    btn.addEventListener("click", removeFromCheckout);
  });
}

function removeFromCheckout(id) {
  const currentItemID = purchased.findIndex((item) => item.id === id);

  if (currentItemID !== -1) {
    purchased.splice(currentItemID, 1);
  }
  // !Update local storage and re-render checkout
  localStorage.setItem("purchased", JSON.stringify(purchased));
  renderCheckoutItems();

  // !Update total amount
  const totalAmount = purchased
    ? purchased.reduce((total, item) => total + parseFloat(item.price), 0)
    : 0;
  totalAmountE.textContent = `R${totalAmount.toFixed(2)}`;

  // !Hide "Pay Now" button if the cart is empty
  if (!purchased || purchased.length === 0) {
    payNow.style.display = "none";
  }
}
const totalAmount = purchased
  ? purchased.reduce((total, item) => total + parseFloat(item.price), 0)
  : 0;

totalAmountE.textContent = `R${totalAmount.toFixed(2)}`;

renderCheckoutItems();

const paymentBtn = () => {
  localStorage.removeItem("purchased");
  purchased = [];
  totalAmountE.textContent = "R0.00";
  payNow.style.display = "none";
  alert("Payment successful!");
  renderCheckoutItems();
};

payNow.addEventListener("click", paymentBtn);
