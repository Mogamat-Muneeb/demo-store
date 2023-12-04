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
console.log("🚀 ~ file: index.js:26 ~ purchased:", purchased.length);
purchaseCount.textContent = `${purchased.length}`;
