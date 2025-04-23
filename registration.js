
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    const errorMessage = document.getElementById('error-message');
  
    form.addEventListener('submit', function register(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
  
      if (!username || !email || !password || !confirmPassword) {
        errorMessage.textContent = 'Please fill out all fields.';
        return;
      }
  
      if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
      }
  
      const user = {
        username,
        email,
        password,
      };
  
      localStorage.setItem('user', JSON.stringify(user));
      errorMessage.style.color = 'green';
      errorMessage.textContent = 'Registration successful!';
  
      form.reset();
    });
  });