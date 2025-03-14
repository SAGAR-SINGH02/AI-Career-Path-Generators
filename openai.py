import openai

import os

openai.api_key = os.getenv("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")  # Use environment variable for API key


def get_career_recommendation(user_input):
    try:
        response = openai.ChatCompletion.create(

        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a career guidance assistant. Provide personalized career recommendations and insights."},
            {"role": "user", "content": user_input}
        ]
    )
    except Exception as e:
        return f"An error occurred: {str(e)}"  # Handle errors gracefully
