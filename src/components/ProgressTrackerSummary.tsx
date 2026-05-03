import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAppStore } from '../store';

const PHASES = [
  { id: 'registration', label: 'Registration Window' },
  { id: 'campaign', label: 'Campaign Period' },
  { id: 'voting', label: 'General Voting Day' },
  { id: 'results', label: 'Results & Post-Election' },
  { id: 'assessment', label: 'Knowledge Assessment' }
];

const ProgressTrackerSummary: React.FC = () => {
  const { progress, markSectionCompleted } = useAppStore();
  
  const completedPhases = PHASES.filter(phase => progress.completedSections.includes(phase.id)).length;
  const currentPhaseIndex = Math.min(completedPhases, PHASES.length - 1);
  const currentPhase = PHASES[currentPhaseIndex];
  const progressPercentage = Math.min(100, Math.round((completedPhases / PHASES.length) * 100));

  const handleNextStep = () => {
    if (completedPhases < PHASES.length) {
      markSectionCompleted(PHASES[currentPhaseIndex].id);
    }
  };

  return (
    <div className="glass rounded-[2rem] p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-xl shadow-primary/5">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black text-primary uppercase tracking-widest">Electoral Readiness</span>
          <span className="text-sm font-black text-primary">{progressPercentage}% Verified</span>
        </div>
        <div className="h-3 w-full bg-muted rounded-full overflow-hidden p-0.5 border border-border">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            className="h-full bg-primary rounded-full" 
          ></motion.div>
        </div>
      </div>
      <div className="flex gap-8 items-center border-l border-border pl-8">
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">
            {completedPhases >= PHASES.length ? 'Completed' : 'Next Milestone'}
          </p>
          <p className="font-bold text-foreground text-lg">
            {completedPhases >= PHASES.length ? 'Ready to Vote' : currentPhase.label}
          </p>
        </div>
        {completedPhases < PHASES.length && (
          <button 
            onClick={handleNextStep}
            className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all group"
          >
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProgressTrackerSummary;
