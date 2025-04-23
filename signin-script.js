document.getElementById('login-btn').addEventListener('click', function login() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('signin-error-message');
    const storedUser = JSON.parse(localStorage.getItem('user')) || null;

    // Clear previous error message
    errorMessage.textContent = '';

    // Validate inputs
    if (username === '' || password === '') {
        errorMessage.textContent = 'Both fields are required.';
        return;
    }

    // Check if user exists in localStorage
    if (
        storedUser &&
        username === storedUser.username &&
        password === storedUser.password
      ) {
        localStorage.setItem("loggedIn", "true"); // Flag for later auth check
        window.location.href = "index.html"; // Redirect to the main page
        console.log("Login successful!"); // For debugging
      } else {
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      console.log("Login failed!"); // For debugging
  }
});
