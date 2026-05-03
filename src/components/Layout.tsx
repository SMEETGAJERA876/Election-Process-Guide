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



      <AIChatAssistant />
    </div>
  );
};

export default Layout;

