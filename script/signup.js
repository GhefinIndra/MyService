document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form data
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Password dan konfirmasi password tidak cocok!");
        return;
    }

    // Send data to server
    const userData = {
        username: username,
        email: email,
        password: password
    };

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Akun berhasil dibuat!");
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            alert("Gagal membuat akun: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat mengirim data!");
    });
});