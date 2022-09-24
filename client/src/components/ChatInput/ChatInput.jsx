import React, { useState } from "react";

export default function ChatInput({ createProduct }) {
  const [chatInput, setChatInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    createProduct({
      variables: {
        post: { text: chatInput },
      },
    });
    setChatInput("");
  };

  return (
    <form onSubmit={submitHandler} className="chat__send-form">
      <input
        required
        onChange={({ target }) => setChatInput(target.value)}
        value={chatInput}
        placeholder="Type something..."
        type="text"
        className="send-form__input"
      />
      <button className="send-form__btn" type="submit">
        {"=>"}
      </button>
    </form>
  );
}
