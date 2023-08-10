from flask import Flask, jsonify, request  # Import 'request' module
from flask_cors import CORS
from youtube_search import YoutubeSearch
import yt_dlp

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/get_data',methods=['GET'])
def get_data():
    keyword=request.args.get('keyword')
    results = YoutubeSearch(keyword, max_results=100).to_dict()
    if results:
        return results

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
