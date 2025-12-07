# BNCC Elite Team - Advanced Recruitment System (Mini Project 2)

Aplikasi manajemen rekrutmen lanjutan yang merupakan pengembangan dari prototype sebelumnya. Versi ini telah di-upgrade sepenuhnya menjadi aplikasi **Full Stack (Backend)** dengan integrasi Database, ORM, dan fitur Upload File.

---

## 🚀 Fitur Baru (Upgrade dari Project 1)

1. **Database Integration (Prisma ORM & SQLite)**
   - Tidak lagi menggunakan file JSON. Semua data disimpan persisten di database relasional.
   - Menggunakan **Prisma ORM** untuk query dan manajemen skema yang lebih aman dan cepat.
   - Implementasi Relasi **One-to-Many**: Satu `Division` memiliki banyak `Candidate`.

2. **Manajemen File (Upload Foto Profil)**
   - Integrasi library **Multer** untuk menangani upload file `multipart/form-data`.
   - File fisik disimpan di server lokal (`public/uploads`), sedangkan nama file disimpan di database.
   - Fitur otomatis **hapus foto lama** saat data di-update atau di-delete (untuk menghemat penyimpanan server).

3. **CRUD Lengkap**
   - **Create:** Menambah kandidat baru beserta foto profil.
   - **Read:** Menampilkan data kandidat dengan *join query* ke tabel Divisi.
   - **Update:** Mengedit informasi kandidat dan mengganti foto profil.
   - **Delete:** Menghapus data kandidat dari DB sekaligus menghapus file foto fisik dari storage.

4. **Automated Seeding**
   - Script `prisma/seed.js` untuk mengisi database secara otomatis dengan 20+ data dummy yang bervariasi (Random GPA & Divisi).

---

## 🛠️ Teknologi yang Digunakan

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (File-based database, dev environment)
- **ORM:** Prisma
- **File Upload:** Multer
- **Templating:** Native HTML/CSS (Server-Side Rendering)

---

## ⚙️ Panduan Instalasi & Menjalankan

Ikuti langkah-langkah ini agar aplikasi berjalan lancar di komputer Anda:

### 1. Clone & Install
Pastikan Node.js sudah terinstall, lalu jalankan terminal:

```bash
git clone [https://github.com/DavidLauda/SinarDigital_BE_MiniProject2](https://github.com/DavidLauda/SinarDigital_BE_MiniProject2_DavidNoahVincentLauda_5.git
cd SinarDigital_BE_MiniProject2_DavidNoahVincentLauda_5
npm install
```

### 2. Setup Database (Migrasi)
Perintah ini akan membaca file `schema.prisma` dan membuat file database `dev.db` beserta tabelnya secara otomatis.

```bash
npx prisma migrate dev --name init
```
*Pastikan tidak ada error saat menjalankan perintah ini.*

### 3. Isi Data Awal (Seeding)
Jangan input manual satu per satu! Jalankan perintah ini untuk mengisi database dengan 20 data kandidat dummy.

```bash
node prisma/seed.js
```
*Output sukses: "Seeding completed successfully"*

### 4. Jalankan Server
Nyalakan server aplikasi:

```bash
node src/app.js
```
Akses aplikasi di browser: `http://localhost:3000`
