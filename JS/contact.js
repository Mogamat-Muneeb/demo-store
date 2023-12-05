const purchaseCount = document.getElementById("purchaseCount");

const purchased = JSON.parse(localStorage.getItem("purchased")) || [];
purchaseCount.textContent = `${purchased.length}`;

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = new FormData(form);

    // Convert form data to JSON
    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    // Perform a fetch to send the data to the server
    fetch("https://demo-store-backend.vercel.app/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Server response:", data);
        // Handle success, e.g., show a success message to the user
      })
      .catch((error) => {
        alert("There was a problem with the fetch operation:", error);
        // Handle error, e.g., show an error message to the user
      });
  });
});
