import React from 'react';
import GlossaryModal from './GlossaryModal';

const GlossaryPreview: React.FC = () => {
  return (
    <section id="glossary-preview">
      <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
        <h3 className="text-xs font-black text-primary mb-6 uppercase tracking-[0.2em]">Electoral Literacy</h3>
        <h4 className="text-2xl font-bold mb-4">Civic Glossary</h4>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Master the terminology of democracy. From "Incumbency" to "VVPAT", we break down the complex terms.
        </p>
        <GlossaryModal />
      </div>
    </section>
  );
};

export default GlossaryPreview;
