from flask import Flask, jsonify, request  # Import 'request' module
from flask_cors import CORS
from youtube_search import YoutubeSearch
import yt_dlp
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/get_data',methods=['GET'])
def get_data():
    keyword = request.args.get('keyword')
    if keyword is None or keyword.strip() == "":
        keyword = get_keyword()
    results = YoutubeSearch(keyword, max_results=100).to_dict()
    if results:
        return results

def get_keyword():
    keywordarray = ["Taylor Swift", "Beyoncé", "Justin Bieber", "Ariana Grande", "Ed Sheeran", "Rihanna", "Billie Eilish", "Drake", "Post Malone", "Adele", "Bruno Mars", "Lady Gaga", "Shawn Mendes", "Katy Perry", "Selena Gomez", "Harry Styles", "Kanye West", "Nicki Minaj", "The Weeknd", "Maroon 5", "Coldplay", "Lana Del Rey", "BTS", "Camila Cabello", "Demi Lovato", "Halsey", "Khalid", "Lizzo", "Miley Cyrus", "Imagine Dragons", "Sam Smith", "John Legend", "Zayn Malik"]
    
    if keywordarray:
        rand_index = random.randint(0, len(keywordarray) - 1)  
        selected_keyword = keywordarray.pop(rand_index)  
        return selected_keyword
    else:
        return None
    
@app.route('/get_audio_url', methods=['GET'])
def get_audio_url():
    results_id = request.args.get('id')
    if results_id:
        video_link = 'https://www.youtube.com/watch?v=' + results_id
        ydl_opts = {
            'format': 'bestaudio',
            'quiet': True,
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(video_link, download=False)
            return jsonify(url=info_dict['url'])
    else:
        return jsonify(error='Missing video ID parameter'), 400

if __name__ == '__main__':
    app.run(debug=True, port=8000)
