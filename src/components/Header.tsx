import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Sun, Moon, LogIn } from 'lucide-react';
import RegionSelector from './RegionSelector';
import SettingsModal from './SettingsModal';
import HelpModal from './HelpModal';
import { useAppStore } from '../store';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const Header: React.FC = () => {
  const { theme, setTheme, user, setUser } = useAppStore();
  const location = useLocation();

  const handleAuth = async () => {
    try {
      if (user) {
        await signOut(auth);
        setUser(null);
      } else {
        const result = await signInWithPopup(auth, googleProvider);
        setUser(result.user);
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
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
          <div className="w-px h-6 bg-border mx-2 hidden md:block" />
          
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end hidden sm:flex">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary leading-none">
                  {user.displayName?.split(' ')[0]}
                </p>
                <button 
                  onClick={handleAuth}
                  className="text-[8px] font-bold text-muted-foreground hover:text-destructive transition-colors uppercase tracking-tighter mt-1"
                >
                  Sign Out
                </button>
              </div>
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`} 
                alt={user.displayName || 'User'} 
                className="w-9 h-9 rounded-xl border-2 border-primary/10 shadow-sm hover:border-primary/30 transition-all"
              />
            </div>
          ) : (
            <button 
              onClick={handleAuth}
              className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-md shadow-primary/20 active:scale-95"
            >
              <LogIn className="w-4 h-4" /> Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
