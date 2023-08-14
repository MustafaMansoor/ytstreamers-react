import React, { useState, useEffect, useRef } from 'react';

export default function AudioPlayer(props) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audioElement.currentTime);
      setDuration(audioElement.duration);
    };

    if (audioElement) {
      audioElement.addEventListener('timeupdate', updateTime);

      if (props.videoUrl && props.state === true) {
        audioElement.play();
        setIsPlaying(true);
      }

      return () => {
        audioElement.removeEventListener('timeupdate', updateTime);
      };
    }
  }, [props.videoUrl, props.state]);

  const handlePlayPause = () => {
    const audioElement = audioRef.current;

    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeChange = (newTime) => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.currentTime = newTime;
    }
  };

  const handleVolumeChange = (newVolume) => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.volume = newVolume;
      setVolume(newVolume);
    }
  };

  return (
    <div className="fixed-bottom bg-light text-white d-flex justify-content-center align-items-center" style={{ maxHeight: '95px' }}>
      <audio ref={audioRef} src={props.videoUrl} autoPlay={false} />
      
      {props.state === true && props.videoUrl ? (
        <i
          className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}
          onClick={handlePlayPause}
          style={{ color: "#00040a", cursor: 'pointer' }}
        ></i>
      ) : props.state === true && props.videoUrl === "" ? (
        <i
          className="fa-solid fa-spinner fa-spin"
          style={{ color: "#00040a", cursor: 'pointer' }}
        ></i>
      ) : (
        <i
          className="fa-solid fa-play"
          style={{ color: "#00040a", cursor: 'pointer' }}
        ></i>
      )}

      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={(e) => handleTimeChange(e.target.value)}
      />
      <i className="fa-solid fa-rotate-right" style={{ color: "#00040a", cursor: 'pointer' }}></i>
      <i className="fa-solid fa-volume-high" style={{ color: "#00040a" }}></i>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => handleVolumeChange(e.target.value)}
      />
    </div>
  );
}
