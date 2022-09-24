import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root-modal");

export default function ReplyModal({ onClose, isOpen, createProduct, replyData }) {
  const [chatInput, setChatInput] = useState("");
  const { replyFrom, replyText } = replyData;

  const submitHandler = (e) => {
    e.preventDefault();
    createProduct({
      variables: {
        post: { text: chatInput, replyFrom: +replyFrom, replyText: replyText },
      },
    });
    onClose();
    setChatInput("");
  };

  return (
    <Modal className="modal" onRequestClose={onClose} shouldCloseOnEsc isOpen={isOpen}>
      <div className="reply reply--modal">
        <p className="reply__text">{"=> " + replyText}</p>
        <p className="reply__text">{"To: " + replyFrom}</p>
      </div>
      <form onSubmit={submitHandler} className="chat__send-form">
        <input
          required
          onChange={({ target }) => setChatInput(target.value)}
          value={chatInput}
          placeholder="Type reply..."
          type="text"
          className="send-form__input"
        />
        <button className="send-form__btn" type="submit">
          {"=>"}
        </button>
      </form>
    </Modal>
  );
}
