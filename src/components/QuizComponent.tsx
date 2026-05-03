import { useState, useEffect } from 'react';
import { useAppStore } from '../store';
import { quizData } from '../data/content';
import { CheckCircle, ArrowRight, RotateCcw, AlertCircle, ShieldCheck, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizProps {
  onComplete?: () => void;
}

export default function QuizComponent({ onComplete }: QuizProps) {
  const { region, saveQuizScore, markSectionCompleted } = useAppStore();
  const regionQuizzes = quizData.filter(q => q.region_id === region);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (currentQuestionIndex >= regionQuizzes.length && regionQuizzes.length > 0) {
      onComplete?.();
    }
  }, [currentQuestionIndex, regionQuizzes.length, onComplete]);

  if (regionQuizzes.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-12 text-center shadow-sm">
        <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground font-medium">No quizzes available for this region yet.</p>
      </div>
    );
  }

  const currentQuestion = regionQuizzes[currentQuestionIndex];
  const isFinished = currentQuestionIndex >= regionQuizzes.length;
  const isSubmitted = submittedQuestions[currentQuestionIndex] || false;
  const selectedOption = answers[currentQuestionIndex] ?? null;

  const handleOptionClick = (index: number) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [currentQuestionIndex]: index });
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;
    setSubmittedQuestions({ ...submittedQuestions, [currentQuestionIndex]: true });
    
    if (selectedOption === currentQuestion.correct_option) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === regionQuizzes.length - 1) {
      saveQuizScore(`quiz-${region}`, score);
      if (score >= 3) {
        markSectionCompleted('assessment');
      }
    }
    setCurrentQuestionIndex(i => i + 1);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSubmittedQuestions({});
    setScore(0);
  };

  if (isFinished) {
    return (
      <div className="bg-card border border-border rounded-[3rem] p-12 text-center shadow-2xl overflow-hidden relative">
        <div className="relative z-10">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-primary/60 mb-4 block">Assessment Complete</span>
            <h3 className="text-5xl font-black text-primary mb-6 leading-tight">Quiz Results</h3>
            <div className="flex items-center justify-center gap-6 mb-10">
               <div className="text-8xl font-black text-primary">{score}</div>
               <div className="text-3xl text-muted-foreground font-bold">/ {regionQuizzes.length}</div>
            </div>
            <p className="text-muted-foreground mb-12 max-w-sm mx-auto leading-relaxed text-lg font-medium">
              {score === regionQuizzes.length ? "Incredible! You've demonstrated complete mastery of the electoral process." : "Great effort! Reviewing the glossary could help bridge any remaining knowledge gaps."}
            </p>
            <button
              onClick={handleRestart}
              className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/20 transition-all flex items-center gap-3 mx-auto active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              RESTART ASSESSMENT
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
      {/* Progress Bar Header */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-primary/60 font-black mb-2 block">Assessment Module</span>
            <h1 className="text-3xl font-black text-primary leading-tight">General Election Fundamentals</h1>
          </div>
          <span className="text-xs font-black text-primary uppercase tracking-widest bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            {currentQuestionIndex + 1} / {regionQuizzes.length}
          </span>
        </div>
        <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / regionQuizzes.length) * 100}%` }}
            className="bg-primary h-full rounded-full transition-all duration-700 ease-out"
          />
        </div>
      </div>

      {/* Question Canvas */}
      <div className="space-y-10">
        <h2 className="text-2xl font-black text-foreground leading-tight">{currentQuestion.question}</h2>
        
        <div className="grid gap-4">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.correct_option;
            const letter = String.fromCharCode(65 + idx);
            
            let containerClass = "relative w-full text-left p-6 border-2 rounded-2xl transition-all duration-300 flex items-center group ";
            let letterClass = "w-9 h-9 rounded-xl flex items-center justify-center mr-5 text-xs font-black border-2 transition-all duration-300 shadow-sm ";

            if (!isSubmitted) {
              containerClass += isSelected 
                ? "border-primary bg-primary/5 shadow-md translate-x-2" 
                : "border-border hover:border-primary/40 hover:bg-muted/30 cursor-pointer";
              letterClass += isSelected 
                ? "bg-primary border-primary text-white rotate-6" 
                : "border-border text-muted-foreground group-hover:border-primary/40";
            } else {
              if (isCorrect) {
                containerClass += "border-green-500 bg-green-500/5 translate-x-2 shadow-lg shadow-green-500/10";
                letterClass += "bg-green-500 border-green-500 text-white rotate-6";
              } else if (isSelected && !isCorrect) {
                containerClass += "border-destructive bg-destructive/5 translate-x-2 shadow-lg shadow-destructive/10";
                letterClass += "bg-destructive border-destructive text-white -rotate-6";
              } else {
                containerClass += "border-border/50 opacity-50 grayscale-[0.5]";
                letterClass += "border-border text-muted-foreground";
              }
            }

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => handleOptionClick(idx)}
                className={containerClass}
              >
                <div className={letterClass}>{letter}</div>
                <span className="font-bold text-base">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback Area */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-muted/50 border border-primary/10 rounded-[2rem] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full" />
              <div className="flex items-start gap-6 relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${selectedOption === currentQuestion.correct_option ? 'bg-green-500 text-white' : 'bg-primary text-white'}`}>
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-primary text-[10px] uppercase tracking-[0.3em] mb-2">
                    {selectedOption === currentQuestion.correct_option ? 'Correct!' : 'Knowledge Bridge'}
                  </h4>
                  <p className="text-base text-muted-foreground leading-relaxed font-medium">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border gap-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary/5 rounded-lg border border-primary/10">
               <ShieldCheck className="w-4 h-4 text-primary" />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-primary">Verified Data</p>
               <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground hover:underline flex items-center gap-1">
                 ECI Constitutional Guidelines <ExternalLink className="w-2.5 h-2.5" />
               </a>
             </div>
          </div>

          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`px-12 py-5 rounded-2xl font-black transition-all text-xs uppercase tracking-widest shadow-xl ${selectedOption !== null ? 'bg-primary text-white hover:shadow-primary/30 hover:scale-105 active:scale-95' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
            >
              Verify Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-primary text-white px-12 py-5 rounded-2xl font-black hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-xl text-xs uppercase tracking-widest"
            >
              {currentQuestionIndex === regionQuizzes.length - 1 ? 'Unlock Results' : 'Next Question'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

