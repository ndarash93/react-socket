import React, { useState } from "react";
const socket = require("socket.io-client")();

function App() {
  const [temp, setTemp] = useState(0);

  function handleClick() {
    setTemp(temp + 1);
  }

  return (
    <div className="App">
      {temp}
      <button onClick={handleClick}>Click Me!</button>
    </div>
  );
}

export default App;
