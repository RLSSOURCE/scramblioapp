import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Search, Shuffle, RefreshCw, HelpCircle, ChevronRight, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import WordCard from '@/components/WordCard.jsx';
import { unscrambleLetters, getWordStats } from '@/utils/unscrambleUtils';

function AnagramSolver() {
  const [inputLetters, setInputLetters] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleFindAnagrams = useCallback(() => {
    if (!inputLetters.trim()) return;
    setIsLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      const foundWords = unscrambleLetters(inputLetters);
      const sorted = [...foundWords].sort((a, b) => {
        const aIsExact = a.length === inputLetters.replace(/[^a-zA-Z]/g, '').length;
        const bIsExact = b.length === inputLetters.replace(/[^a-zA-Z]/g, '').length;
        if (aIsExact && !bIsExact) return -1;
        if (!aIsExact && bIsExact) return 1;
        return b.length - a.length;
      });
      
      setResults(sorted);
      setIsLoading(false);
    }, 450);
  }, [inputLetters]);

  const handleClear = () => {
    setInputLetters('');
    setResults([]);
    setHasSearched(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFindAnagrams();
    }
  };

  const stats = getWordStats(results);
  const exactAnagramsCount = results.filter(
    (w) => w.length === inputLetters.replace(/[^a-zA-Z]/g, '').length
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full pb-6"
    >
      <Helmet>
        <title>Free Anagram Solver - Find Anagrams Instantly</title>
        <meta name="description" content="Free anagram solver tool - unscramble letters to find anagrams and valid words. Perfect for word games and puzzles" />
        <meta property="og:title" content="Free Anagram Solver - Find Anagrams Instantly" />
        <meta property="og:description" content="Free anagram solver tool - unscramble letters to find anagrams and valid words. Perfect for word games and puzzles" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scramblio.com/#anagram" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free Anagram Solver - Find Anagrams Instantly" />
        <meta name="twitter:description" content="Free anagram solver tool - unscramble letters to find anagrams and valid words. Perfect for word games and puzzles" />
      </Helmet>

      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4 tracking-tight">
        Anagram Solver
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-2xl mx-auto mb-8 bg-white/60 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] shadow-sm border border-white/60"
      >
        <div className="flex flex-col gap-5">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium text-center max-w-md mx-auto"
          >
            Discover all possible valid words from scrambled letters. Perfect for cracking anagrams and mastering word puzzles.
          </motion.p>
          
          <div className="w-full relative">
            <label className="block text-secondary font-extrabold text-xl mb-3 uppercase tracking-wide">
              Letters to Anagram
            </label>
            <Input
              type="text"
              placeholder="e.g. LISTEN"
              value={inputLetters}
              onChange={(e) => setInputLetters(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full h-20 text-center text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase rounded-3xl border-4 border-primary/30 focus-visible:ring-[#FF8C42] focus-visible:border-[#FF8C42] shadow-inner bg-white/90 backdrop-blur-md text-foreground placeholder:text-muted-foreground/50 placeholder:tracking-normal placeholder:font-medium transition-all"
              maxLength={15}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              onClick={handleFindAnagrams}
              disabled={!inputLetters.trim() || isLoading}
              className="h-16 px-10 text-xl font-extrabold rounded-2xl bg-[#FF8C42] hover:bg-[#e87a35] text-white shadow-xl shadow-[#FF8C42]/30 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex-1 border border-[#FF8C42]/20"
            >
              <Shuffle className="w-6 h-6 mr-3" />
              Find Anagrams
            </Button>
            
            <Button
              onClick={handleClear}
              disabled={!inputLetters.trim() && !hasSearched}
              variant="outline"
              className="h-16 px-8 text-lg font-bold rounded-2xl border-2 border-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground transition-all duration-300 shadow-sm bg-white/50 backdrop-blur-sm sm:w-auto"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto mt-6">
        {isLoading && (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <Skeleton className="h-10 w-64 mx-auto mb-3 rounded-full bg-primary/20" />
              <Skeleton className="h-5 w-40 mx-auto rounded-full bg-secondary/20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-2xl bg-white/60" />
              ))}
            </div>
          </div>
        )}

        {!isLoading && hasSearched && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16 bg-white/80 backdrop-blur-md rounded-3xl border-2 border-dashed border-secondary/40 shadow-sm"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
              <Search className="w-10 h-10 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">No anagrams found</h3>
            <p className="text-muted-foreground max-w-md mx-auto text-lg font-medium">
              We couldn't form any valid 3+ letter words from those letters.
            </p>
          </motion.div>
        )}

        {!isLoading && hasSearched && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-8 bg-white/90 backdrop-blur-xl py-5 px-8 rounded-[2rem] shadow-lg border border-white inline-block mx-auto w-full max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-secondary tracking-tight">
                Found <span className="text-[#FF8C42] text-4xl drop-shadow-sm px-1">{stats.total}</span> anagram{stats.total !== 1 ? 's' : ''}
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-3 text-foreground font-medium">
                {exactAnagramsCount > 0 && (
                  <div className="bg-[#FF8C42]/10 border border-[#FF8C42]/20 px-4 py-2 rounded-xl shadow-sm text-[#FF8C42] font-bold">
                    Exact matches: {exactAnagramsCount}
                  </div>
                )}
                {stats.longest && (
                  <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl shadow-sm">
                    Longest: <span className="font-bold text-primary ml-1.5">{stats.longest}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {results.map((result, index) => (
                <WordCard
                  key={`${result.word}-${index}`}
                  word={result.word}
                  length={result.length}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Comprehensive SEO Content Section */}
      <div className="seo-container">
        <div className="seo-card">
          <h2 className="seo-h2">How Anagram Solvers Work</h2>
          <p className="seo-p">
            An anagram solver is a specialized algorithm designed to take a string of letters and rearrange them to form valid words. The process begins with letter rearrangement, where the tool calculates all possible permutations of the input characters. Because the number of combinations grows rapidly with each added letter, efficient solvers use advanced computational techniques to manage the load.
          </p>
          <p className="seo-p">
            Once the permutations are generated, the tool employs pattern matching against a comprehensive dictionary database. It quickly discards nonsensical letter groupings and isolates combinations that match recognized words. This process happens in milliseconds, allowing users to find hidden words almost instantly.
          </p>
          <p className="seo-p">
            The best anagram solvers prioritize "exact matches"—words that use every single letter provided. However, they also display partial matches, sorting them by length or relevance, ensuring that users have a complete list of possibilities for their word games or creative projects.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Popular Uses for Anagrams</h2>
          <p className="seo-p">
            Anagrams are more than just a linguistic curiosity; they have practical applications across various fields, from entertainment to education.
          </p>
          <ul className="seo-list">
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span><strong>Puzzles and Word Games:</strong> Essential for solving cryptic crosswords, Scrabble, and daily newspaper anagram challenges.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span><strong>Creative Writing:</strong> Authors often use anagrams to create clever pseudonyms, hidden messages, or mysterious character names (e.g., "Tom Marvolo Riddle" to "I am Lord Voldemort").</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span><strong>Education:</strong> Teachers use anagram exercises to help students improve spelling and recognize word families.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span><strong>Brain Training:</strong> Regularly solving anagrams is a popular cognitive exercise to keep the mind sharp and agile.</span>
            </li>
          </ul>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Benefits of Practicing Anagrams</h2>
          <p className="seo-p">
            Engaging with anagrams offers significant cognitive benefits. It forces the brain to look at familiar letters in unfamiliar ways, breaking standard reading habits.
          </p>
          <p className="seo-p">
            <strong>Memory and Recall:</strong> Searching for words within a jumble of letters strengthens your working memory and improves your ability to recall vocabulary quickly under pressure.
          </p>
          <p className="seo-p">
            <strong>Spelling and Pattern Recognition:</strong> By constantly rearranging letters, you become more attuned to common English spelling patterns, prefixes, and suffixes, which naturally improves your spelling accuracy.
          </p>
          <p className="seo-p">
            <strong>Vocabulary Expansion:</strong> Using an anagram solver exposes you to words you might not encounter in daily conversation, broadening your linguistic repertoire.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Example Anagrams</h2>
          <p className="seo-p">
            Here are five practical examples of exact anagrams. Notice how completely different words can be formed from the exact same set of letters.
          </p>
          <div className="seo-example-grid">
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: D U S T Y</span>
              <span className="text-xl font-extrabold text-foreground mb-1">STUDY</span>
              <p className="text-sm text-foreground/80">A classic example used in educational settings to teach letter rearrangement.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: N I G H T</span>
              <span className="text-xl font-extrabold text-foreground mb-1">THING</span>
              <p className="text-sm text-foreground/80">Useful for solving cryptic crossword clues that rely on common nouns.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: S A V E</span>
              <span className="text-xl font-extrabold text-foreground mb-1">VASE</span>
              <p className="text-sm text-foreground/80">Helps players find alternative 4-letter words in fast-paced word games.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: E A R T H</span>
              <span className="text-xl font-extrabold text-foreground mb-1">HEART</span>
              <p className="text-sm text-foreground/80">Often used in poetry and creative writing to draw thematic connections.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: S I L E N T</span>
              <span className="text-xl font-extrabold text-foreground mb-1">LISTEN</span>
              <p className="text-sm text-foreground/80">A famous anagram that highlights how meaning can shift dramatically.</p>
            </div>
          </div>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">FAQ Section</h2>
          <div className="faq-container">
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-accent shrink-0" />
                <span>What is the difference between an anagram and a palindrome?</span>
              </div>
              <div className="faq-a">
                An anagram is a word formed by rearranging the letters of another word. A palindrome is a word that reads exactly the same forwards and backwards (like "racecar").
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-accent shrink-0" />
                <span>Can this tool solve multiple words at once?</span>
              </div>
              <div className="faq-a">
                Currently, the tool is optimized for single-word anagrams. If you input a phrase without spaces, it will attempt to find single words that use those letters.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-accent shrink-0" />
                <span>Are proper nouns included in the results?</span>
              </div>
              <div className="faq-a">
                Generally, standard anagram solvers exclude proper nouns (names of people, places, brands) to align with official word game rules.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-accent shrink-0" />
                <span>How long does it take to find an anagram?</span>
              </div>
              <div className="faq-a">
                Our algorithm is highly optimized and typically returns all possible anagrams in less than a second, even for longer letter combinations.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-accent shrink-0" />
                <span>Is there a limit to how many letters I can input?</span>
              </div>
              <div className="faq-a">
                To ensure fast performance and prevent browser crashing, the input is typically capped at 15 letters, which covers the vast majority of English words.
              </div>
            </div>
          </div>
        </div>

        <div className="seo-card bg-accent/5 border-accent/20">
          <h2 className="seo-h2 mb-4">Explore More Tools</h2>
          <p className="seo-p mb-5">
            Continue your wordplay journey with our other free utilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/unscrambler" className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold text-primary hover:bg-primary hover:text-white transition-colors border border-primary/20 shadow-sm">
              <ArrowRight className="w-5 h-5" />
              Try Word Unscrambler
            </Link>
            <Link to="/rhyme-finder" className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-colors border border-[#8B5CF6]/20 shadow-sm">
              <ArrowRight className="w-5 h-5" />
              Try Rhyme Finder
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default AnagramSolver;