import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, Bot } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export function Support() {
  const { isDarkMode } = useThemeStore();
  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ user: boolean; message: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleAiChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;

    setChatHistory(prev => [...prev, { user: true, message: aiMessage }]);
    setIsTyping(true);
    setAiMessage('');

    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        { 
          user: false, 
          message: "Thank you for reaching out! I'm here to help with your booking queries. How can I assist you today?"
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} py-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Customer Support</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Support */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center space-x-3 mb-4">
              <Mail className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Email Support</h2>
            </div>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Get help via email. We typically respond within 24 hours.
            </p>
            <div className="space-y-2">
              <a href="mailto:support@cinebook.com" className="block">
                <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  <Mail className="h-4 w-4" />
                  <span>support@cinebook.com</span>
                </div>
              </a>
              <a href="mailto:bookings@cinebook.com" className="block">
                <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  <Mail className="h-4 w-4" />
                  <span>bookings@cinebook.com</span>
                </div>
              </a>
              <a href="mailto:feedback@cinebook.com" className="block">
                <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  <Mail className="h-4 w-4" />
                  <span>feedback@cinebook.com</span>
                </div>
              </a>
            </div>
          </div>

          {/* Phone Support */}
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center space-x-3 mb-4">
              <Phone className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">Phone Support</h2>
            </div>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Available Monday to Sunday, 9 AM - 9 PM
            </p>
            <div className="space-y-2">
              <a href="tel:+1800123456789" className="block">
                <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  <Phone className="h-4 w-4" />
                  <span>1-800-123-456-789 (Toll Free)</span>
                </div>
              </a>
              <a href="tel:+1987654321" className="block">
                <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  <Phone className="h-4 w-4" />
                  <span>+1 (987) 654-321 (International)</span>
                </div>
              </a>
              <a href="tel:+1123456789" className="block">
                <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  <Phone className="h-4 w-4" />
                  <span>+1 (123) 456-789 (WhatsApp)</span>
                </div>
              </a>
            </div>
          </div>

          {/* AI Chat Support */}
          <div className={`md:col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center space-x-3 mb-4">
              <Bot className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold">AI Chat Support</h2>
            </div>
            <div className={`mb-4 h-64 overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 rounded-lg`}>
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`mb-3 ${chat.user ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block max-w-[80%] px-4 py-2 rounded-lg ${
                      chat.user
                        ? isDarkMode
                          ? 'bg-indigo-600 text-white'
                          : 'bg-indigo-600 text-white'
                        : isDarkMode
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    {chat.message}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-gray-500">
                  <Bot className="h-4 w-4" />
                  <span>AI is typing...</span>
                </div>
              )}
            </div>
            <form onSubmit={handleAiChat} className="flex space-x-2">
              <input
                type="text"
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                placeholder="Type your message..."
                className={`flex-1 px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'border-gray-300'
                } focus:ring-2 focus:ring-indigo-500`}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}