import React, { useState, useEffect } from 'react';
import Audiocard from './Audiocard';
import AudioUrl from './AudioUrl'
import Spinner from './Spinner'
export default function Audio(props) {
  const [videoData, setVideoData] = useState([]);
  const[audioID,setaudioID]=useState();
  const[SpinnerLoading,setSpinnerLoading]=useState(false);
  let [keywordarray,setKeywordarray] = useState([
    "Taylor Swift", "Beyoncé", "Justin Bieber", "Ariana Grande",
    "Ed Sheeran", "Rihanna", "Billie Eilish", "Drake", "Post Malone", "Adele", "Bruno Mars",
    "Lady Gaga", "Shawn Mendes", "Katy Perry", "Selena Gomez", "Harry Styles", "Kanye West", "Nicki Minaj",
    "The Weeknd", "Maroon 5", "Coldplay", "Lana Del Rey", "BTS", "Camila Cabello", "Demi Lovato", "Halsey",
    "Khalid", "Lizzo", "Miley Cyrus", "Imagine Dragons", "Sam Smith", "John Legend", "Zayn Malik"
]); useEffect(() => {
  async function fetchData() {
    setSpinnerLoading(true);
    const keywordToUse = props.Item ? props.Item : fetchKeyword(keywordarray);
    const url = `http://127.0.0.1:8000/get_data?keyword=${keywordToUse}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    setVideoData(jsonData);
    setSpinnerLoading(false);
    setKeywordarray(prevArray => prevArray.filter(keyword => keyword !== keywordToUse));
  }

  fetchData();
}, [props.Item]);

let fetchKeyword = () => {
  if (keywordarray.length === 0) {
    return "";
  } else {
    let num = Math.floor(Math.random() * keywordarray.length);
    return keywordarray[num];
  }
};
  return (
    <div className="container  mt-4">
      {SpinnerLoading && <Spinner/>}
      <div className="row"> 
      {console.log(fetchKeyword(keywordarray),keywordarray)}
        {SpinnerLoading===false && videoData.map((elem) => (
          <div className="col-md-3" key={elem.id} style={{ marginBottom: '1rem' }}>
            <Audiocard 
            title={elem.title}
            thumbnail={elem.thumbnails[0]}
            duration={elem.duration}
            getid={setaudioID}
            id={elem.id}/>
          </div>
        ))}
      </div>
       <AudioUrl
      cardid={audioID}
      />
    </div>
  );
}