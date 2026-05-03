import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Trophy, Award, Calendar, MapPin, Download, ShieldCheck, Verified, Star, UserCheck, LogIn } from 'lucide-react';
import { useAppStore } from '../store';
import { jsPDF } from 'jspdf';

const ProgressPage: React.FC = () => {
  const { progress, region, markSectionCompleted } = useAppStore();
  const [isVerifying, setIsVerifying] = useState(false);

  const sectionsToComplete = ['registration', 'timeline', 'eligibility', 'assessment'];
  const isEverythingDone = sectionsToComplete.every(s => progress.completedSections.includes(s));
  const isCertified = progress.completedSections.includes('certified');

  const PHASES_LIST = ['registration', 'timeline', 'eligibility', 'assessment', 'voting'];
  const completedPhasesCount = PHASES_LIST.filter(p => progress.completedSections.includes(p)).length;
  const overallProgressPct = Math.min(100, Math.round((completedPhasesCount / 5) * 100));

  const achievements = [
    { id: 1, title: 'CIVIC HISTORIAN', desc: 'Verified as a proud citizen of India', icon: ShieldCheck, color: 'bg-emerald-500', earned: progress.badges?.includes('civic-historian') },
    { id: 2, title: 'VERIFIED VOTER', desc: 'Confirmed legal voting age (18+)', icon: UserCheck, color: 'bg-blue-600', earned: progress.badges?.includes('verified-voter') },
    { id: 3, title: 'MASTER JUROR', desc: 'Elite score in regional assessment', icon: Star, color: 'bg-orange-500', earned: progress.badges?.includes('master-juror') },
  ];

  const handleDownloadCertificate = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setDrawColor(30, 58, 138);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);
    doc.save("CivicPath_Voter_Certificate.pdf");
  };

  const handleFinalVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      markSectionCompleted('certified');
      setIsVerifying(false);
    }, 2000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 space-y-8">
      {/* Current Standing & Badges (Matching Image) */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Current Standing Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[400px]"
        >
          <div className="relative z-10">
            <h2 className="text-5xl font-black mb-6 tracking-tight">Current Standing</h2>
            <p className="text-xl opacity-80 mb-12 font-medium max-w-sm">
              You've mastered {overallProgressPct}% of the electoral curriculum this month.
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-end mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Module Completion</span>
              <span className="text-3xl font-black">{completedPhasesCount}/10</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(completedPhasesCount/10) * 100}%` }}
                className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]"
              />
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        </motion.div>

        {/* Earned Badges Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card border border-border rounded-[2.5rem] p-10 shadow-sm flex flex-col min-h-[400px]"
        >
          <div className="flex items-center gap-4 mb-16">
             <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
               <Award className="w-5 h-5 text-primary" />
             </div>
             <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Earned Badges</h3>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {achievements.map((badge) => (
              <div key={badge.id} className="flex flex-col items-center">
                <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 flex items-center justify-center mb-6 transition-all duration-700 ${badge.earned ? 'border-primary bg-primary/5 text-primary' : 'border-muted bg-muted/20 text-muted-foreground/20'}`}>
                   {badge.earned ? (
                     <badge.icon className="w-10 h-10 sm:w-12 sm:h-12" />
                   ) : (
                     <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 opacity-10" />
                   )}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest text-center leading-tight max-w-[80px] ${badge.earned ? 'text-foreground' : 'text-muted-foreground/30'}`}>
                  {badge.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {!isCertified && (
            <div className="bg-primary text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-xl">
              <div className="relative z-10 max-w-md">
                <h3 className="text-3xl font-black mb-4">Platform Certification</h3>
                <p className="opacity-80 mb-8 font-medium">Complete all modules to unlock your official Voter Education Certificate.</p>
                <button 
                  disabled={!isEverythingDone || isVerifying}
                  onClick={handleFinalVerification}
                  className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isEverythingDone ? 'bg-white text-primary hover:scale-105' : 'bg-white/20 text-white/50'}`}
                >
                  {isVerifying ? 'Processing...' : 'Verify Status'}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-[2.5rem] p-8">
           <h3 className="text-[10px] font-black text-primary mb-8 uppercase tracking-[0.3em]">Quick Actions</h3>
           <div className="space-y-4">
             <button onClick={handleDownloadCertificate} disabled={!isCertified} className="w-full py-4 rounded-xl border border-border text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all">Download Certificate</button>
             <button className="w-full py-4 rounded-xl bg-muted text-[10px] font-black uppercase tracking-widest hover:bg-border transition-all">Report Issue</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
