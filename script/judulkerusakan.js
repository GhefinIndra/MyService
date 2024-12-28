document.getElementById('send-button').addEventListener('click', function () {
    handleSendMessage();
});

document.getElementById('problem-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Mencegah form submit
        handleSendMessage();
    }
});

function handleSendMessage() {
    const input = document.getElementById('problem-input');
    const message = input.value.trim();

    if (message === '') {
        alert('Masukkan permasalahan terlebih dahulu!');
        return;
    }

    // Simulasi pengiriman data
    console.log('Data yang dikirim:', message);

    // Kirim data ke server untuk disimpan
    const userId = localStorage.getItem('user_id');

    const currentDate = new Date();

    // Get the year, month, and day
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0'); // Pad single digit day with leading zero

    // Format as YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;                    
    
    fetch('http://localhost:3000/saveDamage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            chat_name: message, 
            date : formattedDate,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Kerusakan berhasil disimpan');
            // Redirect ke halaman aichat.html setelah mengirim
            setTimeout(() => {
                window.location.href = 'aichat.html';
            }, 1000); // Delay untuk simulasi
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
    });
}

function backToBeranda() {
    window.location.href = 'beranda.html';
}