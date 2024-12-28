// Handle the form submission using JavaScript
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the form from reloading the page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send a POST request to the backend server
    fetch('http://localhost:3000/login', { // Make sure to point to the correct URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            // Display alert if login failed
            alert(data.message);  // Display error message if login fails
        } else {
            // Store the user ID in localStorage
            localStorage.setItem('user_id', data.user_id);

            // If login is successful, redirect to 'beranda.html'
            window.location.href = 'beranda.html';  // Ensure the URL is correct and accessible
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Redirect to the signup page when the "Daftar" button is clicked
document.getElementById('daftarButton').addEventListener('click', function() {
    window.location.href = 'signup.html';  // Ensure the URL is correct
});