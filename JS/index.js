// document.addEventListener("DOMContentLoaded", function () {
//   setTimeout(function () {
//     document.getElementById("loadingOverlay").style.display = "none";
//     document.getElementById("pageContent").style.display = "block";
//   }, 1000);
// });
document.addEventListener("DOMContentLoaded", function () {
  // Check if the loading overlay has been shown before
  if (!sessionStorage.getItem("loadingOverlayShown")) {
    // If not shown before, display the loading overlay
    document.getElementById("loadingOverlay").style.display = "block";
    document.getElementById("pageContent").style.display = "none";

    // Set a flag in sessionStorage to indicate that the loading overlay has been shown
    sessionStorage.setItem("loadingOverlayShown", true);

    // Hide the loading overlay after a delay
    setTimeout(function () {
      document.getElementById("loadingOverlay").style.display = "none";
      document.getElementById("pageContent").style.display = "block";
    }, 1000);
  } else {
    // If the loading overlay has been shown before, just display the page content
    document.getElementById("loadingOverlay").style.display = "none";
    document.getElementById("pageContent").style.display = "block";
  }
});
