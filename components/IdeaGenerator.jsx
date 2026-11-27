import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  Copy, 
  RefreshCw, 
  Sparkles, 
  HelpCircle, 
  MousePointerClick, 
  Users, 
  ChevronRight,
  BookOpen,
  User,
  Map,
  Shuffle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const IDEAS_DATABASE = [
  { id: 1, category: 'Story Starters', text: 'A detective who can only solve crimes by talking to the victims\' pets.' },
  { id: 2, category: 'Story Starters', text: 'You wake up one morning to find that everyone in the world has forgotten how to lie, except you.' },
  { id: 3, category: 'Story Starters', text: 'A time traveler keeps going back to save their best friend, but every attempt makes the future worse.' },
  { id: 4, category: 'Story Starters', text: 'The villain kidnaps the hero, not to torture them, but to ask for relationship advice.' },
  { id: 5, category: 'Story Starters', text: 'A barista realizes their coffee art is predicting the immediate future of their customers.' },
  
  { id: 6, category: 'Character Ideas', text: 'An immortal who is terrified of snails and has spent 3,000 years avoiding them.' },
  { id: 7, category: 'Character Ideas', text: 'A highly competent assassin who is constantly thwarted by their own extreme clumsiness.' },
  { id: 8, category: 'Character Ideas', text: 'A ghost who haunts a library just to aggressively shush people who talk too loudly.' },
  { id: 9, category: 'Character Ideas', text: 'A superhero whose only power is making people feel mildly uncomfortable.' },
  { id: 10, category: 'Character Ideas', text: 'A dragon who hoards rare first-edition books instead of gold and gets very defensive about spine creases.' },
  
  { id: 11, category: 'Plot Twists', text: 'The chosen one was actually the villain\'s decoy all along.' },
  { id: 12, category: 'Plot Twists', text: 'The magical artifact they spent the whole journey seeking is just a regular rock with a good PR team.' },
  { id: 13, category: 'Plot Twists', text: 'The narrator of the story is actually the murder weapon.' },
  { id: 14, category: 'Plot Twists', text: 'The post-apocalyptic wasteland is actually just a highly immersive theme park that went bankrupt.' },
  { id: 15, category: 'Plot Twists', text: 'The alien invasion was actually an interstellar eviction notice for unpaid cosmic rent.' },
  
  { id: 16, category: 'Worldbuilding', text: 'A city built on the back of a sleeping giant turtle that wakes up every 100 years to migrate.' },
  { id: 17, category: 'Worldbuilding', text: 'A society where currency is based on memories; you pay for goods by forgetting a piece of your past.' },
  { id: 18, category: 'Worldbuilding', text: 'A world where shadows are sentient and occasionally detach to run errands for their owners.' },
  { id: 19, category: 'Worldbuilding', text: 'An ocean made entirely of liquid glass, navigated by ships carved from giant diamonds.' },
  { id: 20, category: 'Worldbuilding', text: 'A realm where the weather is controlled by a massive, complex clockwork machine that is slowly breaking down.' }
];

const CATEGORIES = ['All', 'Story Starters', 'Character Ideas', 'Plot Twists', 'Worldbuilding'];

const CATEGORY_ICONS = {
  'All': <Shuffle className="w-4 h-4" />,
  'Story Starters': <BookOpen className="w-4 h-4" />,
  'Character Ideas': <User className="w-4 h-4" />,
  'Plot Twists': <RefreshCw className="w-4 h-4" />,
  'Worldbuilding': <Map className="w-4 h-4" />
};

function IdeaGenerator() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIdea, setCurrentIdea] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGenerate = useCallback(() => {
    setIsGenerating(true);
    setHasGenerated(true);

    setTimeout(() => {
      const filteredIdeas = selectedCategory === 'All' 
        ? IDEAS_DATABASE 
        : IDEAS_DATABASE.filter(idea => idea.category === selectedCategory);
      
      // Ensure we don't pick the exact same idea twice in a row if possible
      let availableIdeas = filteredIdeas;
      if (currentIdea && filteredIdeas.length > 1) {
        availableIdeas = filteredIdeas.filter(idea => idea.id !== currentIdea.id);
      }

      const randomIndex = Math.floor(Math.random() * availableIdeas.length);
      setCurrentIdea(availableIdeas[randomIndex]);
      setIsGenerating(false);
    }, 500);
  }, [selectedCategory, currentIdea]);

  const handleCopy = () => {
    if (currentIdea) {
      navigator.clipboard.writeText(currentIdea.text)
        .then(() => toast.success('Idea copied to clipboard!'))
        .catch(() => toast.error('Failed to copy idea.'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Helmet>
        <title>Free Idea Generator - Writing Prompts & Creative Concepts</title>
        <meta name="description" content="Generate random writing prompts, story starters, character ideas, and plot twists instantly to overcome writer's block." />
        <meta property="og:title" content="Free Idea Generator - Writing Prompts & Creative Concepts" />
        <meta property="og:description" content="Generate random writing prompts, story starters, character ideas, and plot twists instantly to overcome writer's block." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scramblio.com/#idea-generator" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free Idea Generator - Writing Prompts & Creative Concepts" />
        <meta name="twitter:description" content="Generate random writing prompts, story starters, character ideas, and plot twists instantly to overcome writer's block." />
      </Helmet>

      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4 tracking-tight">
        Idea Generator
      </h1>

      {/* Control Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-3xl mx-auto mb-12 bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] shadow-sm border border-white/60"
      >
        <div className="flex flex-col gap-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium text-center max-w-xl mx-auto"
          >
            Overcome writer's block instantly. Generate random story starters, character concepts, plot twists, and worldbuilding ideas.
          </motion.p>
          
          <div className="space-y-4">
            <label className="block text-secondary font-extrabold text-sm sm:text-base uppercase tracking-wide text-center">
              Select Category
            </label>
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-md scale-105'
                      : 'bg-white/80 text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border/50'
                  }`}
                >
                  {CATEGORY_ICONS[category]}
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center pt-2">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="h-16 px-12 text-xl font-extrabold rounded-2xl bg-[#F59E0B] hover:bg-[#D97706] text-white shadow-xl shadow-[#F59E0B]/30 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] w-full sm:w-auto border border-[#F59E0B]/20 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <Lightbulb className={`w-6 h-6 mr-3 ${isGenerating ? 'animate-pulse text-yellow-200' : ''}`} />
              {isGenerating ? 'Brainstorming...' : (hasGenerated ? 'Generate Another' : 'Generate Idea')}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto mt-8 min-h-[300px]">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white/80 backdrop-blur-xl p-10 rounded-[2rem] shadow-lg border border-white/50 flex flex-col items-center justify-center min-h-[250px]"
            >
              <Skeleton className="h-8 w-32 rounded-full bg-[#F59E0B]/20 mb-6" />
              <Skeleton className="h-12 w-full max-w-2xl rounded-xl bg-secondary/10 mb-4" />
              <Skeleton className="h-12 w-3/4 max-w-xl rounded-xl bg-secondary/10" />
            </motion.div>
          ) : currentIdea ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
              className="bg-white/90 backdrop-blur-xl p-8 sm:p-12 rounded-[2rem] shadow-xl border border-white relative overflow-hidden group"
            >
              {/* Decorative background element */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F59E0B]/10 text-[#D97706] font-bold text-sm mb-8 border border-[#F59E0B]/20">
                  {CATEGORY_ICONS[currentIdea.category]}
                  {currentIdea.category}
                </div>
                
                <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-secondary leading-tight mb-10 text-balance">
                  "{currentIdea.text}"
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    className="h-14 px-8 text-lg font-bold rounded-2xl border-2 border-secondary/20 text-secondary hover:bg-secondary hover:text-white transition-all duration-300 shadow-sm bg-white/50 backdrop-blur-sm"
                  >
                    <Copy className="w-5 h-5 mr-2" />
                    Copy to Clipboard
                  </Button>
                  <Button
                    onClick={handleGenerate}
                    className="h-14 px-8 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Generate Another
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white/40 backdrop-blur-md rounded-[2rem] border-2 border-dashed border-muted-foreground/20"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/30 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground text-xl font-medium">
                Select a category and click generate to spark your next big idea.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Guide Section */}
      {!hasGenerated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Section 1 */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-secondary mb-4">What is the Idea Generator?</h2>
              <p className="text-foreground/80 leading-relaxed text-lg">
                A creative tool designed to break through writer's block by providing unique, curated prompts, scenarios, and concepts for your next writing project.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <MousePointerClick className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-secondary mb-4">How to Use This Tool</h2>
              <ul className="space-y-3">
                {[
                  "Select a specific category or leave it on 'All'",
                  "Click the 'Generate Idea' button",
                  "Copy your favorite prompts to save them for later"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/80 text-lg">
                    <ChevronRight className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 3 */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-2xl bg-highlight/10 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-highlight" />
              </div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Who This Tool Is For</h2>
              <p className="text-foreground/80 text-lg mb-4">This tool is ideal for:</p>
              <ul className="space-y-3">
                {[
                  "Novelists and short story writers",
                  "Tabletop RPG dungeon masters",
                  "Screenwriters and playwrights"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/80 text-lg">
                    <ChevronRight className="w-5 h-5 text-highlight shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 4 */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/10 flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Tips for Better Results</h2>
              <ul className="space-y-3">
                {[
                  "Combine a character idea with a worldbuilding prompt",
                  "Use a prompt as a 10-minute freewriting exercise",
                  "Twist the generated idea to fit your existing story"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground/80 text-lg">
                    <ChevronRight className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* SEO Content Sections */}
      <div className="max-w-5xl mx-auto mt-16 space-y-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm">
          <h2 className="text-2xl font-bold text-secondary mb-4">How It Works</h2>
          <p className="text-foreground/80 leading-relaxed text-lg mb-4">
            Our idea generator uses a randomized selection algorithm to pull unique concepts from a curated database. It ensures you get a fresh, unexpected prompt every time you click.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Filters ideas based on your selected category.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Uses a randomization process to prevent immediate repeats.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Presents the idea instantly with a clean, readable interface.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm">
          <h2 className="text-2xl font-bold text-secondary mb-4">Common Use Cases</h2>
          <p className="text-foreground/80 leading-relaxed text-lg mb-4">
            An idea generator is a versatile tool for anyone involved in creative work. It helps kickstart projects when you are staring at a blank page.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>Brainstorming sessions for creative writing and novels.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>Developing unique campaigns for content creation.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>Generating scenarios for tabletop RPGs and game development.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm">
          <h2 className="text-2xl font-bold text-secondary mb-4">Why People Use This Tool</h2>
          <p className="text-foreground/80 leading-relaxed text-lg mb-4">
            Writer's block can halt productivity for days. This tool provides an instant spark of inspiration to get your creative gears turning again.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-highlight shrink-0 mt-0.5" />
              <span>Overcomes writer's block quickly and effectively.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-highlight shrink-0 mt-0.5" />
              <span>Saves time during the initial brainstorming phase.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-highlight shrink-0 mt-0.5" />
              <span>Provides unexpected angles you might not have considered.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm">
          <h2 className="text-2xl font-bold text-secondary mb-4">FAQ Section</h2>
          <p className="text-foreground/80 leading-relaxed text-lg mb-4">
            Common questions about our idea generator tool.
          </p>
          <ul className="space-y-4">
            <li className="text-foreground/80 text-lg">
              <strong className="text-foreground block mb-1">Can I customize idea categories?</strong>
              You can filter by predefined categories like Story Starters, Character Ideas, and Plot Twists.
            </li>
            <li className="text-foreground/80 text-lg">
              <strong className="text-foreground block mb-1">How random are the ideas?</strong>
              The tool uses a true random number generator to select from our database, ensuring varied results.
            </li>
            <li className="text-foreground/80 text-lg">
              <strong className="text-foreground block mb-1">Can I save favorite ideas?</strong>
              You can easily copy any generated idea to your clipboard to save it in your own notes.
            </li>
            <li className="text-foreground/80 text-lg">
              <strong className="text-foreground block mb-1">Does it work offline?</strong>
              Once the page is loaded, the generator works entirely in your browser without needing an active connection.
            </li>
          </ul>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm">
          <h2 className="text-2xl font-bold text-secondary mb-4">Examples Section</h2>
          <p className="text-foreground/80 leading-relaxed text-lg mb-4">
            Here are a few examples of the types of prompts you might generate.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-warm-accent shrink-0 mt-0.5" />
              <span><strong>Story Starter:</strong> "A detective who can only solve crimes by talking to the victims' pets."</span>
            </li>
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-warm-accent shrink-0 mt-0.5" />
              <span><strong>Character Idea:</strong> "An immortal who is terrified of snails and has spent 3,000 years avoiding them."</span>
            </li>
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-warm-accent shrink-0 mt-0.5" />
              <span><strong>Plot Twist:</strong> "The chosen one was actually the villain's decoy all along."</span>
            </li>
          </ul>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm">
          <h2 className="text-2xl font-bold text-secondary mb-4">Related Tools</h2>
          <p className="text-foreground/80 leading-relaxed text-lg mb-4">
            Explore our other free creative utilities.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><Link to="/unscrambler" className="text-primary hover:underline font-medium">Word Unscrambler</Link>: Quickly find words from scrambled letters.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><Link to="/anagram-solver" className="text-primary hover:underline font-medium">Anagram Solver</Link>: Find exact anagrams for your words.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground/80 text-lg">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><Link to="/rhyme-finder" className="text-primary hover:underline font-medium">Rhyme Finder</Link>: Discover perfect rhymes for poetry and lyrics.</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default IdeaGenerator;