import { useState } from 'react';
import './css/Chatbot.css';
import { IoSend } from 'react-icons/io5';

function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hello! I am Albert, your AI assistant. How can I help you today?',
    },
    { role: 'user', content: 'Hi Albert! Can you help me with my homework?' },
    {
      role: 'assistant',
      content:
        "Of course! I'd be happy to help. What subject are you working on?",
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: input }],
        }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: input },
        { role: 'assistant', content: data.content },
      ]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='chatbot-container'>
      <div className='message-list'>
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>

      <div className='input-container'>
        <input
          className='message-input'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type your message...'
        />
        <button className='send-button' onClick={sendMessage}>
          <IoSend />
        </button>
      </div>
    </div>
  );
}

export default Chat;
