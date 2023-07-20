import React, { useEffect, useRef, useState } from 'react'
import './ChatBot.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { askchatbot, deleteConversation } from '../../../actions/bot'
import ChatBotQA from './ChatBotQA'
import { toast } from 'react-toastify'

const ChatBot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => (state.currentUserReducer));
  const users = useSelector((state) => state.userReducer);
  const currentUserData = users.filter((user) => user._id === User?.result._id)[0];

  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [qtoSend, setQtoSend] = useState('');

  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();

  }, [messagesContainerRef, currentUserData, loading]);

  useEffect(() => {
    setLoading(false);
  }, [currentUserData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (User === null) {
      navigate('/auth');
      toast.warning("Login to ask chatbot", {
        position: toast.POSITION.TOP_CENTER,
        theme:'colored'
      });
    }
    else if (question.length === 0) {
      toast.warning("Write something to ask", {
        position: toast.POSITION.TOP_CENTER,
        theme:'colored'
      });
    }
    else {
      setQtoSend(question);
      setLoading(true);
      dispatch(askchatbot(User?.result._id, question));
      setQuestion('');
    }
    scrollToBottom();
  }
  const handleDelete = (e) => {
    e.preventDefault();
    if (User === null) {
      navigate('/auth');
      toast.warning("Login to start the conversation", {
        position: toast.POSITION.TOP_CENTER,
        theme:'colored'
      });
    }
    else if (currentUserData.chatbot.length === 0) {
      toast.warning("There is nothing to delete", {
        position: toast.POSITION.TOP_CENTER,
        theme:'colored'
      });
    }
    else {
      dispatch(deleteConversation(User?.result._id));
    }
  }
  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Ask any question</h2>
      </div>
      <div className="chatbot-messages" ref={messagesContainerRef}>
        {currentUserData &&
          currentUserData?.chatbot.map((element) => (
            <ChatBotQA key={element._id} data={element} />
          ))
        }
        {
          loading &&
          <>
            <div className="user-message message">
              <p> {qtoSend} </p>
            </div>
            <div className="message bot-message">
              <p> Loading... </p>
            </div>
          </>
        }
      </div>
      <form onSubmit={handleSubmit}>
        <div className="chatbot-input">
          <input type="text" placeholder="Ask any question..." value={question} onChange={(e) => setQuestion(e.target.value)} />
          <button type='submit'>Send</button>
        </div>
      </form>
      <button onClick={handleDelete} className='deleteChat'>Delete Conversation</button>
    </div>
  )
}

export default ChatBot
