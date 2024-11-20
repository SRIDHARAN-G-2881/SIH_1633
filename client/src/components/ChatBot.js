// /frontend/src/components/ChatBot.js
import React, { useState } from 'react';
import { sendMessage } from '../services/api';

const ChatBot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (userMessage.trim() === '') return;

    // Add user message to chat history
    setChatHistory([...chatHistory, { sender: 'user', message: userMessage }]);

    // Send message to backend and get response
    const response = await sendMessage(userMessage);

    // Add chatbot response to chat history
    setChatHistory([
      ...chatHistory,
      { sender: 'user', message: userMessage },
      { sender: 'chatbot', message: response },
    ]);

    // Clear user input
    setUserMessage('');
  };

  return (
    <div className="fixed bottom-0 right-0 w-80 bg-white shadow-lg p-4 rounded-lg border border-gray-300">
      <div className="flex flex-col h-80">
        <div className="flex-1 overflow-auto mb-4">
          {chatHistory.map((chat, index) => (
            <div key={index} className={chat.sender === 'user' ? 'text-right' : 'text-left'}>
              <div
                className={`inline-block p-2 mb-2 rounded-lg ${
                  chat.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {chat.message}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
