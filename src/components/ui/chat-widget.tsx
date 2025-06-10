import React, { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([
    'Welcome to AFC Massachusetts support! How can I help you today?',
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory((prev) => [...prev, `You: ${message}`]);
      setMessage('');
      // Simulate AI response
      setTimeout(() => {
        setChatHistory((prev) => [...prev, 'AFC AI: Thank you for your message. A representative will be with you shortly.']);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Bubble Button */}
      <button
        onClick={toggleChat}
        className={cn(
          "relative w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg",
          "hover:bg-blue-700 transition-all duration-300 ease-in-out",
          "focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800",
          isOpen && "hidden" // Hide button when chat box is open
        )}
        aria-label="Open chat widget"
      >
        <MessageSquare className="w-8 h-8" />
        {/* Online Indicator */}
        <span className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-white dark:border-gray-900"></span>
      </button>

      {/* Chat Box */}
      <div
        className={cn(
          "fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col transition-transform duration-300 ease-out",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none",
          "h-[400px] max-h-[calc(100vh-80px)] md:h-[450px] md:w-96"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Chat support window"
      >
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-t-lg">
          <h3 className="text-lg font-semibold">AFC Support Chat</h3>
          <button
            onClick={toggleChat}
            className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-1"
            aria-label="Close chat widget"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm text-gray-800 dark:text-gray-200">
          {chatHistory.map((msg, index) => (
            <div key={index} className={cn(
              "p-2 rounded-lg",
              msg.startsWith('You:') ? "bg-blue-100 dark:bg-blue-900/30 text-right ml-auto max-w-[80%]" : "bg-gray-100 dark:bg-gray-700 text-left mr-auto max-w-[80%]"
            )}>
              {msg}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            aria-label="Chat input field"
          />
          <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700" aria-label="Send message">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget; 