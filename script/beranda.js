const userId = localStorage.getItem('user_id');

if (userId) {
    fetch(`http://localhost:3000/getUserData/${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data.name && data.email) {
                // Update the sidebar with the user's name and email
                document.querySelector('#userName').textContent = data.name;
                document.querySelector('#userEmail').textContent = data.email;
            } else {
                console.log('User data not available');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
} else {
    console.log('No user_id found');
}

function toggleMenu() { // Untuk menampilkan sidebar dari kelas hamburger menu
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('show');  // Use a class toggle for better visibility handling
}

function navigateToProfile() { // Menuju halaman Profil pengguna yang login
    window.location.href = 'profile.html';  
}

function navigateTojudulkerusakan() { // Menuju halaman chat AI
    window.location.href = 'judulkerusakan.html';
}

function navigateToHistory() {
    window.location.href = 'HistoriKerusakan.html';
}

function navigateToContactUs() { // Menambahkan fungsi untuk mengarahkan ke halaman Contact Us
    window.location.href = 'contactus.html';  // Mengarahkan ke halaman contactus.html
}