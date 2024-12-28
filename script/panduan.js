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

    function toggleMenu() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.style.display === 'none' || sidebar.style.display === '') {
            sidebar.style.display = 'block'; // Show sidebar
        } else {
            sidebar.style.display = 'none'; // Hide sidebar
        }
    }

    function navigateToProfile() {
        window.location.href = 'profile.html';
    }

    function navigateToHistory() {
        window.location.href = 'HistoriKerusakan.html';
    }
    function navigateToContactUs() { 
        window.location.href = 'contactus.html';  
    }