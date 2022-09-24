import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_DISLIKE, ADD_LIKE } from "../../query/posts";

export default function ChatItem({ data, setReplyData, openReply }) {
  const { id, text, like, dislike, replyFrom, replyText } = data;
  const isReply = replyText && replyText;
  const [addLike] = useMutation(ADD_LIKE);
  const [addDislike] = useMutation(ADD_DISLIKE);

  return (
    <div className="chat__item">
      {isReply && (
        <div className="reply">
          <p className="reply__text">{"=> " + replyText}</p>
          <p className="reply__text">{"To: " + replyFrom}</p>
        </div>
      )}
      <div className="chat__text-item">
        <div className="text-item__text-wrapper">
          <p className="chat__text">{text}</p>
          <span className="chat__name">{"#" + id}</span>
        </div>
        <div className="text-item__btn-wrapper">
          <div className="reaction-wrapper">
            <div className="reaction__controllers-wrapper">
              <button
                onClick={() =>
                  addLike({
                    variables: {
                      id: +id,
                    },
                  })
                }
                className="reaction__btn"
                type="button"
              >
                +
              </button>
              <span>{like}</span>
            </div>
            <div className="reaction__controllers-wrapper">
              <button
                onClick={() =>
                  addDislike({
                    variables: {
                      id: +id,
                    },
                  })
                }
                className="reaction__btn"
                type="button"
              >
                -
              </button>
              <span>{dislike}</span>
            </div>
          </div>
          {!isReply && (
            <button
              onClick={() => {
                openReply();
                setReplyData({ replyText: text, replyFrom: id });
              }}
              className="reaction__reply"
              type="button"
            >
              Reply
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
