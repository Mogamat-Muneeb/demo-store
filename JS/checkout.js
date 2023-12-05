const totalAmountE = document.getElementById("totalAmount");
const payNow = document.getElementById("payNow");
const purchaseCount = document.getElementById("purchaseCount");

let purchased = JSON.parse(localStorage.getItem("purchased")) || [];
purchaseCount.textContent = `${purchased.length}`;

// ! DISPLAYING ITEMS IN CHECKOUT FROM LOCAL STORAGE
function renderCheckoutItems() {
  let checkoutTable = document.querySelector("#checkoutTable");

  // ! CHECK IF THE CART IS EMPTY AND HIDE THE "PAY NOW" BUTTON ACCORDINGLY
  if (!purchased || purchased.length === 0) {
    payNow.style.display = "none";
  } else {
    payNow.style.display = "flex";
  }

  let purchaseItems = purchased.map(function (item, index) {
    return `
    <div class="product-card ">
      <img src="${item.url}" alt="${item.name}" class="product-image"/>
      <h2 class="product-name">${item.name}</h2>
      <p  class="product-desc">${item.description}</p>
      <p class="product-price">R${item.price}</p>
      <button class="removeFromCheckout" onclick="removeFromCheckout(${item.id})" >Remove from Checkout</button>
      </div>
      `;
    // <p class="product-type">${item.type}</p>
  });

  checkoutTable.innerHTML = purchaseItems.join("");

  // ! ADD EVENT LISTENERS FOR THE REMOVE BUTTONS
  document.querySelectorAll(".removeFromCheckout").forEach((btn) => {
    btn.addEventListener("click", removeFromCheckout);
  });
}

// ! UPDATE PURCHASE AMOUNT IN REALTIME
function updatePurchaseCount() {
  purchaseCount.textContent = `${purchased.length}`;
}

// ! REMOVE FROM THE PURCHASE ARRAY

function removeFromCheckout(id) {
  const currentItemID = purchased.findIndex((item) => item.id === id);

  if (currentItemID !== -1) {
    purchased.splice(currentItemID, 1);
  }
  // ! UPDATE LOCAL STORAGE AND RE-RENDER CHECKOUT
  localStorage.setItem("purchased", JSON.stringify(purchased));
  renderCheckoutItems();

  // !Update total amount
  const totalAmount = purchased
    ? purchased.reduce((total, item) => total + parseFloat(item.price), 0)
    : 0;
  totalAmountE.textContent = `R${totalAmount.toFixed(2)}`;

  // ! HIDE "PAY NOW" BUTTON IF THE CART IS EMPTY
  if (!purchased || purchased.length === 0) {
    payNow.style.display = "none";
  }

  updatePurchaseCount();
}
const totalAmount = purchased
  ? purchased.reduce((total, item) => total + parseFloat(item.price), 0)
  : 0;

totalAmountE.textContent = `R${totalAmount.toFixed(2)}`;

renderCheckoutItems();

// ! IPAYMENT BUTTON

const paymentBtn = () => {
  localStorage.removeItem("purchased");
  purchased = [];
  totalAmountE.textContent = "R0.00";
  payNow.style.display = "none";
  alert("Payment successful!");
  renderCheckoutItems();
};

payNow.addEventListener("click", paymentBtn);
