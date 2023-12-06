// let purchased = JSON.parse(localStorage.getItem("purchased")) || [];
// const purchaseCount = document.getElementById("purchaseCount");
// purchaseCount.textContent = `${purchased.length}`;
// document.addEventListener("DOMContentLoaded", function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const productId = parseInt(urlParams.get("id"));

//   const storedItems = JSON.parse(localStorage.getItem("items"));

//   if (storedItems) {
//     const product = storedItems.find((product) => product.id === productId);

//     if (product) {
//       // Update the HTML with the product details
//       document.getElementById("product-name").textContent = product.name;
//       document.getElementById("product-description").textContent =
//         product.description;
//       document.getElementById(
//         "product-price"
//       ).textContent = `Price: R${product.price}`;
//       document.getElementById("product-image").src = product.url;
//     } else {
//       console.error("Product not found");
//     }
//   } else {
//     console.error("No products found in localStorage");
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
  
    // Retrieve products from localStorage
    const storedItems = JSON.parse(localStorage.getItem("items"));
    let purchased = JSON.parse(localStorage.getItem("purchased")) || [];
  
    if (storedItems) {
      // Find the product with the matching ID
      const product = storedItems.find((product) => product.id === productId);
  
      if (product) {
        // Update the HTML with the product details
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-price").textContent = `Price: R${product.price}`;
        document.getElementById("product-image").src = product.url; // Update product image
        document.getElementById("product-image").alt = product.name; // Set alt text for the image
  
        // Add to Bag functionality
        const addToBagButton = document.getElementById("add-to-bag");
        addToBagButton.addEventListener("click", function () {
          purchased.push(product);
          localStorage.setItem("purchased", JSON.stringify(purchased));
          updatePurchaseCount(); // Call function to update purchase count
        });
      } else {
        // If the product is not found, handle it (e.g., show an error message)
        console.error("Product not found");
      }
    } else {
      // Handle the case where there are no products in localStorage
      console.error("No products found in localStorage");
    }
  });
  
  function updatePurchaseCount() {
    const purchased = JSON.parse(localStorage.getItem("purchased")) || [];
    const purchaseCount = document.getElementById("purchaseCount");
    purchaseCount.textContent = `${purchased.length}`;
  }
  
