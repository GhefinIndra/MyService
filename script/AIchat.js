
// Fungsi kirim pesan
function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;
    // if (userInput === '') {
    //     alert('Masukkan permasalahan terlebih dahulu!');
    //     return;
    // }

    // Tambah pesan pengguna ke chat box
    const chatBox = document.getElementById("chat-box");
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");
    userMessage.innerHTML = `
        <div class="sender">Anda:</div>
        <div class="text">${userInput}</div>
    `;
    chatBox.appendChild(userMessage);

    // Simulasikan respons AI
    const aiMessage = document.createElement("div");
    aiMessage.classList.add("message");
    aiMessage.innerHTML = `
        <div class="sender">ChatAI:</div>
        <div class="text">Terima kasih sudah menghubungi kami. Apa yang bisa saya bantu?</div>
    `;

    //// Untuk pengujian respons timeout
    // setTimeout(() => {
    //     const errorMessage = document.createElement("div");
    //     errorMessage.classList.add("message");
    //     errorMessage.innerHTML = `
    //         <div class="sender">ChatAI:</div>
    //         <div class="text">Maaf, kami tidak dapat memproses permintaan Anda saat ini.</div>
    //     `;
    //     chatBox.appendChild(errorMessage);
    //     chatBox.scrollTop = chatBox.scrollHeight;
    // }, 3000);

    chatBox.appendChild(aiMessage);

    // Scroll ke bawah
    chatBox.scrollTop = chatBox.scrollHeight;

    // Kosongkan input
    document.getElementById("user-input").value = "";
}

// Deteksi tombol Enter pada input
document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
        event.preventDefault();
    }
});

// Fungsi kembali ke Beranda
function backToBeranda(){
    window.location.href = 'beranda.html';
}
