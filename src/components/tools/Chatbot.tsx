import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const apiKey = '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';

const generateResponse = async (message: string): Promise<string> => {
  const requestBody = {
    model: 'openai/gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a knowledgeable travel assistant helping users plan their trips in India. Provide detailed, helpful responses about destinations, accommodations, activities, and travel tips. Keep responses focused on travel-related queries.'
      },
      {
        role: 'user',
        content: message
      }
    ]
  };

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', requestBody, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Tour Planner'
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    }
    throw new Error('Failed to get response from AI. Please try again.');
  }
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI travel assistant. How can I help you plan your trip in India?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await generateResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">AI Travel Assistant</h2>
      
      <div className="h-[500px] flex flex-col bg-gray-50 rounded-lg">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 border-t bg-white rounded-b-lg">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 flex items-center"
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot; 