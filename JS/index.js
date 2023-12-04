document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
      document.getElementById("loadingOverlay").style.display = "none";
      document.getElementById("pageContent").style.display = "block";
    }, 1500); // Change 3000 to the desired delay in milliseconds
  });
  