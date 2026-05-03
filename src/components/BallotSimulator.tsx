import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Fingerprint, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Volume2, 
  VolumeX, 
  Cpu, 
  ShieldCheck, 
  UserCheck,
  Zap,
  Power,
  RotateCcw,
  Activity
} from 'lucide-react';
import { useAppStore } from '../store';

interface Candidate {
  id: number;
  name: string;
  party: string;
  symbol: string;
  color: string;
}

const CANDIDATES: Candidate[] = [
  { id: 1, name: "Aarav Sharma", party: "Pragati Party", symbol: "☀️", color: "from-orange-500 to-yellow-500" },
  { id: 2, name: "Ishita Singh", party: "Janata Dal (S)", symbol: "🚜", color: "from-green-500 to-emerald-500" },
  { id: 3, name: "Vikram Reddy", party: "Rashtriya Sena", symbol: "🐘", color: "from-blue-500 to-indigo-500" },
  { id: 4, name: "Meera Nair", party: "Lok Shakti", symbol: "🚲", color: "from-red-500 to-rose-500" },
  { id: 5, name: "Aditya Verma", party: "Swaraj Sangh", symbol: "🧹", color: "from-cyan-500 to-blue-500" },
  { id: 6, name: "Ananya Das", party: "Aam Aadmi Parishad", symbol: "🏹", color: "from-purple-500 to-violet-500" },
];

const BallotSimulator: React.FC = () => {
  const { language } = useAppStore();
  const [isBallotEnabled, setIsBallotEnabled] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [voteCast, setVoteCast] = useState(false);
  const [showVVPAT, setShowVVPAT] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [simulationStep, setSimulationStep] = useState<'control' | 'ballot' | 'vvpat' | 'done'>('control');
  const [displayMessage, setDisplayMessage] = useState('READY');
  
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    const initAudio = () => {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    window.addEventListener('click', initAudio);
    return () => window.removeEventListener('click', initAudio);
  }, []);

  const playBeep = (frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.1) => {
    if (!soundEnabled || !audioContext.current) return;
    
    const osc = audioContext.current.createOscillator();
    const gain = audioContext.current.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioContext.current.currentTime);
    
    gain.gain.setValueAtTime(volume, audioContext.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.current.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioContext.current.destination);
    
    osc.start();
    osc.stop(audioContext.current.currentTime + duration);
  };

  const handleEnableBallot = () => {
    if (isBallotEnabled || voteCast || isVoting) return;
    
    playBeep(880, 0.1, 'sine', 0.2); // Short high beep
    setDisplayMessage('BUSY');
    setIsBallotEnabled(true);
    setSimulationStep('ballot');
  };

  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let timer: any;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleVote = (candidate: Candidate) => {
    if (!isBallotEnabled || isVoting || voteCast) return;
    
    setSelectedCandidate(candidate);
    setIsVoting(true);
    setSimulationStep('vvpat');
    playBeep(440, 0.05, 'sine', 0.1); // Button click sound
    
    // Simulate the voting process
    setTimeout(() => {
      playBeep(1200, 2, 'square', 0.15); // Authentic high-pitched long EVM beep
      setShowVVPAT(true);
      setDisplayMessage('VOTED');
      
      setTimeout(() => {
        setShowVVPAT(false);
        setIsVoting(false);
        setVoteCast(true);
        setIsBallotEnabled(false);
        setSimulationStep('done');
        setDisplayMessage('READY');
        setCountdown(10); // Start 10s countdown

        // Auto-reset after 10 seconds of showing the success message
        setTimeout(() => {
          resetSimulator();
        }, 10000);
      }, 7000); // VVPAT shows for 7 seconds
    }, 1200);
  };

  const resetSimulator = () => {
    setSelectedCandidate(null);
    setIsVoting(false);
    setVoteCast(false);
    setShowVVPAT(false);
    setIsBallotEnabled(false);
    setSimulationStep('control');
    setDisplayMessage('READY');
    setCountdown(null);
  };

  const translations: Record<'en' | 'hi', any> = {
    en: {
      title: "Practice Ballot Simulator",
      description: "Experience the Electronic Voting Machine (EVM) process in a safe, simulated environment. Learn how to cast your vote and verify it with the VVPAT system.",
      controlUnit: "Control Unit",
      controlDesc: "Presiding Officer Desk",
      enableBallot: "Issue Ballot",
      ballotIssued: "Ballot Issued",
      ballotUnit: "Ballot Unit",
      ballotDesc: "Voting Compartment",
      vvpatUnit: "VVPAT Unit",
      vvpatDesc: "Paper Audit Trail",
      waiting: "Waiting for Ballot...",
      readyToVote: "Ready to Vote",
      voting: "Processing Vote...",
      success: "Vote Successfully Cast!",
      successDesc: "In a real election, your finger would be marked with indelible ink and you would exit the booth.",
      tryAgain: "Reset Simulator",
      autoReset: "Auto-resetting in",
      seconds: "seconds",
      step1Title: "1. Identification",
      step1Desc: "Polling officers verify your ID and mark your finger. The Presiding Officer enables the Ballot Unit.",
      step2Title: "2. Casting the Vote",
      step2Desc: "Press the blue button next to your candidate. A red light will glow and a long beep will sound.",
      step3Title: "3. Verification",
      step3Desc: "Look at the VVPAT glass window. A slip with the candidate's name and symbol will be visible for 7 seconds.",
    },
    hi: {
      title: "अभ्यास मतपत्र सिम्युलेटर",
      description: "सुरक्षित, सिम्युलेटेड वातावरण में इलेक्ट्रॉनिक वोटिंग मशीन (EVM) प्रक्रिया का अनुभव करें। जानें कि अपना वोट कैसे डालें और VVPAT प्रणाली के साथ इसकी पुष्टि कैसे करें।",
      controlUnit: "कंट्रोल यूनिट",
      controlDesc: "पीठासीन अधिकारी डेस्क",
      enableBallot: "बैलेट जारी करें",
      ballotIssued: "बैलेट जारी किया गया",
      ballotUnit: "बैलेट यूनिट",
      ballotDesc: "वोटिंग कंपार्टमेंट",
      vvpatUnit: "VVPAT यूनिट",
      vvpatDesc: "पेपर ऑडिट ट्रेल",
      waiting: "बैलेट की प्रतीक्षा में...",
      readyToVote: "वोट देने के लिए तैयार",
      voting: "वोट संसाधित किया जा रहा है...",
      success: "वोट सफलतापूर्वक डाला गया!",
      successDesc: "वास्तविक चुनाव में, आपकी उंगली पर अमिट स्याही लगाई जाएगी और आप बूथ से बाहर निकल जाएंगे।",
      tryAgain: "सिम्युलेटर रीसेट करें",
      autoReset: "स्वचालित रीसेट",
      seconds: "सेकंड में",
      step1Title: "1. पहचान",
      step1Desc: "मतदान अधिकारी आपकी आईडी सत्यापित करते हैं और आपकी उंगली पर निशान लगाते हैं। पीठासीन अधिकारी बैलेट यूनिट को सक्षम करते हैं।",
      step2Title: "2. वोट डालना",
      step2Desc: "अपने उम्मीदवार के सामने वाला नीला बटन दबाएं। एक लाल बत्ती जलेगी और एक लंबी बीप सुनाई देगी।",
      step3Title: "3. सत्यापन",
      step3Desc: "VVPAT कांच की खिड़की को देखें। उम्मीदवार के नाम और प्रतीक वाली एक पर्ची 7 सेकंड के लिए दिखाई देगी।",
    }
  };

  const t = translations[language as 'en' | 'hi'] || translations.en;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-12">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* Section 1: Control Unit & VVPAT */}
        <div className="lg:col-span-4 space-y-10">
          {/* Control Unit Visual */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-primary" />
                {t.controlUnit}
              </h3>
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="bg-[#5a6a5a] dark:bg-[#2d3a2d] rounded-[2rem] p-6 border-[12px] border-[#4a5a4a] shadow-2xl relative overflow-hidden">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-black/10 rounded-full" />
              
              {/* LCD Display */}
              <div className="bg-[#8ba88b] dark:bg-[#1a2e1a] border-4 border-black/20 rounded-lg p-3 mb-8 shadow-inner font-mono text-[#0a1a0a] dark:text-[#a0ff90] h-16 flex flex-col justify-center items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
                <motion.span 
                  key={displayMessage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-black tracking-[0.2em]"
                >
                  {displayMessage}
                </motion.span>
                <div className="flex gap-1 mt-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${isBallotEnabled ? 'bg-[#0a1a0a] dark:bg-[#a0ff90] animate-pulse' : 'bg-black/10'}`} />
                  <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
                  <div className="w-1.5 h-1.5 rounded-full bg-black/10" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  disabled={isBallotEnabled || voteCast || isVoting}
                  onClick={handleEnableBallot}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border-b-4 transition-all active:translate-y-1 active:border-b-0 ${
                    isBallotEnabled || voteCast || isVoting
                    ? 'bg-[#6a7a6a] border-[#4a5a4a] text-black/20'
                    : 'bg-[#ff5555] border-[#aa2222] text-white hover:bg-[#ff6666]'
                  }`}
                >
                  <Power className="w-8 h-8" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Ballot</span>
                </button>
                <div className="aspect-square bg-[#4a5a4a] rounded-2xl flex flex-col items-center justify-center gap-2 border-b-4 border-[#2d3a2d] text-black/40">
                  <RotateCcw className="w-8 h-8" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Reset</span>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-end">
                <div className="space-y-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full border border-black/20 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                  <p className="text-[8px] font-black text-black/40 uppercase">ON</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-black/30 uppercase tracking-widest leading-none">ECI</p>
                  <p className="text-[8px] font-bold text-black/20 uppercase tracking-tighter">M3-EVM-CU</p>
                </div>
              </div>
            </div>
          </div>

          {/* VVPAT Visual */}
          <div className="space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              {t.vvpatUnit}
            </h3>
            <div className="bg-slate-700 dark:bg-slate-900 rounded-[2.5rem] p-4 border-[10px] border-slate-600 dark:border-slate-800 shadow-2xl relative">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/30 rounded-full" />
              
              {/* Glass Window */}
              <div className="bg-black/90 rounded-[2rem] p-6 h-[260px] flex flex-col items-center justify-center text-center relative overflow-hidden border-4 border-slate-800 dark:border-slate-950">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20" />
                <div className={`absolute top-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-300 z-30 ${showVVPAT ? 'bg-green-400 shadow-[0_0_15px_rgba(74,222,128,1)]' : 'bg-green-900/30'}`} />
                
                <AnimatePresence mode="wait">
                  {showVVPAT ? (
                    <motion.div
                      key="vvpat-slip"
                      initial={{ y: -300, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 400, opacity: 0, transition: { duration: 1, ease: "easeIn" } }}
                      className="bg-[#fdfdfd] text-black p-4 rounded-sm shadow-2xl w-48 text-left border-b-8 border-slate-200 font-mono relative z-10"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 border-t border-dashed border-black/10" />
                      <div className="border-b border-dashed border-black/40 pb-2 mb-3 mt-1">
                        <p className="text-[6px] font-black uppercase tracking-tighter">Election Commission of India</p>
                        <p className="text-[8px] font-black leading-none mt-0.5">GEN ELECTION 2026</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[6px] text-black/50 uppercase font-black">Sl.No.</p>
                            <p className="font-black text-sm leading-none">{selectedCandidate?.id.toString().padStart(2, '0')}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[6px] text-black/50 uppercase font-black">Symbol</p>
                            <span className="text-3xl leading-none">{selectedCandidate?.symbol}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-[6px] text-black/50 uppercase font-black">Candidate</p>
                          <p className="font-black text-xs leading-tight uppercase tracking-tight">{selectedCandidate?.name}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-1 border-t border-dashed border-black/40 text-center">
                        <p className="text-[5px] font-black text-black/30 tracking-widest uppercase">Paper Trail Slip</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="vvpat-idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-white/10 flex flex-col items-center"
                    >
                      <Activity className="w-16 h-16 mb-4 opacity-5" />
                      <p className="text-[9px] font-black uppercase tracking-[0.4em]">{t.vvpatDesc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Internal Box Glow */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ${showVVPAT ? 'opacity-20 bg-green-400' : 'opacity-0'}`} />
              </div>

              <div className="mt-4 flex justify-between items-center px-4">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Model V2.0</p>
                <div className="flex gap-2">
                   <div className="w-1.5 h-4 bg-slate-600 rounded-full" />
                   <div className="w-1.5 h-4 bg-slate-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Ballot Unit */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6 px-4">
            <div>
              <h3 className="text-2xl font-black flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                {t.ballotUnit}
              </h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t.ballotDesc}</p>
            </div>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-100 dark:bg-slate-900 rounded-full border-2 border-slate-200 dark:border-slate-800 shadow-sm">
                <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${isBallotEnabled && !isVoting && !voteCast ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse' : 'bg-slate-300 dark:bg-slate-700'}`} />
                <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  {isBallotEnabled && !isVoting && !voteCast ? t.readyToVote : isVoting ? t.voting : t.waiting}
                </span>
              </div>
            </div>
          </div>

          <div className="relative bg-[#e5e7eb] dark:bg-[#0f172a] border-[12px] border-[#cbd5e1] dark:border-[#1e293b] rounded-[3.5rem] p-4 md:p-8 shadow-2xl overflow-hidden">
            {/* Ballot Paper Header */}
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 rounded-t-2xl p-4 mb-4 flex justify-between items-center opacity-80">
               <div className="space-y-1">
                 <p className="text-[8px] font-black uppercase tracking-tighter">Election Commission of India</p>
                 <p className="text-[10px] font-black uppercase tracking-widest">BALLOT UNIT - BU01</p>
               </div>
               <div className="text-right">
                 <p className="text-[8px] font-black uppercase tracking-tighter">State: NCT OF DELHI</p>
                 <p className="text-[8px] font-black uppercase tracking-tighter">Constituency: 04-CENTRAL</p>
               </div>
            </div>

            <div className="grid gap-2">
              {CANDIDATES.map((candidate) => (
                <motion.div 
                  key={candidate.id}
                  whileHover={isBallotEnabled && !isVoting && !voteCast ? { x: 4 } : {}}
                  className={`flex items-center gap-3 p-1 rounded-xl border-2 transition-all relative overflow-hidden ${
                    selectedCandidate?.id === candidate.id && isVoting 
                    ? 'bg-primary/5 border-primary shadow-lg' 
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  } ${!isBallotEnabled || isVoting || voteCast ? 'opacity-60 grayscale-[0.3]' : ''}`}
                >
                  <div className="w-12 h-14 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg font-black text-xl text-slate-400 border-r-2 border-slate-100 dark:border-slate-800">
                    {candidate.id}
                  </div>
                  
                  <div className="flex-1 px-2">
                    <p className="font-black text-base leading-none mb-1 uppercase tracking-tight">{candidate.name}</p>
                    <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">{candidate.party}</p>
                  </div>
                  
                  <div className={`w-16 h-14 flex items-center justify-center text-3xl bg-slate-50 dark:bg-slate-800 rounded-lg shadow-inner border-l-2 border-r-2 border-slate-100 dark:border-slate-800 bg-gradient-to-br ${candidate.color} bg-opacity-5`}>
                    {candidate.symbol}
                  </div>
                  
                  <div className="w-24 flex items-center justify-center gap-4 bg-slate-50/50 dark:bg-slate-800/50 rounded-r-lg">
                    {/* Status Light next to button */}
                    <div className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-black/10 ${
                      selectedCandidate?.id === candidate.id && isVoting 
                      ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)] animate-pulse' 
                      : 'bg-slate-200 dark:bg-slate-700'
                    }`} />
                    
                    <button
                      disabled={!isBallotEnabled || isVoting || voteCast}
                      onClick={() => handleVote(candidate)}
                      className={`w-14 h-10 rounded-lg shadow-xl transition-all active:translate-y-1 active:shadow-inner relative overflow-hidden group ${
                        !isBallotEnabled || isVoting || voteCast
                        ? 'bg-slate-300 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-500 hover:shadow-blue-500/40'
                      }`}
                    >
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-full h-full rounded-md border-b-4 border-black/20" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 py-4 border-t-2 border-slate-300 dark:border-slate-800 flex justify-between items-center opacity-40">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Bharat Electronics Limited</span>
              <div className="flex gap-1.5">
                {[1,2,3,4,5,6].map(i => <div key={i} className="w-1.5 h-5 bg-slate-400 dark:bg-slate-700 rounded-full" />)}
              </div>
            </div>

            {/* Success Overlay */}
            <AnimatePresence>
              {voteCast && (
                <motion.div
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                  className="absolute inset-0 z-40 flex items-center justify-center p-6 bg-slate-900/40 rounded-[3rem]"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-card border-t-8 border-green-500 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-center max-w-sm"
                  >
                    <div className="w-20 h-20 bg-green-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/30 rotate-12">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-3xl font-black text-foreground mb-4 leading-tight">{t.success}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-medium">
                      {t.successDesc}
                    </p>
                    
                    <div className="mb-8 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                       <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{t.autoReset}</p>
                       <p className="text-2xl font-black text-primary">{countdown} {t.seconds}</p>
                    </div>

                    <button 
                      onClick={resetSimulator}
                      className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/20 transition-all active:scale-95"
                    >
                      {t.tryAgain}
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Educational Footer */}
      <div className="mt-24 grid md:grid-cols-3 gap-8">
        {[
          { icon: Fingerprint, title: t.step1Title, desc: t.step1Desc },
          { icon: AlertCircle, title: t.step2Title, desc: t.step2Desc },
          { icon: CheckCircle2, title: t.step3Title, desc: t.step3Desc },
        ].map((step, idx) => (
          <div key={idx} className="group p-10 rounded-[2.5rem] bg-card border border-border hover:border-primary/40 transition-all hover:shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none" />
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <step.icon className="w-7 h-7" />
            </div>
            <h5 className="text-xl font-black mb-4">{step.title}</h5>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BallotSimulator;

