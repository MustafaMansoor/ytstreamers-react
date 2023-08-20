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
        const url = `https://pythonyt.azurewebsites.net/get_audio_url?id=${props.cardid}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.url)
        setVideoUrl(data.url);
        setLoading(false);
      };
      fetchVideoUrl();
    }
  }, [props.cardid]);

  return (
    <div
      className="fixed-bottom d-flex justify-content-center align-items-center"
      style={{ height: "60px", backgroundColor: "#0b0c10" }}
    >
      {videoUrl && !loading ? (
        <AudioPlayer
          videoUrl={videoUrl}
          state={cardState}
          cardtitle={props.cardtitle}
          cardthumbnail={props.cardthumbnail}
        />
      ) : (
        <AudioPlayer
          videoUrl={""}
          state={cardState}
          cardtitle={props.cardtitle}
          cardthumbnail={props.cardthumbnail}
        />
      )}
    </div>
  );
}
