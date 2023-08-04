import React, { useState, useEffect } from 'react';
import Audiocard from './Audiocard';

export default function Audio() {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const url = 'http://127.0.0.1:8000/get_data';
      const response = await fetch(url);
      const jsonData = await response.json();
      setVideoData(jsonData);
      console.log(jsonData);
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {videoData.map((elem) => (
          <div className="col-md-3" key={elem.id} style={{ marginBottom: '1rem' }}>
            <Audiocard title={elem.title} thumbnail={elem.thumbnails[0]} />
          </div>
        ))}
      </div>
    </div>
  );
}
