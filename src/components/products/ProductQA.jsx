import React, { useState } from 'react';
import { HelpCircle, ThumbsUp, Send, CheckCircle2 } from 'lucide-react';
import { useToastStore } from '../../store/useToastStore';

export const ProductQA = () => {
  const addToast = useToastStore((state) => state.addToast);
  const [questionText, setQuestionText] = useState('');
  const [qaList, setQaList] = useState([
    {
      id: 1,
      question: 'Is the titanium chassis hypoallergenic for sensitive skin?',
      askedBy: 'David K.',
      date: 'Aug 20, 2026',
      answer: 'Yes, absolutely. The chassis is crafted from certified Grade-5 aerospace titanium with nickel-free physical vapor deposition (PVD) coating.',
      answeredBy: 'Aura Technical Support',
      helpful: 34
    },
    {
      id: 2,
      question: 'Can this be paired with two Bluetooth devices simultaneously?',
      askedBy: 'Sarah M.',
      date: 'Aug 14, 2026',
      answer: 'Yes, multipoint Bluetooth 5.4 connection is supported out of the box with seamless auto-switching.',
      answeredBy: 'Verified Audio Specialist',
      helpful: 19
    }
  ]);

  const handleAsk = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const newQ = {
      id: Date.now(),
      question: questionText,
      askedBy: 'You (Aleen Mathew)',
      date: 'Just now',
      answer: 'Thank you! An Aura verified specialist will answer your inquiry within 2 hours.',
      answeredBy: 'Pending Specialist Review',
      helpful: 0
    };

    setQaList([newQ, ...qaList]);
    setQuestionText('');
    addToast('Your question has been posted to community Q&A!', 'success');
  };

  const handleHelpful = (id) => {
    setQaList(qaList.map(q => q.id === id ? { ...q, helpful: q.helpful + 1 } : q));
    addToast('Marked question as helpful!', 'info');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAsk} className="flex gap-2">
        <input
          type="text"
          placeholder="Have a question about specifications, battery, materials? Ask here..."
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="flex-1 h-11 px-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          className="px-5 h-11 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shrink-0"
        >
          <Send size={13} /> Ask Question
        </button>
      </form>

      <div className="space-y-4">
        {qaList.map(q => (
          <div key={q.id} className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                  Q
                </span>
                <h4 className="font-bold text-white">{q.question}</h4>
              </div>
              <span className="text-[10px] text-neutral-500 shrink-0">{q.date}</span>
            </div>

            <div className="pl-7 space-y-1 bg-neutral-900/40 p-3 rounded-xl border border-neutral-800/50">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 size={12} /> {q.answeredBy}
              </div>
              <p className="text-neutral-300 leading-relaxed text-[11px]">{q.answer}</p>
            </div>

            <div className="pl-7 flex items-center gap-3 text-neutral-400 text-[11px]">
              <button onClick={() => handleHelpful(q.id)} className="hover:text-purple-400 flex items-center gap-1">
                <ThumbsUp size={11} /> Helpful ({q.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
