const mysql = require('mysql2');

// Konfigurasi koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',     // Sesuaikan dengan host MySQL kamu
  user: 'root',          // Username MySQL
  password: '26Desember!',          // Password MySQL
  database: 'myservice', // Ganti dengan nama database kamu
});

// Uji koneksi ke database
db.connect((err) => {
  if (err) {
    console.error('Gagal terhubung ke database:', err.message);
  } else {
    console.log('Berhasil terhubung ke database!');
  }

  // Tutup koneksi setelah selesai
  db.end((endErr) => {
    if (endErr) {
      console.error('Error saat menutup koneksi:', endErr.message);
    } else {
      console.log('Koneksi ditutup.');
    }
  });
});