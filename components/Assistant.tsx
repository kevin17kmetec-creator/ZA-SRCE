import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, HeartPulse, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateHealthResponse } from '../services/geminiService';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Pozdravljeni! Sem vaš virtualni asistent Društva za zdravje srca. Kako vam lahko danes pomagam glede zdravja ali informacij o društvu?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    const responseText = await generateHealthResponse(inputText);

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'bg-gray-200 text-gray-600 rotate-90' : 'bg-cardio-600 text-white'
        }`}
        aria-label="Toggle Health Assistant"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm sm:w-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-100 overflow-hidden" style={{ maxHeight: 'calc(100vh - 120px)', height: '500px' }}>
          
          {/* Header */}
          <div className="bg-cardio-600 p-4 flex items-center shadow-sm">
            <div className="bg-white/20 p-2 rounded-full mr-3">
              <HeartPulse className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">Srčni Asistent</h3>
              <p className="text-cardio-100 text-xs">Vedno tukaj za nasvet</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-hide">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-cardio-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-cardio-500" />
                  <span className="text-xs text-gray-500">Razmišljam...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Vprašajte me o zdravju..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-800 placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className={`ml-2 p-2 rounded-full transition-colors ${
                  inputText.trim() && !isLoading ? 'text-cardio-600 hover:bg-cardio-50' : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              AI lahko naredi napako. Posvetujte se z zdravnikom.
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Assistant;
