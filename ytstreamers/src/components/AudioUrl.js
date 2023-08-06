import { useEffect, useState } from 'react';
import Play from './Play';

export default function AudioUrl(props) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      setLoading(true);
      const url = `http://127.0.0.1:8000/get_audio_url?id=${props.cardid}`;
      const response = await fetch(url);
      const data = await response.json();
      setVideoUrl(data.url);
      setLoading(false);
    };
    fetchVideoUrl();
  }, [props.cardid]);

  return (
    <div>
      {!loading ? <Play Url={videoUrl}/> : console.log("loading")} 
    </div>
  );
}
