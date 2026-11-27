import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowRight, 
  Grid2X2,
  LayoutGrid,
  Users,
  Dices,
  Banana,
  Ghost,
  Hexagon,
  Trophy,
  Target,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import Footer from '@/components/Footer.jsx';

function WordGamesPage() {
  const wordGames = [
    {
      icon: <Grid2X2 className="w-6 h-6 text-primary" />,
      title: "Scrabble",
      content: "The undisputed king of word games. Players use letter tiles to build interlocking words on a game board, strategically aiming for double and triple letter or word score squares. It demands a mix of vocabulary breadth and spatial strategy."
    },
    {
      icon: <LayoutGrid className="w-6 h-6 text-primary" />,
      title: "Wordle",
      content: "The modern daily phenomenon. Players have six attempts to guess a hidden five-letter word, receiving color-coded feedback (green for correct position, yellow for right letter in wrong position). It perfectly balances deduction and vocabulary."
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Words With Friends",
      content: "The mobile-first, social spin on the classic crossword game format. Designed for asynchronous play, it allows you to maintain dozens of games simultaneously with friends or strangers across the globe."
    },
    {
      icon: <Dices className="w-6 h-6 text-primary" />,
      title: "Boggle",
      content: "A fast-paced, adrenaline-pumping game where a 4x4 grid of letter dice is shaken, and players have three minutes to find as many connected words as possible. Perfect for quick thinkers and pattern recognizers."
    },
    {
      icon: <Banana className="w-6 h-6 text-primary" />,
      title: "Bananagrams",
      content: "A high-speed, no-turn anagram game. Players race against each other to build their own independent crossword grids using letter tiles. It's frantic, portable, and heavily relies on your ability to quickly unscramble letters."
    },
    {
      icon: <Ghost className="w-6 h-6 text-primary" />,
      title: "Codenames",
      content: "A brilliant team-based party game of word association. A 'spymaster' gives single-word clues that point to multiple words on a grid, challenging players to think abstractly about how different words relate to one another."
    },
    {
      icon: <Hexagon className="w-6 h-6 text-primary" />,
      title: "Spelling Bee",
      content: "The popular New York Times puzzle where players must create words using a set of 7 letters arranged in a honeycomb. Every word must include the center letter, making it a masterclass in prefix, suffix, and root word manipulation."
    }
  ];

  const tips = [
    {
      icon: <BookOpen className="w-5 h-5 text-primary" />,
      title: "Memorize the Two-Letter Words",
      description: "In games like Scrabble and Words With Friends, knowing words like QI, ZA, XI, and JO is the difference between an amateur and a pro. They allow you to play parallel to existing words for massive points."
    },
    {
      icon: <Target className="w-5 h-5 text-primary" />,
      title: "Master Prefixes and Suffixes",
      description: "Look for common endings (-ING, -ED, -TION) and beginnings (RE-, UN-, PRE-). Plucking these out of your available letters immediately makes finding the root word much easier."
    },
    {
      icon: <Trophy className="w-5 h-5 text-primary" />,
      title: "Practice Anagramming Daily",
      description: "The core mechanic of almost every word game is anagramming—rearranging letters to find words. Spend a few minutes daily unscrambling random letter sets to train your brain's pattern recognition."
    }
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>{`The Ultimate Guide to Popular Word Games | Scramblio`}</title>
        <meta name="description" content="Discover the best word games including Scrabble, Wordle, Boggle, and Bananagrams. Learn the rules, mechanics, and top strategies to improve your gameplay." />
      </Helmet>

      {/* Hero Section */}
      <section className="w-full bg-muted/30 py-16 px-4 sm:px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-4xl mx-auto w-full">
          <nav className="flex text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              </li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li>
                <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              </li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="text-foreground font-medium" aria-current="page">Word Games Guide</li>
            </ol>
          </nav>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight text-balance">
              The Ultimate Guide to Popular Word Games
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[65ch]">
              From intense tabletop board games to relaxing daily mobile puzzles, word games challenge our vocabulary, logic, and creativity. Explore the mechanics of the world's favorite word games and learn how to dominate the board.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The 7 Games Section */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-foreground mb-12">7 Essential Word Games</h2>
          
          <div className="space-y-8">
            {wordGames.map((game, index) => (
              <motion.article 
                key={game.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex flex-col sm:flex-row gap-6 items-start bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  {game.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {game.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {game.content}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="w-full bg-muted/30 py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-y border-border/50">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">How to Improve Your Gameplay</h2>
            <p className="text-lg text-muted-foreground">Universal strategies that will make you a formidable opponent in almost any word game.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tips.map((tip, index) => (
              <motion.div 
                key={tip.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border p-6 rounded-2xl shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tip.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-secondary py-20 md:py-24 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary-foreground mb-6 tracking-tight">
              Ready to up your game?
            </h2>
            <p className="text-lg md:text-xl text-secondary-foreground/80 mb-10 max-w-2xl mx-auto">
              Whether you need to find the perfect word for your remaining tiles, or you're just looking to practice your anagramming skills, our suite of word tools has you covered.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="h-14 px-8 text-lg font-bold rounded-xl shadow-lg hover:-translate-y-1 transition-all"
            >
              <Link to="/tools">
                Explore Word Tools <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default WordGamesPage;