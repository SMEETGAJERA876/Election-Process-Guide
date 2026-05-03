import { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    
    // Simulate Stitch Webhook/API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="bg-card border border-border rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-br-full blur-2xl" />
      <div className="relative z-10">
        <h3 className="text-3xl font-black text-primary mb-3 leading-tight tracking-tight">Voter Intelligence Hub</h3>
        <p className="text-muted-foreground text-base mb-10 max-w-sm font-medium leading-relaxed">
          Join 50,000+ citizens receiving verified election deadlines and procedural tips directly in their inbox.
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-4 text-green-600 bg-green-500/5 p-6 rounded-[2rem] border border-green-500/20 shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-green-500 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="font-bold text-base leading-tight">Verification successful! Your civic journey has begun.</span>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4"
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-muted/30 border border-border rounded-2xl px-6 py-5 text-sm font-bold focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground/50"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 disabled:opacity-50"
              >
                {status === 'loading' ? 'Authenticating...' : (
                  <>
                    Subscribe <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-6 flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
           <div className="flex items-center gap-1.5">
             <ShieldCheck className="w-3.5 h-3.5 text-primary" />
             Privacy Guaranteed
           </div>
           <div className="w-1 h-1 bg-border rounded-full" />
           <span>No Spam, Only Verified Info</span>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
    </div>
  );
}
