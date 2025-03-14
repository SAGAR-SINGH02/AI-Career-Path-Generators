from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Set your OpenAI API key
openai.api_key = "your-openai-api-key"

# System message to define the chatbot's role
system_message = {
    "role": "system",
    "content": "You are a career guidance assistant. Provide personalized career recommendations and insights."
}

@app.route('/chat', methods=['POST'])
def chat():
    # Get user input from the frontend
    user_input = request.json.get('message')

    # Call OpenAI API
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            system_message,
            {"role": "user", "content": user_input}
        ]
    )

    # Extract the chatbot's reply
    bot_reply = response['choices'][0]['message']['content']

    # Return the reply to the frontend
    return jsonify({"reply": bot_reply})

if __name__ == '__main__':
    app.run(debug=True)