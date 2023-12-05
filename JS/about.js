const purchaseCount = document.getElementById("purchaseCount");
const purchased = JSON.parse(localStorage.getItem("purchased")) || [];
purchaseCount.textContent = `${purchased.length}`;
