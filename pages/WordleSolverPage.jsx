import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  RotateCcw, 
  Database, 
  Loader2, 
  ChevronRight,
  Lightbulb,
  BookOpen,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';

import { 
  loadDictionary, 
  getWordDictionary, 
  getCommonDictionary 
} from '@/utils/wordFinderDictionary.js';
import { solveWordle } from '@/utils/WordleSolverUtils.js';

export default function WordleSolverPage() {
  const [dictStats, setDictStats] = useState({ loaded: false, count: 0 });
  const [greenLetters, setGreenLetters] = useState(['', '', '', '', '']);
  const [yellowLetters, setYellowLetters] = useState('');
  const [grayLetters, setGrayLetters] = useState('');
  
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const inputRefs = useRef([]);

  // Load dictionary on mount
  useEffect(() => {
    let mounted = true;
    loadDictionary().then((stats) => {
      if (mounted) setDictStats(stats);
    });
    return () => { mounted = false; };
  }, []);

  const handleGreenChange = (index, value) => {
    const newLetters = [...greenLetters];
    // Keep only letters
    const cleanValue = value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(-1);
    newLetters[index] = cleanValue;
    setGreenLetters(newLetters);

    // Auto-advance
    if (cleanValue && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleGreenKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !greenLetters[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSolve = (e) => {
    if (e) e.preventDefault();
    
    // Prevent search if all empty
    const isGreenEmpty = greenLetters.every(l => !l);
    if (isGreenEmpty && !yellowLetters.trim() && !grayLetters.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const dict = getWordDictionary();
    const commonDict = getCommonDictionary();
    
    const candidates = solveWordle(greenLetters, yellowLetters, grayLetters, dict, commonDict);
    setResults(candidates);
    setHasSearched(true);
  };

  const handleReset = () => {
    setGreenLetters(['', '', '', '', '']);
    setYellowLetters('');
    setGrayLetters('');
    setResults([]);
    setHasSearched(false);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>Wordle Solver – Find Today's Wordle Answer | Scramblio</title>
        <meta name="description" content="Stuck on today's puzzle? Use our free Wordle Solver and Wordle Helper to find today's Wordle answer. Enter your green, yellow, and gray letters to see all possible 5-letter words." />
        <meta name="keywords" content="wordle solver, wordle helper, wordle answer today, 5 letter word finder, wordle hints" />
        <link rel="canonical" href="https://scramblioapp.com/wordle-solver" />
      </Helmet>

      {/* Hero Section */}
      <section className="w-full bg-muted/30 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-4xl mx-auto w-full text-center">
          <nav className="flex justify-center text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li><Link to="/tools" className="hover:text-foreground transition-colors">Tools</Link></li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="text-foreground font-medium" aria-current="page">Wordle Solver</li>
            </ol>
          </nav>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight text-balance">
              Wordle Solver
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Never lose your streak again. Enter your known letters below to find the exact 5-letter words that match your puzzle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Solver Interface */}
      <main className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          <div className="bg-card rounded-3xl p-6 md:p-10 border border-border shadow-lg mb-12">
            <form onSubmit={handleSolve} className="space-y-8">
              
              {/* Green Letters */}
              <div className="space-y-3">
                <Label className="text-base font-bold flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-emerald-500" />
                  Green Letters (Exact Position)
                </Label>
                <div className="flex justify-between sm:justify-start gap-2 sm:gap-4">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <input
                      key={`green-${index}`}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      maxLength={1}
                      value={greenLetters[index]}
                      onChange={(e) => handleGreenChange(index, e.target.value)}
                      onKeyDown={(e) => handleGreenKeyDown(index, e)}
                      className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-extrabold uppercase rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background border-2 border-emerald-200 bg-emerald-50 text-emerald-900 focus:border-emerald-500 focus:ring-emerald-500 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 placeholder:text-emerald-900/20 shadow-sm"
                      placeholder={(index + 1).toString()}
                      aria-label={`Green letter position ${index + 1}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Letters you placed that turned green.</p>
              </div>

              {/* Yellow Letters */}
              <div className="space-y-3">
                <Label htmlFor="yellowLetters" className="text-base font-bold flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-amber-400" />
                  Yellow Letters (Wrong Position)
                </Label>
                <Input 
                  id="yellowLetters"
                  type="text"
                  value={yellowLetters}
                  onChange={(e) => setYellowLetters(e.target.value)}
                  className="h-14 text-xl font-bold uppercase tracking-widest border-2 border-amber-200 bg-amber-50 text-amber-900 focus-visible:border-amber-500 focus-visible:ring-amber-500 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400 shadow-sm"
                  placeholder="e.g. A, R, T"
                />
                <p className="text-sm text-muted-foreground">Letters that are in the word, but in the wrong spot.</p>
              </div>

              {/* Gray Letters */}
              <div className="space-y-3">
                <Label htmlFor="grayLetters" className="text-base font-bold flex items-center gap-2">
                  <div className="w-4 h-4 rounded-sm bg-slate-400 dark:bg-slate-600" />
                  Gray Letters (Not in Word)
                </Label>
                <Input 
                  id="grayLetters"
                  type="text"
                  value={grayLetters}
                  onChange={(e) => setGrayLetters(e.target.value)}
                  className="h-14 text-xl font-bold uppercase tracking-widest border-2 border-slate-200 bg-slate-50 text-slate-900 focus-visible:border-slate-500 focus-visible:ring-slate-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 shadow-sm"
                  placeholder="e.g. S, E, I, O"
                />
                <p className="text-sm text-muted-foreground">
                  Letters that turned gray. <em>Note: If a letter is yellow/green but a duplicate turned gray, don't enter it here.</em>
                </p>
              </div>

              {/* Actions & Status */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/50">
                <div className="flex w-full sm:w-auto gap-3">
                  <Button 
                    type="submit" 
                    disabled={!dictStats.loaded && dictStats.count === 0}
                    className="flex-1 sm:flex-none h-12 px-8 text-base font-bold shadow-md shadow-primary/20"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Find Possible Words
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleReset}
                    className="h-12 px-4 text-base font-medium"
                    aria-label="Reset all inputs"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
                
                {dictStats.loaded ? (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <Database className="w-3.5 h-3.5" /> 
                    Dictionary active ({dictStats.count.toLocaleString()} words)
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading dictionary...
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Results Display */}
          {hasSearched && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between bg-muted/50 px-5 py-4 rounded-xl border border-border">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {results.length} {results.length === 1 ? 'word' : 'words'} found
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {results.length > 0 ? "Common words are shown first." : "Try removing some gray letters if you're stuck."}
                  </p>
                </div>
                {results.length === 0 && (
                  <AlertCircle className="w-8 h-8 text-amber-500 opacity-50" />
                )}
              </div>

              {results.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {results.map((word, idx) => (
                    <div 
                      key={`${word}-${idx}`}
                      className="bg-card hover:bg-muted/80 border border-border hover:border-primary/50 text-foreground font-mono font-bold tracking-[0.2em] uppercase rounded-xl px-4 py-3 text-center text-lg transition-all duration-200 shadow-sm cursor-default"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </div>
      </main>

      <hr className="border-border/60" />

      {/* Content Sections */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary">
          
          <h2 className="flex items-center gap-3 text-3xl mt-0">
            <BookOpen className="w-8 h-8 text-primary" />
            How to Use the Wordle Solver
          </h2>
          <p>
            Whether you are on guess two or guess five, our Wordle Helper can narrow down your options to keep your daily streak alive. Just follow these steps using your current puzzle grid:
          </p>
          <ol>
            <li><strong>Green Letters:</strong> Look at the tiles that turned green. Type those exact letters into the corresponding numbered boxes (1 through 5) in our solver.</li>
            <li><strong>Yellow Letters:</strong> Gather any letters that turned yellow. Type them all into the Yellow Letters input field. You can just type them continuously (e.g., <code>AR</code>).</li>
            <li><strong>Gray Letters:</strong> Take the letters that turned gray and type them into the Gray Letters box. <em>Important:</em> If a letter is green/yellow in one spot but gray in another (because the target word doesn't have duplicates), do not add it to the gray box.</li>
            <li>Click <strong>Find Possible Words</strong> to see a sorted list of the remaining valid words!</li>
          </ol>

          <h2 className="flex items-center gap-3 text-3xl pt-8 border-t border-border/60">
            <Lightbulb className="w-8 h-8 text-amber-500" />
            Wordle Strategy Tips
          </h2>
          <p>
            The best way to solve Wordle without guessing blindly is to maximize information on your first two turns. Here are top strategies used by experts:
          </p>
          <ul>
            <li><strong>Start with strong vowel words:</strong> Words like <code>STARE</code>, <code>CRANE</code>, <code>ADIEU</code>, and <code>AUDIO</code> expose the most common vowels and consonants immediately.</li>
            <li><strong>Don't reuse gray letters:</strong> It sounds obvious, but when you are stuck, it's easy to accidentally guess a word containing a letter you already know is gray. Our solver prevents this completely.</li>
            <li><strong>Beware of double letters:</strong> Words like <code>APPLE</code> or <code>BULLY</code> can trip players up because they assume each letter only appears once. If you have narrowed down your consonants and vowels and nothing fits, consider duplicates.</li>
          </ul>

          <h2 className="flex items-center gap-3 text-3xl pt-8 border-t border-border/60">
            <HelpCircle className="w-8 h-8 text-secondary" />
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6 not-prose mt-8">
            <div className="bg-muted/30 p-6 rounded-xl border border-border">
              <h3 className="font-bold text-foreground text-lg mb-2">Is using a Wordle solver cheating?</h3>
              <p className="text-muted-foreground">That depends on your personal rules! Many players use solvers as a learning tool to expand their vocabulary or as a "lifeline" when they are on their 6th guess and don't want to lose a year-long streak.</p>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-xl border border-border">
              <h3 className="font-bold text-foreground text-lg mb-2">What dictionary does this use?</h3>
              <p className="text-muted-foreground">This tool pulls from our primary word games dictionary comprising over 172,000 words. When displaying results, we automatically sort common English words to the top, as the official Wordle answer list is curated to avoid extremely obscure words.</p>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-xl border border-border">
              <h3 className="font-bold text-foreground text-lg mb-2">Can I solve past Wordles?</h3>
              <p className="text-muted-foreground">Yes. Because our tool does not scrape the live answer, it mathematically solves the puzzle based purely on the letter constraints you provide. It works for past, present, and future puzzles.</p>
            </div>

            <div className="bg-muted/30 p-6 rounded-xl border border-border">
              <h3 className="font-bold text-foreground text-lg mb-2">Does this work for Quordle or Octordle?</h3>
              <p className="text-muted-foreground">Absolutely. Since those games use the same 5-letter mechanics, you can use this solver. Just focus on solving one word at a time by entering its specific green/yellow/gray constraints.</p>
            </div>

            <div className="bg-muted/30 p-6 rounded-xl border border-border">
              <h3 className="font-bold text-foreground text-lg mb-2">Is this tool free?</h3>
              <p className="text-muted-foreground">100% free, always. Scramblio provides unlimited searches with no paywalls or daily limits.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}