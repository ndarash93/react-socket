import React, { useState, useRef } from "react";
import "./app.css";

const socket = require("socket.io-client")("http://192.168.0.31:27817");

function App() {
  const formInput = useRef(null);
  const [messages, setMessages] = useState([]);

  function handleSocket(event) {
    event.preventDefault();
      if(formInput.current.value.length > 0){
      socket.emit("message", { message: formInput.current.value });
      setMessages([
        { sentByMe: true, message: formInput.current.value },
        ...messages
      ]);
      formInput.current.value = "";
    }
  }

  socket.on("response", response => {
    setMessages([{ sentByMe: false, message: response.message }, ...messages]);
  });

  function printMessages(messagesToPrint) {
    return messagesToPrint.map((message, i) => {
      if(message.sentByMe){
        return <p key={i} className="message my-message">{message.message}</p>;
      }
    return <p key={i} className="message">{message.message}</p>
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
