import React, { useState, useEffect } from 'react';
import Audiocard from './Audiocard';
import AudioUrl from './AudioUrl';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
export default function Audio({ Item, loaderProgress }) {
  const [videoData, setVideoData] = useState([]);
  const [audioID, setAudioID] = useState();
  const [audioTitle, setAudioTitle] = useState();
  const [audiothumbnail, setAudiothumbnail] = useState();

  useEffect(() => {
    if (Item) {
      setVideoData([]);
    }
    const fetchData = async () => {
      loaderProgress(30);
      const url = `http://127.0.0.1:8000/get_data?keyword=${Item}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      setVideoData(jsonData);
      loaderProgress(100);
    };

    fetchData();
  }, [Item, loaderProgress]);

  const fetchMoreData = async () => {
    const url = `http://127.0.0.1:8000/get_data?keyword=${''}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    setVideoData(prevData => [...prevData, ...jsonData]);
  };

  return (
    <div className='container'>
      <InfiniteScroll
        dataLength={videoData.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Spinner />}
        style={{ overflow: 'hidden' }}
      >
        <div className="row">
          {videoData.map((elem) => (
            <div className="col-md-3" key={elem.id} style={{ marginBottom: '0.5rem' }}>
              <Audiocard
                title={elem.title}
                thumbnail={elem.thumbnails[0]}
                duration={elem.duration}
                getid={setAudioID}
                gettitle={setAudioTitle}
                getthumbnail={setAudiothumbnail}
                id={elem.id}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
      <AudioUrl cardid={audioID} cardtitle={audioTitle} cardthumbnail={audiothumbnail} />
    </div>
  );
}
