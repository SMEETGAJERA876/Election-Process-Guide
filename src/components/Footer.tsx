import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Globe, Lock, Scale, Database, Eye } from 'lucide-react';

const Footer: React.FC = () => {
  const platformLinks = [
    { name: 'Home', path: '/' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Eligibility', path: '/eligibility' },
    { name: 'Assessment', path: '/quiz' },
    { name: 'Support', path: '/support' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', icon: Lock, href: 'https://eci.gov.in/privacy-policy/' },
    { name: 'Terms of Use', icon: Scale, href: 'https://eci.gov.in/terms-conditions/' },
    { name: 'Data Sources', icon: Database, href: 'https://eci.gov.in/statistical-report/statistical-reports/' },
  ];

  const connectLinks = [
    { name: 'Contact Us', icon: Mail, href: 'https://eci.gov.in/contact-us/' },
    { name: 'Accessibility', icon: Eye, href: 'https://eci.gov.in/accessibility/' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-32">
      <div className="container mx-auto px-8 py-24 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-8">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary fill-primary/5" />
              <span className="text-3xl font-black text-primary tracking-tighter">CivicPath</span>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed font-medium">
              A comprehensive educational framework designed to demystify the electoral process. 
              Verified by constitutional scholars and built for modern citizens.
            </p>
            <div className="flex gap-4">
               {[
                 { Icon: Mail, href: 'mailto:support@eci.gov.in' },
                 { Icon: Globe, href: 'https://voters.eci.gov.in' }
               ].map((item, i) => (
                 <a 
                   key={i} 
                   href={item.href}
                   target={item.Icon === Globe ? "_blank" : undefined}
                   rel={item.Icon === Globe ? "noopener noreferrer" : undefined}
                   className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all"
                 >
                   <item.Icon className="w-5 h-5" />
                 </a>
               ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div>
                <h5 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-8">Platform</h5>
                <ul className="space-y-4">
                  {platformLinks.map(link => (
                    <li key={link.path}>
                      <Link to={link.path} className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                        <div className="w-1 h-1 rounded-full bg-primary/20 group-hover:bg-primary transition-all" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-8">Legal</h5>
                <ul className="space-y-4">
                  {legalLinks.map(link => (
                    <li key={link.name}>
                      <a 
                        href={link.href || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <link.icon className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-8">Connect</h5>
                <ul className="space-y-4">
                  {connectLinks.map(link => (
                    <li key={link.name}>
                      <a 
                        href={link.href || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <link.icon className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-12 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.4em]">
            © 2026 CivicPath Electoral Foundation. A Non-Partisan Public Utility.
          </p>
          <div className="flex gap-8">
             <a href="#" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Sitemap</a>
             <a href="#" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
