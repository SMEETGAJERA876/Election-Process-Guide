import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden rounded-[2.5rem] mt-8 bg-primary/5 border border-primary/10">
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
        <img 
          src="/election_hero_background_1777780807853.png" 
          alt="Hero Background" 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="relative z-10 px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4 block">
            Official 2026 Election Guide
          </span>
          <h1 className="text-6xl font-black text-foreground mb-6 leading-[1.1] tracking-tight max-w-3xl">
            Your Vote is Your <span className="text-primary italic">Voice.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
            Navigate the complexities of the democratic process with clarity. Verified timelines, eligibility tools, and expert guidance at your fingertips.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/timeline"
              className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/20"
            >
              Explore Timeline <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/eligibility"
              className="bg-background border border-border text-foreground px-8 py-4 rounded-2xl font-bold hover:bg-muted transition-all"
            >
              Check Eligibility
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
