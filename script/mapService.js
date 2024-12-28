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

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
}

function navigateToProfile() {
    window.location.href = 'profile.html';
}

// Fungsi untuk inisialisasi Google Maps
function initMap() {
    // Cek lokasi pengguna menggunakan Geolocation API
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // Buat peta di lokasi pengguna
                const map = new google.maps.Map(document.getElementById("map"), {
                    center: userLocation,
                    zoom: 15
                });

                // Tambahkan marker untuk lokasi pengguna
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "Lokasi Anda"
                });

                // Cari lokasi service HP di sekitar
                const service = new google.maps.places.PlacesService(map);
                service.nearbySearch(
                    {
                        location: userLocation,
                        radius: 5000, // Radius pencarian dalam meter
                        keyword: "service hp" // Kata kunci pencarian
                    },
                    (results, status) => {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            results.forEach(place => {
                                // Tambahkan marker untuk setiap lokasi yang ditemukan
                                new google.maps.Marker({
                                    position: place.geometry.location,
                                    map: map,
                                    title: place.name
                                });
                            });
                        } else {
                            console.error("Pencarian lokasi gagal:", status);
                        }
                    }
                );
            },
            error => {
                console.error("Geolocation gagal:", error);
            }
        );
    } else {
        alert("Geolocation tidak didukung oleh browser Anda.");
    }
}