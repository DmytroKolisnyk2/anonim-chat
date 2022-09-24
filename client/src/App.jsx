import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import ChatItem from "./components/ChatItem/ChatItem";
import { CREATE_POST, GET_ALL_POSTS, NEW_DISLIKE, NEW_LIKE, NEW_POST } from "./query/posts";
import "./styles/App.scss";
import ReplyModal from "./components/ReplyModal/ReplyModal";
import ChatInput from "./components/ChatInput/ChatInput";
import Filters from "./components/Filters/Filters";

const TAKE_COUNT = 10;

function App() {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState({ id: "asc" });
  const [sortBySelect, setSortBySelect] = useState("id");
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  const { data, loading, error, subscribeToMore } = useQuery(GET_ALL_POSTS, {
    variables: { orderBy: sortBy, filter, take: TAKE_COUNT, skip: page * TAKE_COUNT },
  });

  const [createProduct] = useMutation(CREATE_POST);
  const [chat, setChat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [replyData, setReplyData] = useState({ replyFrom: null, replyText: null });

  useEffect(() => {
    if (!loading && data.posts.postList) {
      page > 0 ? setChat([...data.posts.postList, ...chat]) : setChat(data.posts.postList);
      setCount(data.posts.count);
    }
  }, [data]);

  useEffect(() => {
    // const CHAT_REF = document.querySelector("#chat");
    // if (CHAT_REF) CHAT_REF.scrollTop = 0;
    // if (CHAT_REF) CHAT_REF.scrollTop = CHAT_REF.scrollHeight;
  }, [chat]);

  useEffect(() => {
   
  }, [setSortBy]);

  useEffect(() => {
    subscribeToMore({
      document: NEW_POST,
      updateQuery: (prev, { subscriptionData }) => {
        const newPost = subscriptionData.data.newPost;
        setChat([...prev.posts.postList, newPost]);
        return { posts: { ...prev.posts, postList: [...prev.posts.postList, newPost] } };
      },
    });
    subscribeToMore({
      document: NEW_LIKE,
      updateQuery: (prev) => prev,
    });
    subscribeToMore({
      document: NEW_DISLIKE,
      updateQuery: (prev) => prev,
    });
  }, [subscribeToMore]);

  const loadMoreHandler = () => {
    console.log(count);
    setPage(page + 1);
  };

  return (
    <section className="chat">
      <Filters
        filter={filter}
        sortBySelect={sortBySelect}
        setFilter={setFilter}
        setSortBy={setSortBy}
        setSortBySelect={setSortBySelect}
      />
      <ReplyModal
        createProduct={createProduct}
        replyData={replyData}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <div id="chat" className="chat__items-wrapper">
        {error && <p>{error}</p>}
        {chat.length === 0 && !loading && <p>Nothing found</p>}
        {chat && (
          <>
            <button type="button" onClick={loadMoreHandler}>
              Load more
            </button>
            {chat.map((item) => (
              <ChatItem
                openReply={() => setIsOpen(true)}
                setReplyData={setReplyData}
                key={item.id}
                data={item}
              />
            ))}
          </>
        )}
        {loading && <p>Loading...</p>}
      </div>

      <ChatInput createProduct={createProduct} />
    </section>
  );
}

export default App;
