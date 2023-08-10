import Audio from './components/Audio';
import Nav from './components/Nav';
import React, { useState } from 'react';
function App() {
  const [SearchItem,SetSearchItem]=useState("");



  
  return (
    <div>
      <Nav Item={SetSearchItem}/>
      <Audio Item={SearchItem}/>
    </div>
  );
}
export default App;
