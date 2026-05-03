import React from 'react';
import { motion } from 'framer-motion';
import BallotSimulator from '../components/BallotSimulator';

const BallotPage: React.FC = () => {
  return (
    <div className="py-12 min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4 block">Interactive Tutorial</span>
        <h1 className="text-5xl font-black text-foreground mb-6">Experience the Vote</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The best way to understand the voting process is to try it. Use our simulator to familiarize yourself with the EVM and VVPAT systems used in Indian elections.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-[3rem] shadow-2xl overflow-hidden"
      >
        <BallotSimulator />
      </motion.div>

      <div className="mt-20 bg-primary/5 rounded-[2.5rem] p-12 border border-primary/10">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Safety & Privacy during Elections</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h4 className="font-bold text-primary">Secrecy of Ballot</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your vote is completely secret. It is a punishable offense to violate the secrecy of the ballot. No one can ever know whom you voted for unless you tell them.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-primary">No Intimidation</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                If anyone tries to influence or intimidate you, report it immediately to the Presiding Officer or use the C-Vigil app provided by the ECI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BallotPage;
