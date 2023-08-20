from flask import Flask, jsonify, request
from flask_cors import CORS
from youtube_search import YoutubeSearch
import yt_dlp
import random

app = Flask(__name__)
CORS(app)

@app.route('/get_data', methods=['GET'])
def get_data():
    keyword = request.args.get('keyword')
    if not keyword or not keyword.strip():
        keyword = get_keyword()
    results = YoutubeSearch(keyword, max_results=100).to_dict()
    if results:
        return jsonify(results)
    return jsonify(error='No results found'), 404

def get_keyword():
    keywordarray = ["Taylor Swift", "Beyoncé", "Justin Bieber", "Ariana Grande", "Ed Sheeran", "Rihanna", "Billie Eilish", "Drake", "Post Malone", "Adele", "Bruno Mars", "Lady Gaga", "Shawn Mendes", "Katy Perry", "Selena Gomez", "Harry Styles", "Kanye West", "Nicki Minaj", "The Weeknd", "Maroon 5", "Coldplay", "Lana Del Rey", "BTS", "Camila Cabello", "Demi Lovato", "Halsey", "Khalid", "Lizzo", "Miley Cyrus", "Imagine Dragons", "Sam Smith", "John Legend", "Zayn Malik"]
    
    if keywordarray:
        selected_keyword = random.choice(keywordarray)
        return selected_keyword
    return None

@app.route('/get_audio_url', methods=['GET'])
def get_audio_url():
    results_id = request.args.get('id')
    if results_id:
        video_link = f'https://www.youtube.com/watch?v={results_id}'
        ydl_opts = {
            'format': 'bestaudio',
            'quiet': True,
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(video_link, download=False)
            return jsonify(url=info_dict.get('url'))
    return jsonify(error='Missing video ID parameter'), 400

if __name__ == '__main__':
    app.run()
