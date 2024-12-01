// Simulate a database
const database = [];

// Register Form Submission
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const currentLocation = document.getElementById("currentLocation").value;
    const destination = document.getElementById("destination").value;

    database.push({ name, phone, age, gender, currentLocation, destination });
    this.reset();
    alert("Tour registered successfully!");
  });
}

// Find Form Submission
if (document.getElementById("findForm")) {
  document.getElementById("findForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const searchDestination = document.getElementById("searchDestination").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    const matches = database.filter(user => user.destination.toLowerCase() === searchDestination.toLowerCase());

    if (matches.length > 0) {
      matches.forEach(user => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.innerHTML = `
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Phone:</strong> ${user.phone}</p>
          <p><strong>Age:</strong> ${user.age}</p>
          <p><strong>Gender:</strong> ${user.gender}</p>
          <p><strong>Current Location:</strong> ${user.currentLocation}</p>
          <p><strong>Destination:</strong> ${user.destination}</p>
        `;
        resultsDiv.appendChild(resultItem);
      });
    } else {
      resultsDiv.innerHTML = "<p>No matches found!</p>";
    }
  });
}
