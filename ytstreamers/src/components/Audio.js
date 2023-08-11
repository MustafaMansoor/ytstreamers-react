import React, { useState, useEffect } from 'react';
import Audiocard from './Audiocard';
import AudioUrl from './AudioUrl';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export default function Audio(props) {
  const [videoData, setVideoData] = useState([]);
  const [audioID, setAudioID] = useState();

  useEffect(() => {
    if (props.Item) {
      setVideoData([])
    }
    const fetchData = async () => {
      console.log(props.Item)
      const url = `http://127.0.0.1:8000/get_data?keyword=${props.Item}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      setVideoData(jsonData);
      console.log(jsonData); 
    };

    fetchData();
  }, [props.Item]);

  const fetchMoreData = async () => {
   

    const url = `http://127.0.0.1:8000/get_data?keyword=${''}`;
    const response = await fetch(url);
    const jsonData = await response.json();

    setVideoData(prevData => [...prevData, ...jsonData]);
    console.log(jsonData);
   
  };

  return (
    <>
      <InfiniteScroll
        dataLength={videoData.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Spinner />}
      >
        <div className="row">
          { videoData.map((elem) => (
              <div className="col-md-2" key={elem.id} style={{ marginBottom: '1rem' }}>
                <Audiocard
                  title={elem.title}
                  thumbnail={elem.thumbnails[0]}
                  duration={elem.duration}
                  getid={setAudioID}
                  id={elem.id}
                />
              </div>
            ))}
        </div>
      </InfiniteScroll>
      <AudioUrl cardid={audioID} />
    </>
  );
}
