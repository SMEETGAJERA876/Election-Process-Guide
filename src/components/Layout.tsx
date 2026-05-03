import React from 'react';
import { useAppStore } from '../store';
import Header from './Header';
import Footer from './Footer';
import AIChatAssistant from './AIChatAssistant';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { textSize } = useAppStore();

  const fontSizeClass = textSize === 'sm' ? 'text-sm' : textSize === 'lg' ? 'text-lg' : 'text-base';

  return (
    <div className={`min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white transition-colors duration-200 ${fontSizeClass}`}>
      <Header />

      <main className="container mx-auto px-6 max-w-[1200px] min-h-[calc(100vh-200px)]">
        {children}
      </main>

      <Footer />

      <div className="fixed bottom-8 left-8 z-40 flex flex-col gap-4">
        <a 
          href="/" 
          className="w-14 h-14 bg-white dark:bg-slate-900 border border-border rounded-2xl flex items-center justify-center text-primary shadow-2xl hover:bg-primary hover:text-white transition-all group active:scale-95"
          title="Back to Dashboard"
        >
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2 mb-0.5">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="text-[7px] font-black uppercase tracking-tighter group-hover:hidden">Home</span>
          </div>
        </a>
      </div>

      <AIChatAssistant />
    </div>
  );
};

export default Layout;

