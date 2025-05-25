import React, { useState, useRef, useEffect } from 'react';
import { getChatbotResponse } from '../../services/chatbot';
import { FaPaperPlane, FaSpinner } from 'react-icons/fa';

interface Message {
  text: string;
  isUser: boolean;
  suggestions?: string[];
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm your travel assistant. How can I help you today?",
      isUser: false,
      suggestions: [
        'Tell me about popular destinations',
        'How to plan a budget trip?',
        'Best time to visit [destination]',
        'Travel safety tips'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await getChatbotResponse(userMessage);
      setMessages(prev => [...prev, { 
        text: response.text,
        isUser: false,
        suggestions: response.suggestions
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "I'm sorry, but I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        suggestions: ['Try again later']
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-[600px] bg-gray-50 rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.isUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-white shadow-md'
              }`}
            >
              <p>{message.text}</p>
              {!message.isUser && message.suggestions && (
                <div className="mt-2 space-y-1">
                  {message.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block text-sm text-blue-600 hover:underline"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaPaperPlane />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot; 