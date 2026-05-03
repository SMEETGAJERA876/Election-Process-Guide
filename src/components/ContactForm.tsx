import React, { useState } from 'react';
import { Send, User, Mail, MessageSquare, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-500/5 border border-green-500/20 rounded-[2.5rem] p-12 text-center"
      >
        <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-green-700 mb-2">Message Received!</h3>
        <p className="text-green-600/70 mb-8 max-w-md mx-auto">
          Thank you for reaching out. Our support team will get back to you within 24 hours. In the meantime, you can continue exploring the guide.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-[2.5rem] p-12 shadow-sm">
      <div className="mb-10">
        <h3 className="text-2xl font-black mb-2">Direct Support</h3>
        <p className="text-muted-foreground">Fill out the form below and we'll connect you with a voter education expert.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                required
                type="text" 
                placeholder="John Doe"
                className="w-full bg-muted/20 border border-border rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-card transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                required
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-muted/20 border border-border rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-card transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Message</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-6 w-4 h-4 text-muted-foreground" />
            <textarea 
              required
              rows={5}
              placeholder="How can we help you today?"
              className="w-full bg-muted/20 border border-border rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-card transition-all resize-none"
            ></textarea>
          </div>
        </div>

        <button 
          disabled={loading}
          type="submit"
          className="w-full bg-primary text-white py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <>
              Send Message <Send className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
