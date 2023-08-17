import React from 'react';

export default function Audiocard(props) {
  const cardid = () => {
    props.getid(props.id);
    props.gettitle(props.title);
    props.getthumbnail(props.thumbnail);
  };

  // Convert the duration to seconds and subtract one second
  const modifiedDuration = subtractOneSecond(props.duration);

  return (
    <div onClick={cardid} style={{ border: 'none' }}>
      <div style={{ position: 'relative' }}>
        <img className="card-img-top" src={props.thumbnail} alt={props.title} style={{ objectFit: 'cover' }} />
        <span className="badge rounded-pill bg-dark position-absolute bottom-0 end-0 m-2" style={{ zIndex: 1 }}>
          {modifiedDuration}
        </span>
      </div>
      <div className="card-body" style={{color:"white"}}>
        <p className="card-text ">{props.title}</p>
      </div>
    </div>
  );
}

// Function to subtract one second from a duration in the format "MM:SS"
function subtractOneSecond(duration) {
  const [minutes, seconds] = duration.split(':');
  const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
  const newTotalSeconds = Math.max(totalSeconds - 1, 0); // Ensure it doesn't go negative
  const newMinutes = Math.floor(newTotalSeconds / 60);
  const newSeconds = newTotalSeconds % 60;
  return `${newMinutes}:${newSeconds < 10 ? '0' : ''}${newSeconds}`;
}
