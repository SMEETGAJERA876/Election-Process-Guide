import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ProgressTrackerSummary from '../components/ProgressTrackerSummary';
import WelcomeModules from '../components/WelcomeModules';
import ScenarioTutorials from '../components/ScenarioTutorials';
import GlossaryPreview from '../components/GlossaryPreview';
import NewsletterForm from '../components/NewsletterForm';
import VerifiedResources from '../components/VerifiedResources';

const HomePage = () => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section - High Impact Entry */}
      <HeroSection />

      {/* Progress Tracker Summary - User-Specific Context */}
      <section className="scroll-mt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 px-4">
          <div>
            <h2 className="text-3xl font-black text-foreground">Your Journey</h2>
            <p className="text-muted-foreground font-medium text-sm">Personalized roadmap based on your current region.</p>
          </div>
        </div>
        <ProgressTrackerSummary />
      </section>

      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-32">
          {/* Featured Core Modules */}
          <WelcomeModules />
          
          {/* Quick Access Scenario Guide */}
          <ScenarioTutorials />

          {/* Featured Assessment Section */}
          <section className="bg-primary rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4 block">Knowledge Check</span>
              <h3 className="text-4xl font-black mb-6 leading-tight">Are you truly poll-ready?</h3>
              <p className="text-lg opacity-80 mb-8 leading-relaxed">
                Most first-time voters lose their right to vote due to missing small procedural details. Test your knowledge in 2 minutes.
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                 <Link to="/quiz" className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-muted transition-all">
                   Start Assessment
                 </Link>
                 <div className="flex -space-x-3 items-center">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-slate-200 overflow-hidden shrink-0">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                      </div>
                    ))}
                    <span className="pl-6 text-xs font-bold opacity-60">12k+ Passed Today</span>
                 </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-bl-full pointer-events-none" />
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-16">
          <div className="sticky top-28 space-y-16">
            {/* Quick Poll/Interactive Widget */}
            <div className="bg-card border-2 border-primary/20 rounded-[2.5rem] p-8 shadow-sm group hover:border-primary/50 transition-all">
               <h4 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">Quick Simulator</h4>
               <p className="text-sm font-bold mb-6 leading-relaxed">Want to try the EVM before you go to the booth? Experience the VVPAT verification process.</p>
               <Link to="/ballot" className="w-full py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                 Launch Simulator <ArrowRight className="w-4 h-4" />
               </Link>
            </div>

            <GlossaryPreview />
            <NewsletterForm />
            <VerifiedResources />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;

