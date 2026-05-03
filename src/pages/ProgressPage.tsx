import React from 'react';
import { motion } from 'framer-motion';
import { Shield, UserCheck, Lock, Award, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../store';

const ProgressPage: React.FC = () => {
  const { progress, region } = useAppStore();

  const PHASES_LIST = ['registration', 'campaign', 'voting', 'results', 'assessment'];
  const completedPhasesCount = PHASES_LIST.filter(p => progress.completedSections.includes(p)).length;
  // Module completion out of 10 as per image
  const moduleCompletion = completedPhasesCount * 2; 
  const overallProgressPct = (moduleCompletion / 10) * 100;

  const earnedBadges = progress.badges || [];

  const badges = [
    { 
      id: 'civic-historian', 
      label: 'CIVIC HISTORIAN', 
      icon: Shield, 
      earned: earnedBadges.includes('civic-historian') 
    },
    { 
      id: 'verified-voter', 
      label: 'VERIFIED VOTER', 
      icon: UserCheck, 
      earned: earnedBadges.includes('verified-voter') 
    },
    { 
      id: 'master-juror', 
      label: 'MASTER JUROR', 
      icon: Award, 
      earned: earnedBadges.includes('master-juror') 
    }
  ];

  return (
    <div className="max-w-[600px] mx-auto px-6 py-12 space-y-8">
      {/* Current Standing Card (Blue) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1e3a8a] text-white rounded-[2rem] p-10 shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">Current Standing</h2>
          <p className="text-blue-100/80 text-lg mb-12">
            You've mastered {overallProgressPct}% of the electoral curriculum this month.
          </p>

          <div className="space-y-4">
            <div className="flex justify-between items-end uppercase tracking-[0.2em] text-[10px] font-black">
              <span className="opacity-70">MODULE COMPLETION</span>
              <span className="text-xl">{moduleCompletion}/10</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${overallProgressPct}%` }}
                className="h-full bg-white/80 rounded-full"
              />
            </div>
          </div>
        </div>
        
        {/* Decorative Circle Background */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 border-[30px] border-white/5 rounded-full pointer-events-none" />
        <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-10">
          <CheckCircle2 className="w-32 h-32" />
        </div>
      </motion.div>

      {/* Earned Badges Card (White) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-slate-100 rounded-[2rem] p-10 shadow-xl shadow-slate-200/50"
      >
        <div className="flex items-center gap-3 mb-12">
          <Award className="w-6 h-6 text-[#1e3a8a]" />
          <h3 className="text-sm font-black text-[#1e3a8a] uppercase tracking-[0.2em]">EARNED BADGES</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div key={badge.id} className="flex flex-col items-center">
              <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center mb-4 transition-all duration-500 ${badge.earned ? 'border-[#1e3a8a] bg-white' : 'border-slate-50 bg-slate-50/30'}`}>
                {badge.earned ? (
                  <badge.icon className="w-10 h-10 text-[#1e3a8a]" />
                ) : (
                  <Lock className="w-8 h-8 text-slate-300" />
                )}
              </div>
              <span className={`text-[8px] font-black uppercase tracking-widest text-center ${badge.earned ? 'text-[#1e3a8a]' : 'text-slate-300'}`}>
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Helper text for the user */}
      <div className="text-center pt-8">
        <p className="text-xs text-muted-foreground font-medium italic">
          Complete the eligibility check to unlock the first two badges!
        </p>
      </div>
    </div>
  );
};

export default ProgressPage;
