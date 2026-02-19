const usernameInput = document.getElementById("username");
const statusDiv = document.getElementById("status");
const loader = document.getElementById("loader");
const form = document.getElementById("registerForm");

let isAvailable = false;

usernameInput.addEventListener("keyup", function () {
  const username = usernameInput.value.trim();

  if (username === "") {
    statusDiv.innerHTML = "";
    return;
  }

  loader.style.display = "inline";
  statusDiv.innerHTML = "";

  fetch("users.json")
    .then(response => response.json())
    .then(data => {
      loader.style.display = "none";

      if (data.users.includes(username)) {
        statusDiv.innerHTML = "Username already taken";
        statusDiv.className = "taken";
        isAvailable = false;
      } else {
        statusDiv.innerHTML = "Username available";
        statusDiv.className = "available";
        isAvailable = true;
      }
    });
});

form.addEventListener("submit", function (event) {
  if (!isAvailable) {
    event.preventDefault();
    alert("Please choose a different username.");
  }
});

