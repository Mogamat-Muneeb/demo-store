document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.getElementById("loadingOverlay").style.display = "none";
    document.getElementById("pageContent").style.display = "block";
  }, 1000);
});
