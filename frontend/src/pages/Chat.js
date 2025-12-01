import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import '../styles/Chat.css';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Admin', content: 'Welcome to the chat!', timestamp: '10:00' },
    { id: 2, sender: 'Student1', content: 'Hi everyone!', timestamp: '10:05' }
  ]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:4000');
    
    newSocket.on('connect', () => {
      console.log('Connected to chat server');
      newSocket.emit('join-room', 'general');
    });

    newSocket.on('receive-message', (data) => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: data.senderName,
        content: data.message,
        timestamp: new Date().toLocaleTimeString()
      }]);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      socket.emit('send-message', {
        roomId: 'general',
        senderId: 'current-user',
        senderName: 'You',
        message
      });
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Community Chat</h1>
        <p className="room-info">General Room</p>
      </div>

      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className="message">
            <div className="message-header">
              <strong>{msg.sender}</strong>
              <span className="timestamp">{msg.timestamp}</span>
            </div>
            <p className="message-content">{msg.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
}
