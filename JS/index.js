// document.addEventListener("DOMContentLoaded", function () {
//   setTimeout(function () {
//     document.getElementById("loadingOverlay").style.display = "none";
//     document.getElementById("pageContent").style.display = "block";
//   }, 1000);
// });

const purchaseCount = document.getElementById("purchaseCount");

document.addEventListener("DOMContentLoaded", function () {
  // Check if the loading overlay has been shown before
  if (!sessionStorage.getItem("loadingOverlayShown")) {
    // Set a flag in sessionStorage to indicate that the loading overlay has been shown
    sessionStorage.setItem("loadingOverlayShown", true);

    // Hide the loading overlay after a delay
    setTimeout(function () {
      document.getElementById("loadingOverlay").style.display = "none";
      document.getElementById("pageContent").style.display = "block";
    }, 3000);
  } else {
    // If the loading overlay has been shown before, just display the page content
    document.getElementById("loadingOverlay").style.display = "none";
    document.getElementById("pageContent").style.display = "block";
  }
});

const purchased = JSON.parse(localStorage.getItem("purchased")) || [];
purchaseCount.textContent = `${purchased.length}`;

document.addEventListener("DOMContentLoaded", function () {
  const carouselItems = JSON.parse(localStorage.getItem("items")) || [];
  const container = document.getElementById("carousel-container");
  const list = document.getElementById("carousel-list");

  // Duplicate the items to create a seamless loop
  const duplicatedItems = [...carouselItems, ...carouselItems, ...carouselItems];

  const itemsInCarousel = duplicatedItems
    .map((item, index) => {
      return `
         <div class="product-card">
           <img src="${item.url}" alt="${item.name}" class="product-image"/>
           <h2 class="product-name">${item.name}</h2>
           <p class="product-desc">${item.description}</p>
           <p class="product-price">R${item.price}</p>
           <button value='${index}' data-add class="addToCartBtn">Add To Cart</button>
         </div>
      `;
    })
    .join("");
  list.innerHTML = itemsInCarousel;

  let currentIndex = 0;

  function showCurrentIndex() {
    const newPosition = -currentIndex * 300; // Assuming each item is 600px wide
    list.style.transition = "transform 0.5s ease-in-out";
    list.style.transform = `translateX(${newPosition}px)`;
  }

  function moveCarousel(direction) {
    const totalItems = duplicatedItems.length;

    if (direction === "next") {
      currentIndex = (currentIndex + 1) % totalItems;
    } else if (direction === "prev") {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    }

    showCurrentIndex();
  }

  function autoMoveCarousel() {
    setInterval(function () {
      list.style.transition = "none";
      moveCarousel("next");
    }, 3000); // Change 3000 to the desired interval time (e.g., 3000 for 3 seconds)
  }

  // Initial display
  showCurrentIndex();

  // Move carousel to the next item on button click
  document.getElementById("next-btn").addEventListener("click", function () {
    moveCarousel("next");
  });

  // Move carousel to the previous item on button click
  document.getElementById("prev-btn").addEventListener("click", function () {
    moveCarousel("prev");
  });

  // Automatically move carousel
  autoMoveCarousel();
});
