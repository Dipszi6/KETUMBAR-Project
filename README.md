# 🛡️ AI Anti-Hoax Detector V.1.0

## 📌 Deskripsi Project

AI Anti-Hoax Detector adalah aplikasi berbasis web yang dirancang untuk membantu pengguna dalam mengidentifikasi potensi informasi hoaks secara cepat dan sederhana.
Aplikasi ini menggunakan teknologi Artificial Intelligence (AI) berbasis Natural Language Processing (NLP) untuk menganalisis teks berita, unggahan, atau informasi yang diberikan oleh pengguna.
Sistem tidak hanya memberikan label klasifikasi, tetapi juga menyertakan indikator analisis serta saran verifikasi, sehingga pengguna dapat meningkatkan literasi digital dan kemampuan berpikir kritis.

## 🎯 Tujuan

- Membantu pengguna mendeteksi informasi hoaks secara cepat
- Meningkatkan literasi digital masyarakat
- Memberikan edukasi mengenai ciri-ciri informasi palsu
- Menyediakan platform pembelajaran berbasis AI

## 🚀 Fitur Utama

### 1. 🔍 Deteksi Hoaks Berbasis AI

- Input teks bebas dari pengguna
- Analisis menggunakan AI (Gemini API)
- Output berupa:

  - Label (Hoaks / Valid / Perlu Verifikasi)
  - Confidence (%)
  - Indikator analisis
  - Saran verifikasi

### 2. ⚠️ Indikator Hoaks (Explainable AI)

AI tidak hanya memberi hasil, tetapi juga menjelaskan alasan:

- Clickbait / judul sensasional
- Klaim berlebihan
- Sumber tidak jelas
- Ajakan menyebarkan cepat
- Informasi tanpa bukti

### 3. ✅ Saran Verifikasi Fakta

Sistem memberikan langkah praktis:

- Cek media resmi
- Bandingkan dengan sumber terpercaya
- Gunakan platform cek fakta
- Hindari menyebarkan tanpa verifikasi

### 4. 💬 Interface Chat Interaktif

- UI sederhana berbasis chat
- Input cepat (Enter support)
- Respons AI real-time
- Scroll otomatis

### 5. 🧪 Evaluasi Model (Testing)

- Menggunakan dataset mini (≥30 data)
- Menghitung akurasi model
- Mendukung pengujian sistem AI sederhana

### 6. 🧠 Hybrid Mode (AI + Rule-Based Fallback)

- AI utama menggunakan Gemini API
- Fallback ke rule-based jika API error
- Menjamin sistem tetap berjalan saat offline / limit API

## 🏗️ Arsitektur Sistem

Frontend → Backend (Flask) → AI Engine (Gemini API) → Response → UI

Komponen:

- Frontend: HTML, CSS, JavaScript
- Backend: Python Flask
- AI Engine: Google Gemini API
- Dataset: JSON (manual / mini dataset)

## 🗂️ Struktur Project

```
project/
│
├── server.py
├── dataset.json
├── .env
├── .gitignore
├── modul.json
│
├── templates/
│   └── index.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── hoax.js
```

## ⚙️ Instalasi & Setup

### 1. Clone Repository

```bash
git clone https://github.com/username/repository.git
cd repository
```

### 2. Install Dependency

```bash
pip install -r requirements.txt
```

atau manual:

```bash
pip install flask python-dotenv google-generativeai
```

### 3. Setup Environment Variable

Buat file `.env`:

```
GEMINI_API_KEY=your_api_key_here
```

### 4. Jalankan Server

```bash
python server.py
```

Buka di browser:

```
http://127.0.0.1:5000
```

## 📊 Dataset

* Dataset mini hoaks vs valid
* Format JSON
* Digunakan untuk evaluasi model

Contoh:

```json
{
  "text": "Minum air garam menyembuhkan semua penyakit",
  "label": "hoaks"
}
```

## 🔒 Keamanan

- API Key disimpan di `.env`
- Menggunakan `.gitignore` untuk proteksi
- Backend sebagai penghubung API (tidak expose key)

## ⚠️ Limitasi

- Bergantung pada API AI (rate limit / quota)
- Akurasi tergantung kualitas prompt & model
- Dataset masih skala kecil
- Belum menggunakan model ML training sendiri

## 🌟 Pengembangan Selanjutnya

* Dashboard admin dataset
* Sistem login user
* Visualisasi hasil (chart)
* Integrasi API cek fakta
* Model ML lokal (tanpa API)
* Fitur upload link berita
* Kuis edukasi anti-hoaks

## 👨‍💻 Teknologi yang Digunakan

* Python (Flask)
* HTML, CSS, JavaScript
* Google Gemini API
* JSON Dataset

## 📌 Status Project

🚧 Development (Prototype)

## 🤝 Kontribusi

Project ini dibuat untuk keperluan akademik dan pengembangan pembelajaran AI.

## 📄 Lisensi

Free to use for educational purposes.

## Team 
Pradipa A.
Alif S.
Boni S.
Ziyya U.
