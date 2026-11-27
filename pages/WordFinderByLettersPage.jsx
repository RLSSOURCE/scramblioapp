import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  Search,
  Filter,
  Copy,
  ChevronDown,
  ChevronRight,
  BookA,
  BookOpen,
  HelpCircle,
  Hash,
  Activity,
  Shuffle,
  Loader2,
  Database
} from 'lucide-react';

import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog.jsx';

import {
  loadDictionary,
  getWordDictionary,
  getCommonDictionary
} from '@/utils/wordFinderDictionary.js';

import {
  filterWordsByLetters,
  applyFilters,
  groupByLength,
  computeAnagrams,
  getLetterFrequency,
  isPalindrome
} from '@/utils/wordFinderUtils.js';

export default function WordFinderByLettersPage() {
  const [letters, setLetters] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [dictStats, setDictStats] = useState({ loaded: false, count: 0 });
  
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    startsWith: '',
    endsWith: '',
    mustContain: '',
    excludeLetters: '',
    length: 'Any',
    commonOnly: false
  });

  const [results, setResults] = useState([]);
  const [sortBy, setSortBy] = useState('length');

  const [selectedWord, setSelectedWord] = useState(null);
  const [wordDetails, setWordDetails] = useState({ definition: null, loading: false });

  // Boot up the expansive 170k+ dictionary when the page loads
  useEffect(() => {
    let mounted = true;
    loadDictionary().then((stats) => {
      if (mounted) setDictStats(stats);
    });
    return () => { mounted = false; };
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    
    if (!letters.trim() && Object.values(filters).every(v => !v || v === 'Any' || v === false)) {
      setResults([]);
      setHasSearched(true);
      return;
    }

    const currentDict = getWordDictionary();
    const candidateWords = filterWordsByLetters(letters, currentDict);
    const filteredWords = applyFilters(candidateWords, filters, getCommonDictionary());
    
    setResults(filteredWords);
    setHasSearched(true);
  };

  const displayResults = useMemo(() => {
    if (sortBy === 'length') {
      return groupByLength(results);
    } else {
      return [{ length: 'All Words', words: [...results].sort() }];
    }
  }, [results, sortBy]);

  const handleCopyAll = () => {
    const textToCopy = results.sort().join(', ');
    navigator.clipboard.writeText(textToCopy);
    toast.success('All words copied to clipboard!');
  };

  useEffect(() => {
    if (!selectedWord) return;
    
    const fetchDef = async () => {
      setWordDetails({ definition: null, loading: true });
      try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`);
        if (res.ok) {
          const data = await res.json();
          setWordDetails({ definition: data[0], loading: false });
        } else {
          setWordDetails({ definition: null, loading: false });
        }
      } catch (err) {
        setWordDetails({ definition: null, loading: false });
      }
    };
    
    fetchDef();
  }, [selectedWord]);

  const selectedAnagrams = useMemo(() => {
    if (!selectedWord) return [];
    return computeAnagrams(selectedWord, getWordDictionary());
  }, [selectedWord]);

  const selectedFreq = useMemo(() => {
    if (!selectedWord) return {};
    return getLetterFrequency(selectedWord);
  }, [selectedWord]);

  return (
    <div className="w-full flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>Word Finder by Letters – Find Words for Scrabble, Wordle & More</title>
        <meta name="description" content="Use our fast Word Finder by letters to unscramble words, find 5 letter words containing specific letters, and words that start with or end with certain characters. Perfect for Scrabble and Wordle." />
        <meta name="keywords" content="word finder, unscramble letters, scrabble word finder, wordle helper, anagram solver, words with friends, letter combination solver" />
        <link rel="canonical" href="https://scramblioapp.com/word-finder-by-letters" />
      </Helmet>

      <section className="w-full bg-muted/30 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-4xl mx-auto w-full text-center">
          <nav className="flex justify-center text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li><Link to="/tools" className="hover:text-foreground transition-colors">Tools</Link></li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="text-foreground font-medium" aria-current="page">Word Finder</li>
            </ol>
          </nav>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight text-balance">
              Word Finder by Letters
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter your letters to instantly find all possible words. Use advanced filters to match specific lengths, starts, ends, and more.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          
          <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-lg mb-12">
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Label htmlFor="letters" className="sr-only">Available Letters</Label>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
                  <Input 
                    id="letters"
                    type="text"
                    placeholder="Enter your letters (use '?' for blanks, e.g. APP?E)"
                    className="h-16 pl-14 text-xl font-bold uppercase tracking-widest placeholder:text-muted-foreground placeholder:normal-case placeholder:font-normal placeholder:tracking-normal focus-visible:ring-primary shadow-sm"
                    value={letters}
                    onChange={(e) => setLetters(e.target.value)}
                  />
                </div>
                <Button type="submit" disabled={!dictStats.loaded && dictStats.count === 0} className="h-16 px-8 text-lg font-bold shadow-md shadow-primary/20 shrink-0">
                  Find Words
                </Button>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                <button 
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 font-bold hover:text-foreground transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                {dictStats.loaded ? (
                  <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-medium">
                    <Database className="w-4 h-4" /> Dictionary active ({dictStats.count.toLocaleString()} words)
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-medium">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading extended dictionary...
                  </span>
                )}
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pt-4 pb-2 border-t border-border/50 mt-2">
                      
                      <div className="space-y-2">
                        <Label htmlFor="startsWith">Starts with</Label>
                        <Input 
                          id="startsWith"
                          placeholder="e.g. A"
                          value={filters.startsWith}
                          onChange={(e) => handleFilterChange('startsWith', e.target.value)}
                          className="h-11 uppercase text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="endsWith">Ends with</Label>
                        <Input 
                          id="endsWith"
                          placeholder="e.g. T"
                          value={filters.endsWith}
                          onChange={(e) => handleFilterChange('endsWith', e.target.value)}
                          className="h-11 uppercase text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="mustContain">Must contain</Label>
                        <Input 
                          id="mustContain"
                          placeholder="e.g. B"
                          value={filters.mustContain}
                          onChange={(e) => handleFilterChange('mustContain', e.target.value)}
                          className="h-11 uppercase text-foreground placeholder:text-muted-foreground"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="excludeLetters">Exclude letters</Label>
                        <Input 
                          id="excludeLetters"
                          placeholder="e.g. X,Y,Z"
                          value={filters.excludeLetters}
                          onChange={(e) => handleFilterChange('excludeLetters', e.target.value)}
                          className="h-11 uppercase text-foreground placeholder:text-muted-foreground"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="wordLength">Word Length</Label>
                        <div className="relative">
                          <select
                            id="wordLength"
                            value={filters.length}
                            onChange={(e) => handleFilterChange('length', e.target.value)}
                            className="flex h-11 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8"
                          >
                            <option value="Any">Any Length</option>
                            {[...Array(14)].map((_, i) => (
                              <option key={i+2} value={i+2}>{i+2} Letters</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2 lg:col-span-3 flex items-end pb-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="commonOnly" 
                            checked={filters.commonOnly}
                            onCheckedChange={(checked) => handleFilterChange('commonOnly', checked)}
                          />
                          <Label htmlFor="commonOnly" className="cursor-pointer font-medium leading-none text-foreground">
                            Show common words only
                          </Label>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {hasSearched && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/30 p-4 rounded-xl border border-border">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {results.length} {results.length === 1 ? 'word' : 'words'} found
                  </h2>
                  {results.length === 0 && (
                    <p className="text-muted-foreground text-sm">No words matched your search criteria. Try removing some filters.</p>
                  )}
                </div>
                
                {results.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-background border border-border rounded-lg p-1">
                      <button
                        onClick={() => setSortBy('length')}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${sortBy === 'length' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                      >
                        Longest
                      </button>
                      <button
                        onClick={() => setSortBy('az')}
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${sortBy === 'az' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                      >
                        A-Z
                      </button>
                    </div>
                    <Button variant="outline" size="icon" onClick={handleCopyAll} aria-label="Copy all words" title="Copy all results">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {results.length > 0 && (
                <div className="space-y-8">
                  {displayResults.map((group) => (
                    <div key={group.length} className="space-y-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-foreground">
                          {group.length === 'All Words' ? 'All Words' : `${group.length} Letters`}
                        </h3>
                        <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {group.words.length}
                        </span>
                        <div className="h-px bg-border/60 flex-1 ml-4" />
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {group.words.map((word, idx) => (
                          <button
                            key={`${word}-${idx}`}
                            onClick={() => setSelectedWord(word)}
                            className="bg-primary/5 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary font-mono font-bold tracking-wide rounded-lg px-4 py-2.5 text-base transition-all duration-200 active:scale-95 shadow-sm"
                          >
                            {word}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {!hasSearched && (
             <div className="text-center py-20 bg-muted/20 border border-border/50 border-dashed rounded-2xl">
               <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-foreground mb-2">Ready to find some words?</h3>
               <p className="text-muted-foreground max-w-sm mx-auto">
                 Enter your rack of letters above. Use standard letters, or type '?' to represent blank tiles.
               </p>
             </div>
          )}

        </div>
      </main>

      <hr className="border-border/60" />

      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary">
          
          <h2 className="flex items-center gap-3 text-3xl mt-0">
            <BookA className="w-8 h-8 text-primary" />
            How to Use the Word Finder
          </h2>
          <p>
            Our Word Finder by Letters is a versatile tool designed to instantly transform any jumble of characters into a comprehensive list of playable words. To get started, simply type your available letters into the main search box. If you have a blank tile (like a wildcard in Scrabble), use the <strong>?</strong> symbol. 
          </p>
          <p>
            Once you hit search, our algorithm cross-references your input against our extensive dictionary, verifying letter counts and returning valid results. You can use the advanced filters to pinpoint words that start with a specific letter, end with a specific suffix, or adhere to a strict length limit.
          </p>

          <h2 className="flex items-center gap-3 text-3xl">
            <BookOpen className="w-8 h-8 text-secondary" />
            Word Finder for Scrabble and Words With Friends
          </h2>
          <p>
            When staring down a difficult rack of consonants, a letter solver can be the difference between a skipped turn and a 50-point Bingo. This tool is optimized for popular board games by sorting your longest and highest-scoring options directly to the top.
          </p>
          <p>
            <strong>Pro Tip:</strong> Pay attention to board position. Use the <em>"Starts with"</em> and <em>"Ends with"</em> filters to seamlessly hook your newly found words onto letters already placed on the board, maximizing your access to Double and Triple Word score tiles.
          </p>

          <h2 className="flex items-center gap-3 text-3xl border-t border-border/60 pt-12 mt-12">
            <HelpCircle className="w-8 h-8 text-primary" />
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6 not-prose mt-8">
            <div className="bg-muted/30 p-6 rounded-xl border border-border">
              <h3 className="font-bold text-foreground text-lg mb-2">Can I use blank tiles or wildcards?</h3>
              <p className="text-muted-foreground">Yes! You can use the question mark (?) character in the main search bar to represent a blank tile. Our tool will automatically substitute it with the optimal letters to form valid words.</p>
            </div>
            <div className="bg-muted/30 p-6 rounded-xl border border-border">
              <h3 className="font-bold text-foreground text-lg mb-2">What dictionary does this tool use?</h3>
              <p className="text-muted-foreground">We use an expansive public domain dictionary (over 170,000 words) that closely mirrors the official tournament lists (like ENABLE and SOWPODS), ensuring the words you find are playable in major word games.</p>
            </div>
          </div>

        </div>
      </section>

      <Dialog open={!!selectedWord} onOpenChange={(open) => !open && setSelectedWord(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl font-mono font-extrabold uppercase tracking-widest text-primary flex items-center justify-between">
              {selectedWord}
              {isPalindrome(selectedWord) && (
                <span className="text-xs font-sans font-bold tracking-normal bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full border border-green-200 dark:border-green-800">
                  Palindrome
                </span>
              )}
            </DialogTitle>
            <DialogDescription className="text-sm font-medium">
              Length: {selectedWord?.length} Letters
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wider">
                <BookA className="w-4 h-4" /> Definition
              </h4>
              <div className="bg-muted/50 p-4 rounded-xl text-foreground text-sm">
                {wordDetails.loading ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Search className="w-4 h-4 animate-pulse" /> Fetching definition...
                  </div>
                ) : wordDetails.definition ? (
                  <div className="space-y-3">
                    {wordDetails.definition.meanings.slice(0,2).map((meaning, i) => (
                      <div key={i}>
                        <span className="italic text-muted-foreground mr-2 text-xs">{meaning.partOfSpeech}</span>
                        <span className="font-medium">{meaning.definitions[0].definition}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="italic text-muted-foreground">No standard dictionary definition found. This may be a specialized Scrabble word or plural.</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wider">
                  <Shuffle className="w-4 h-4" /> Anagrams
                </h4>
                <div className="bg-muted/50 p-4 rounded-xl text-foreground text-sm h-full">
                  {selectedAnagrams.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {selectedAnagrams.map(ana => (
                        <span key={ana} className="font-mono bg-background border border-border px-2 py-0.5 rounded text-xs">
                          {ana}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground italic text-xs">No known anagrams</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-wider">
                  <Hash className="w-4 h-4" /> Letters
                </h4>
                <div className="bg-muted/50 p-4 rounded-xl text-foreground text-sm h-full">
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(selectedFreq).map(([char, count]) => (
                      <div key={char} className="flex flex-col items-center bg-background border border-border rounded px-2 py-1 min-w-[2rem]">
                        <span className="font-mono font-bold">{char}</span>
                        <span className="text-[10px] text-muted-foreground">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}