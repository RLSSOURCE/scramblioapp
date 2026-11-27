import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils.js';

export default function ToolCard({ toolName, icon: Icon, description, category, demoContent, onTryNow }) {
  
  // Dynamic color matching based on category
  const categoryColors = {
    'Word Games': 'bg-secondary/10 text-secondary border-secondary/20',
    'Writing Tools': 'bg-accent/10 text-accent border-accent/20',
    'Analysis Tools': 'bg-primary/10 text-primary border-primary/20',
  };

  const badgeColor = categoryColors[category] || 'bg-muted text-muted-foreground border-border';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-xl transition-all duration-300 h-full overflow-hidden relative"
    >
      {/* Top Section */}
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
          <Icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors duration-300" />
        </div>
        <span className={cn("px-3 py-1 rounded-full text-xs font-bold border", badgeColor)}>
          {category}
        </span>
      </div>

      {/* Content Section */}
      <div className="mb-6 flex-grow">
        <h3 className="text-xl font-extrabold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {toolName}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Interactive Demo Snippet */}
      {demoContent && (
        <div className="bg-muted/40 rounded-xl p-4 mb-6 border border-border/50 font-mono text-sm">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-xs font-bold uppercase tracking-wider opacity-70">IN</span>
              <span className="px-2 py-1 bg-background rounded-md shadow-sm border border-border/50 text-foreground w-full break-all">
                {demoContent.input}
              </span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span className="text-xs font-bold uppercase tracking-wider opacity-70">OUT</span>
              <span className="px-2 py-1 bg-primary/5 rounded-md border border-primary/10 font-bold w-full break-all">
                {demoContent.output}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <button
        onClick={onTryNow}
        className="mt-auto w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-muted text-foreground hover:bg-primary hover:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground active:scale-[0.98] transition-all duration-200"
      >
        Try {toolName}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}