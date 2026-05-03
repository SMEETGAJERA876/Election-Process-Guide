import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useAppStore } from '../store';

const ProgressTrackerSummary: React.FC = () => {
  const { progress } = useAppStore();
  
  // Define core milestones to track
  const CORE_MILESTONES = ['registration', 'campaign', 'voting', 'results', 'assessment'];
  const completedCount = CORE_MILESTONES.filter(m => progress.completedSections.includes(m)).length;
  const progressPercentage = Math.round((completedCount / CORE_MILESTONES.length) * 100);

  return (
    <div className="bg-card border border-border rounded-[2rem] p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-black text-foreground leading-none mb-1">Electoral Readiness</h3>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Global Progress Tracker</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-4xl font-black text-primary">{progressPercentage}%</span>
          <span className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-2">Verified</span>
        </div>
      </div>

      <div className="relative h-4 w-full bg-muted rounded-full overflow-hidden p-1 border border-border/50">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-primary rounded-full relative shadow-[0_0_15px_rgba(30,58,138,0.3)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </motion.div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex gap-2">
          {CORE_MILESTONES.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 w-8 rounded-full transition-all duration-500 ${idx < completedCount ? 'bg-primary' : 'bg-muted'}`} 
            />
          ))}
        </div>
        <p className="text-[10px] font-black text-primary uppercase tracking-widest">
          {progressPercentage === 100 ? 'Ready for Polling Day 2026' : 'Complete all modules to unlock certification'}
        </p>
      </div>
    </div>
  );
};

export default ProgressTrackerSummary;
