import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useAppStore } from './store';
import { stitch } from './services/stitch';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
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
  const { theme, highContrast, textSize, region, setUser, progress, user, setProgress, resetProgress } = useAppStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // When user logs in, fetch their cloud data
        const userDoc = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(userDoc);
        
        if (docSnap.exists()) {
          const cloudData = docSnap.data();
          if (cloudData.progress) {
            setProgress(cloudData.progress);
          }
        } else {
          // If no cloud data, reset local progress for the new user
          resetProgress();
        }
      }
    });
    return () => unsubscribe();
  }, [setUser, setProgress, resetProgress]);

  // Automatically save progress to cloud whenever it changes
  useEffect(() => {
    if (user) {
      const saveToCloud = async () => {
        try {
          const userDoc = doc(db, 'users', user.uid);
          await setDoc(userDoc, { progress }, { merge: true });
        } catch (error) {
          console.error("Error saving to cloud:", error);
        }
      };
      saveToCloud();
    }
  }, [progress, user]);

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
