from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

#APIAREA
api_key = os.getenv("GEMINI_API_KEY")

model = None
if api_key:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.5-flash")

#APIAREAEND

@app.route("/")
def index():
    return render_template("index.html")

#CHATBOT
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "")

        # validasi
        if not user_message or len(user_message.strip()) < 5:
            return jsonify({"reply": "Masukkan teks yang lebih jelas"})

        if not model:
            return jsonify({"reply": "API Gemini belum dikonfigurasi"})

        #Prompt
        prompt = f"""
Kamu adalah AI deteksi hoaks berbasis literasi digital.

Tugas:
- Tentukan apakah teks termasuk Hoaks, Valid, atau Perlu Verifikasi
- Gunakan logika, pengetahuan umum, dan konteks dunia nyata

ATURAN:
- Klaim tidak masuk akal → Hoaks
- Klaim besar tanpa sumber → Perlu Verifikasi
- Jangan terlalu netral, beri keputusan tegas

Teks:
"{user_message}"

Format WAJIB:

Label: (Hoaks / Valid / Perlu Verifikasi) + persen keyakinan

Indikator:
- minimal 3 alasan jelas

Saran:
- langkah verifikasi fakta
"""

        #Request Respon
        response = model.generate_content(prompt)

        reply = response.text

        if not reply or reply.strip() == "":
            reply = "AI tidak memberikan respon, coba lagi."

        return jsonify({"reply": reply})

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"reply": "Terjadi kesalahan server"})
#CHATBOTEND

#RouteTesting
@app.route("/test")
def test():
    return "Gemini AI Detector Ready 🚀"


if __name__ == "__main__":
    app.run(debug=True)