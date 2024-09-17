const apiBaseUrl = "http://localhost:8500/api/users";
// http://localhost:8500/api/users/register
let authToken = ""; // Will hold the JWT token after login
let username = ""; // To store username for toast messages

// Toggle Views
document.getElementById("toLogin").addEventListener("click", () => {
  document.getElementById("registerView").style.display = "none";
  document.getElementById("loginView").style.display = "block";
});

document.getElementById("toRegister").addEventListener("click", () => {
  document.getElementById("loginView").style.display = "none";
  document.getElementById("registerView").style.display = "block";
});

// Register User
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = {};
    formData.forEach((value, key) => (userData[key] = value));

    try {
      await axios.post(`${apiBaseUrl}/register`, userData);
      alert("Registration successful! Please log in.");
      document.getElementById("registerForm").reset();
      document.getElementById("registerView").style.display = "none";
      document.getElementById("loginView").style.display = "block";
    } catch (error) {
      console.error(error);
      toastr.error("Error during registration");
    }
  });

// Login User
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const userData = {};
  formData.forEach((value, key) => (userData[key] = value));

  try {
    const response = await axios.post(`${apiBaseUrl}/login`, userData);
    authToken = response.data.token; // Store JWT token
    username = response.data.username; // Store username
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("username", username);
    alert(`Welcome to Page}!`);
    document.getElementById("authContainer").style.display = "none";
    document.getElementById("homepage").style.display = "block";
  } catch (error) {
    console.error(error);
    alert("There is no user please register");
  }
});

// Fetch All Users
document.getElementById("fetchUsers").addEventListener("click", async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${authToken}`, // Include token in Authorization header
      },
    });
    displayResults(response.data); // Display users in the DOM
  } catch (error) {
    console.error(error);
    toastr.error("Failed to fetch users");
  }
});

// Delete a User
document.getElementById("deleteUser").addEventListener("click", async () => {
  const userId = prompt("Enter user ID to delete:");

  if (!userId) {
    alert("User ID is required");
    return;
  }

  try {
    // let authToken = localStorage.getItem("authToken");
    // console.log(authToken);

    await axios.delete(`${apiBaseUrl}/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`, // Include token in Authorization header
      },
    });
    alert("User deleted successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to delete user");
  }
});

// Edit user
document.getElementById("editUser").addEventListener("click", async () => {
  const userId = prompt("Enter user ID to edit:");
  const name = prompt("Enter new name (leave empty to keep current):");
  const phone = prompt("Enter new phone (leave empty to keep current):");
  const profession = prompt(
    "Enter new profession (leave empty to keep current):"
  );

  if (!userId) {
    alert("User ID is required");
    return;
  }

  const authToken = localStorage.getItem("authToken"); // Make sure this is properly set

  try {
    const response = await axios.put(
      `${apiBaseUrl}/${userId}`,
      {
        name,
        phone,
        profession,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include token in Authorization header
        },
      }
    );

    alert("User edited successfully");
    console.log("Response:", response.data);
  } catch (error) {
    console.error(
      "Error editing user:",
      error.response ? error.response.data : error.message
    );
    alert("Failed to edit user");
  }
});

// Utility to display fetched data
function displayResults(data) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}
