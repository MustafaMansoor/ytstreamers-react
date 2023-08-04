from flask import Flask, jsonify
from flask_cors import CORS
from youtube_search import YoutubeSearch
import yt_dlp

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# def main():
#     result= get_data()
#     urls=[]
#     for data in result:
#         urls.append(get_audio_url(data['id']))
#     return urls


@app.route('/get_data')
def get_data():
    results = YoutubeSearch('somebody that i used to know', max_results=100).to_dict()
    if results:
        return results


def get_audio_url(results_id):
    video_link = 'https://www.youtube.com/watch?v=' + results_id
    ydl_opts = {
        'format': 'bestaudio[ext=m4a]',
        'quiet': True,
    }
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(video_link, download=False)
        return info_dict['url']
    
if __name__ == '__main__':
    app.run(debug=True, port=8000)
