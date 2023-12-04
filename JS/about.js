const purchaseCount = document.getElementById("purchaseCount");
const purchased = JSON.parse(localStorage.getItem("purchased")) || [];
console.log("🚀 ~ file: index.js:26 ~ purchased:", purchased.length);
purchaseCount.textContent = `${purchased.length}`;
