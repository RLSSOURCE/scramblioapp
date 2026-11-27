import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  RotateCcw, 
  Database, 
  Loader2, 
  ChevronRight,
  Filter,
  ChevronDown,
  LayoutGrid,
  Lightbulb,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Switch } from '@/components/ui/switch.jsx';

import { 
  loadDictionary, 
  getWordDictionary, 
  getCommonDictionary 
} from '@/utils/wordFinderDictionary.js';
import { filterWordsByCrosswordPattern } from '@/utils/filterWordsByCrosswordPattern.js';

export default function CrosswordSolverPage() {
  const [dictStats, setDictStats] = useState({ loaded: false, count: 0 });
  const [pattern, setPattern] = useState('');
  const [filters, setFilters] = useState({
    mustContain: '',
    exclude: '',
    length: ''
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [commonFirst, setCommonFirst] = useState(false);
  
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Load dictionary on mount
  useEffect(() => {
    let mounted = true;
    loadDictionary().then((stats) => {
      if (mounted) setDictStats(stats);
    });
    return () => { mounted = false; };
  }, []);

  const handlePatternChange = (e) => {
    // Only allow letters, ? and _
    const val = e.target.value.replace(/[^a-zA-Z\?_]/g, '');
    setPattern(val);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSolve = (e) => {
    if (e) e.preventDefault();
    
    if (!pattern.trim() && !filters.length) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const dict = getWordDictionary();
    const commonDict = getCommonDictionary();
    
    const candidates = filterWordsByCrosswordPattern(
      pattern,
      filters.mustContain,
      filters.exclude,
      filters.length,
      dict,
      commonDict,
      commonFirst
    );
    
    setResults(candidates);
    setHasSearched(true);
  };

  // Re-sort results dynamically when toggle changes
  useEffect(() => {
    if (hasSearched) {
      handleSolve();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commonFirst]);

  const handleClear = () => {
    setPattern('');
    setFilters({ mustContain: '', exclude: '', length: '' });
    setResults([]);
    setHasSearched(false);
    setCommonFirst(false);
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>Crossword Solver – Find Words by Pattern | Scramblio</title>
        <meta name="description" content="Stuck on a crossword puzzle? Use our free Crossword Solver to find words matching a pattern. Enter your known letters and wildcards to instantly find the answer." />
        <meta name="keywords" content="crossword solver, crossword clue solver, words matching pattern, word pattern finder, hangman solver" />
        <link rel="canonical" href="https://scramblioapp.com/crossword-solver" />
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
              <li className="text-foreground font-medium" aria-current="page">Crossword Solver</li>
            </ol>
          </nav>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight text-balance">
              Crossword Solver
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find words that fit perfectly into your puzzle grid. Enter the letters you know and use <code className="bg-muted px-1.5 py-0.5 rounded font-bold">?</code> for the ones you don't.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Solver Interface */}
      <main className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          <div className="bg-card rounded-3xl p-6 md:p-10 border border-border shadow-lg mb-12">
            <form onSubmit={handleSolve} className="space-y-6">
              
              {/* Pattern Input */}
              <div className="space-y-3">
                <Label htmlFor="pattern" className="text-base font-bold flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-primary" />
                  Word Pattern
                </Label>
                <div className="relative">
                  <Input 
                    id="pattern"
                    type="text"
                    value={pattern}
                    onChange={handlePatternChange}
                    className="h-20 text-center text-3xl sm:text-4xl font-mono font-extrabold uppercase tracking-[0.2em] sm:tracking-[0.3em] border-2 focus-visible:ring-primary shadow-sm"
                    placeholder="E.G. C?T OR H_LL_"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    {pattern.length > 0 && `${pattern.length} letters`}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Use <kbd className="font-mono font-bold bg-muted px-1 rounded">?</kbd> or <kbd className="font-mono font-bold bg-muted px-1 rounded">_</kbd> for unknown letters.
                </p>
              </div>

              {/* Filters Toggle */}
              <div className="flex items-center justify-between text-sm pt-4 border-t border-border/50">
                <button 
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 font-bold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? 'Hide Filters' : 'Add Filters'}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Advanced Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pb-4">
                      <div className="space-y-2">
                        <Label htmlFor="mustContain">Must Contain</Label>
                        <Input 
                          id="mustContain"
                          placeholder="e.g. A, R"
                          value={filters.mustContain}
                          onChange={(e) => handleFilterChange('mustContain', e.target.value)}
                          className="uppercase font-mono"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="exclude">Exclude Letters</Label>
                        <Input 
                          id="exclude"
                          placeholder="e.g. Z, Q"
                          value={filters.exclude}
                          onChange={(e) => handleFilterChange('exclude', e.target.value)}
                          className="uppercase font-mono"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="length">Word Length</Label>
                        <Input 
                          id="length"
                          type="number"
                          min="1"
                          max="20"
                          placeholder="Auto-detect"
                          value={filters.length}
                          onChange={(e) => handleFilterChange('length', e.target.value)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions & Status */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex w-full sm:w-auto gap-3">
                  <Button 
                    type="submit" 
                    disabled={!dictStats.loaded && dictStats.count === 0}
                    className="flex-1 sm:flex-none h-12 px-8 text-base font-bold shadow-md shadow-primary/20"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Solve
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleClear}
                    className="h-12 px-4 text-base font-medium"
                    aria-label="Clear all inputs"
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/50 px-5 py-4 rounded-xl border border-border">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {results.length} {results.length === 1 ? 'match' : 'matches'} found
                  </h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {results.length > 0 ? "Showing all dictionary matches for your pattern." : "Try adjusting your pattern or removing filters."}
                  </p>
                </div>
                
                {results.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Label htmlFor="sort-toggle" className="text-sm font-medium cursor-pointer">
                      Most common first
                    </Label>
                    <Switch 
                      id="sort-toggle" 
                      checked={commonFirst}
                      onCheckedChange={setCommonFirst}
                    />
                  </div>
                )}
              </div>

              {results.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <AlertCircle className="w-12 h-12 text-muted-foreground/50 mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">No matching words found in our dictionary.</p>
                </div>
              )}

              {results.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {results.map((word, idx) => (
                    <div 
                      key={`${word}-${idx}`}
                      className="bg-card hover:bg-muted/80 border border-border hover:border-primary/50 text-foreground font-mono font-bold tracking-[0.1em] uppercase rounded-xl px-4 py-3 text-center text-lg transition-all duration-200 shadow-sm cursor-default"
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
            <LayoutGrid className="w-8 h-8 text-primary" />
            How to Use the Crossword Solver
          </h2>
          <p>
            When you are stuck on a difficult crossword clue, sometimes the best way forward is to use the crossing letters you already have. Our solver uses wildcard matching to instantly find words that fit your puzzle grid perfectly.
          </p>
          <p>
            Simply type the letters you know in their exact positions, and use a question mark (<strong>?</strong>) or an underscore (<strong>_</strong>) for the empty squares. For example:
          </p>
          <ul>
            <li>Entering <code>C?T</code> will return words like <strong>CAT</strong>, <strong>COT</strong>, and <strong>CUT</strong>.</li>
            <li>Entering <code>H_LL_</code> will return 5-letter words starting with H, having double L in the middle, and ending with any letter, such as <strong>HELLO</strong> and <strong>HALLO</strong>.</li>
          </ul>
          <p>
            You don't need to specify the word length unless you want to override the pattern length. The tool automatically counts your letters and wildcards to only show words that fit.
          </p>

          <h2 className="flex items-center gap-3 text-3xl pt-8 border-t border-border/60">
            <Lightbulb className="w-8 h-8 text-amber-500" />
            Crossword Solving Tips
          </h2>
          <p>
            To become a faster and more consistent crossword solver, it helps to understand the patterns constructors use to build grids.
          </p>
          <ul>
            <li><strong>Lean on crossing letters:</strong> Never guess a long word without checking the crossing down/across clues first. A single confirmed letter can reduce your possibilities from hundreds to just a few.</li>
            <li><strong>Watch for common prefixes/suffixes:</strong> If a clue is plural, the answer usually ends in S. If it's a past-tense verb, look for an ED ending. Fill these in as wildcards (e.g., <code>????ING</code>).</li>
            <li><strong>Skip and return:</strong> Crosswords are meant to be solved non-linearly. If you are stuck in a corner, move to an easier section of the grid. Completing other words will give you the crossing letters you need to finish the hard section later.</li>
            <li><strong>Understand cryptic clues:</strong> In cryptic crosswords, the clue contains both a definition and wordplay (like an anagram or hidden word). Our pattern solver can help you narrow down the definition side while you figure out the wordplay.</li>
          </ul>

          <h2 className="flex items-center gap-3 text-3xl pt-8 border-t border-border/60">
            <HelpCircle className="w-8 h-8 text-secondary" />
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6 not-prose mt-8">
            <div className="bg-muted/30 p-6 rounded-xl border border-border">
              <h3 className="font-bold text-foreground text-lg mb-2">What wildcards work in the input field?</h3>
              <p className="text-muted-foreground">You can use either a question mark (?) or an underscore (_). Both symbols represent a single unknown letter. If you have three unknown letters in a row, type ??? or ___.</p>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-xl border border-border">
              <h3 className="font-bold text-foreground text-lg mb-2">What dictionary does this tool use?</h3>
              <p className="text-muted-foreground">We use an extensive English dictionary containing over 172,000 words, identical to our Scrabble and Word Finder tools. It covers most standard vocabulary found in daily newspaper crosswords.</p>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-xl border border-border">
              <h3 className="font-bold text-foreground text-lg mb-2">Does this solve cryptic crosswords?</h3>
              <p className="text-muted-foreground">While it doesn't parse the complex logic of cryptic clues directly, it is highly effective at finding the final word once you have deduced a few crossing letters from the grid.</p>
            </div>

            <div className="bg-muted/30 p-6 rounded-xl border border-border">
              <h3 className="font-bold text-foreground text-lg mb-2">Can I use this for Hangman?</h3>
              <p className="text-muted-foreground">Absolutely! The logic is identical. Type in the letters you have guessed correctly in their respective positions, put wildcards for the blanks, and put the letters you've guessed wrong into the "Exclude Letters" filter.</p>
            </div>

            <div className="bg-muted/30 p-6 rounded-xl border border-border">
              <h3 className="font-bold text-foreground text-lg mb-2">Is the Crossword Solver free?</h3>
              <p className="text-muted-foreground">Yes. Like all tools on Scramblio, it is 100% free with no limits on how many patterns you can search.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}