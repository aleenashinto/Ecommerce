import React, { useState } from 'react';
import { useSupportStore } from '../store/useSupportStore';
import { useToastStore } from '../store/useToastStore';
import { 
  Headphones, 
  Send, 
  Plus, 
  MessageSquare, 
  HelpCircle, 
  ShieldCheck, 
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const Support = () => {
  const { tickets, createTicket, activeChat, sendChatMessage } = useSupportStore();
  const addToast = useToastStore((state) => state.addToast);

  const [chatInput, setChatInput] = useState('');
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'Order Status & Tracking',
    priority: 'Medium',
    message: ''
  });

  const faqs = [
    { q: 'How long does Express Worldwide delivery take?', a: 'Standard orders dispatch within 24 hours. Express courier transit is 2 to 4 business days worldwide with end-to-end GPS telemetry.' },
    { q: 'What is the Aura Care 30-day return policy?', a: 'We offer complimentary 30-day white-glove returns on all original items. Simply click "Request Return" in your Orders ledger for courier pickup.' },
    { q: 'How are my luxury payment details protected?', a: 'All transactions are tokenized via PCI-DSS SAQ-A certified hardware security modules with 256-bit AES cryptographic encryption.' }
  ];

  const [openFaq, setOpenFaq] = useState(0);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput);
    setChatInput('');
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    createTicket(ticketForm.subject, ticketForm.category, ticketForm.priority, ticketForm.message);
    addToast('Support ticket logged with VIP Concierge Desk!', 'success');
    setShowNewTicket(false);
    setTicketForm({ subject: '', category: 'Order Status & Tracking', priority: 'Medium', message: '' });
  };

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">Client Care & Concierge</span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            How May We Assist You?
          </h1>
          <p className="text-xs text-neutral-400 mt-2">
            24/7 dedicated support desk for order inquiries, returns, and bespoke client assistance.
          </p>
        </div>

        {/* Live Support & Ticket Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Live Chat Desk */}
          <div className="p-6 rounded-3xl bg-neutral-900/60 border border-purple-500/20 shadow-2xl flex flex-col h-[500px]">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <Headphones size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-white">Aura Concierge Live Desk</h3>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Agent Online
                  </span>
                </div>
              </div>
            </div>

            {/* Chat message stream */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {activeChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'client'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none'
                      : 'bg-neutral-950 border border-neutral-800 text-neutral-300 rounded-bl-none'
                  }`}>
                    <p>{msg.text}</p>
                    <span className="text-[9px] text-neutral-400 block mt-1 opacity-70">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendChat} className="pt-3 border-t border-neutral-800 flex gap-2">
              <input
                type="text"
                placeholder="Ask about orders, sizing, returns..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 h-11 px-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-4 h-11 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-colors"
              >
                <Send size={15} />
              </button>
            </form>
          </div>

          {/* Ticket Ledger & FAQs */}
          <div className="space-y-6">
            
            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Your Support Tickets</h3>
                <button
                  onClick={() => setShowNewTicket(!showNewTicket)}
                  className="px-3 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-purple-300 flex items-center gap-1"
                >
                  <Plus size={13} /> Log Ticket
                </button>
              </div>

              {showNewTicket ? (
                <form onSubmit={handleCreateTicket} className="space-y-3 text-xs pt-2">
                  <input
                    type="text"
                    required
                    placeholder="Brief summary of request"
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
                  />
                  <textarea
                    required
                    rows="3"
                    placeholder="Provide details..."
                    value={ticketForm.message}
                    onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                    className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold">Submit Ticket</button>
                    <button type="button" onClick={() => setShowNewTicket(false)} className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300">Cancel</button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  {tickets.map(ticket => (
                    <div key={ticket.id} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{ticket.subject}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">{ticket.id} � {ticket.category} � {ticket.date}</div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                        {ticket.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Knowledge Base FAQs */}
            <div className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-3">
              <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-2">
                Frequently Answered Inquiries
              </h3>
              {faqs.map((faq, i) => (
                <div key={i} className="border border-neutral-800 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full p-3.5 text-left text-xs font-bold text-neutral-200 hover:text-purple-300 flex items-center justify-between"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={14} className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="p-3.5 pt-0 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
