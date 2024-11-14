import { useState, useEffect, useRef } from 'react';
import { IoSend } from 'react-icons/io5';
import ReactMarkdown from 'react-markdown';

import './css/Chatbot.css';
import { apiBaseUrl } from '../../../utils/url';

function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hello! I am Albert, your AI assistant. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // keep focus on input field
  useEffect(() => {
    inputRef.current?.focus();
  }, [messages, isLoading]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput(''); // clear input field after user sends message

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    setIsLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.content },
      ]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='chatbot-container'>
      <div className='message-list'>
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.role === 'assistant' ? (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            ) : (
              msg.content
            )}
          </div>
        ))}
        {isLoading && (
          <div className='message assistant'>
            <div>
              <p>...</p>
            </div>
          </div>
        )}
      </div>

      <div className='input-container'>
        <input
          ref={inputRef}
          className='message-input'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder='Type your message...'
          disabled={isLoading}
        />
        <button
          className='send-button'
          onClick={sendMessage}
          disabled={isLoading}
        >
          <IoSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;
