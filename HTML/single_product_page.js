let purchased = JSON.parse(localStorage.getItem("purchased")) || [];
const purchaseCount = document.getElementById("purchaseCount");
purchaseCount.textContent = `${purchased.length}`;
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));

  const storedItems = JSON.parse(localStorage.getItem("items"));

  if (storedItems) {
    const product = storedItems.find((product) => product.id === productId);

    if (product) {
      // Update the HTML with the product details
      document.getElementById("product-name").textContent = product.name;
      document.getElementById("product-description").textContent =
        product.description;
      document.getElementById(
        "product-price"
      ).textContent = `Price: R${product.price}`;
      document.getElementById("product-image").src = product.url;
    } else {
      console.error("Product not found");
    }
  } else {
    console.error("No products found in localStorage");
  }
});
