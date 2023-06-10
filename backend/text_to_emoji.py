import torch
import torch.nn as nn
import json
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import emoji

def predict(tweet, bertweet_model, tokenizer, device):
    # Step 1: Tokenize and prepare the input tweet for the BERTweet model
    inputs = tokenizer(tweet, return_tensors="pt", max_length=128, padding="max_length", truncation=True)
    input_ids = inputs['input_ids'].to(device)
    attention_mask = inputs['attention_mask'].to(device)

    # Step 2: Feed the input to the BERTweet model and obtain the predictions
    with torch.no_grad():
        outputs = bertweet_model(input_ids, attention_mask=attention_mask)
        _, predicted_idx = torch.max(outputs.logits, 1)

    predicted_idx = predicted_idx.item()
    
    return predicted_idx

def initialize():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print("Using device:", device)
    tokenizer = AutoTokenizer.from_pretrained("./bertweet_model")
    bertweet = AutoModelForSequenceClassification.from_pretrained("./bertweet_model")

    return device, tokenizer, bertweet

def get_emoji_element(emoji_input):
    img_html_list = []
    emoji_name = emoji.demojize(emoji_input, delimiters=('', '')).replace("_", " ").lower()
    print(emoji_name)
    with open("./emoji_name.txt", "r") as f:
        for line in f:
            filename = line.strip()
            if emoji_name in filename.lower():
                base_url = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis"
                filename = filename.replace(" ", "%20")
                emoji_url = f"{base_url}/{filename}"  # Construct the URL
                img_html = f'<img src="{emoji_url}" alt="{emoji_name}" width="25" height="25" />'
                img_html_list.append(img_html)
                return emoji_url, emoji_name
    if img_html_list == []:
        return emoji_input, emoji_name
