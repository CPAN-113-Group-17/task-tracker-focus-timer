document.getElementById('signin-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('signin-error-message');

    // Clear previous error message
    errorMessage.textContent = '';

    // Validate inputs
    if (email === '' || password === '') {
        errorMessage.textContent = 'Both fields are required.';
        return;
    }

    if (!validateEmail(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
    }

    // Simulate a successful sign-in (you can replace this with actual sign-in logic)
    alert('Sign In successful!');
    document.getElementById('signin-form').reset();
});

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}
