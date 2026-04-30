from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
from dotenv import load_dotenv
import os
import time

load_dotenv()

app = Flask(__name__)

#API KEY CONFIG
api_key = os.getenv("GEMINI_API_KEY")

model = None
if api_key:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-2.5-flash")

# ROUTE
@app.route("/")
def index():
    return render_template("index.html")

# CHATBOT
def ask_model(prompt, retries=2, delay=1):
    for i in range(retries + 1):
        try:
            response = model.generate_content(prompt)

            if response and getattr(response, "text", None):
                return response.text

        except Exception as e:
            print("TRY ERROR:", e)

        if i < retries:
            time.sleep(delay)

    return "Mohom maaf, sistem sedang sibuk, anda bisa coba lagi nanti."


@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "")
        
        if not user_message or len(user_message.strip()) < 5:
            return jsonify({"reply": "Masukkan teks yang lebih jelas"})

        if len(user_message) > 200:
            return jsonify({"reply": "Teks terlalu panjang (maks 200 karakter)"})

        if not model:
            return jsonify({"reply": "API belum dikonfigurasi"})

        #PROMPT
        prompt = f"""
Analisis teks berikut dan tentukan apakah termasuk Hoaks, Valid, atau Perlu Verifikasi.

Teks:
"{user_message}"

Aturan:
- Beri keputusan tegas
- Minimal 3 indikator
- Jangan menjawab di luar format

Format jawaban:

Label: (Hoaks / Valid / Perlu Verifikasi) - (xx%)
Indikator:
- ...
- ...
- ...
Saran:
- ...
- ...
"""
        reply = ask_model(prompt)

        if not reply or reply.strip() == "":
            reply = "⚠️ AI tidak memberikan respon, coba lagi."

        return jsonify({"reply": reply})

    except Exception as e:
        print("ERROR:", e)
        return jsonify({"reply": "⚠️ Terjadi kesalahan server"})

#TEST ROUTE
@app.route("/test")
def test():
    return "Gemini AI Detector Ready 🚀"

# RUN APP
if __name__ == "__main__":
    app.run(debug=True)