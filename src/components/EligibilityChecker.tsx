import { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, AlertCircle, RefreshCcw, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';

export default function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const { markSectionCompleted } = useAppStore();

  const questions = [
    { id: 'citizen', text: 'Are you a citizen of India?' },
    { id: 'age', text: 'Are you 18 years or older as of January 1st this year?' },
    { id: 'resident', text: 'Are you an ordinary resident in the constituency you are applying for?' },
    { id: 'disqualified', text: 'Have you been disqualified by any court for being of unsound mind or for criminal/electoral offenses?', inverse: true }
  ];

  const handleAnswer = (ans: boolean) => {
    setAnswers({ ...answers, [questions[step].id]: ans });
    setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  const isEligible = useCallback(() => {
    return answers.citizen && answers.age && answers.resident && !answers.disqualified;
  }, [answers]);

  useEffect(() => {
    if (step === questions.length && isEligible()) {
      markSectionCompleted('eligibility');
      markSectionCompleted('timeline');
    }
  }, [step, markSectionCompleted, isEligible, questions.length]);

  return (
    <div className="bg-card border border-border rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
        <UserCheck className="w-48 h-48" />
      </div>
      
      <h2 className="text-3xl font-black mb-2 flex items-center gap-3 text-primary">
        <UserCheck className="w-8 h-8" />
        Eligibility Checker
      </h2>
      <p className="text-muted-foreground mb-10 text-base font-medium">Quickly verify if you meet the requirements to vote in Indian elections.</p>

      <AnimatePresence mode="wait">
        {step < questions.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="bg-muted/30 p-8 rounded-[2rem] border border-border/50 relative">
              <div className="absolute top-4 right-6 text-[10px] font-black text-primary/40 uppercase tracking-widest">
                Question {step + 1} / {questions.length}
              </div>
              <h3 className="text-xl font-bold text-foreground leading-tight">{questions[step].text}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className="py-5 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all font-black text-sm uppercase tracking-widest active:scale-95"
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="py-5 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all font-black text-sm uppercase tracking-widest active:scale-95"
              >
                No
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            {isEligible() ? (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-black text-green-600 tracking-tight">You are Eligible!</h3>
                <p className="text-muted-foreground max-w-sm mx-auto text-base font-medium leading-relaxed">
                  Congratulations! You meet all constitutional requirements to participate in the democratic process.
                </p>
                <div className="flex flex-col gap-3 max-w-xs mx-auto pt-4">
                  <a 
                    href="https://voters.eci.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95"
                  >
                    Register to Vote
                  </a>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Eligibility status updated in your profile</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-3xl font-black text-red-600 tracking-tight">Ineligible to Vote</h3>
                <p className="text-muted-foreground max-w-sm mx-auto text-base font-medium leading-relaxed">
                  Based on your responses, you may not meet the current requirements. Citizenship and age (18+) are primary criteria for voting.
                </p>
              </div>
            )}
            <button
              onClick={reset}
              className="mt-12 flex items-center gap-2 text-muted-foreground hover:text-primary mx-auto text-xs font-black uppercase tracking-widest transition-all hover:gap-3"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              Reset Checker
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
