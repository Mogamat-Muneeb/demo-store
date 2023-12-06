const totalAmountE = document.getElementById("totalAmount");
const payNow = document.getElementById("payNow");
const purchaseCount = document.getElementById("purchaseCount");

let purchased = JSON.parse(localStorage.getItem("purchased")) || [];
purchaseCount.textContent = `${purchased.length}`;

// ! DISPLAYING ITEMS IN CHECKOUT FROM LOCAL STORAGE

function renderCheckoutItems() {
  let checkoutTable = document.querySelector("#checkoutTable");

  // Check if the cart is empty and hide the "Pay Now" button accordingly
  if (!purchased || purchased.length === 0) {
    payNow.style.display = "none";
  } else {
    payNow.style.display = "flex";
  }

  // Create a set to store unique item IDs that have been rendered
  const renderedItems = new Set();

  let purchaseItems = purchased.map(function (item, index) {
    // Skip rendering if the item has already been rendered
    if (renderedItems.has(item.id)) {
      return "";
    }

    // Add the item ID to the set to mark it as rendered
    renderedItems.add(item.id);

    const itemCount = purchased.filter((i) => i.id === item.id).length;

    return `
      <div class="product-card ">
        <img src="${item.url}" alt="${item.name}" class="product-image"/>
        <h2 class="product-name">${item.name} (${itemCount})</h2>
        <p class="product-desc">${item.description}</p>
        <p class="product-price">R${item.price}</p>
        <button class="removeFromCheckout" onclick="removeFromCheckout(${item.id})">Remove from Checkout</button>
      </div>
    `;
  });

  checkoutTable.innerHTML = purchaseItems.join("");

  // Add event listeners for the remove buttons
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

// ! CALCULATE THE TOTAL PRICE BOTH WAYS WORK (START)
let totalAmount = 0;

if (purchased) {
  purchased.forEach((item) => {
    totalAmount += parseFloat(item.price);
  });
}

totalAmountE.textContent = `R${totalAmount.toFixed(2)}`;

// const totalAmount = purchased
//   ? purchased.reduce((total, item) => total + parseFloat(item.price), 0)
//   : 0;

// totalAmountE.textContent = `R${totalAmount.toFixed(2)}`;

// ! CALCULATE THE TOTAL PRICE BOTH WAYS WORK (END)

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
