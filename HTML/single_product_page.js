document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
  
    // Retrieve products from localStorage
    const storedItems = JSON.parse(localStorage.getItem("items"));
  
    if (storedItems) {
      // Find the product with the matching ID
      const product = storedItems.find((product) => product.id === productId);
  
      if (product) {
        // Update the HTML with the product details
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-price").textContent = `Price: R${product.price}`;
        // Update other elements with product details as needed
      } else {
        // If the product is not found, handle it (e.g., show an error message)
        console.error("Product not found");
      }
    } else {
      // Handle the case where there are no products in localStorage
      console.error("No products found in localStorage");
    }
  });
  