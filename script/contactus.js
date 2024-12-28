const userId = localStorage.getItem('user_id');

        if (userId) {
            fetch(`http://localhost:3000/getUserData/${userId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.name && data.email) {
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

        // Menambahkan event listener untuk menangkap Enter dan kirim data
        const form = document.querySelector('.contact-form');

        form.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Mencegah submit form default
                sendMessage(); // Fungsi untuk mengirim data
            }
        });

        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Hindari submit form default
            sendMessage(); // Kirim data dengan tombol Kirim Pesan
        });

        function sendMessage() {
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const message = document.querySelector('#message').value;
            const userId = localStorage.getItem('user_id'); // Ambil user_id dari localStorage

            if (!name || !email || !message) {
                alert('Semua kolom harus diisi!');
                return;
            }

            if (!userId) {
                alert('User ID tidak ditemukan. Silakan login kembali.');
                return;
            }

            // Kirim data ke server
            fetch('http://localhost:3000/saveMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId, // Sertakan user_id
                    name: name,
                    email: email,
                    message: message,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Pesan sudah terkirim');
                    form.reset(); // Reset form setelah berhasil
                } else {
                    alert('Gagal mengirim pesan, silakan coba lagi.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat mengirim pesan.');
            });
        }

        function backToBeranda() {
            window.location.href = 'beranda.html'; // Arahkan kembali ke halaman beranda
        }

        function toggleMenu() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('show');
        }

        function navigateToProfile() {
            window.location.href = 'profile.html';
        }