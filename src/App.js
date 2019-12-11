import React, { useState, useRef } from "react";
const socket = require("socket.io-client")("http://localhost:27817");

function App() {
  const formInput = useRef(null);

  function handleSocket(event) {
    event.preventDefault();
    socket.emit("message", { message: formInput.current.value });
    formInput.current.value = "";
  }

  socket.on("response", response => {
    console.log(response);
  });

  return (
    <div className="App">
      <div className="messages">Test</div>
      <form action="">
        <input
          ref={formInput}
          type="text"
          className="text"
          name="text"
          autoComplete="off"
        />
        <input type="submit" onClick={handleSocket}></input>
      </form>
    </div>
  );
}

export default App;
