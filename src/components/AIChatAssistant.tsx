import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      text: 'Namaste! I am your VoterWise assistant. I can help you understand the Indian election process, registration, and your rights. What is on your mind today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "How do I register to vote?",
    "What documents do I need?",
    "Can I vote if I'm not in my home town?",
    "How to check my name in the list?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getRealisticResponse = (userMsg: string) => {
    const msg = userMsg.toLowerCase();
    
    if (msg.includes('register') || msg.includes('form 6')) {
      return "That's a vital first step! To register, you should visit the official Voter Service Portal at voters.eci.gov.in and fill out 'Form 6'. You'll need a passport-sized photo, age proof, and address proof. Would you like me to explain which documents work best?";
    }
    
    if (msg.includes('document') || msg.includes('proof') || msg.includes('id')) {
      return "For documentation, the ECI is quite flexible. You can use your Aadhaar, PAN card, Driving License, or even a Bank Passbook as address proof. Just make sure the address matches where you currently reside!";
    }

    if (msg.includes('home') || msg.includes('town') || msg.includes('place')) {
      return "In India, you should be registered where you 'ordinarily reside'. If you've moved for work or study, you can transfer your registration to your current city using Form 8. It's much easier than traveling back on election day!";
    }

    if (msg.includes('list') || msg.includes('check') || msg.includes('name')) {
      return "Checking the list (Electoral Roll) is easy! Use the 'Electoral Search' feature on the ECI website. You can search by your EPIC number or by entering your personal details. It's always good to check a few weeks before voting starts.";
    }

    if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste')) {
      return "Namaste! It's great to see citizens taking an interest in our democracy. How can I guide you through the process today?";
    }

    if (msg.includes('thank') || msg.includes('thanks')) {
      return "You're very welcome! Empowering voters is my favorite job. Let me know if anything else comes up!";
    }

    return "That's an interesting point. While I'm still learning some of the finer details, I can tell you that the Election Commission ensures every vote counts. Could you tell me a bit more so I can give you a better answer?";
  };

  const handleSend = async (textOverride?: string) => {
    const messageText = textOverride || input;
    if (!messageText.trim()) return;

    const userMessage = messageText.trim();
    setInput('');
    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    // Fixed delay for realism
    const typingDelay = 1500;
    
    setTimeout(() => {
      setIsTyping(true);
      
      const responseDelay = 2000;
      setTimeout(() => {
        const botResponse = getRealisticResponse(userMessage);
        setMessages(prev => [...prev, { 
          role: 'bot', 
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setIsTyping(false);
      }, responseDelay);
    }, typingDelay);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 btn-primary"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-[90vw] sm:w-[400px] h-[600px] bg-card rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-border"
          >
            {/* Header */}
            <div className="p-4 bg-primary text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-primary rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">VoterWise Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <p className="text-[10px] text-white/80 font-medium">Online & Ready to Help</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-muted/5">
              <div className="text-center">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/20 px-3 py-1 rounded-full">Today</span>
              </div>

              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-card border border-border text-primary'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-card border border-border text-foreground rounded-tl-none'}`}>
                        {msg.text}
                      </div>
                      <p className={`text-[9px] mt-1 text-muted-foreground font-medium ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-card border border-border text-primary">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-card border border-border p-4 rounded-2xl rounded-tl-none shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length < 3 && (
              <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-border bg-card">
                {suggestions.map((s, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(s)}
                    className="whitespace-nowrap px-4 py-2 rounded-full border border-primary/20 text-[11px] font-bold text-primary hover:bg-primary/5 transition-all flex items-center gap-1.5"
                  >
                    {s} <ChevronRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-3 items-center bg-muted/20 rounded-2xl p-1 pr-2 border border-border focus-within:border-primary/50 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your question..."
                  className="flex-1 bg-transparent border-none rounded-xl px-4 py-3 text-sm focus:outline-none"
                />
                <button
                  onClick={() => handleSend()}
                  className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[9px] text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Assistant can make mistakes. Verify important info.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
