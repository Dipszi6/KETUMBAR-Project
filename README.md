# 🛡️ AntiHoax AI Web App

Website edukasi literasi digital berbasis AI untuk membantu pengguna mendeteksi hoaks, memahami karakteristiknya, serta melatih kemampuan analisis melalui modul dan quiz interaktif.

---

## 🚀 Fitur Utama

### 🤖 Chatbot AI Deteksi Hoaks

* Menggunakan **Google Gemini 2.5 Flash API**
* Analisis teks menjadi:

  * **Hoaks**
  * **Valid**
  * **Perlu Verifikasi**
* Output terstruktur:

  * Label + persentase keyakinan
  * Indikator (alasan)
  * Saran verifikasi

---

### 📚 Modul Pembelajaran

* Materi literasi digital dalam bentuk card interaktif
* Dibuka melalui popup modal
* Progress tersimpan (localStorage)
* Topik:

  1. Pengenalan Hoaks
  2. Ciri-ciri Hoaks
  3. Jenis Hoaks
  4. Cara Verifikasi
  5. Sumber Terpercaya
  6. Latihan Analisis
  7. Kesimpulan

---

### 🧠 Quiz Interaktif

* 10 soal pilihan ganda
* Sistem skor otomatis
* Feedback hasil:

  * Benar / Salah
  * Review jawaban
* Progress bar & statistik

---

### 🎨 UI/UX

* Responsive layout
* Card-based design
* Popup modal
* Scroll navigation aktif
* Animasi ringan
* Chat UX (typing indicator + auto scroll)

---

## 🛠️ Teknologi yang Digunakan

### Backend

* Python (Flask)
* Google Generative AI (Gemini API)
* dotenv (environment config)

### Frontend

* HTML5
* CSS3 (Grid & Flexbox)
* JavaScript (Vanilla)

---

## 📂 Struktur Project

```
project/
│
├── server.py
├── .env
│
├── static/
│   ├── hoax.js
│   ├── style.css
│   ├── modul.json
│   └── questions.json
│
├── templates/
│   └── index.html
│
└── README.md
```

---

## ⚙️ Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/username/antihoax-ai.git
cd antihoax-ai
```

### 2. Install Dependency

```bash
pip install flask python-dotenv google-generativeai
```

### 3. Setup API Key

Buat file `.env`:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

---

### 4. Jalankan Server

```bash
python server.py
```

Buka di browser:

```
http://localhost:5000
```

---

## 🔒 Keamanan

* API key disimpan di `.env`
* `.env` sudah di-ignore oleh `.gitignore`
* Validasi input user
* Error handling untuk API

---

## ⚡ Optimasi

* Prompt AI sudah dioptimalkan (hemat token)
* Retry system untuk menghindari rate limit
* Disable button saat request (anti spam)
* Loading indicator untuk UX

---

## 🎯 Tujuan Project

* Meningkatkan literasi digital
* Membantu pengguna mengenali hoaks
* Menggabungkan AI + edukasi interaktif

---

## 📈 Status Development

```
✔ Chatbot AI        (100%)
✔ Modul Edukasi     (100%)
✔ Quiz              (100%)
✔ UI/UX             (100%)
✔ Integrasi API     (100%)
```

---

## 🚀 Pengembangan Selanjutnya

* Login & user tracking
* Penyimpanan history analisis
* Dashboard statistik
* Deploy ke hosting publik

---

## 👨‍💻 Author
Pradipa A. Ziyya R. Alif S. Bony S.

---

## 🏁 Penutup

Project ini menggabungkan; Teknologi AI, Edukasi, Interaksi pengguna. Dengan tujuan memberikan solusi sederhana namun efektif dalam menghadapi penyebaran hoaks di era digital.

---
