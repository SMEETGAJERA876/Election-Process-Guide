import React from 'react';
import { ExternalLink } from 'lucide-react';

const RESOURCES = [
  { name: 'ECI Official Portal', url: 'https://voters.eci.gov.in' },
  { name: 'Candidate Search', url: 'https://affidavit.eci.gov.in' },
  { name: 'Polling Booth Map', url: 'https://electoralsearch.eci.gov.in' }
];

const VerifiedResources: React.FC = () => {
  return (
    <div className="bg-card border border-border rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform group-hover:scale-110" />
      <div className="relative z-10">
        <h3 className="text-[10px] font-black text-primary mb-8 uppercase tracking-[0.3em]">Verified Electoral Resources</h3>
        <ul className="space-y-4">
          {RESOURCES.map((item) => (
            <li key={item.name}>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-5 rounded-2xl bg-muted/50 hover:bg-primary/5 transition-all group/link border border-transparent hover:border-primary/10 shadow-sm hover:shadow-md"
              >
                <span className="text-sm font-bold text-foreground group-hover/link:text-primary transition-colors">{item.name}</span>
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center border border-border group-hover/link:border-primary/20 shadow-sm">
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/link:text-primary transition-all" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VerifiedResources;
