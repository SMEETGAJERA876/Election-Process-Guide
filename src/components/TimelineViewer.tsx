import { useState } from 'react';
import { Calendar, CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp, FileText, MapPin, Users, ExternalLink, Check, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { timelineEvents } from '../data/content';
import { useAppStore } from '../store';

export default function TimelineViewer() {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const { progress } = useAppStore();

  const getIcon = (type: string, isCompleted: boolean) => {
    if (isCompleted) return <Check className="w-5 h-5" />;
    switch (type) {
      case 'registration': return <Clock className="w-5 h-5" />;
      case 'campaign': return <Users className="w-5 h-5" />;
      case 'voting': return <MapPin className="w-5 h-5" />;
      case 'results': return <Calendar className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const milestones = timelineEvents.map(event => ({
    ...event,
    status: progress.completedSections.includes(event.type) ? "Completed" : "Upcoming",
    statusColor: progress.completedSections.includes(event.type) ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground",
    icon: getIcon(event.type, progress.completedSections.includes(event.type)),
    active: !progress.completedSections.includes(event.type) && 
            (event.type === 'registration' || progress.completedSections.includes(timelineEvents[timelineEvents.findIndex(e => e.type === event.type) - 1]?.type))
  }));

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const expandAll = () => setExpandedIds(milestones.map(m => m.id));
  const collapseAll = () => setExpandedIds([]);

  const handleDownload = (milestone: typeof milestones[0]) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(0, 32, 69); // Primary Navy
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("CivicPath", 20, 25);
    
    doc.setFontSize(10);
    doc.text("Electoral Education Platform", 20, 32);
    
    // Content
    doc.setTextColor(0, 32, 69);
    doc.setFontSize(20);
    doc.text(milestone.title, 20, 60);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Slate
    doc.text(`Period: ${milestone.date} | Status: ${milestone.status}`, 20, 68);
    
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 75, 190, 75);
    
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const splitDesc = doc.splitTextToSize(milestone.description, 170);
    doc.text(splitDesc, 20, 85);
    
    let yPos = 85 + (splitDesc.length * 7);
    
    doc.setFont("helvetica", "bold");
    doc.text("Key Requirements & Tasks:", 20, yPos + 10);
    
    doc.setFont("helvetica", "normal");
    const isMsCompleted = milestone.status === 'Completed';
    milestone.tasks.forEach((task: string, i: number) => {
      const prefix = isMsCompleted ? "[✓] " : "[ ] ";
      const splitTask = doc.splitTextToSize(`${prefix}${task}`, 160);
      if (isMsCompleted) doc.setTextColor(22, 163, 74); // Green for completed
      doc.text(splitTask, 25, yPos + 20 + (i * 10));
      doc.setTextColor(15, 23, 42); // Reset
      yPos += (splitTask.length > 1 ? 5 : 0);
    });
    
    if (milestone.deadline) {
      yPos += (milestone.tasks.length * 10) + 15;
      doc.setFillColor(254, 242, 242); // Error Light
      doc.rect(20, yPos, 170, 20, 'F');
      doc.setTextColor(185, 28, 28); // Error Dark
      doc.setFont("helvetica", "bold");
      doc.text("CRITICAL DEADLINE", 25, yPos + 8);
      doc.setFont("helvetica", "normal");
      doc.text(milestone.deadline, 25, yPos + 15);
    }
    
    // Footer
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(8);
    doc.text(`Generated officially by CivicPath App on ${new Date().toLocaleDateString()}`, 20, 285);
    doc.text("Source: Election Commission of India (ECI) Procedural Guidelines", 20, 290);
    
    doc.save(`${milestone.title.replace(/\s+/g, '_')}_Guide.pdf`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-foreground">Electoral Timeline</h2>
        <div className="flex gap-2">
          <button 
            onClick={expandAll}
            className="text-[10px] font-black text-primary uppercase tracking-widest px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary/5 transition-all"
          >
            Expand All
          </button>
          <button 
            onClick={collapseAll}
            className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition-all"
          >
            Collapse
          </button>
        </div>
      </div>

      <div className="relative timeline-line">
        {milestones.map((ms) => {
          const isExpanded = expandedIds.includes(ms.id);
          
          return (
            <div key={ms.id} className="relative pl-16 mb-12 last:mb-0">
              {/* Milestone Circle */}
              <div className={`absolute left-4 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10 border-4 border-background transition-all duration-300 ${ms.active ? 'bg-primary text-white ring-4 ring-primary/20 scale-110 shadow-lg' : ms.status === 'Completed' ? 'bg-green-600 text-white shadow-md' : 'bg-card border-border text-muted-foreground'}`}>
                {ms.icon}
              </div>

              {/* Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`bg-card text-card-foreground border p-6 rounded-2xl transition-all cursor-pointer ${ms.active ? 'border-primary shadow-md shadow-primary/5' : 'border-border hover:border-primary/40'}`}
                onClick={() => toggleExpand(ms.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`${ms.statusColor} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                      {ms.status}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {ms.date}
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary" />}
                </div>

                <h2 className="text-2xl font-bold text-primary mb-2">{ms.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{ms.description}</p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-6 pt-6 border-t border-border mt-4">
                        <div>
                          <h3 className="text-[10px] font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                             <FileText className="w-3 h-3" />
                             Procedural Steps & Detail
                          </h3>
                          <ul className="space-y-4">
                            {ms.tasks?.map((task, i) => (
                              <li key={i} className="flex items-start gap-4 group">
                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                                  <CheckCircle className="w-3 h-3 text-primary" />
                                </div>
                                <span className="text-sm font-medium text-foreground leading-snug">{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {ms.deadline && (
                          <div className="bg-destructive/5 p-4 rounded-xl flex items-start gap-4 border border-destructive/10">
                             <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                               <AlertCircle className="w-5 h-5 text-destructive" />
                             </div>
                             <div>
                               <span className="text-[10px] font-black text-destructive uppercase tracking-widest block mb-1">Critical Deadline</span>
                               <p className="text-sm font-bold text-foreground">{ms.deadline}</p>
                             </div>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-4">
                          {ms.link && (
                            <a 
                              href={ms.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                e.stopPropagation();
                                useAppStore.getState().markSectionCompleted('registration');
                                useAppStore.getState().markSectionCompleted('campaign');
                              }}
                              className="text-[10px] font-black text-white uppercase tracking-widest px-4 py-2 bg-primary rounded-lg shadow-sm hover:bg-primary-container transition-all flex items-center gap-1.5"
                            >
                              Register to Vote <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(ms);
                            }}
                            className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-1.5 px-3 py-2 bg-primary/5 rounded-lg"
                          >
                            Download Guide <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>
      
      {/* Citation Block */}
      <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/5 rounded-lg border border-primary/10">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Verified Source</p>
            <p className="text-xs text-muted-foreground">ECI Handbook for Voters 2026</p>
          </div>
        </div>
        <a 
          href="https://eci.gov.in" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-full"
        >
          View Official Portal <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
