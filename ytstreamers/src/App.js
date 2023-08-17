import Audio from './components/Audio';
import Nav from './components/Nav';
import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [SearchItem, SetSearchItem] = useState("");
  const [progress, setProgress] = useState(30);
  const [mode, setmode] = useState("dark");
  return (
    <div style={{ backgroundColor: "#0d1117", minHeight: "100vh", paddingTop: "80px" }}>
      <Nav Item={SetSearchItem} setcurrentmode={setmode} currentmode={mode}/>
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <Audio
        loaderProgress={setProgress}
        Item={SearchItem}
      />
    </div>
  );
}

export default App;
