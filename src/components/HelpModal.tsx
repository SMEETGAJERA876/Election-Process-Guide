import { useState } from 'react';
import { HelpCircle, X, Info, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HelpModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-[#E2E8F0]/50 rounded-full transition-all"
        aria-label="Help"
      >
        <HelpCircle className="w-5 h-5 text-primary" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-md rounded-xl shadow-2xl border border-border overflow-hidden"
            >
              <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                <h3 className="font-bold text-primary flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Help & Support
                </h3>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-primary mb-3 uppercase tracking-wider flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" />
                    How to use CivicPath
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    1. Follow the **Timeline** to understand the election cycle.<br/>
                    2. Use the **Glossary** to look up unfamiliar terms.<br/>
                    3. Take the **Quiz** to verify your knowledge and earn badges.<br/>
                    4. Check the **FAQ** for common procedural questions.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-primary mb-3 uppercase tracking-wider">Official Helpdesk</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg border border-border/30">
                      <Phone className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Voter Helpline</p>
                        <p className="text-sm font-bold text-primary">1950</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg border border-border/30">
                      <Mail className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">Email Support</p>
                        <p className="text-sm font-bold text-primary">complaints@eci.gov.in</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg border border-border/30">
                      <MapPin className="w-4 h-4 text-primary" />
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">ECI Address</p>
                        <p className="text-sm font-bold text-primary">Nirvachan Sadan, Ashoka Road, New Delhi</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/10 border-t border-border text-center">
                <p className="text-[10px] text-muted-foreground italic mb-3">This is a non-partisan educational platform.</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary-container transition-all text-xs uppercase tracking-widest"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
