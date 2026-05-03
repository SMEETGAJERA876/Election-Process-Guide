import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Monitor, BookOpen, ChevronRight, Sparkles } from 'lucide-react';

const WelcomeModules: React.FC = () => {
  const modules = [
    {
      title: "Electoral Timeline",
      desc: "Stay informed about key dates and deadlines for the upcoming election.",
      icon: Calendar,
      path: "/timeline",
      color: "from-blue-500 to-indigo-600",
      tag: "Deadlines"
    },
    {
      title: "Ballot Simulator",
      desc: "Practice the voting process with a virtual EVM and VVPAT machine.",
      icon: Monitor,
      path: "/ballot",
      color: "from-primary to-primary-focus",
      tag: "Interactive"
    },
    {
      title: "Knowledge Base",
      desc: "Test your understanding of the voting process and requirements.",
      icon: BookOpen,
      path: "/quiz",
      color: "from-emerald-500 to-teal-600",
      tag: "Assessment"
    }
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full border border-primary/10">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Learning Modules</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {modules.map((mod, idx) => (
          <motion.div
            key={mod.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link 
              to={mod.path} 
              className="group block relative p-8 rounded-[2.5rem] bg-card border border-border hover:border-primary/40 transition-all hover:shadow-2xl hover:shadow-primary/5 overflow-hidden h-full"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${mod.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-bl-full`} />
              
              <div className="flex flex-col h-full relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {(() => {
                    const Icon = mod.icon;
                    return <Icon className="w-7 h-7" />;
                  })()}
                </div>
                
                <div className="mb-4">
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">{mod.tag}</span>
                   <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-primary transition-colors">{mod.title}</h3>
                   <p className="text-sm text-muted-foreground leading-relaxed font-medium">{mod.desc}</p>
                </div>
                
                <div className="mt-auto pt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                  Explore Now
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeModules;

