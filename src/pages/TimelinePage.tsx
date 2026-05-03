import TimelineViewer from '../components/TimelineViewer';
import { motion } from 'framer-motion';

const TimelinePage = () => {
  return (
    <div className="py-12 space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl font-black text-foreground mb-6">Electoral Timeline</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Track every critical milestone of the 2026 General Election. From voter registration deadlines to the final counting of ballots.
        </p>
      </motion.div>
      
      <div className="bg-card border border-border rounded-[2.5rem] p-12 shadow-sm">
        <TimelineViewer />
      </div>
    </div>
  );
};

export default TimelinePage;
