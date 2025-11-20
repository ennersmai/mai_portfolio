import React, { useState, useEffect, useRef } from 'react';
import { initializeGemini, sendMessageToAgent } from '../services/geminiService';
import { ChatMessage } from '../types';

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', text: '> SYSTEM INITIALIZED. WELCOME TO THE PORTFOLIO INTERFACE.\n> ASK ME ABOUT MY EXPERIENCE, TECH STACK, OR MYSWEETIE.AI.' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeGemini();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setLoading(true);

    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

    // Filter for history context (exclude system messages for the API call if needed, but here we just pass user/model)
    const history = messages
      .filter(m => m.role !== 'system')
      .map(m => ({ role: m.role as 'user'|'model', text: m.text }));

    const responseText = await sendMessageToAgent(history, userMsg);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto border border-accent bg-background/90 backdrop-blur-sm shadow-[8px_8px_0px_0px_rgba(0,255,196,0.2)] relative overflow-hidden mt-12 mb-24">
      {/* Terminal Header */}
      <div className="bg-accent/10 border-b border-accent p-2 flex justify-between items-center">
        <div className="text-xs text-accent uppercase tracking-widest font-bold flex items-center gap-2">
          <div className="w-3 h-3 bg-accent animate-pulse"></div>
          AGENTIC_INTERFACE_V1.0
        </div>
        <div className="flex gap-1">
          <div className="w-3 h-3 border border-accent"></div>
          <div className="w-3 h-3 border border-accent bg-accent"></div>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-96 overflow-y-auto font-mono text-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-1 ${
              msg.role === 'user' 
                ? 'text-white bg-surface border border-gray-700' 
                : msg.role === 'system' 
                  ? 'text-accent italic' 
                  : 'text-accent'
            }`}>
              {msg.role === 'model' && <span className="mr-2">{'>'}</span>}
              {msg.text}
            </span>
          </div>
        ))}
        {loading && (
           <div className="text-left">
             <span className="text-accent animate-pulse">{'>'} PROCESSING_REQUEST...</span>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t border-accent p-2 flex bg-black">
        <span className="text-accent mr-2 py-2">{'>'}</span>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white font-mono placeholder-gray-700"
          placeholder="EXECUTE QUERY..."
          disabled={loading}
        />
        <button 
          type="submit" 
          disabled={loading}
          className="px-4 py-2 bg-accent text-black font-bold hover:bg-white transition-colors disabled:opacity-50"
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default Terminal;