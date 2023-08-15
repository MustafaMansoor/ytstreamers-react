import React, { useState, useEffect, useRef } from "react";

export default function AudioPlayer(props) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [replayRequested, setReplayRequested] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const audioElement = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audioElement.currentTime);
      setDuration(audioElement.duration);
    };

    const handleSongEnded = () => {
      setIsPlaying(false);
      if (replayRequested) {
        audioElement.currentTime = 0;
        audioElement.play();
        setIsPlaying(true);
        setReplayRequested(false);
      }
    };

    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateTime);
      audioElement.addEventListener("ended", handleSongEnded);

      if (props.videoUrl && props.state === true) {
        audioElement.play();
        setIsPlaying(true);
      }

      return () => {
        audioElement.removeEventListener("timeupdate", updateTime);
        audioElement.removeEventListener("ended", handleSongEnded);
      };
    }
  }, [props.videoUrl, props.state, replayRequested]);

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

  const handleReplay = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (!isPlaying) {
        audioElement.currentTime = 0;
        audioElement.play();
        setIsPlaying(true);
      } else {
        setReplayRequested(true);
      }
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={props.videoUrl} autoPlay={false} />

      {props.state === true && props.videoUrl ? (
        <>
          <i
            className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"}`}
            onClick={handlePlayPause}
            style={{ color: "#00040a", cursor: "pointer" }}
          >
          </i>
        </>
      ) : props.state === true && props.videoUrl === "" ? (
        <i
          className="fa-solid fa-spinner fa-spin"
          style={{ color: "#00040a", cursor: "pointer" }}
        ></i>
      ) : (
        <i
          className="fa-solid fa-play"
          style={{ color: "#00040a", cursor: "pointer" }}
        >
        </i>
      )}
      
      <span  style={{color: "#00040a"}}>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={(e) => handleTimeChange(e.target.value)}
            style={{width: "700px"}}/>
      <span style={{color: "#00040a" }}>{formatTime(duration)}</span>



      {props.state === true && props.videoUrl ? (
      <i
        className="fa-solid fa-rotate-right"
        onClick={handleReplay}
        style={{ color: "#00040a", cursor: "pointer" }}
      ></i>
      ):(<i className="fa-solid fa-rotate-right" style={{ color: "#00040a" }}></i>)}


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

// Function to format time in MM:SS format
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
