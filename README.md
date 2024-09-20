# Dokumentasi Repo Backend Website Tekmart

## Daftar Isi

- [Pendahuluan](#pendahuluan)
- [Prasyarat](#prasyarat)
- [Kloning Repository](#kloning-repository)
- [Instalasi dan Konfigurasi](#instalasi-dan-konfigurasi)
- [Struktur Folder Proyek](#struktur-folder-proyek)
  - [1. `configs/`](#1-configs)
  - [2. `controllers/`](#2-controllers)
  - [3. `routes/`](#3-routes)
  - [4. `models/`](#4-models)
  - [5. `middleware/`](#5-middleware)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Referensi](#referensi)

---

## Pendahuluan

Tekmart merupakan kantin jajanan di gedung SGLC. Produk unggulan Tekmart yaitu variasi snack, makanan berat, dan es krim. Tekmart sering dikunjungi karena lokasinya dekat dengan lift tempat mahasiswa keluar masuk. Hal ini menyebabkan Tekmart sering ramai dikunjungi.

Salah satu problem yang menjadi perhatian kami adalah *padatnya pengunjung* yang disebabkan mahasiswa yang diam di tempat karena *bingung memilih produk* sehingga menyebabkan tekmart menjadi penuh dan kurang efisien. Ini mengganggu kenyamanan pengunjung lain yang ingin membeli produk, terutama saat pergantian jam perkuliahan karena keterbatasan waktu.

Proyek ini merupakan implementasi solusi aplikasi pre-order Tekmart menggunakan **Express.js** yang dibangun dengan struktur folder yang terorganisir untuk memudahkan pengembangan dan pemeliharaan kode backend. Dengan memisahkan konfigurasi, controller, route, model, dan middleware, tim dapat mengembangkan aplikasi yang scalable dan mudah diatur.

## Prasyarat

Sebelum memulai, pastikan telah menginstal:

- **Node.js** (versi 12 atau lebih baru)
- **npm** atau **yarn**
- **Git**

## Kloning Repository

Untuk memulai proyek ini, kloning repository ke komputer lokal menggunakan perintah berikut:

```bash
git clone https://github.com/username/nama-repo.git
```

Gantilah `https://github.com/username/nama-repo.git` dengan URL repository.

## Instalasi dan Konfigurasi

Masuk ke direktori proyek dan instal dependensi yang diperlukan:

```bash
cd nama-repo
npm install
```

Atau jika menggunakan **yarn**:

```bash
cd nama-repo
yarn install
```

## Struktur Folder Proyek

Berikut adalah gambaran struktur folder yang digunakan dalam proyek ini:

```
├── configs/
├── controllers/
├── routes/
├── models/
├── middleware/
├── app.js
└── package.json
```

### 1. `configs/`

Folder ini berisi konfigurasi aplikasi, seperti pengaturan database, port server, atau konfigurasi lain yang diperlukan.

**Contoh:**

- `configs/database.js` – Mengatur koneksi ke database MongoDB.
- `configs/server.js` – Menyimpan konfigurasi port dan lingkungan.

**Contoh kode `configs/database.js`:**

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/nama-database', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Terhubung ke database MongoDB');
  } catch (error) {
    console.error('Koneksi database gagal', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### 2. `controllers/`

Controller berisi logika bisnis aplikasi. Folder ini menangani permintaan (request) dan memberikan respons (response) yang sesuai.

**Contoh:**

- `controllers/userController.js` – Mengelola operasi terkait pengguna seperti registrasi, login, dan profil.

**Contoh kode `controllers/userController.js`:**

```javascript
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  // Logika untuk mendaftarkan pengguna baru
};

exports.loginUser = async (req, res) => {
  // Logika untuk login pengguna
};
```

### 3. `routes/`

Folder ini berisi definisi route yang memetakan URL endpoint ke controller yang sesuai.

**Contoh:**

- `routes/userRoutes.js` – Mendefinisikan route untuk operasi pengguna.

**Contoh kode `routes/userRoutes.js`:**

```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
```

### 4. `models/`

Model mewakili struktur data dalam aplikasi dan berinteraksi dengan database.

**Contoh:**

- `models/User.js` – Mendefinisikan skema pengguna menggunakan Mongoose.

**Contoh kode `models/User.js`:**

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  kataSandi: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
```

### 5. `middleware/`

Middleware adalah fungsi yang dieksekusi selama siklus permintaan-respons yang digunakan untuk memodifikasi permintaan atau respons sebelum mencapai controller atau klien.

**Contoh:**

- `middleware/auth.js` – Memverifikasi token autentikasi untuk endpoint yang memerlukan akses terbatas.

**Contoh kode `middleware/auth.js`:**

```javascript
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Logika untuk memverifikasi token JWT
};
```

## Menjalankan Aplikasi

Setelah semua konfigurasi dan instalasi selesai, aplikasi dapat dijalankan dengan perintah berikut:

```bash
node app.js
```

Atau jika menggunakan **nodemon** untuk auto-reload saat pengembangan:

```bash
nodemon app.js
```

Aplikasi akan berjalan pada port yang telah ditentukan (misalnya, `http://localhost:3000`). Tim dapat mengubah nomor port di file konfigurasi jika diperlukan.

**Contoh kode `app.js`:**

```javascript
const express = require('express');
const connectDB = require('./configs/database');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Menghubungkan ke database
connectDB();

// Middleware untuk parsing JSON
app.use(express.json());

// Menggunakan route pengguna
app.use('/api/users', userRoutes);

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada http://localhost:${PORT}`);
});
```

## Referensi

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Video Tutorial Express.js dan MongoDB](https://youtu.be/_7UQPve99r4)