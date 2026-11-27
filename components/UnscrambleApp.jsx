import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Zap, 
  FilterX, 
  HelpCircle,
  MousePointerClick,
  Users,
  Lightbulb,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import WordCard from '@/components/WordCard.jsx';
import FilterPanel from '@/components/FilterPanel.jsx';
import { unscrambleLetters, getWordStats, filterWords } from '@/utils/unscrambleUtils';

function UnscrambleApp() {
  const [inputLetters, setInputLetters] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState({
    startsWith: '',
    endsWith: '',
    contains: '',
    length: ''
  });

  const handleUnscramble = useCallback(() => {
    if (!inputLetters.trim()) return;
    setIsLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      const foundWords = unscrambleLetters(inputLetters);
      setResults(foundWords);
      setIsLoading(false);
    }, 400);
  }, [inputLetters]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUnscramble();
    }
  };

  const filteredResults = useMemo(() => filterWords(results, filters), [results, filters]);
  const stats = getWordStats(filteredResults);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Word Unscrambler",
    "url": "https://scramblio.com/unscrambler",
    "description": "Free word unscrambler tool to quickly find words from scrambled letters. Perfect for Scrabble, Wordle, and other word games.",
    "applicationCategory": "Utilities",
    "offers": {
      "@type": "Offer",
      "price": "0"
    }
  };

  return (
    <motion.div
      key="unscramble"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="pb-6"
    >
      <Helmet>
        <title>Word Unscrambler - Solve Scrambled Words Instantly</title>
        <meta name="description" content="Free word unscrambler tool to quickly find words from scrambled letters. Perfect for Scrabble, Wordle, and other word games." />
        <link rel="canonical" href="https://scramblio.com/unscrambler" />
        <meta property="og:title" content="Word Unscrambler - Solve Scrambled Words Instantly" />
        <meta property="og:description" content="Free word unscrambler tool to quickly find words from scrambled letters. Perfect for Scrabble, Wordle, and other word games." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scramblio.com/unscrambler" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Word Unscrambler - Solve Scrambled Words Instantly" />
        <meta name="twitter:description" content="Free word unscrambler tool to quickly find words from scrambled letters. Perfect for Scrabble, Wordle, and other word games." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4 tracking-tight">
        Word Unscrambler
      </h1>

      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-xl mx-auto mb-8"
      >
        <div className="flex flex-col items-center gap-5">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium text-center max-w-md"
          >
            Use our free word unscrambler to quickly find words from scrambled letters. Perfect for Scrabble, Wordle, and other word games.
          </motion.p>

          <div className="w-full relative">
            <Input
              type="text"
              placeholder="Enter letters..."
              value={inputLetters}
              onChange={(e) => setInputLetters(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full h-20 text-center text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase rounded-3xl border-4 border-primary/40 focus-visible:ring-primary focus-visible:border-primary shadow-inner bg-white/90 backdrop-blur-md text-foreground placeholder:text-muted-foreground/50 placeholder:tracking-normal placeholder:font-medium"
              maxLength={15}
            />
            {inputLetters.length > 0 && (
              <div className="absolute -bottom-7 left-0 right-0 text-center">
                <span className="text-sm font-extrabold text-secondary tracking-wide uppercase">
                  {inputLetters.length} letter{inputLetters.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
          
          <Button
            onClick={handleUnscramble}
            disabled={!inputLetters.trim() || isLoading}
            className="h-16 px-12 text-xl font-extrabold rounded-2xl bg-warm-accent hover:bg-warm-accent/90 text-warm-accent-foreground shadow-xl shadow-warm-accent/40 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] w-full sm:w-auto border border-warm-accent-foreground/10"
          >
            <Zap className="w-6 h-6 mr-3" />
            Unscramble Now
          </Button>
        </div>
      </motion.div>

      {/* Filter Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FilterPanel 
          filters={filters} 
          setFilters={setFilters} 
          disabled={!hasSearched || results.length === 0} 
        />
      </motion.div>

      {/* Results Section */}
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
            <h3 className="text-2xl font-bold mb-3 text-foreground">No words found</h3>
            <p className="text-muted-foreground max-w-md mx-auto text-lg font-medium">
              Try different letters or check your spelling. Words must be at least 3 letters long.
            </p>
          </motion.div>
        )}

        {!isLoading && hasSearched && results.length > 0 && filteredResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16 bg-white/80 backdrop-blur-md rounded-3xl border-2 border-dashed border-accent/40 shadow-sm"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
              <FilterX className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">No words match filters</h3>
            <p className="text-muted-foreground max-w-md mx-auto text-lg font-medium mb-6">
              We found {results.length} words, but none of them match your current filter criteria.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setFilters({startsWith: '', endsWith: '', contains: '', length: ''})}
              className="border-2 border-accent text-accent hover:bg-accent hover:text-white font-bold rounded-xl h-12 px-8 text-lg"
            >
              Clear all filters
            </Button>
          </motion.div>
        )}

        {!isLoading && filteredResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Stats */}
            <div className="text-center mb-8 bg-white/90 backdrop-blur-xl py-5 px-8 rounded-[2rem] shadow-lg border border-white inline-block mx-auto w-full max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-secondary tracking-tight">
                Found <span className="text-highlight text-4xl drop-shadow-sm px-1">{stats.total}</span> word{stats.total !== 1 ? 's' : ''}
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-3 text-foreground font-medium">
                {stats.longest && (
                  <div className="bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl shadow-sm">
                    Longest: <span className="font-bold text-primary ml-1.5">{stats.longest}</span>
                  </div>
                )}
                {stats.shortest && (
                  <div className="bg-accent/10 border border-accent/20 px-4 py-2 rounded-xl shadow-sm">
                    Shortest: <span className="font-bold text-accent ml-1.5">{stats.shortest}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Word Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredResults.map((result, index) => (
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
          <h2 className="seo-h2">How Word Unscramblers Work</h2>
          <p className="seo-p">
            A word unscrambler is a powerful digital tool designed to take a chaotic jumble of letters and instantly reorganize them into valid, recognizable words. The core of this technology relies on sophisticated letter analysis and dictionary matching algorithms. When you input your scrambled letters, the system first strips away any spaces or special characters to focus purely on the alphabetical content.
          </p>
          <p className="seo-p">
            Next, the algorithm generates permutations—all possible combinations of the letters provided. For a small number of letters, this is quick, but as the letter count grows, the number of combinations increases exponentially. To handle this efficiently, modern unscramblers use pattern recognition and optimized data structures like "trie" trees to quickly discard invalid letter sequences before they are fully formed.
          </p>
          <p className="seo-p">
            Finally, the generated combinations are cross-referenced against a comprehensive dictionary database. This database is often compiled from official tournament word lists used in competitive play. The matching words are then sorted by length, alphabetical order, or point value, and presented to the user in an easy-to-read format.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Popular Games Using Unscramblers</h2>
          <p className="seo-p">
            Word unscramblers have become an essential companion for enthusiasts of various word games. They serve as both a learning tool and a strategic aid when players find themselves stuck with a difficult set of letters.
          </p>
          <ul className="seo-list">
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong>Scrabble:</strong> Players use unscramblers to find high-scoring words from their seven-tile rack, especially when trying to utilize premium board squares.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong>Words With Friends:</strong> Similar to Scrabble, this mobile game often prompts players to seek out the longest possible words to outscore their opponents.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong>Wordle:</strong> When players have identified several letters but cannot determine the final word, an unscrambler can reveal the remaining possibilities.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong>Crossword Puzzles:</strong> Anagram clues in crosswords can be quickly solved by inputting the scrambled letters into the tool.</span>
            </li>
          </ul>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Why Vocabulary Practice Matters</h2>
          <p className="seo-p">
            Regularly engaging with word puzzles and using tools like unscramblers can significantly impact your linguistic abilities. It is not just about winning games; it is about active cognitive engagement.
          </p>
          <p className="seo-p">
            <strong>Letter Recognition:</strong> Unscrambling words trains the brain to recognize common prefixes, suffixes, and letter pairings (like "th", "ch", or "ing"). This rapid recognition improves overall reading speed and comprehension.
          </p>
          <p className="seo-p">
            <strong>Spelling Improvement:</strong> By seeing how letters correctly fit together to form valid words, users naturally reinforce their spelling skills. It highlights the rules and exceptions of English orthography.
          </p>
          <p className="seo-p">
            <strong>Vocabulary Growth:</strong> Unscramblers often reveal words the user may not have known existed. Discovering a new word, looking up its definition, and playing it in a game is a highly effective method for long-term vocabulary retention.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Examples of Scrambled Words</h2>
          <p className="seo-p">
            Here are five practical examples of scrambled letters and the valid words they can form. Notice how a single set of letters can yield multiple results of varying lengths.
          </p>
          <div className="seo-example-grid">
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: A E T</span>
              <span className="text-xl font-extrabold text-foreground mb-1">ATE, EAT, TEA</span>
              <p className="text-sm text-foreground/80">Helps identify high-scoring 3-letter combinations for Scrabble end-games.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: L I S T E N</span>
              <span className="text-xl font-extrabold text-foreground mb-1">SILENT, ENLIST, TINSEL</span>
              <p className="text-sm text-foreground/80">Perfect for finding 6-letter bingo words in competitive board games.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: R E A D</span>
              <span className="text-xl font-extrabold text-foreground mb-1">DARE, DEAR, READ</span>
              <p className="text-sm text-foreground/80">Useful for daily anagram puzzles and expanding basic vocabulary.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: P O S T</span>
              <span className="text-xl font-extrabold text-foreground mb-1">SPOT, STOP, TOPS</span>
              <p className="text-sm text-foreground/80">Shows how common consonants can be rearranged for multiple valid plays.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: N O W</span>
              <span className="text-xl font-extrabold text-foreground mb-1">OWN, WON, NOW</span>
              <p className="text-sm text-foreground/80">Great for quick crossword clues that require 3-letter anagrams.</p>
            </div>
          </div>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">FAQ Section</h2>
          <div className="faq-container">
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                <span>Is using a word unscrambler considered cheating?</span>
              </div>
              <div className="faq-a">
                It depends on the context. In official tournaments, it is strictly prohibited. However, in casual play, many use it as a learning tool or agree upon its use to keep the game moving and discover new words.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                <span>Can the tool find words with blank tiles?</span>
              </div>
              <div className="faq-a">
                Currently, our tool focuses on exact letter inputs. If you have a blank tile, you can try substituting it with common vowels or consonants to see what words are generated.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                <span>What dictionary does the unscrambler use?</span>
              </div>
              <div className="faq-a">
                We utilize a comprehensive, standard English dictionary database that aligns closely with official word game lists, ensuring the words you find are valid in most popular games.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                <span>Why didn't it find a specific word I know exists?</span>
              </div>
              <div className="faq-a">
                The tool filters out proper nouns, hyphenated words, and words shorter than three letters, as these are typically invalid in standard word games.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                <span>How is this different from an anagram solver?</span>
              </div>
              <div className="faq-a">
                An unscrambler finds all possible words of varying lengths from your letters. An anagram solver specifically looks for words that use *every single letter* you inputted.
              </div>
            </div>
          </div>
        </div>

        <div className="seo-card bg-primary/5 border-primary/20">
          <h2 className="seo-h2 mb-4">Explore More Tools</h2>
          <p className="seo-p mb-5">
            Enhance your word game strategy and writing skills with our other free utilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/anagram-solver" className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold text-primary hover:bg-primary hover:text-white transition-colors border border-primary/20 shadow-sm">
              <ArrowRight className="w-5 h-5" />
              Try Anagram Solver
            </Link>
            <Link to="/word-counter" className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold text-secondary hover:bg-secondary hover:text-white transition-colors border border-secondary/20 shadow-sm">
              <ArrowRight className="w-5 h-5" />
              Try Word Counter
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default UnscrambleApp;