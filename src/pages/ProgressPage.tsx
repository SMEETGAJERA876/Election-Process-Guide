import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProgressTrackerSummary from '../components/ProgressTrackerSummary';
import { CheckCircle, Trophy, Target, Award, Calendar, MapPin, Download, ShieldCheck, Verified, Star } from 'lucide-react';
import { useAppStore } from '../store';
import { jsPDF } from 'jspdf';

const ProgressPage: React.FC = () => {
  const { progress, region, markSectionCompleted } = useAppStore();
  const [isVerifying, setIsVerifying] = useState(false);

  const sectionsToComplete = ['registration', 'timeline', 'eligibility', 'assessment'];
  const isEverythingDone = sectionsToComplete.every(s => progress.completedSections.includes(s));
  const isCertified = progress.completedSections.includes('certified');

  const quizScore = progress.quizScores[`quiz-${region}`] || 0;
  
  const getStanding = (score: number) => {
    if (score >= 12) return { label: 'Master Juror', color: 'text-orange-600', bg: 'bg-orange-600/10' };
    if (score >= 8) return { label: 'Civic Advocate', color: 'text-primary', bg: 'bg-primary/10' };
    if (score >= 4) return { label: 'Informed Citizen', color: 'text-green-600', bg: 'bg-green-600/10' };
    return { label: 'Novice Voter', color: 'text-muted-foreground', bg: 'bg-muted' };
  };

  const standing = getStanding(quizScore);

  const achievements = [
    { id: 1, title: 'Early Bird', desc: 'Completed registration simulation', icon: Calendar, color: 'bg-blue-500', earned: progress.completedSections.includes('registration') },
    { id: 2, title: 'Master Juror', desc: 'Perfect or elite score in regional assessment', icon: Star, color: 'bg-orange-500', earned: progress.badges?.includes('master-juror') },
    { id: 3, title: 'Knowledge Seeker', desc: 'Completed electoral assessment', icon: Target, color: 'bg-purple-500', earned: progress.completedSections.includes('assessment') },
    { id: 4, title: 'Certified Voter', desc: 'Successfully verified as an elite voter', icon: Award, color: 'bg-indigo-500', earned: isCertified },
  ];

  const handleDownloadCertificate = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    
    // Certificate Border
    doc.setDrawColor(30, 58, 138); // Primary
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);
    doc.setLineWidth(0.5);
    doc.rect(12, 12, 273, 186);

    // Decorative Elements
    doc.setFillColor(30, 58, 138);
    doc.triangle(10, 10, 60, 10, 10, 60, 'F');
    doc.triangle(287, 200, 237, 200, 287, 150, 'F');

    // Content
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 58, 138);
    doc.setFontSize(40);
    doc.text("CERTIFICATE OF COMPLETION", 148, 60, { align: 'center' });

    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text("This is to officially recognize that", 148, 85, { align: 'center' });

    doc.setFontSize(32);
    doc.setFont("helvetica", "bolditalic");
    doc.setTextColor(15, 23, 42);
    doc.text("CIVIC CITIZEN", 148, 105, { align: 'center' });

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(71, 85, 105);
    doc.text(`has successfully completed the comprehensive electoral education curriculum`, 148, 125, { align: 'center' });
    doc.text(`for the ${region} region and is now designated as a`, 148, 133, { align: 'center' });

    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 58, 138);
    doc.text("CERTIFIED INFORMED VOTER", 148, 150, { align: 'center' });

    // Seal Placeholder
    doc.setDrawColor(30, 58, 138);
    doc.setFillColor(248, 250, 252);
    doc.circle(148, 175, 15, 'FD');
    doc.setTextColor(30, 58, 138);
    doc.setFontSize(10);
    doc.text("OFFICIAL", 148, 174, { align: 'center' });
    doc.text("SEAL", 148, 178, { align: 'center' });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184);
    doc.text(`ID: CP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 30, 185);
    doc.text(`Issue Date: ${new Date().toLocaleDateString()}`, 30, 190);
    doc.text("Verified by CivicPath Electoral Foundation", 267, 190, { align: 'right' });

    doc.save("CivicPath_Voter_Certificate.pdf");
  };

  const handleFinalVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      markSectionCompleted('certified');
      setIsVerifying(false);
    }, 2000);
  };

  const handleDownloadFullReport = () => {
    const doc = new jsPDF();
    const primary = [30, 58, 138];
    doc.setFillColor(primary[0], primary[1], primary[2]);
    doc.rect(0, 0, 210, 50, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("CivicPath", 20, 30);
    doc.setFontSize(12);
    doc.text("Personalized Voter Readiness Report", 20, 40);
    doc.setTextColor(primary[0], primary[1], primary[2]);
    doc.setFontSize(10);
    doc.text(`Region: ${region}`, 150, 65);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 70);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Readiness Progress", 20, 80);
    const completionRate = Math.round((progress.completedSections.length / 5) * 100);
    doc.setFillColor(241, 245, 249);
    doc.rect(20, 85, 170, 10, 'F');
    doc.setFillColor(primary[0], primary[1], primary[2]);
    doc.rect(20, 85, (170 * completionRate) / 100, 10, 'F');
    doc.save("CivicPath_Readiness_Report.pdf");
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
      >
        <div className="max-w-3xl">
          <h1 className="text-5xl font-black text-foreground mb-6">Civic Journey</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Track your journey toward becoming a fully informed and registered voter. Complete all modules to earn your <span className="text-primary font-bold">Certified Voter Badge</span>.
          </p>
          <div className="mt-6 flex items-center gap-4">
             <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Standing:</span>
             <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${standing.bg} ${standing.color}`}>
               {standing.label}
             </span>
             <span className="text-xs font-bold text-muted-foreground">
               Score: {quizScore} / 12
             </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
           {isCertified && (
             <>
               <button 
                 onClick={handleDownloadCertificate}
                 className="flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-orange-500/20 transition-all active:scale-95 animate-pulse"
               >
                 <Award className="w-4 h-4" />
                 Platform Certificate
               </button>
               <a 
                 href="https://voters.eci.gov.in"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-slate-900/20 transition-all active:scale-95"
               >
                 <ShieldCheck className="w-4 h-4" />
                 Govt. Certificate
               </a>
             </>
           )}
           <button 
             onClick={handleDownloadFullReport}
             className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-95"
           >
             <Download className="w-4 h-4" />
             Readiness Report
           </button>
        </div>
      </motion.div>

      <ProgressTrackerSummary />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div id="achievements-section" className="bg-card border border-border rounded-[2.5rem] p-10 shadow-sm scroll-mt-24">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-primary">
              <Trophy className="w-8 h-8" />
              Achievements & Badges
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-6 rounded-3xl border-2 transition-all relative overflow-hidden group ${achievement.earned ? 'bg-card border-primary/10 shadow-md' : 'bg-muted/30 border-border opacity-50'}`}
                >
                  {achievement.earned && (
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors" />
                  )}
                  <div className={`w-12 h-12 ${achievement.color} text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <achievement.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                    {achievement.title}
                    {achievement.earned && <Verified className="w-4 h-4 text-primary" />}
                  </h4>
                  <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {!isCertified && (
            <div className="bg-primary text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 max-w-md">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Final Verification</h3>
                <p className="opacity-80 mb-8 leading-relaxed text-lg">
                  {isEverythingDone 
                    ? "Congratulations! You've completed all educational modules. Run the final verification to claim your Certified Voter status."
                    : "Complete all platform modules to unlock the final verification and receive your official Certificate of Completion."}
                </p>
                <button 
                  disabled={!isEverythingDone || isVerifying}
                  onClick={handleFinalVerification}
                  className={`px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl flex items-center gap-3 ${isEverythingDone ? 'bg-white text-primary hover:bg-muted' : 'bg-white/20 text-white/50 cursor-not-allowed'}`}
                >
                  {isVerifying ? (
                    <>Verifying Credentials...</>
                  ) : (
                    <>
                      Verify Final Status 
                      <ShieldCheck className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full pointer-events-none" />
            </div>
          )}
        </div>

        <aside className="space-y-8">
          <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="text-[10px] font-black text-primary mb-8 uppercase tracking-[0.3em]">Completion Log</h3>
            <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
              {[
                { task: 'Electoral Registration', key: 'registration' },
                { task: 'Timeline Mastery', key: 'timeline' },
                { task: 'Eligibility Check', key: 'eligibility' },
                { task: 'Knowledge Assessment', key: 'assessment' },
                { task: 'Final Verification', key: 'certified' },
              ].map((item, idx) => {
                const isDone = progress.completedSections.includes(item.key);
                return (
                  <div key={idx} className="flex gap-6 items-start relative z-10">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all ${isDone ? 'bg-primary text-white scale-110' : 'bg-card border-2 border-border text-muted-foreground'}`}>
                      {isDone ? <CheckCircle className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 bg-border rounded-full" />}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${isDone ? 'text-foreground' : 'text-muted-foreground'}`}>{item.task}</p>
                      <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mt-1">
                        {isDone ? 'Validated' : 'Pending'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProgressPage;
