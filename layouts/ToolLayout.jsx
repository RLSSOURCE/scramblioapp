import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  Type, 
  Shuffle,
  Music,
  Sparkles,
  FileText,
  ArrowLeftRight,
  Calculator,
  Lightbulb
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import BudgetCalculator from '@/components/BudgetCalculator.jsx';

const TABS = [
  { name: 'Unscrambler', path: '/unscrambler', icon: Type },
  { name: 'Anagrams', path: '/anagram-solver', icon: Shuffle },
  { name: 'Rhymes', path: '/rhyme-finder', icon: Music },
  { name: 'Word Generator', path: '/word-generator', icon: Sparkles },
  { name: 'Counter', path: '/word-counter', icon: FileText },
  { name: 'Palindrome', path: '/palindrome', icon: ArrowLeftRight },
  { name: 'Ideas', path: '/idea-generator', icon: Lightbulb }
];

export default function ToolLayout() {
  const location = useLocation();
  const [isBonusOpen, setIsBonusOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-background via-secondary/15 to-primary/15 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Persistent Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 bg-gradient-to-br from-secondary/25 via-primary/25 to-highlight/25 rounded-[2rem] px-8 py-12 sm:px-12 sm:py-16 shadow-lg border border-white/40 backdrop-blur-sm"
        >
          <h1 className="flex flex-col leading-tight text-balance tracking-tight mb-6">
            <span className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-blue-600">
              SCRAMBLIO
            </span>
            <span className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-black">
              APP
            </span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed font-medium">
            Master word games and language tools. Unscramble letters, count words, solve anagrams, and more - all in one place.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 sm:mb-14 max-w-6xl mx-auto">
          {TABS.map((tab) => {
            const isActive = location.pathname === tab.path;
            const Icon = tab.icon;
            return (
              <Link 
                key={tab.path}
                to={tab.path}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-extrabold text-sm sm:text-base transition-all duration-300 ${
                  isActive 
                    ? 'bg-warm-accent text-warm-accent-foreground shadow-xl shadow-warm-accent/40 scale-[1.02] border border-warm-accent-foreground/20' 
                    : 'bg-white/60 text-foreground/80 hover:bg-white/90 hover:text-foreground backdrop-blur-md border border-white/50 shadow-sm'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {tab.name}
              </Link>
            );
          })}
        </div>

        {/* Tool Content */}
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>

        {/* Bonus Features Section */}
        <motion.div 
          className="mt-12 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-bonus-gradient rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 blur-[100px] rounded-full mix-blend-overlay pointer-events-none animate-float"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[hsl(var(--bonus-accent))]/20 blur-[80px] rounded-full mix-blend-overlay pointer-events-none animate-float" style={{animationDelay: '2s'}}></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="badge-premium mb-6">
                  <span className="text-[hsl(var(--bonus-accent))]">✨</span> Pro Tool Discovery
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                  Smart Budget <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--bonus-accent))] to-white">Planner</span>
                </h2>
                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                  Take complete control of your finances. Seamlessly track your income, break down expenses, and visualize your financial health with our extra budgeting feature.
                </p>
                <Button 
                  onClick={() => setIsBonusOpen(!isBonusOpen)}
                  className="h-14 px-8 text-lg font-bold rounded-2xl bg-white text-[hsl(var(--bonus-gradient-start))] hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl shadow-white/10"
                >
                  {isBonusOpen ? 'Close Budget Planner' : 'Explore Bonus Tool'}
                </Button>
              </div>
              
              <div className="hidden lg:flex justify-center items-center">
                <div className="w-full max-w-sm aspect-square relative animate-float">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl backdrop-blur-xl border border-white/30 shadow-2xl flex flex-col p-8 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                    <div className="w-14 h-14 rounded-full bg-[hsl(var(--bonus-accent))]/20 mb-8 flex items-center justify-center">
                      <Calculator className="w-7 h-7 text-[hsl(var(--bonus-accent))]" />
                    </div>
                    <div className="space-y-5 w-full">
                      <div className="h-5 bg-white/20 rounded-full w-3/4"></div>
                      <div className="h-5 bg-white/20 rounded-full w-1/2"></div>
                      <div className="h-5 bg-white/20 rounded-full w-5/6"></div>
                    </div>
                    <div className="mt-auto flex justify-between items-end">
                      <div className="h-20 w-20 rounded-full bg-[hsl(var(--bonus-accent))]/30 border border-white/20"></div>
                      <div className="h-10 w-28 bg-white/20 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isBonusOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 48 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="bg-background text-foreground rounded-[2.5rem] p-4 sm:p-8 md:p-10 shadow-inner border border-white/20">
                    <BudgetCalculator />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
}