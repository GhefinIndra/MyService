function backToBeranda() {
    window.location.href = 'beranda.html';
    }
    
    function logout(){
        localStorage.setItem('user_id', '0');
        window.location.href = 'login.html';
    }
    document.addEventListener("DOMContentLoaded", () => {

        // Get the user ID from localStorage or session
        const userId = localStorage.getItem('user_id'); // This should be dynamically set

        // Fetch user data from the server
        fetch(`http://localhost:3000/getUserData/${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Check what data you are receiving from the backend

                if (data.name) {
                    // Populate the profile fields with the data
                    document.querySelector('.text.name').textContent = data.name;
                    document.querySelector('.text.email').textContent = data.email;

                    // Format the birthdate to 'yyyy-mm-dd'
                    let formattedBirthdate = formatDate(data.birthdate);
                    document.querySelector('.text.birthdate').textContent = formattedBirthdate || 'Not provided';
                    
                    document.querySelector('.text.phone').textContent = data.phone || 'Not provided';
                    document.querySelector('.text.sex').textContent = data.sex || 'Not provided';
                } else {
                    alert('User not found.');
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

        // Function to format date to yyyy-mm-dd
        function formatDate(dateString) {
            const date = new Date(dateString);
            if (!date.getTime()) return '';  // Return empty string if date is invalid

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
            const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed

            return `${year}-${month}-${day}`;
        }


        // Handle "Edit" button clicks for updating user information
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => {
                const fieldKey = button.previousElementSibling.classList[1]; // e.g., 'name', 'email', etc.
                const currentValue = button.previousElementSibling.textContent;

                const newValue = prompt(`Update your ${fieldKey}:`, currentValue);
                if (newValue === null || newValue.trim() === '') return; // Cancelled or empty input

                // Update the field immediately in the UI
                button.previousElementSibling.textContent = newValue;

                // Send the update to the server
                const payload = { user_id: userId, [fieldKey]: newValue };
                fetch('http://localhost:3000/updateUserData', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                })
                    .then(response => response.json())
                    .then(result => {
                        if (!result.success) {
                            alert(`Failed to update ${fieldKey}: ${result.message}`);
                        }
                    })
                    .catch(error => console.error('Error updating user data:', error));
            });
        });
    });