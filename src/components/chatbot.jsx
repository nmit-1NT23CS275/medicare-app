import { useState } from 'react';
import './chatbot.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! Welcome to MediCare AI. How can I help you today?'
    }
  ]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userMessage }
    ]);

    setMessage('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: data.reply }
      ]);

    } catch (error) {
      console.error(error);

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Unable to connect. Please try again.'
        }
      ]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">

      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="chatbot-window">

          <div className="chatbot-header">
            <h3>MediCare AI 🩺</h3>
            <p>Your Healthcare Assistant</p>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sender}`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="chat-message bot">
                Typing...
              </div>
            )}
          </div>

          <form className="chatbot-input" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Ask a health question..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              disabled={loading}
            />

            <button type="submit" disabled={loading}>
              Send
            </button>
          </form>

          <p className="chatbot-disclaimer">
            General health information only.
          </p>

        </div>
      )}

    </div>
  );
}

export default Chatbot;