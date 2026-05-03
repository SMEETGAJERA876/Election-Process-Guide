import EligibilityChecker from '../components/EligibilityChecker';
import { motion } from 'framer-motion';

const EligibilityPage = () => {
  return (
    <div className="py-12 space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl font-black text-foreground mb-6">Voter Eligibility</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Quickly verify if you are eligible to vote in the upcoming elections. Use our interactive tool to check requirements based on your specific situation.
        </p>
      </motion.div>
      
      <div className="bg-card border border-border rounded-[2.5rem] p-12 shadow-sm">
        <EligibilityChecker />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
            <h3 className="text-xl font-bold mb-4">Basic Requirements</h3>
            <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Must be a citizen of India
                </li>
                <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Must be 18 years or older
                </li>
                <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    Must be an ordinary resident of the constituency
                </li>
            </ul>
        </div>
        <div className="p-8 rounded-3xl bg-muted/50 border border-border">
            <h3 className="text-xl font-bold mb-4">Necessary Documents</h3>
            <p className="text-muted-foreground mb-4">Have these ready for your registration process:</p>
            <ul className="space-y-3 text-muted-foreground">
                <li>• Proof of Identity (Aadhaar, PAN, etc.)</li>
                <li>• Proof of Address</li>
                <li>• Recent Passport Size Photograph</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default EligibilityPage;
