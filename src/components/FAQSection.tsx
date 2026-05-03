import { useState } from 'react';
import { faqs } from '../data/content';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-card rounded-[2rem] border border-border p-8 shadow-sm">
      <div className="mb-8">
        <h3 className="text-[10px] font-black text-primary mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
          <MessageCircleQuestion className="w-3 h-3" />
          Support Center
        </h3>
        <h2 className="text-2xl font-black text-foreground">Common Questions</h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          
          return (
            <div 
              key={index}
              className={`border rounded-2xl overflow-hidden transition-all ${isOpen ? 'bg-primary/5 border-primary/20 shadow-sm' : 'bg-background border-border hover:border-primary/30'}`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
              >
                <span className={`text-sm font-bold transition-colors ${isOpen ? 'text-primary' : 'text-foreground'}`}>{faq.question}</span>
                <ChevronDown 
                  className={`w-4 h-4 text-muted-foreground transition-all duration-300 ${isOpen ? 'rotate-180 text-primary' : 'group-hover:text-primary'}`}
                />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="p-5 pt-0 text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      
      <button className="w-full mt-8 py-4 rounded-2xl border border-dashed border-border text-[10px] font-black text-muted-foreground uppercase tracking-widest hover:border-primary/50 hover:text-primary transition-all">
        View All 24 Questions
      </button>
    </div>
  );
}
