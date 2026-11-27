import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function WordCard({ word, length, index }) {
  // Generate a variety of vibrant gradients based on the index with increased opacity
  const cardStyles = [
    {
      bg: "bg-gradient-to-br from-secondary/20 to-primary/20",
      border: "border-secondary/50",
      shadow: "hover:shadow-secondary/40",
      text: "text-secondary"
    },
    {
      bg: "bg-gradient-to-br from-accent/20 to-highlight/20",
      border: "border-accent/50",
      shadow: "hover:shadow-accent/40",
      text: "text-accent"
    },
    {
      bg: "bg-gradient-to-br from-primary/20 to-highlight/20",
      border: "border-primary/50",
      shadow: "hover:shadow-primary/40",
      text: "text-primary"
    },
    {
      bg: "bg-gradient-to-br from-highlight/25 to-secondary/20",
      border: "border-highlight/60",
      shadow: "hover:shadow-highlight/40",
      text: "text-foreground"
    }
  ];

  const style = cardStyles[index % cardStyles.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: (index % 15) * 0.03 }}
    >
      <Card className={cn(
        "h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border-2 bg-white/80 backdrop-blur-sm",
        style.bg,
        style.border,
        style.shadow
      )}>
        <CardContent className="p-5 flex items-center justify-between">
          <span className={cn("text-xl font-bold tracking-wide", style.text)}>
            {word}
          </span>
          <Badge 
            className="bg-highlight text-highlight-foreground hover:bg-highlight/90 font-extrabold px-3 py-1 shadow-md border border-highlight/50"
          >
            {length}
          </Badge>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default WordCard;