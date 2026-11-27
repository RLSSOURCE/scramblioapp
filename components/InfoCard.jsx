import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function InfoCard({ icon: Icon, title, content, list, iconTheme = "primary" }) {
  const themeStyles = {
    primary: { bg: 'bg-primary/10', text: 'text-primary', chevron: 'text-primary' },
    accent: { bg: 'bg-accent/10', text: 'text-accent', chevron: 'text-accent' },
    highlight: { bg: 'bg-highlight/10', text: 'text-highlight', chevron: 'text-highlight' },
    warm: { bg: 'bg-warm-accent/10', text: 'text-warm-accent', chevron: 'text-warm-accent' }
  };

  const theme = themeStyles[iconTheme] || themeStyles.primary;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <div className={`w-12 h-12 rounded-2xl ${theme.bg} flex items-center justify-center mb-6`}>
        {Icon && <Icon className={`w-6 h-6 ${theme.text}`} />}
      </div>
      
      <h2 className="text-2xl font-bold text-secondary mb-4">{title}</h2>
      
      {content && (
        <p className="text-foreground/80 leading-relaxed text-lg mb-4 last:mb-0">
          {content}
        </p>
      )}
      
      {list && list.length > 0 && (
        <ul className="space-y-3 mt-auto">
          {list.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className={`w-5 h-5 shrink-0 mt-0.5 ${theme.chevron}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}