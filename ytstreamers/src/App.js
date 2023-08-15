import Audio from './components/Audio';
import Nav from './components/Nav';
import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar'

function App() {
  const [SearchItem, SetSearchItem] = useState("");
  const [progress, setProgress] = useState(30);

  return (
    <div>
      <Nav Item={SetSearchItem} />
      <LoadingBar
        color='#f11946'
        progress={progress}
      />
      <div style={{ marginTop: "80px" }}>
        <Audio
          loaderProgress={setProgress}
          Item={SearchItem}
        />
      </div>
    </div>
  );
}

export default App;
