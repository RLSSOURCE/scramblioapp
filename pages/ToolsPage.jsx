import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, Shuffle, Music, ArrowLeftRight, FileText, Sparkles } from 'lucide-react';
import ToolFilter from '@/components/ToolFilter.jsx';
import ToolCard from '@/components/ToolCard.jsx';
import { useNavigate } from 'react-router-dom';

const TOOLS_DATA = [
  {
    id: 'unscrambler',
    toolName: 'Word Unscrambler',
    category: 'Word Games',
    icon: Type,
    description: 'Instantly untangle jumbled letters to find valid words for Scrabble, Words with Friends, or puzzles.',
    demoContent: { input: 'retals', output: 'stellar, alerts, alters' },
    link: '/unscrambler'
  },
  {
    id: 'anagram',
    toolName: 'Anagram Finder',
    category: 'Word Games',
    icon: Shuffle,
    description: 'Discover hidden words by rearranging letters. Perfect for anagram puzzles and wordplay enthusiasts.',
    demoContent: { input: 'listen', output: 'silent, tinsel, enlist' },
    link: '/anagram-solver'
  },
  {
    id: 'wordfinder',
    toolName: 'Word Finder by Letters',
    category: 'Word Games',
    icon: Type,
    description: 'Enter your rack of letters to find all possible words. Perfect for Scrabble and Wordle.',
    demoContent: { input: 'APP?E', output: 'APPLE, PAPEL, PEPLA' },
    link: '/word-finder-by-letters'
  },
  {
    id: 'rhyme',
    toolName: 'Rhyme Finder',
    category: 'Writing Tools',
    icon: Music,
    description: 'Find perfect rhymes, near rhymes, and syllables to elevate your poetry, songwriting, and raps.',
    demoContent: { input: 'dream', output: 'stream, beam, supreme' },
    link: '/rhyme-finder'
  },
  {
    id: 'palindrome',
    toolName: 'Palindrome Checker',
    category: 'Analysis Tools',
    icon: ArrowLeftRight,
    description: 'Quickly verify if a word, phrase, or sentence reads exactly the same forwards and backwards.',
    demoContent: { input: 'racecar', output: '✅ Valid Palindrome' },
    link: '/palindrome'
  },
  {
    id: 'counter',
    toolName: 'Word Counter',
    category: 'Analysis Tools',
    icon: FileText,
    description: 'Analyze your text in real-time. Count words, characters, sentences, and calculate reading time.',
    demoContent: { input: 'The quick brown fox...', output: '4 words, 22 characters' },
    link: '/word-counter'
  },
  {
    id: 'generator',
    toolName: 'Idea Generator',
    category: 'Writing Tools',
    icon: Sparkles,
    description: 'Break through writer\'s block. Generate random words, prompts, and ideas to spark your creativity.',
    demoContent: { input: '[Generate]', output: 'Serendipity, Labyrinth' },
    link: '/idea-generator'
  }
];

const CATEGORIES = ['Word Games', 'Writing Tools', 'Analysis Tools'];

export default function ToolsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      const matchesSearch = tool.toolName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-background pb-6">
      <Helmet>
        <title>All Word Tools - Scramblio Dashboard</title>
        <meta name="description" content="Explore Scramblio's full suite of interactive word tools: unscrambler, anagram finder, word counter, and more. Find exactly what you need for your writing or word games." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-muted/30 pt-20 pb-16 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight text-balance">
              Scramblio Tools
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your interactive dashboard for mastering language. Search, filter, and access all our free utilities designed for writers, students, and puzzle solvers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Main Area */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <ToolFilter 
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onSearch={setSearchQuery}
          />
        </div>

        <div>
          {filteredTools.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              <AnimatePresence>
                {filteredTools.map((tool) => (
                  <motion.div
                    key={tool.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ToolCard
                      toolName={tool.toolName}
                      icon={tool.icon}
                      description={tool.description}
                      category={tool.category}
                      demoContent={tool.demoContent}
                      onTryNow={() => navigate(tool.link)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <Type className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No tools found</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any tools matching "{searchQuery}" in the {activeCategory} category. Try adjusting your filters.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How To Choose The Right Tool Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-border/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
            How To Choose The Right Tool
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Not sure which utility fits your needs? Here is a quick guide to help you select the perfect tool for your specific scenario.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Type className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Word Unscrambler</h3>
            </div>
            <p className="text-muted-foreground mb-3">
              <strong>When to use:</strong> You have a random jumble of letters and need to find any valid words that can be made from them.
            </p>
            <p className="text-sm text-foreground/80">
              <strong>Best for:</strong> Scrabble, Words with Friends, Wordle, and general vocabulary building.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF8C42]/10 flex items-center justify-center">
                <Shuffle className="w-5 h-5 text-[#FF8C42]" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Anagram Solver</h3>
            </div>
            <p className="text-muted-foreground mb-3">
              <strong>When to use:</strong> You want to rearrange a specific word or phrase to find exact matches using all the same letters.
            </p>
            <p className="text-sm text-foreground/80">
              <strong>Best for:</strong> Cryptic crosswords, anagram puzzles, and finding clever pseudonyms.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Word Counter</h3>
            </div>
            <p className="text-muted-foreground mb-3">
              <strong>When to use:</strong> You need to ensure your text meets specific length requirements or character limits.
            </p>
            <p className="text-sm text-foreground/80">
              <strong>Best for:</strong> Academic essays, social media posts, SEO content writing, and resumes.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
                <Music className="w-5 h-5 text-[#8B5CF6]" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Rhyme Finder</h3>
            </div>
            <p className="text-muted-foreground mb-3">
              <strong>When to use:</strong> You are stuck trying to find a word that sounds perfectly matched to the end of your sentence.
            </p>
            <p className="text-sm text-foreground/80">
              <strong>Best for:</strong> Songwriting, poetry, rap lyrics, and creative writing.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Word Generator</h3>
            </div>
            <p className="text-muted-foreground mb-3">
              <strong>When to use:</strong> You are facing a blank page and need random concepts to spark your imagination.
            </p>
            <p className="text-sm text-foreground/80">
              <strong>Best for:</strong> Overcoming writer's block, brainstorming sessions, and drawing prompts.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <ArrowLeftRight className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Palindrome Checker</h3>
            </div>
            <p className="text-muted-foreground mb-3">
              <strong>When to use:</strong> You want to verify if a complex phrase reads exactly the same forwards and backwards.
            </p>
            <p className="text-sm text-foreground/80">
              <strong>Best for:</strong> Linguistic puzzles, educational exercises, and wordplay curiosity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}