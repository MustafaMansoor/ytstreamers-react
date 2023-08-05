import Audio from './components/Audio';
import AudioPlayer from './components/AudioPlayer';
import React, { useState} from 'react';
import Nav from './components/Nav';
function App() {
  const[audioID,setaudioID]=useState();
  return (
    <div>
      <Nav/>
      <Audio getcardid={setaudioID}/>
      <AudioPlayer cardid={audioID}/>
    </div>
  );
}
export default App;
