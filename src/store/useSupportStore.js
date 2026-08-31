import { create } from 'zustand';

const INITIAL_TICKETS = [
  {
    id: 'TCK-8821',
    subject: 'Express Delivery Schedule Inscription',
    category: 'Shipping & Delivery',
    priority: 'High',
    status: 'In Progress',
    date: 'Aug 29, 2026',
    messages: [
      { sender: 'client', text: 'Hi, can I confirm if my order #AS-2026-9812 will arrive before Friday evening?', time: '10:14 AM' },
      { sender: 'agent', text: 'Hello Jane, our logistics courier has dispatched your package via Priority Air Express. Estimated delivery is Thursday by 2:00 PM.', time: '10:30 AM' }
    ]
  },
  {
    id: 'TCK-8740',
    subject: 'Aura Artisan Watch Strap Sizing Inquiry',
    category: 'Product Inquiry',
    priority: 'Medium',
    status: 'Resolved',
    date: 'Aug 20, 2026',
    messages: [
      { sender: 'client', text: 'What is the lug width for the Chronograph strap?', time: '2:15 PM' },
      { sender: 'agent', text: 'The lug width is precisely 20mm with quick-release spring bars.', time: '2:22 PM' }
    ]
  }
];

export const useSupportStore = create((set, get) => ({
  tickets: JSON.parse(localStorage.getItem('aurastore_tickets') || JSON.stringify(INITIAL_TICKETS)),
  activeChat: JSON.parse(localStorage.getItem('aurastore_chat') || JSON.stringify([
    { sender: 'agent', text: 'Welcome to Aura Concierge Live Support. How may we assist your luxury experience today?', time: 'Just now' }
  ])),

  createTicket: (subject, category, priority, message) => {
    const newTicket = {
      id: 'TCK-' + Math.floor(1000 + Math.random() * 9000),
      subject,
      category,
      priority,
      status: 'Open',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      messages: [
        { sender: 'client', text: message, time: 'Just now' }
      ]
    };
    const updated = [newTicket, ...get().tickets];
    localStorage.setItem('aurastore_tickets', JSON.stringify(updated));
    set({ tickets: updated });
    return newTicket;
  },

  sendChatMessage: (text) => {
    const clientMsg = { sender: 'client', text, time: 'Just now' };
    const updatedWithClient = [...get().activeChat, clientMsg];
    set({ activeChat: updatedWithClient });

    // Simulated instant Concierge AI Agent reply
    setTimeout(() => {
      let replyText = "Thank you for reaching out. Our VIP Concierge Desk has logged your request and will assist you immediately.";
      const lower = text.toLowerCase();
      if (lower.includes('order') || lower.includes('track')) {
        replyText = "You can view live courier GPS telemetry in your Orders tab, or provide your Order ID for instant priority lookup.";
      } else if (lower.includes('return') || lower.includes('refund')) {
        replyText = "AuraStore offers complimentary 30-day global returns. You can initiate a 1-click pickup from your Orders ledger.";
      } else if (lower.includes('coupon') || lower.includes('discount')) {
        replyText = "You can use code 'AURA20' for 20% off or 'VIP40' for VIP status savings at checkout.";
      }

      const agentMsg = { sender: 'agent', text: replyText, time: 'Just now' };
      const fullChat = [...get().activeChat, agentMsg];
      localStorage.setItem('aurastore_chat', JSON.stringify(fullChat));
      set({ activeChat: fullChat });
    }, 900);
  }
}));
