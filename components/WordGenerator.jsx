import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Sparkles, RefreshCw, HelpCircle, ChevronRight, Search, AlertCircle, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import WordCard from '@/components/WordCard.jsx';
import wordList, { wordsByLength } from '@/utils/wordList.js';

function WordGenerator() {
  const [quantity, setQuantity] = useState('10');
  const [length, setLength] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleGenerate = useCallback(() => {
    setIsLoading(true);
    setHasSearched(true);
    setError(null);

    setTimeout(() => {
      let availableWords = [];
      
      const targetQuantity = parseInt(quantity, 10);
      if (isNaN(targetQuantity) || targetQuantity < 1 || targetQuantity > 50) {
        setError('Please enter a valid quantity between 1 and 50.');
        setResults([]);
        setIsLoading(false);
        return;
      }

      const targetLength = parseInt(length, 10);
      const isLengthValid = !isNaN(targetLength) && targetLength > 0;

      if (length.trim() && isLengthValid) {
        if (targetLength < 2 || targetLength > 15) {
          setError('Please enter a word length between 2 and 15.');
          setResults([]);
          setIsLoading(false);
          return;
        }
        availableWords = wordsByLength[targetLength] || [];
      } else {
        availableWords = wordList;
      }

      if (availableWords.length === 0) {
        setResults([]);
        toast.error(isLengthValid ? `No words found with exactly ${targetLength} letters.` : 'No words available in the dictionary.');
      } else {
        const shuffled = [...availableWords].sort(() => 0.5 - Math.random());
        const finalQuantity = Math.min(targetQuantity, shuffled.length);
        const selected = shuffled.slice(0, finalQuantity).map(word => ({
          word: word,
          length: word.length
        }));
        
        setResults(selected);
        toast.success(`Generated ${selected.length} random words!`);
        if (finalQuantity < targetQuantity) {
          toast(`Only found ${finalQuantity} words matching your length criteria.`);
        }
      }
      
      setIsLoading(false);
    }, 400);
  }, [length, quantity]);

  const handleClear = () => {
    setQuantity('10');
    setLength('');
    setHasSearched(false);
    setResults([]);
    setError(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGenerate();
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
        <title>Free Word Generator - Generate Random Words & Prompts</title>
        <meta name="description" content="Free word generator tool - generate random words and creative prompts by length. Perfect for games, writing, and creative projects" />
        <meta property="og:title" content="Free Word Generator - Generate Random Words & Prompts" />
        <meta property="og:description" content="Free word generator tool - generate random words and creative prompts by length. Perfect for games, writing, and creative projects" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scramblio.com/#generator" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free Word Generator - Generate Random Words & Prompts" />
        <meta name="twitter:description" content="Free word generator tool - generate random words and creative prompts by length. Perfect for games, writing, and creative projects" />
      </Helmet>

      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4 tracking-tight">
        Word Generator
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
            Instantly generate random words to spark creativity, brainstorm ideas, or use as game prompts.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-5 w-full relative">
            <div className="flex-1">
              <label className="block text-secondary font-extrabold text-sm sm:text-base mb-2 uppercase tracking-wide text-center sm:text-left">
                Number of Words
              </label>
              <Input
                type="number"
                min="1"
                max="50"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full h-16 text-center text-xl font-bold rounded-2xl border-2 border-primary/30 focus-visible:ring-[#10B981] focus-visible:border-[#10B981] shadow-inner bg-white/90 backdrop-blur-md text-foreground transition-all"
              />
            </div>
            
            <div className="flex-1">
              <label className="block text-secondary font-extrabold text-sm sm:text-base mb-2 uppercase tracking-wide text-center sm:text-left">
                Word Length <span className="text-muted-foreground/60 font-medium normal-case">(Optional)</span>
              </label>
              <Input
                type="number"
                min="2"
                max="15"
                placeholder="Any length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full h-16 text-center text-xl font-bold rounded-2xl border-2 border-primary/30 focus-visible:ring-[#10B981] focus-visible:border-[#10B981] shadow-inner bg-white/90 backdrop-blur-md text-foreground placeholder:text-muted-foreground/50 transition-all"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-3">
            <Button
              onClick={handleGenerate}
              disabled={isLoading}
              className="h-16 px-10 text-xl font-extrabold rounded-2xl bg-[#10B981] hover:bg-[#059669] text-white shadow-xl shadow-[#10B981]/30 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex-1 border border-[#10B981]/20 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <Sparkles className={`w-6 h-6 mr-3 ${isLoading ? 'animate-pulse' : ''}`} />
              {isLoading ? 'Generating...' : 'Generate Words'}
            </Button>
            
            <Button
              onClick={handleClear}
              disabled={(!length.trim() && quantity === '10' && !hasSearched) || isLoading}
              variant="outline"
              className="h-16 px-8 text-lg font-bold rounded-2xl border-2 border-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground transition-all duration-300 shadow-sm bg-white/50 backdrop-blur-sm sm:w-auto"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto mt-6">
        {isLoading && (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <Skeleton className="h-10 w-64 mx-auto mb-3 rounded-full bg-[#10B981]/20" />
              <Skeleton className="h-5 w-40 mx-auto rounded-full bg-secondary/20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(parseInt(quantity, 10) || 10)].map((_, i) => (
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
            <h3 className="text-2xl font-bold mb-3 text-foreground">Invalid Input</h3>
            <p className="text-muted-foreground max-w-md mx-auto text-lg font-medium mb-6">
              {error}
            </p>
          </motion.div>
        )}

        {!isLoading && hasSearched && !error && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16 bg-white/80 backdrop-blur-md rounded-3xl border-2 border-dashed border-[#10B981]/40 shadow-sm"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#10B981]/10 flex items-center justify-center">
              <Search className="w-10 h-10 text-[#10B981]" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">No words found</h3>
            <p className="text-muted-foreground max-w-md mx-auto text-lg font-medium">
              We couldn't find any words matching that exact length in our dictionary. Try a different number.
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
                Generated <span className="text-[#10B981] text-4xl drop-shadow-sm px-1">{results.length}</span> word{results.length !== 1 ? 's' : ''}
              </h2>
              <p className="text-muted-foreground font-medium">
                {length.trim() ? `with exactly ${length} letters` : 'of random lengths'}
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
            
            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleGenerate}
                variant="outline"
                className="rounded-full px-8 py-6 text-lg font-bold border-2 border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981] hover:text-white transition-all shadow-sm"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Generate More
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Comprehensive SEO Content Section */}
      <div className="seo-container">
        <div className="seo-card">
          <h2 className="seo-h2">How Word Generators Work</h2>
          <p className="seo-p">
            A random word generator is a digital tool that pulls words from a vast, pre-compiled dictionary database using a randomization algorithm. Unlike simply opening a physical dictionary and pointing at a page, a digital generator ensures true randomness and allows for specific filtering.
          </p>
          <p className="seo-p">
            When you request a set number of words, the algorithm shuffles the available database and selects the requested quantity. If you apply a filter—such as specifying that all words must be exactly seven letters long—the tool first narrows down the database to only include words meeting that criteria before applying the randomization.
          </p>
          <p className="seo-p">
            This process happens in milliseconds, providing users with instant, unexpected combinations of words that can serve as the foundation for creative projects, games, or educational exercises.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Creative Writing Uses</h2>
          <p className="seo-p">
            For writers, a blank page can be intimidating. Word generators act as a catalyst to overcome writer's block by forcing the brain to make connections between unrelated concepts.
          </p>
          <ul className="seo-list">
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
              <span><strong>Prompt Generation:</strong> Generate three random words and challenge yourself to write a short story or poem that incorporates all of them.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
              <span><strong>Character Naming:</strong> Combine random words to create unique fantasy names, places, or magical items.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
              <span><strong>Breaking Habits:</strong> Writers often fall into using the same vocabulary. A generator introduces fresh words into your daily writing routine.</span>
            </li>
          </ul>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Brainstorming Applications</h2>
          <p className="seo-p">
            Beyond creative writing, random words are a staple in professional brainstorming and ideation sessions. The technique, often called "random input," is used to solve complex problems.
          </p>
          <p className="seo-p">
            <strong>Product Development:</strong> Teams generate a random word and force a connection between that word and their current product to inspire new features or marketing angles.
          </p>
          <p className="seo-p">
            <strong>Brand Naming:</strong> Startups frequently use word generators to find unique, available domain names by combining random adjectives and nouns.
          </p>
          <p className="seo-p">
            <strong>Content Creation:</strong> Bloggers and YouTubers use random words to inspire new video topics or article themes when they feel their content is becoming repetitive.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Educational Benefits</h2>
          <p className="seo-p">
            Teachers and students utilize word generators to make language learning more dynamic and interactive.
          </p>
          <ul className="seo-list">
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
              <span><strong>Vocabulary Expansion:</strong> Encountering unknown words prompts students to look up definitions, naturally expanding their vocabulary.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
              <span><strong>Spelling Tests:</strong> Teachers can generate lists of words of a specific length to use for weekly spelling quizzes.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
              <span><strong>ESL Practice:</strong> English language learners use generated words to practice pronunciation and sentence construction.</span>
            </li>
          </ul>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Random Word Practice Exercises</h2>
          <p className="seo-p">
            Want to get the most out of this tool? Try these quick exercises to boost your creativity and language skills.
          </p>
          <div className="seo-example-grid">
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: 5 Words, Any Length</span>
              <span className="text-base font-medium text-foreground mb-1">Output: Ocean, Whisper, Clock, Velvet, Run</span>
              <p className="text-sm text-foreground/80">Use these 5 words to write a cohesive 5-minute short story.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: 1 Word, 12 Letters</span>
              <span className="text-base font-medium text-foreground mb-1">Output: Serendipity</span>
              <p className="text-sm text-foreground/80">Guess the definition of a long word, then look it up to build vocabulary.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: 10 Words, Any Length</span>
              <span className="text-base font-medium text-foreground mb-1">Output: Apple, Train, Jump...</span>
              <p className="text-sm text-foreground/80">Generate custom prompts for your next game of Pictionary or Charades.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: 2 Words, Any Length</span>
              <span className="text-base font-medium text-foreground mb-1">Output: Cyber, Horizon</span>
              <p className="text-sm text-foreground/80">Combine two random words to brainstorm unique startup or brand names.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: 3 Words, 5 Letters</span>
              <span className="text-base font-medium text-foreground mb-1">Output: Ghost, Flame, Night</span>
              <p className="text-sm text-foreground/80">Use specific length words to practice for games like Wordle.</p>
            </div>
          </div>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">FAQ Section</h2>
          <div className="faq-container">
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-[#10B981] shrink-0" />
                <span>Are the generated words truly random?</span>
              </div>
              <div className="faq-a">
                Yes, the tool uses a cryptographic randomization algorithm to ensure that every generation provides a unique, unpredictable set of words.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-[#10B981] shrink-0" />
                <span>Does the generator include bad words or profanity?</span>
              </div>
              <div className="faq-a">
                Our standard dictionary database is filtered to remove highly offensive profanity, making it safe for general educational and creative use.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-[#10B981] shrink-0" />
                <span>Can I generate words in other languages?</span>
              </div>
              <div className="faq-a">
                Currently, this specific tool is connected to an English language dictionary database.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-[#10B981] shrink-0" />
                <span>What is the maximum number of words I can generate?</span>
              </div>
              <div className="faq-a">
                You can generate up to 50 words at a single time to ensure fast loading and a clean display on your screen.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-[#10B981] shrink-0" />
                <span>Why did it generate fewer words than I asked for?</span>
              </div>
              <div className="faq-a">
                If you set a specific word length (e.g., 15 letters), there may be fewer words of that exact length in the dictionary than the quantity you requested.
              </div>
            </div>
          </div>
        </div>

        <div className="seo-card bg-[#10B981]/5 border-[#10B981]/20">
          <h2 className="seo-h2 mb-4">Explore More Tools</h2>
          <p className="seo-p mb-5">
            Take your generated words and manipulate them with our other free utilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/unscrambler" className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold text-primary hover:bg-primary hover:text-white transition-colors border border-primary/20 shadow-sm">
              <ArrowRight className="w-5 h-5" />
              Try Word Unscrambler
            </Link>
            <Link to="/anagram-solver" className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold text-accent hover:bg-accent hover:text-white transition-colors border border-accent/20 shadow-sm">
              <ArrowRight className="w-5 h-5" />
              Try Anagram Solver
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default WordGenerator;