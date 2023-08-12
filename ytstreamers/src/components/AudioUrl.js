import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

export default function AudioUrl(props) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.cardid) {
      const fetchVideoUrl = async () => {
        setLoading(true);
        const url = `http://127.0.0.1:8000/get_audio_url?id=${props.cardid}`;
        const response = await fetch(url);
        const data = await response.json();
        setVideoUrl(data.url);
        setLoading(false);
      };
      fetchVideoUrl();
    }
  }, [props.cardid]);

  const audioPlayerStyle = {
    width: '100%', // Set the desired width here
    maxWidth: '1500px', // Set a maximum width if needed
  };

  return (
    <div className="fixed-bottom bg-light text-white d-flex justify-content-center align-items-center" style={{ maxHeight: '55px' }}>
      {videoUrl && !loading ? (
        <ReactAudioPlayer
          src={videoUrl}
          autoPlay
          controls
          style={audioPlayerStyle} // Apply the width style here
        />
      ) : (
        <ReactAudioPlayer
          src=""
          autoPlay
          controls
          style={audioPlayerStyle} // Apply the width style here
        />
      )}
    </div>
  );
}
