import { useState } from 'react';
import { Settings, X, Type, Eye, Globe, MapPin, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';

export default function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    highContrast, toggleHighContrast, 
    language, setLanguage,
    textSize, setTextSize,
    region, setRegion,
    theme, setTheme
  } = useAppStore();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-[#E2E8F0]/50 rounded-full transition-all group"
        aria-label="Settings"
      >
        <Settings className="w-5 h-5 text-primary group-hover:rotate-45 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-primary/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
                <div>
                  <h3 className="font-bold text-primary flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Global Settings
                  </h3>
                  <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mt-1">Personalize your experience</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-card rounded-full transition-colors border border-border/30">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/10">
                {/* Theme Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Sun className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Theme Mode</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all font-bold text-sm ${theme === 'light' ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/30 text-muted-foreground'}`}
                    >
                      <Sun className="w-4 h-4" /> Light
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all font-bold text-sm ${theme === 'dark' ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/30 text-muted-foreground'}`}
                    >
                      <Moon className="w-4 h-4" /> Dark
                    </button>
                  </div>
                </div>

                {/* Language Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Language</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'en', label: 'English' },
                      { id: 'hi', label: 'Hindi (हिंदी)' }
                    ].map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => setLanguage(lang.id)}
                        className={`py-4 px-4 rounded-xl border-2 transition-all font-bold text-sm ${language === lang.id ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/30 text-muted-foreground'}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Election Region</span>
                  </div>
                  <select 
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full p-4 rounded-xl border-2 border-border bg-card text-sm font-bold text-primary focus:ring-4 focus:ring-primary/10 focus:border-primary focus:outline-none transition-all"
                  >
                    <option value="IN">National (India)</option>
                    <option value="DL">Delhi NCR</option>
                    <option value="MH">Maharashtra</option>
                    <option value="GJ">Gujarat</option>
                    <option value="KA">Karnataka</option>
                  </select>
                </div>

                {/* Accessibility - Text Size */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Type className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Text Size</span>
                  </div>
                  <div className="flex gap-3">
                    {[
                      { id: 'sm', label: 'Small', icon: 'A' },
                      { id: 'md', label: 'Normal', icon: 'A' },
                      { id: 'lg', label: 'Large', icon: 'A' }
                    ].map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setTextSize(size.id as any)}
                        className={`flex-1 py-4 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${textSize === size.id ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/30 text-muted-foreground'}`}
                      >
                        <span className={`font-black ${size.id === 'sm' ? 'text-xs' : size.id === 'md' ? 'text-base' : 'text-xl'}`}>{size.icon}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">{size.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* High Contrast */}
                <div className="flex items-center justify-between p-5 bg-muted/30 rounded-2xl border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${highContrast ? 'bg-primary text-white' : 'bg-card text-muted-foreground border border-border shadow-sm'}`}>
                       <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-primary uppercase tracking-widest">High Contrast</p>
                      <p className="text-[10px] text-muted-foreground font-bold">Accessibility Enhanced</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleHighContrast}
                    className={`w-14 h-8 rounded-full transition-all relative ${highContrast ? 'bg-primary' : 'bg-border'}`}
                  >
                    <div className={`absolute top-1.5 left-1.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${highContrast ? 'translate-x-6' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="p-6 bg-muted/5 border-t border-border">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-primary text-white font-black py-5 rounded-xl hover:bg-primary/90 transition-all text-xs uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95"
                >
                  Save & Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
