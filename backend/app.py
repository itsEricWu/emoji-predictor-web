from flask import Flask
from flask import request
from flask_cors import CORS
from text_to_emoji import initialize, predict, get_emoji_element
import json

app = Flask(__name__)
CORS(app)

device, tokenizer, bertweet = initialize()

@app.route("/get_emoji", methods=["POST", "GET"])
def get_emoji():
    tweet = request.get_json()["text"]
    label = predict(tweet, bertweet, tokenizer, device)
    print(f"Predicted label: {label}")

    json_file = open('emoji.json')
    emoji_map = json.load(json_file)
    reversed_emoji_map = {value: key for key, value in emoji_map.items()}
    predicted_emoji = reversed_emoji_map[label].strip()
    print(f"Predicted emoji: {predicted_emoji}")

    emoji_url, emoji_name = get_emoji_element(predicted_emoji)

    return json.dumps({"src": emoji_url, "alt": emoji_name})


if __name__ == "__main__":
    app.run(port=5000, debug=True)