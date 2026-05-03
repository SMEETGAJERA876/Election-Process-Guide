import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  UserPlus, 
  IdCard, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Home,
  Accessibility,
  Briefcase,
  ChevronDown
} from 'lucide-react';

interface Step {
  title: string;
  desc: string;
}

interface Scenario {
  id: string;
  icon: any;
  title: string;
  description: string;
  steps: Step[];
  tag: string;
  color: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'new-voter',
    icon: UserPlus,
    title: "I just turned 18",
    description: "Welcome to democracy! Your first step is getting on the electoral roll.",
    tag: "First-timer",
    color: "primary",
    steps: [
      { title: "Check Eligibility", desc: "Ensure you are 18 on the qualifying date (usually Jan 1st of the election year)." },
      { title: "Form 6", desc: "Fill out Form 6 online via the Voter Portal or offline at your local Electoral Registration Office." },
      { title: "Identity Proof", desc: "Prepare documents like Aadhaar, Passport, or Birth Certificate." },
      { title: "Verification", desc: "A Booth Level Officer (BLO) will visit your address for verification." }
    ]
  },
  {
    id: 'relocated',
    icon: MapPin,
    title: "I moved to a new city",
    description: "Don't lose your right to vote. Update your registration to your new residence.",
    tag: "Relocation",
    color: "blue-500",
    steps: [
      { title: "Form 8", desc: "You don't need to cancel your old registration. Just fill Form 8 for 'Shifting'." },
      { title: "Address Proof", desc: "Provide proof of your new residence (Electricity bill, Rent agreement, etc.)." },
      { title: "Online Update", desc: "Use the NVSP portal for a faster process compared to offline applications." },
      { title: "Old Card", desc: "You can keep your old EPIC card; the records will be updated digitally." }
    ]
  },
  {
    id: 'senior',
    icon: Home,
    title: "I am a Senior Citizen",
    description: "Special facilities are available for voters above 80 years of age.",
    tag: "80+ Years",
    color: "orange-500",
    steps: [
      { title: "Form 12D", desc: "Opt for home voting by submitting Form 12D within 5 days of election notification." },
      { title: "Home Voting", desc: "A team of polling officials will visit your home to collect your vote via postal ballot." },
      { title: "Queue Priority", desc: "If visiting the booth, senior citizens have priority access and seating facilities." },
      { title: "Pick-up Drop", desc: "Check if your local constituency provides transport facilities for elderly voters." }
    ]
  },
  {
    id: 'pwd',
    icon: Accessibility,
    title: "Person with Disability",
    description: "Ensuring accessible and inclusive voting for every citizen.",
    tag: "Inclusion",
    color: "emerald-500",
    steps: [
      { title: "Saksham App", desc: "Register as a PwD voter on the Saksham App for personalized assistance." },
      { title: "Ramp & Wheelchair", desc: "All polling stations are equipped with ramps. Wheelchairs are available on request." },
      { title: "Braille Support", desc: "EVMs have Braille markings. You can also bring a companion if needed." },
      { title: "Free Transport", desc: "Book free transport to and from the polling station via the official app." }
    ]
  },
  {
    id: 'service',
    icon: Briefcase,
    title: "I am on Election Duty",
    description: "For government employees and security personnel on duty during polls.",
    tag: "Service Voter",
    color: "slate-500",
    steps: [
      { title: "Postal Ballot", desc: "Apply for a Postal Ballot using Form 12 if you are posted away from home." },
      { title: "EDC Card", desc: "Get an Election Duty Certificate (Form 12A) to vote at the booth where you are posted." },
      { title: "Training", desc: "Attend mandatory training sessions to understand your roles as a polling official." },
      { title: "Early Voting", desc: "Postal ballots must reach the returning officer before the start of counting." }
    ]
  },
  {
    id: 'lost-id',
    icon: IdCard,
    title: "I lost my Voter ID",
    description: "Don't worry, you can still vote even without the physical EPIC card.",
    tag: "Emergency",
    color: "rose-500",
    steps: [
      { title: "Check Roll", desc: "Ensure your name is still in the electoral roll via the 'Search in Roll' feature." },
      { title: "Form 8", desc: "Apply for a replacement card using Form 8 on the NVSP portal." },
      { title: "Alternate IDs", desc: "On polling day, you can use Aadhaar, PAN, or Passport if your name is in the roll." },
      { title: "Digital EPIC", desc: "Download the e-EPIC (digital version) from the Voter Helpline App." }
    ]
  }
];

const ScenarioTutorials: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);

  return (
    <section className="py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 px-4">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-black mb-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
               <HelpCircle className="w-7 h-7" />
            </div>
            Guidance for You
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Every voter's journey is unique. Select your situation to receive a tailored, step-by-step roadmap for the 2026 elections.
          </p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-primary/10 text-primary rounded-2xl text-xs font-black uppercase tracking-[0.2em] border border-primary/20">
          <Clock className="w-4 h-4" />
          Live Updates for 2026
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {SCENARIOS.map((scenario) => (
          <motion.button
            key={scenario.id}
            whileHover={{ y: -10, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveScenario(scenario)}
            className={`text-left p-10 rounded-[3rem] border-2 transition-all duration-500 group relative overflow-hidden ${
              activeScenario?.id === scenario.id
              ? 'bg-primary border-primary shadow-[0_30px_60px_-15px_rgba(0,32,69,0.3)]'
              : 'bg-card border-border hover:border-primary/40 hover:shadow-2xl'
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500 ${
              activeScenario?.id === scenario.id ? 'bg-white text-primary' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
            }`}>
              {(() => {
                const Icon = scenario.icon;
                return <Icon className="w-8 h-8" />;
              })()}
            </div>
            <span className={`text-[11px] font-black uppercase tracking-[0.3em] mb-3 block transition-colors ${
              activeScenario?.id === scenario.id ? 'text-white/70' : 'text-primary'
            }`}>
              {scenario.tag}
            </span>
            <h3 className={`text-2xl font-black mb-4 leading-tight transition-colors ${
              activeScenario?.id === scenario.id ? 'text-white' : 'text-foreground'
            }`}>
              {scenario.title}
            </h3>
            <p className={`text-sm leading-relaxed mb-8 font-medium transition-colors ${
              activeScenario?.id === scenario.id ? 'text-white/80' : 'text-muted-foreground'
            }`}>
              {scenario.description}
            </p>
            <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors ${
              activeScenario?.id === scenario.id ? 'text-white' : 'text-primary'
            }`}>
              Start Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
            
            {/* Background Accent */}
            <div className={`absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-5 pointer-events-none transition-colors ${
              activeScenario?.id === scenario.id ? 'bg-white' : 'bg-primary'
            }`} />
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeScenario && (
          <motion.div
            key={activeScenario.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="mt-12 mx-4"
          >
            <div className="flex flex-col items-center mb-12">
               <motion.div 
                 animate={{ y: [0, 10, 0] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-lg"
               >
                 <ChevronDown className="w-6 h-6 text-primary" />
               </motion.div>
               <div className="w-0.5 h-12 bg-gradient-to-b from-primary/20 to-transparent mt-2" />
            </div>

            <div className="bg-slate-900 dark:bg-slate-950 text-white rounded-[4rem] p-10 md:p-20 relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] border border-white/5">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                  <div className="lg:w-1/3">
                    <div className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl shadow-primary/30 rotate-3">
                      {(() => {
                        const Icon = activeScenario.icon;
                        return <Icon className="w-12 h-12 text-white" />;
                      })()}
                    </div>
                    <h4 className="text-4xl font-black mb-6 leading-tight">{activeScenario.title}</h4>
                    <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium">
                      Follow this specialized checklist to ensure your vote counts. All procedures are based on latest ECI guidelines.
                    </p>
                    <button 
                      onClick={() => setActiveScenario(null)}
                      className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95"
                    >
                      Close Guide
                    </button>
                  </div>
                  
                  <div className="flex-1 grid gap-6 w-full">
                    {activeScenario.steps.map((step, idx) => (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx}
                        className="flex gap-8 p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] transition-all group relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/20 text-primary flex items-center justify-center font-black text-lg border border-primary/20 shadow-inner">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-black text-xl mb-2 flex items-center gap-3">
                            {step.title}
                            <CheckCircle2 className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100" />
                          </h5>
                          <p className="text-slate-400 text-base leading-relaxed font-medium">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ScenarioTutorials;

