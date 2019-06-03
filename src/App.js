import React from 'react';
import axios from 'axios'

function App() {

  const test = async () => {
    let result = await axios.get(`/people`)
    console.log(result)
  }
  return (
    <div>
      <button onClick={test}>Get Star Warsy things</button>
    </div>
  );
}

export default App;
