import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Type, Shuffle, Music, ArrowLeftRight, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AppPage() {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Scramblio",
    "url": "https://scramblio.com/app",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "description": "A comprehensive suite of free word tools including unscramblers, word counters, and rhyme finders for writers and puzzle enthusiasts.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <article className="bg-background">
      <Helmet>
        <title>Scramblio: Complete Word & Writing Tools Suite</title>
        <meta name="description" content="Discover Scramblio's complete suite of powerful, free word utilities. From unscramblers and anagram solvers to word counters and rhyme finders." />
        <meta name="keywords" content="word tools, unscrambler, anagram solver, rhyme finder, word counter, writing utilities, word games" />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <header className="relative bg-muted/20 pt-24 pb-20 px-4 border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight text-balance">
              Scramblio: Your Complete Word & Writing Tools Suite
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
              Whether you are drafting your next novel, crushing an online scrabble match, or analyzing document metrics, Scramblio provides a lightning-fast, free, and unified ecosystem to manipulate and master the English language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#writing-tools" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
                Explore Writing Tools
              </a>
              <a href="#word-games" className="px-8 py-4 bg-card text-foreground font-bold rounded-xl border border-border shadow-sm hover:bg-muted transition-all duration-200">
                Word Game Utilities
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Category Navigation */}
      <nav className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-sm hidden md:block" aria-label="Page Sections">
        <ul className="flex items-center justify-center gap-8 max-w-7xl mx-auto px-4 h-14 text-sm font-bold text-muted-foreground">
          <li><a href="#writing-tools" className="hover:text-primary transition-colors">Writing Tools</a></li>
          <li><a href="#word-games" className="hover:text-primary transition-colors">Word Games</a></li>
          <li><a href="#analysis-tools" className="hover:text-primary transition-colors">Analysis Tools</a></li>
          <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
        </ul>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-16 space-y-24">
        
        {/* Section: Writing Tools */}
        <section id="writing-tools" className="scroll-mt-32">
          <div className="mb-12 text-center md:text-left">
            <span className="text-accent font-bold tracking-wider text-sm uppercase">Creative Suite</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-2 mb-4">Writing Tools</h2>
            <p className="text-lg text-muted-foreground">Overcome writer's block and enhance your vocabulary with dedicated utilities designed for authors, poets, and content creators.</p>
          </div>

          <div className="space-y-16">
            {/* Rhyme Finder */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
              <div className="bg-accent/10 w-20 h-20 rounded-2xl flex items-center justify-center">
                <Music className="w-10 h-10 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Rhyme Finder</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Finding the perfect concluding syllable shouldn't halt your creative momentum. The Scramblio Rhyme Finder cross-references extensive phonetic databases to provide exact rhymes, near rhymes, and slant rhymes instantly. It organizes results by syllable count to help you maintain meter and rhythm.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-foreground"><CheckCircle2 className="w-5 h-5 text-accent" /> Filter results by strictness and syllables</li>
                  <li className="flex items-center gap-3 text-sm text-foreground"><CheckCircle2 className="w-5 h-5 text-accent" /> Ideal for songwriting, rap verses, and poetry</li>
                </ul>
                <Link to="/#rhyme" className="inline-flex items-center font-bold text-accent hover:text-accent/80 transition-colors">
                  Start Using Rhyme Finder <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
                </Link>
              </div>
            </div>

            {/* Idea Generator */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
              <div className="bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Idea Generator</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Staring at a blank page is the hardest part of the writing process. Our Idea Generator serves as a digital muse, providing random nouns, thematic concepts, and unexpected word combinations to jumpstart your creative engine. Use it for daily writing exercises or story ideation.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-foreground"><CheckCircle2 className="w-5 h-5 text-primary" /> Customizable prompt generation parameters</li>
                  <li className="flex items-center gap-3 text-sm text-foreground"><CheckCircle2 className="w-5 h-5 text-primary" /> Overcome creative fatigue instantly</li>
                </ul>
                <Link to="/#generator" className="inline-flex items-center font-bold text-primary hover:text-primary/80 transition-colors">
                  Start Generating Ideas <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Word Games */}
        <section id="word-games" className="scroll-mt-32">
          <div className="mb-12 text-center md:text-left">
            <span className="text-secondary font-bold tracking-wider text-sm uppercase">Puzzle Solvers</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-2 mb-4">Word Games</h2>
            <p className="text-lg text-muted-foreground">Gain the competitive edge in Scrabble, Words with Friends, Wordle, and cryptic crosswords.</p>
          </div>

          <div className="space-y-16">
            {/* Unscrambler */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
              <div className="bg-secondary/10 w-20 h-20 rounded-2xl flex items-center justify-center">
                <Type className="w-10 h-10 text-secondary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Word Unscrambler</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Turn a tray of confusing tiles into a high-scoring masterstroke. The Word Unscrambler algorithm instantly digests random letter combinations and returns an exhaustive list of valid dictionary words, sorted by length and point value.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-foreground"><CheckCircle2 className="w-5 h-5 text-secondary" /> Support for blank tiles and wildcards</li>
                  <li className="flex items-center gap-3 text-sm text-foreground"><CheckCircle2 className="w-5 h-5 text-secondary" /> Filters by starting/ending letters</li>
                </ul>
                <Link to="/#unscramble" className="inline-flex items-center font-bold text-secondary hover:text-secondary/80 transition-colors">
                  Start Unscrambling <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
                </Link>
              </div>
            </div>

            {/* Anagram Finder */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
              <div className="bg-[#FF8C42]/10 w-20 h-20 rounded-2xl flex items-center justify-center">
                <Shuffle className="w-10 h-10 text-[#FF8C42]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Anagram Finder</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Discover the hidden meanings embedded in names and phrases. The Anagram Finder reorganizes existing words into entirely new, valid phrases. It's a favorite tool for puzzle constructors, cryptographers, and wordplay enthusiasts seeking clever linguistic coincidences.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-foreground"><CheckCircle2 className="w-5 h-5 text-[#FF8C42]" /> Exact match anagram calculations</li>
                  <li className="flex items-center gap-3 text-sm text-foreground"><CheckCircle2 className="w-5 h-5 text-[#FF8C42]" /> Multi-word phrase generation capabilities</li>
                </ul>
                <Link to="/#anagram" className="inline-flex items-center font-bold text-[#FF8C42] hover:opacity-80 transition-opacity">
                  Find Anagrams <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Analysis Tools */}
        <section id="analysis-tools" className="scroll-mt-32">
          <div className="mb-12 text-center md:text-left">
            <span className="text-[#8B5CF6] font-bold tracking-wider text-sm uppercase">Data Metrics</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-2 mb-4">Analysis Tools</h2>
            <p className="text-lg text-muted-foreground">Ensure your documents meet strict character limits and discover the structural properties of your text.</p>
          </div>

          <div className="space-y-16">
            {/* Word Counter */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
              <div className="bg-[#8B5CF6]/10 w-20 h-20 rounded-2xl flex items-center justify-center">
                <FileText className="w-10 h-10 text-[#8B5CF6]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Word Counter</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Never exceed a strict assignment limit or social media character cap again. The Scramblio Word Counter processes your text in real-time, providing immediate feedback on word count, character count (with and without spaces), sentence totals, and estimated reading times.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-foreground"><CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" /> Instant, client-side processing for ultimate privacy</li>
                  <li className="flex items-center gap-3 text-sm text-foreground"><CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" /> Keyword density extraction for SEO</li>
                </ul>
                <Link to="/#counter" className="inline-flex items-center font-bold text-[#8B5CF6] hover:opacity-80 transition-opacity">
                  Analyze Text Now <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
                </Link>
              </div>
            </div>

            {/* Palindrome Checker */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
              <div className="bg-foreground/5 w-20 h-20 rounded-2xl flex items-center justify-center">
                <ArrowLeftRight className="w-10 h-10 text-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Palindrome Checker</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "A man, a plan, a canal: Panama." Verify complex symmetrical sentences effortlessly. Our Palindrome Checker intelligently strips out punctuation, spaces, and formatting to determine if the core letter sequence reads identically forwards and backwards.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-foreground"><CheckCircle2 className="w-5 h-5 text-foreground" /> Ignores complex punctuation and casing automatically</li>
                  <li className="flex items-center gap-3 text-sm text-foreground"><CheckCircle2 className="w-5 h-5 text-foreground" /> Support for long-form paragraph validation</li>
                </ul>
                <Link to="/#palindrome" className="inline-flex items-center font-bold text-foreground hover:text-foreground/80 transition-colors">
                  Check Palindromes <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section: FAQ */}
        <section id="faq" className="scroll-mt-32 border-t border-border pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about using the Scramblio tool suite.</p>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-2">Are all Scramblio tools completely free?</h3>
              <p className="text-muted-foreground">Yes! Our entire suite of word utilities—including the unscrambler, word counter, and anagram finder—is 100% free to use with no hidden fees or daily limits.</p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-2">Is my data secure when using the word counter?</h3>
              <p className="text-muted-foreground">Absolutely. Our analysis tools process your text locally in your browser. We never send your documents, essays, or private writings to our servers.</p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-2">Which dictionary does the Word Unscrambler use?</h3>
              <p className="text-muted-foreground">We reference a comprehensive, standard English dictionary that aligns with official tournament word lists, making it perfect for competitive games like Scrabble and Words with Friends.</p>
            </div>
          </div>
        </section>

      </main>
    </article>
  );
}