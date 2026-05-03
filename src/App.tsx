import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useAppStore } from './store';
import { stitch } from './services/stitch';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import EligibilityPage from './pages/EligibilityPage';
import QuizPage from './pages/QuizPage';
import FAQPage from './pages/FAQPage';
import BallotPage from './pages/BallotPage';
import ProgressPage from './pages/ProgressPage';

// Helper component to reset scroll on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Helper component to track page views via Stitch
const PageTracker = () => {
  const location = useLocation();
  const { region } = useAppStore();

  useEffect(() => {
    stitch.trackEvent('page_view', { 
      path: location.pathname, 
      region,
      timestamp: new Date().toISOString() 
    });
  }, [location, region]);

  return null;
};

function App() {
  const { theme, highContrast, textSize, region, setUser } = useAppStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    const root = window.document.documentElement;
    const applyTheme = (currentTheme: string) => {
      root.classList.remove('light', 'dark');
      root.classList.add(currentTheme);
    };
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-sm', 'text-md', 'text-lg');
    root.classList.add(`text-${textSize}`);
  }, [textSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    // Initial data fetch from Stitch
    stitch.fetchElectoralData(region).then(data => {
      console.log('Electoral data synchronized:', data);
    });
  }, [region]);

  return (
    <Router>
      <ScrollToTop />
      <PageTracker />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/eligibility" element={<EligibilityPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/support" element={<FAQPage />} />
          <Route path="/ballot" element={<BallotPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
