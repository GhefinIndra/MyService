document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('user_id');

    fetch(`http://localhost:3000/getDamageHistory/${userId}`)
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message); // Menampilkan pesan jika tidak ada riwayat
        } else {
            const historyList = document.querySelector('.history-list');
            data.forEach(damage => {
                const historyItem = document.createElement('div');
                historyItem.classList.add('history-item');
                historyItem.onclick = function() {
                    openChat(damage.chat_name);
                };

                // Format the date into YYYY-MM-DD
                const formattedDate = formatDate(damage.date);

                const historyContent = `
                    <h3>${damage.chat_name}</h3>
                    <p>${formattedDate}</p>
                `;
                historyItem.innerHTML = historyContent;
                historyList.appendChild(historyItem);
            });
        }
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
    });
});

// Function to format date into YYYY-MM-DD
function formatDate(dateString) {
    const date = new Date(dateString);
    // Convert the date to ISO format (YYYY-MM-DD) and extract the date part
    return date.toISOString().split('T')[0];
}

// Fungsi untuk membuka halaman AIchat.html
// function openChat(issue) {
//     const chatbotURL = `https://your-chatAI-service.com?query=${encodeURIComponent(issue)}`;
//     window.open(chatbotURL, '_blank'); // Buka chatbot di tab baru
// }
function openChat(issue) {
    const chatbotURL = `AIchat.html?query=${encodeURIComponent(issue)}`;
    window.location.href = chatbotURL; // Redirect ke halaman AIchat.html
}

function backToBeranda() {
    window.location.href = 'beranda.html';
}