import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

export default function AudioUrl(props) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (props.cardid) {
      const fetchVideoUrl = async () => {
        setLoading(true);
        const url = `http://127.0.0.1:8000/get_audio_url?id=${props.cardid}`;
        const response = await fetch(url);
        const data = await response.json();
        setVideoUrl(data.url);
        setLoading(false);
        setIsPlaying(true);
      };
      fetchVideoUrl();
    }
  }, [props.cardid]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      {videoUrl && !loading ? (
        <ReactPlayer
          url={videoUrl}
          controls
          playing={isPlaying}
          onPause={handlePause}
          onPlay={handlePlay}
        />
      ):<ReactPlayer
      url={""}
      controls
      playing={isPlaying}
      onPause={handlePause}
      onPlay={handlePlay}
    /> }
    </div>
  );
}
