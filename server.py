from flask import Flask, request, jsonify, render_template
from openai import OpenAI

# ServerArea

app = Flask(__name__)
client = OpenAI(api_key="disinipokoknyaapikey")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data["message"]
        response = client.responses.create(
            model="gpt-4.1-mini",
            input=user_message
        )
        reply = response.output[0].content[0].text
        return jsonify({"reply": reply})
    except Exception as e:
        print("ERROR:", e)
        return jsonify({
            "reply": "Server error: " + str(e)
        })

if __name__== "__main__":
    app.run(debug=True)