import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Sun, Moon } from 'lucide-react';
import RegionSelector from './RegionSelector';
import SettingsModal from './SettingsModal';
import HelpModal from './HelpModal';
import { useAppStore } from '../store';

const Header: React.FC = () => {
  const { theme, setTheme } = useAppStore();
  const location = useLocation();

  const navLinks = [
    { name: 'Timeline', path: '/timeline' },
    { name: 'Ballot', path: '/ballot' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Progress', path: '/progress' },
    { name: 'Eligibility', path: '/eligibility' },
  ];

  return (
    <header className="bg-background/95 backdrop-blur border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 max-w-[1200px] flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-black tracking-tighter text-primary flex items-center gap-2">
            <Shield className="w-6 h-6 fill-primary/10" />
            CivicPath
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-all text-xs font-bold uppercase tracking-widest ${
                  location.pathname === link.path ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <RegionSelector />
          </div>
          
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 hover:bg-muted rounded-full transition-all group relative"
            aria-label="Change Theme"
          >
            {theme === 'light' ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
          </button>

          <SettingsModal />
          <HelpModal />
        </div>
      </div>
    </header>
  );
};

export default Header;
