import React, { useState } from "react";
const socket = require("socket.io-client")('http://192.168.0.31:27817');

function App() {
  const [temp, setTemp] = useState(0);

  function handleClick() {
    setTemp(temp + 1);
  }

  function handleSocket(event) {
    event.preventDefault();
    console.log('test');
    socket.emit('message', 'test');
  }

  return (
    <div className="App">
      <div className="messages">Test</div>
      <form>
        <input type="text" className="text" name="text" />
        <button type="submit" onClick={handleSocket} >Test</button>
      </form>
    </div>
  );
}

export default App;
