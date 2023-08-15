import { useEffect, useState } from 'react';
import AudioPlayer from './AudioPlayer';

export default function AudioUrl(props) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cardState, setcardState] = useState(false);

  useEffect(() => {
    if (props.cardid) {
      setcardState(true);
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

  return (
    <div className="fixed-bottom bg-light text-white d-flex justify-content-center align-items-center"
    style={{ height: "60px" }}
   >
      {videoUrl && !loading ? (<AudioPlayer videoUrl={videoUrl} state={cardState}/>) : (<AudioPlayer videoUrl={""} state={cardState}/>)}
    </div>
  );
}
