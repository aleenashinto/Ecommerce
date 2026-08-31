import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { quickPrompts, processAIQuery } from '../../data/aiKnowledge';
import { useCartStore } from '../../store/useCartStore';
import { useToastStore } from '../../store/useToastStore';
import { Link } from 'react-router-dom';

export const AuraAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am Aura AI, your personal luxury concierge. What are you looking to explore or upgrade today?',
      products: [],
      followUps: ["Find studio headphones", "Best laptops under $2000", "Curated gifts", "Summer deals"]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const addToCart = useCartStore((state) => state.addToCart);
  const addToast = useToastStore((state) => state.addToast);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (textToSend = null) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text.trim()
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processAIQuery(text);
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.message,
        products: response.products || [],
        followUps: response.followUps || []
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMessage]);
    }, 700);
  };

  const handleAddProduct = (product) => {
    addToCart(product, 1);
    addToast(`Added ${product.name} to cart`, 'success');
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 lg:bottom-7 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white shadow-2xl shadow-purple-950/60 border border-white/20 backdrop-blur-xl group"
        aria-label="Open Aura AI Shopping Assistant"
      >
        <div className="relative">
          <Sparkles size={18} className="animate-spin text-white group-hover:rotate-45 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <span className="font-heading text-xs font-bold tracking-wide">
          ? Aura AI
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 lg:bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-96 max-w-sm h-[520px] rounded-3xl bg-neutral-900/95 border border-purple-500/30 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-neutral-950 via-purple-950/40 to-neutral-950 border-b border-purple-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Bot size={16} />
                </div>
                <div>
                  <h4 className="font-heading text-xs font-bold text-white flex items-center gap-1.5">
                    Aura AI Concierge
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-neutral-400">Your intelligent shopping advisor</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none'
                        : 'bg-neutral-950/90 border border-neutral-800 text-neutral-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.products && msg.products.length > 0 && (
                    <div className="flex flex-col gap-2 w-full mt-1">
                      {msg.products.map((p) => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between gap-3 p-2 rounded-xl bg-neutral-950 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                        >
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-neutral-800" />
                          <div className="flex-1 min-w-0">
                            <Link
                              to={`/product/${p.id}`}
                              onClick={() => setIsOpen(false)}
                              className="font-semibold text-neutral-200 hover:text-purple-300 truncate block text-[11px]"
                            >
                              {p.name}
                            </Link>
                            <div className="text-[10px] text-neutral-400 flex items-center gap-1.5">
                              <span className="text-purple-400 font-bold">${p.price}</span>
                              <span>�</span>
                              <span>? {p.rating}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleAddProduct(p)}
                            className="p-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 transition-colors"
                            title="Add to cart"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.followUps && msg.followUps.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {msg.followUps.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(prompt)}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-neutral-950 hover:bg-purple-500/20 border border-neutral-800 hover:border-purple-500/30 text-neutral-400 hover:text-purple-300 transition-colors"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1 p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 w-fit text-purple-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto scrollbar-none">
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(qp.query)}
                    className="whitespace-nowrap text-[10px] px-2.5 py-1 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 transition-colors"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-neutral-950 border-t border-neutral-800 flex gap-2">
              <input
                type="text"
                placeholder="Ask Aura anything (e.g. best watch under $500)..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 h-9 px-3 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-9 h-9 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center disabled:opacity-40 transition-opacity"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
