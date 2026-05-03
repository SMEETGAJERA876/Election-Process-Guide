import { useState } from 'react';
import { glossaryTerms } from '../data/content';
import { BookOpen, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlossaryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredTerms = glossaryTerms.filter((item) =>
    item.term.toLowerCase().includes(search.toLowerCase()) ||
    item.definition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-primary text-white hover:bg-primary-container px-4 py-2 rounded-lg font-bold text-xs transition-all uppercase tracking-widest shadow-sm"
      >
        <BookOpen className="w-4 h-4" />
        Open Glossary
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-2xl max-h-[85vh] rounded-xl shadow-2xl border border-border flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                <div>
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Civic Glossary
                  </h3>
                  <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mt-1">Electoral Terminology Guide</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-card rounded-full transition-colors border border-border/30"
                >
                  <X className="w-5 h-5 text-primary" />
                </button>
              </div>
              
              <div className="p-6 border-b border-border bg-card">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search terms..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-muted/20 border border-border rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-card transition-all"
                  />
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-muted/10">
                {filteredTerms.length > 0 ? (
                  filteredTerms.map((item) => (
                    <div key={item.id} className="p-6 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-lg text-primary mb-2 flex items-center gap-2">
                         <div className="w-1.5 h-6 bg-primary rounded-full" />
                         {item.term}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.definition}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No terms found matching "{search}"
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-border flex justify-end bg-card">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-container transition-all text-xs uppercase tracking-widest"
                >
                  Close Guide
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
