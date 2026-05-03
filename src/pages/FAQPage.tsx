import FAQSection from '../components/FAQSection';
import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const FAQPage = () => {
  return (
    <div className="py-12 space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl font-black text-foreground mb-6">Support & Help</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Find answers to the most common questions about the voting process, registration, and documentation.
        </p>
      </motion.div>

      <div className="bg-card border border-border rounded-[2.5rem] p-12 shadow-sm">
        <FAQSection />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
              <h3 className="font-bold mb-2">Voter Helpline</h3>
              <p className="text-3xl font-black text-primary">1950</p>
              <p className="text-xs text-muted-foreground mt-2 font-bold uppercase tracking-widest">Toll Free Number</p>
          </div>
          <div className="p-8 rounded-3xl border border-border md:col-span-2">
              <h3 className="font-bold mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">Our AI Assistant is available 24/7 to help you navigate specific queries about your constituency or registration status.</p>
              <button className="text-primary font-bold hover:underline">Launch AI Assistant →</button>
          </div>
      </div>

      <ContactForm />
    </div>
  );
};

export default FAQPage;
