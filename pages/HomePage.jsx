import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Sparkles, 
  ArrowLeftRight, 
  Type, 
  Shuffle, 
  Music,
  Search,
  Brain,
  Grid,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
  Users,
  HelpCircle
} from 'lucide-react';
import ContactSection from '@/components/ContactSection.jsx';
import ToolCard from '@/components/ToolCard.jsx';

const TOOLS = [
  {
    id: 'counter',
    name: 'Word Counter',
    description: 'Analyze text to count words, characters, sentences, and paragraphs in real-time.',
    icon: FileText,
    color: 'text-primary',
    bg: 'bg-primary/10',
    href: '/word-counter'
  },
  {
    id: 'generator',
    name: 'Word Generator',
    description: 'Generate random words by length and filter by starting letter for creative projects.',
    icon: Sparkles,
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    href: '/word-generator'
  },
  {
    id: 'palindrome',
    name: 'Palindrome Checker',
    description: 'Check if words and phrases read the same forwards and backwards instantly.',
    icon: ArrowLeftRight,
    color: 'text-accent',
    bg: 'bg-accent/10',
    href: '/palindrome'
  },
  {
    id: 'unscrambler',
    name: 'Word Unscrambler',
    description: 'Unscramble letters to find valid words for Scrabble, Words with Friends, and more.',
    icon: Type,
    color: 'text-warm-accent',
    bg: 'bg-warm-accent/10',
    href: '/unscrambler'
  },
  {
    id: 'anagrams',
    name: 'Anagram Solver',
    description: 'Find all possible anagrams and word combinations from your scrambled letters.',
    icon: Shuffle,
    color: 'text-[#FF8C42]',
    bg: 'bg-[#FF8C42]/10',
    href: '/anagram-solver'
  },
  {
    id: 'rhymes',
    name: 'Rhyme Finder',
    description: 'Find perfect and near rhymes for poetry, songwriting, and creative writing.',
    icon: Music,
    color: 'text-[#8B5CF6]',
    bg: 'bg-[#8B5CF6]/10',
    href: '/rhyme-finder'
  },
  {
    id: 'wordfinder',
    name: 'Word Finder by Letters',
    description: 'Find words using available letters with advanced filters for length, starts, ends, and more.',
    icon: Search,
    color: 'text-[#06B6D4]',
    bg: 'bg-[#06B6D4]/10',
    href: '/word-finder-by-letters'
  },
  {
    id: 'wordle',
    name: 'Wordle Solver',
    description: 'Solve today\'s Wordle with green, yellow, and gray letter clues.',
    icon: Brain,
    color: 'text-[#10B981]',
    bg: 'bg-[#10B981]/10',
    href: '/wordle-solver'
  },
  {
    id: 'crossword',
    name: 'Crossword Solver',
    description: 'Solve crossword clues by pattern — use ? or _ for unknown letters.',
    icon: Grid,
    color: 'text-[#EC4899]',
    bg: 'bg-[#EC4899]/10',
    href: '/crossword-solver'
  }
];

const OTHER_TOOLS = [
  {
    toolName: 'Idea Generator',
    icon: Lightbulb,
    description: 'Generate random writing prompts, story starters, character ideas, and plot twists.',
    category: 'Writing Tools',
    demoContent: { input: 'Story Starter', output: 'A detective who talks to pets.' },
    href: '/idea-generator'
  },
  {
    toolName: 'Anagram Solver',
    icon: Shuffle,
    description: 'Find all possible anagrams and word combinations from scrambled letters.',
    category: 'Word Games',
    demoContent: { input: 'aet', output: 'eat, tea, ate' },
    href: '/anagram-solver'
  },
  {
    toolName: 'Rhyme Finder',
    icon: Music,
    description: 'Find perfect and near rhymes for poetry, songwriting, and creative writing.',
    category: 'Writing Tools',
    demoContent: { input: 'cat', output: 'bat, hat, mat, rat' },
    href: '/rhyme-finder'
  },
  {
    toolName: 'Word Generator',
    icon: Sparkles,
    description: 'Generate random words by length and filter by starting letter.',
    category: 'Writing Tools',
    demoContent: { input: '5 letters', output: 'house, plant, music' },
    href: '/word-generator'
  }
];

function HomePage() {
  const navigate = useNavigate();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Scramblioapp",
    "url": "https://scramblioapp.com",
    "description": "Free word tools including word counter, word generator, anagrams, rhymes, unscrambler, and palindrome checker.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "url": "https://scramblioapp.com/contact"
    }
  };

  const handleToolNavigation = (href) => {
    navigate(href);
  };

  return (
    <div className="flex flex-col bg-background">
      <Helmet>
        <title>Free Word Tools - Counter, Generator, Anagrams & More</title>
        <meta 
          name="description" 
          content="Free word tools including word counter, word generator, anagrams, rhymes, unscrambler, and palindrome checker" 
        />
        <link rel="canonical" href="https://scramblioapp.com/" />
        <meta property="og:title" content="Free Word Tools - Counter, Generator, Anagrams & More" />
        <meta property="og:description" content="Free word tools including word counter, word generator, anagrams, rhymes, unscrambler, and palindrome checker" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scramblioapp.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Word Tools - Counter, Generator, Anagrams & More" />
        <meta name="twitter:description" content="Free word tools including word counter, word generator, anagrams, rhymes, unscrambler, and palindrome checker" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="pb-6">
        {/* Hero Section */}
        <section className="relative bg-hero pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none" />
          
          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide mb-6 border border-primary/20">
                100% Free Utilities
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-8" style={{ letterSpacing: '-0.02em' }}>
                Free Word Tools for Writers, Students & Puzzle Lovers
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10 font-medium">
                Everything you need to master words in one place. Unscramble letters, find perfect anagrams, discover rhymes, check palindromes, count words, and generate new ideas instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="#tools"
                  className="inline-flex items-center justify-center h-14 px-8 text-lg font-bold rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
                >
                  Explore Tools
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <Link 
                  to="/unscrambler"
                  className="inline-flex items-center justify-center h-14 px-8 text-lg font-bold rounded-2xl bg-white text-foreground border-2 border-border shadow-sm hover:bg-muted hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto"
                >
                  Try Unscrambler
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tools Grid Section */}
        <section id="tools" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              Our Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Select a tool below to get started. All our utilities are free to use, fast, and run directly in your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TOOLS.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    to={tool.href}
                    className="group flex flex-col h-full bg-tool-card hover:bg-tool-card-hover rounded-3xl p-8 border border-border shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${tool.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${tool.color}`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                      {tool.description}
                    </p>
                    
                    <div className="mt-auto flex items-center text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      Try Now
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Why Choose ScramblioApp */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 border-y border-border/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
                Why Choose ScramblioApp
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                We built a comprehensive suite of word utilities designed to be fast, accurate, and completely free.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  Instant Results
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our tools run highly optimized algorithms directly in your browser. Whether you are unscrambling 15 letters or counting 10,000 words, you get your results in milliseconds without waiting for page reloads.
                </p>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  No Hidden Fees
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every tool on ScramblioApp is 100% free to use. There are no premium tiers, no daily limits, and no required sign-ups. Just open the tool and start working immediately.
                </p>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  Privacy First
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your data stays yours. When you use our Word Counter or Palindrome Checker, your text is processed locally on your device. We do not store or transmit your private documents.
                </p>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  Mobile Friendly
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Need to solve an anagram on the go? Our entire platform is fully responsive, ensuring a seamless experience whether you are on a desktop, tablet, or smartphone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How Our Tools Work */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              How Our Tools Work
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Our utilities are categorized to help you find exactly what you need, when you need it.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-start bg-white/50 p-6 rounded-3xl border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Type className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Word Games & Puzzles</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Tools like the <strong>Word Unscrambler</strong> and <strong>Anagram Solver</strong> use advanced dictionary matching. You input a jumble of letters, and the algorithm instantly cross-references them against a massive database to return valid words sorted by length.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start bg-white/50 p-6 rounded-3xl border border-border">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Writing & Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The <strong>Word Counter</strong> and <strong>Rhyme Finder</strong> are designed for content creators. The counter uses regex to accurately split and tally your text, while the rhyme finder connects to phonetic databases to match syllable sounds perfectly.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start bg-white/50 p-6 rounded-3xl border border-border">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Creative Inspiration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Stuck on a blank page? The <strong>Word Generator</strong> and <strong>Idea Generator</strong> use randomized algorithms to pull unique concepts and vocabulary from curated lists, helping you break through writer's block instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Use Cases */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 border-y border-border/50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
                Popular Use Cases
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                See how different people use ScramblioApp to improve their daily tasks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Students & Teachers</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Checking essay word counts</li>
                  <li>• Creating spelling worksheets</li>
                  <li>• Learning new vocabulary</li>
                  <li>• Understanding phonetic rhymes</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
                <FileText className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Writers & Creators</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Overcoming writer's block</li>
                  <li>• Finding perfect song lyrics</li>
                  <li>• Meeting SEO length requirements</li>
                  <li>• Brainstorming character names</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
                <Shuffle className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Gamers & Puzzlers</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Solving daily anagrams</li>
                  <li>• Finding high-scoring Scrabble words</li>
                  <li>• Getting unstuck in Wordle</li>
                  <li>• Cracking cryptic crosswords</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tools Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              Featured Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Check out some of our most popular utilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OTHER_TOOLS.map((tool, index) => (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ToolCard
                  toolName={tool.toolName}
                  icon={tool.icon}
                  description={tool.description}
                  category={tool.category}
                  demoContent={tool.demoContent}
                  onTryNow={() => handleToolNavigation(tool.href)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="pt-16 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t border-border/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                Got questions? We have answers.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  Are these tools really free to use?
                </h3>
                <p className="text-muted-foreground pl-8">
                  Yes! Every tool on ScramblioApp is completely free. We do not require subscriptions, and there are no hidden paywalls or usage limits.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  Do I need to create an account?
                </h3>
                <p className="text-muted-foreground pl-8">
                  No account is necessary. You can access and use all our utilities instantly as a guest.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  Is my text data saved when I use the Word Counter?
                </h3>
                <p className="text-muted-foreground pl-8">
                  No. Your privacy is our priority. All text analysis happens locally in your browser, meaning your documents are never uploaded to our servers.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  What dictionary do the word games use?
                </h3>
                <p className="text-muted-foreground pl-8">
                  Our unscrambler and anagram tools use a comprehensive standard English dictionary that closely aligns with official tournament word lists.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  Can I use this on my mobile phone?
                </h3>
                <p className="text-muted-foreground pl-8">
                  Absolutely. The entire website is optimized for mobile devices, so you can solve puzzles or count words easily on the go.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section seamlessly connects to the footer below */}
        <div className="bg-muted/30">
          <ContactSection />
        </div>
      </main>
    </div>
  );
}

export default HomePage;