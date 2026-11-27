import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Music, RefreshCw, HelpCircle, ChevronRight, Search, AlertCircle, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import WordCard from '@/components/WordCard.jsx';

function RhymeFinder() {
  const [inputWord, setInputWord] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleFindRhymes = useCallback(async () => {
    const wordToSearch = inputWord.trim();
    if (!wordToSearch) return;
    
    setIsLoading(true);
    setHasSearched(true);
    setError(null);

    try {
      const response = await fetch(`https://api.datamuse.com/words?rel_rhy=${encodeURIComponent(wordToSearch)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch rhymes');
      }
      
      const data = await response.json();
      
      const formattedResults = data.map(item => ({
        word: item.word,
        length: item.word.length,
        score: item.score,
        syllables: item.numSyllables
      }));
      
      setResults(formattedResults);
      
      if (formattedResults.length === 0) {
        toast('No rhymes found for that word.');
      } else {
        toast.success(`Found ${formattedResults.length} rhymes!`);
      }
    } catch (err) {
      console.error('Rhyme fetch error:', err);
      setError('Could not connect to the rhyme dictionary. Please try again.');
      toast.error('Failed to find rhymes');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [inputWord]);

  const handleClear = () => {
    setInputWord('');
    setHasSearched(false);
    setResults([]);
    setError(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFindRhymes();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full pb-6"
    >
      <Helmet>
        <title>Free Rhyme Finder - Find Words That Rhyme</title>
        <meta name="description" content="Free rhyme finder tool - find words that rhyme with any word instantly. Great for poetry, songwriting, and creative writing" />
        <meta property="og:title" content="Free Rhyme Finder - Find Words That Rhyme" />
        <meta property="og:description" content="Free rhyme finder tool - find words that rhyme with any word instantly. Great for poetry, songwriting, and creative writing" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scramblio.com/#rhyme" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free Rhyme Finder - Find Words That Rhyme" />
        <meta name="twitter:description" content="Free rhyme finder tool - find words that rhyme with any word instantly. Great for poetry, songwriting, and creative writing" />
      </Helmet>

      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4 tracking-tight">
        Rhyme Finder
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
            Find the perfect rhyming words for your poetry, lyrics, and creative writing projects in seconds.
          </motion.p>
          
          <div className="w-full relative">
            <label className="block text-secondary font-extrabold text-xl mb-3 uppercase tracking-wide text-center">
              Word to Rhyme
            </label>
            <Input
              type="text"
              placeholder="e.g. RHYTHM"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full h-20 text-center text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase rounded-3xl border-4 border-primary/30 focus-visible:ring-[#8B5CF6] focus-visible:border-[#8B5CF6] shadow-inner bg-white/90 backdrop-blur-md text-foreground placeholder:text-muted-foreground/50 placeholder:tracking-normal placeholder:font-medium transition-all"
              maxLength={25}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              onClick={handleFindRhymes}
              disabled={!inputWord.trim() || isLoading}
              className="h-16 px-10 text-xl font-extrabold rounded-2xl bg-[#8B5CF6] hover:bg-[#7c3aed] text-white shadow-xl shadow-[#8B5CF6]/30 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex-1 border border-[#8B5CF6]/20 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <Music className="w-6 h-6 mr-3" />
              {isLoading ? 'Searching...' : 'Find Rhymes'}
            </Button>
            
            <Button
              onClick={handleClear}
              disabled={(!inputWord.trim() && !hasSearched) || isLoading}
              variant="outline"
              className="h-16 px-8 text-lg font-bold rounded-2xl border-2 border-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground transition-all duration-300 shadow-sm bg-white/50 backdrop-blur-sm sm:w-auto"
            >
              <RefreshCw className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Clear
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto mt-6">
        {isLoading && (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <Skeleton className="h-10 w-64 mx-auto mb-3 rounded-full bg-[#8B5CF6]/20" />
              <Skeleton className="h-5 w-40 mx-auto rounded-full bg-secondary/20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-2xl bg-white/60" />
              ))}
            </div>
          </div>
        )}

        {!isLoading && hasSearched && error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16 bg-white/80 backdrop-blur-md rounded-3xl border-2 border-dashed border-destructive/40 shadow-sm"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">Connection Error</h3>
            <p className="text-muted-foreground max-w-md mx-auto text-lg font-medium mb-6">
              {error}
            </p>
            <Button 
              onClick={handleFindRhymes}
              className="bg-destructive hover:bg-destructive/90 text-white font-bold rounded-xl h-12 px-8"
            >
              Try Again
            </Button>
          </motion.div>
        )}

        {!isLoading && hasSearched && !error && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16 bg-white/80 backdrop-blur-md rounded-3xl border-2 border-dashed border-[#8B5CF6]/40 shadow-sm"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
              <Search className="w-10 h-10 text-[#8B5CF6]" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">No rhymes found</h3>
            <p className="text-muted-foreground max-w-md mx-auto text-lg font-medium">
              We couldn't find any perfect rhymes for "{inputWord}". Try a different word or check your spelling.
            </p>
          </motion.div>
        )}

        {!isLoading && hasSearched && !error && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-8 bg-white/90 backdrop-blur-xl py-5 px-8 rounded-[2rem] shadow-lg border border-white inline-block mx-auto w-full max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-secondary tracking-tight">
                Found <span className="text-[#8B5CF6] text-4xl drop-shadow-sm px-1">{results.length}</span> rhyme{results.length !== 1 ? 's' : ''}
              </h2>
              <p className="text-muted-foreground font-medium">
                for <span className="font-bold text-foreground uppercase tracking-wider">"{inputWord}"</span>
              </p>
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
          <h2 className="seo-h2">How Rhyme Finders Work</h2>
          <p className="seo-p">
            A rhyme finder is a sophisticated linguistic tool that goes beyond simple spelling matches. Instead of just looking at how a word is written, it utilizes phonetic matching algorithms to analyze how a word sounds when spoken aloud. This is crucial because English spelling is notoriously inconsistent (e.g., "bough" and "cow" rhyme, despite entirely different spellings).
          </p>
          <p className="seo-p">
            When you enter a word, the tool breaks it down into its phonetic components, focusing heavily on the final stressed vowel and all subsequent sounds. It then queries a massive pronunciation dictionary to find other words that share this exact phonetic ending.
          </p>
          <p className="seo-p">
            Advanced rhyme finders also perform syllable analysis. They categorize results by the number of syllables, allowing poets and songwriters to find words that not only rhyme but also fit perfectly into the meter and rhythm of their verse.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Why Writers Use Rhyming Tools</h2>
          <p className="seo-p">
            Finding the perfect rhyme naturally can interrupt the creative flow. Rhyming tools act as a digital muse, providing instant options so writers can maintain their momentum.
          </p>
          <ul className="seo-list">
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
              <span><strong>Poetry:</strong> Poets use these tools to adhere to strict traditional forms like sonnets or limericks without compromising their intended meaning.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
              <span><strong>Songwriting:</strong> Lyricists need rhymes that sound good musically. A rhyme finder offers unexpected pairings that can inspire an entire chorus.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
              <span><strong>Rap and Hip-Hop:</strong> MCs often look for multi-syllabic rhymes to create complex, fast-paced flows.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
              <span><strong>Creative Writing:</strong> Children's book authors rely heavily on simple, engaging rhymes to keep young readers entertained.</span>
            </li>
          </ul>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Rhyming for Poetry, Music, and Songwriting</h2>
          <p className="seo-p">
            Understanding rhyme schemes is essential for structuring your work. A rhyme scheme is the pattern of rhymes at the end of each line of a poem or song.
          </p>
          <p className="seo-p">
            <strong>AABB:</strong> A simple, bouncy scheme often used in children's literature and upbeat songs. The first two lines rhyme with each other, and the next two lines rhyme with each other.
          </p>
          <p className="seo-p">
            <strong>ABAB:</strong> A classic, alternating scheme common in ballads and pop music. It creates a steady, predictable rhythm that pulls the listener forward.
          </p>
          <p className="seo-p">
            <strong>ABBA:</strong> Similar to ABAB, but the inner lines rhyme, creating a "sandwich" effect often used in more contemplative or complex poetry.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Near Rhymes vs Exact Rhymes</h2>
          <p className="seo-p">
            While exact rhymes (perfect rhymes) are the most common, modern music and poetry frequently employ near rhymes to expand creative possibilities.
          </p>
          <p className="seo-p">
            <strong>Exact Rhymes:</strong> Words where the final stressed vowel and all following sounds are identical (e.g., "cat" and "hat", or "measure" and "treasure").
          </p>
          <p className="seo-p">
            <strong>Slant Rhymes (Near Rhymes):</strong> Words that have similar, but not identical, sounds. This often involves matching the final consonant sounds but altering the vowel (e.g., "shape" and "keep").
          </p>
          <p className="seo-p">
            <strong>Assonance and Consonance:</strong> Assonance is the repetition of vowel sounds (e.g., "fleet" and "deep"), while consonance is the repetition of consonant sounds (e.g., "blank" and "think"). Both are powerful tools for creating rhythm without relying on perfect rhymes.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">5 Example Rhyming Sets</h2>
          <p className="seo-p">
            Here are practical examples of how a single word can generate a diverse set of rhymes across different syllable counts.
          </p>
          <div className="seo-example-grid">
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: LIGHT</span>
              <span className="text-xl font-extrabold text-foreground mb-1">Bright, Flight, Tonight</span>
              <p className="text-sm text-foreground/80">Commonly used in pop songwriting to create uplifting, energetic choruses.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: DREAM</span>
              <span className="text-xl font-extrabold text-foreground mb-1">Beam, Scheme, Extreme</span>
              <p className="text-sm text-foreground/80">Provides multi-syllable options for complex rap verses or poetry.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: FIRE</span>
              <span className="text-xl font-extrabold text-foreground mb-1">Wire, Desire, Inspire</span>
              <p className="text-sm text-foreground/80">Helps lyricists find emotional, thematic matches for passionate songs.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: HEART</span>
              <span className="text-xl font-extrabold text-foreground mb-1">Art, Start, Depart</span>
              <p className="text-sm text-foreground/80">Classic ballad rhymes that help structure romantic or melancholic verses.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: TIME</span>
              <span className="text-xl font-extrabold text-foreground mb-1">Crime, Prime, Sublime</span>
              <p className="text-sm text-foreground/80">Offers versatile endings for storytelling and narrative-driven writing.</p>
            </div>
          </div>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">FAQ Section</h2>
          <div className="faq-container">
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-[#8B5CF6] shrink-0" />
                <span>Does the tool find rhymes based on spelling or sound?</span>
              </div>
              <div className="faq-a">
                It strictly uses phonetic matching (sound). This ensures that words like "weigh" and "play" will be identified as rhymes, even though their spellings are completely different.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-[#8B5CF6] shrink-0" />
                <span>Can I find multi-syllable rhymes?</span>
              </div>
              <div className="faq-a">
                Yes, the results naturally include words of varying syllable lengths that share the same ending phonetic structure as your input word.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-[#8B5CF6] shrink-0" />
                <span>Why did it return a word that doesn't look like a rhyme?</span>
              </div>
              <div className="faq-a">
                Because English pronunciation varies by dialect, some words may rhyme perfectly in one region but sound like a "near rhyme" in another.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-[#8B5CF6] shrink-0" />
                <span>Is this tool useful for writing rap lyrics?</span>
              </div>
              <div className="faq-a">
                Absolutely. Many hip-hop artists use rhyme dictionaries to discover unexpected word pairings and build complex internal rhyme schemes.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-[#8B5CF6] shrink-0" />
                <span>Does it support languages other than English?</span>
              </div>
              <div className="faq-a">
                Currently, our phonetic database is optimized exclusively for the English language.
              </div>
            </div>
          </div>
        </div>

        <div className="seo-card bg-[#8B5CF6]/5 border-[#8B5CF6]/20">
          <h2 className="seo-h2 mb-4">Explore More Tools</h2>
          <p className="seo-p mb-5">
            Expand your creative writing toolkit with our other free utilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/unscrambler" className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold text-primary hover:bg-primary hover:text-white transition-colors border border-primary/20 shadow-sm">
              <ArrowRight className="w-5 h-5" />
              Try Word Unscrambler
            </Link>
            <Link to="/palindrome" className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold text-accent hover:bg-accent hover:text-white transition-colors border border-accent/20 shadow-sm">
              <ArrowRight className="w-5 h-5" />
              Try Palindrome Checker
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default RhymeFinder;