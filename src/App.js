import React, { useState, useRef } from "react";
import "./app.css";

const socket = require("socket.io-client")("http://localhost:27817");

function App() {
  const formInput = useRef(null);
  const [messages, setMessages] = useState([]);

  function handleSocket(event) {
    event.preventDefault();
    socket.emit("message", { message: formInput.current.value });
    setMessages([
      ...messages,
      { sentByMe: true, message: formInput.current.value }
    ]);
    formInput.current.value = "";
  }

  socket.on("response", response => {
    setMessages([...messages, { sentByMe: false, message: response.message }]);
  });

  function printMessages(messagesToPrint) {
    return messagesToPrint.map((message, i) => {
      return <p key={i}>{message.message}</p>;
    });
  }

  return (
    <div className="App">
      <div className="messages">{printMessages(messages)}</div>
      <form action="">
        <input
          ref={formInput}
          type="text"
          className="text"
          name="text"
          autoComplete="off"
        />
        <input className="submit" type="submit" onClick={handleSocket}></input>
      </form>
    </div>
  );
}

export default App;
