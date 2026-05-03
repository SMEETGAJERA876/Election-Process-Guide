import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QuizComponent from '../components/QuizComponent';
import { Bolt, Timer, Award, Shield, Verified, Lock, Lightbulb, ExternalLink, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    if (!isTimerRunning) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quiz Section (Left/Main Canvas) */}
        <div className="lg:col-span-8 space-y-8">
          <QuizComponent onComplete={() => setIsTimerRunning(false)} />
          
          {/* Bento Style Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-card border border-border p-6 rounded-xl flex items-center gap-6 shadow-sm"
            >
              <div className="bg-primary/10 p-4 rounded-full">
                <Bolt className="text-primary w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Accuracy Streak</p>
                <p className="text-2xl font-bold text-primary">3 Questions</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-card border border-border p-6 rounded-xl flex items-center gap-6 shadow-sm"
            >
              <div className="bg-accent/10 p-4 rounded-full">
                <Timer className="text-accent w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Time Remaining</p>
                <p className={`text-2xl font-bold ${timeLeft < 60 ? 'text-destructive animate-pulse' : 'text-primary'}`}>
                  {formatTime(timeLeft)}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Side Progress & Badges (Right Rail) */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-primary text-white p-8 rounded-xl overflow-hidden relative shadow-lg">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Current Standing</h3>
              <p className="text-sm opacity-80 mb-6">You've mastered 45% of the electoral curriculum this month.</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                  <span>Module Completion</span>
                  <span>4/10</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-accent h-full w-[45%] rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12">
              <CheckCircle size={160} />
            </div>
          </div>

          <div className="bg-card border border-border p-8 rounded-xl shadow-sm">
            <h3 className="text-xs font-black text-primary mb-6 flex items-center gap-2 uppercase tracking-widest">
              <Award className="w-4 h-4" />
              Earned Badges
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Shield, label: 'Civic Historian', earned: true },
                { icon: Verified, label: 'Verified Voter', earned: true },
                { icon: Lock, label: 'Master Juror', earned: false },
              ].map((badge, idx) => (
                <div key={idx} className={`group cursor-help ${!badge.earned && 'opacity-40'}`}>
                  <div className={`aspect-square rounded-full flex items-center justify-center border-2 mb-2 transition-all ${badge.earned ? 'bg-primary/5 border-primary' : 'bg-muted border-border'}`}>
                    <badge.icon className={`w-8 h-8 ${badge.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <p className="text-[9px] text-center font-bold text-primary uppercase tracking-tighter leading-tight">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tailored Tip Widget */}
          <div className="bg-card border border-border p-8 rounded-xl relative shadow-sm">
            <div className="flex items-start gap-4">
              <div className="text-primary">
                <Lightbulb className="w-6 h-6 fill-primary" />
              </div>
              <div>
                <h4 className="text-xs font-black text-primary mb-2 uppercase tracking-widest">Pro-Tip for You</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Based on your answers about the registration process, you might want to double-check your local voting precinct as it may have changed.
                </p>
                <button onClick={() => navigate('/eligibility')} className="inline-flex items-center text-primary text-xs font-bold mt-4 hover:underline gap-1">
                  Check Registration
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Visual Anchor: Educational Illustration */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 bg-primary text-white rounded-2xl overflow-hidden items-center shadow-xl">
        <div className="p-12 space-y-6">
          <h2 className="text-4xl font-bold leading-tight">Knowledge is Power in the Booth.</h2>
          <p className="text-lg opacity-80 leading-relaxed">
            Our curriculum is designed by constitutional scholars to ensure every citizen feels confident on election day. Complete the full series to unlock the 'Elite Voter' certification.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => navigate('/timeline')}
              className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-muted transition-all flex items-center gap-2"
            >
              Explore Curriculum
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate('/progress')}
              className="border border-white/40 px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-all"
            >
              View All Badges
            </button>
          </div>
        </div>
        <div className="h-full min-h-[400px] relative">
          <img 
            className="w-full h-full object-cover grayscale opacity-40 contrast-125" 
            alt="Modern government building interior"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv7J0hMeO6078aRIJOsx9e5FfLpLkyFnprOdvHg4tZ-K5dzx0ByxgCMdCKfrhxpuRr_CmZXmhXELHW62JBPz4GVS9xyHlFdk5cMDC8xGH6cqt0iha09nnpt5jH-YkARGu_50h1DtCDAkhfTYrrLbw5UpNxU5TE5RrmbGrbxmMw2f2_zmS-TrcD1vMMb0xYDBUL2dK9syvnMOxsvzku4vJSISvmYkhintL1MbON178s-C8rQbFp2x3L_hvStuwdT3p4X1ybiOyZyIk"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent md:block hidden" />
        </div>
      </section>
    </div>
  );
};

export default QuizPage;

