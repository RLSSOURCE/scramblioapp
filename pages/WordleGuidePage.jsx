import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowRight, 
  Lightbulb, 
  Target, 
  Brain, 
  Zap,
  BarChart3,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import Footer from '@/components/Footer.jsx';

function WordleGuidePage() {
  const strategies = [
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Choose a Strong Starting Word",
      content: "Your opening move sets the tone for the entire game. Aim for a word with common vowels (A, E, O) and frequent consonants (R, S, T, N, L). Words like STARE, CRANE, or SLATE eliminate a large swath of possibilities in one guess. Avoid words with repeated letters on your first attempt—you want maximum information."
    },
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: "Understand the Color System",
      content: "Green means the letter is correct and in the right position. Yellow means the letter is in the word but in the wrong position. Gray means the letter is not in the word at all. Use this feedback strategically: if a letter turns yellow, you know it exists but must go elsewhere. If it's gray, eliminate it entirely from future guesses."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      title: "Leverage Letter Frequency",
      content: "English has predictable letter patterns. E, A, R, O, T, I, N appear most frequently. After your first guess, prioritize words containing these high-frequency letters in positions you haven't yet tested. This statistical approach dramatically increases your odds of landing on the solution within six attempts."
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Test Different Positions",
      content: "If you know a letter is in the word but not its position, systematically test it in different spots. For example, if R turned yellow in position 2, try it in positions 1, 3, 4, or 5 in your next guess. This methodical approach narrows down the exact placement quickly."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-primary" />,
      title: "Pattern Recognition and Common Words",
      content: "Wordle favors common English words. Think about word patterns you encounter daily. Double letters, common endings like -ED, -ER, -ING, and starting combinations like TH-, CH-, or SH- appear frequently. If you've narrowed it down to a few possibilities, choose the most common word first."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Hard Mode Strategy",
      content: "In Hard Mode, you must use all revealed letters in subsequent guesses. This constraint forces you to think creatively about placement. Rather than viewing it as limiting, use it as a guide: you're forced to test new positions for known letters, which accelerates your path to the solution."
    }
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>{`Wordle Strategy Guide: Tips, Tricks & Winning Strategies | Scramblio`}</title>
        <meta name="description" content="Master Wordle with our comprehensive strategy guide. Learn starting words, letter frequency patterns, color coding tactics, and expert tips to win consistently." />
      </Helmet>

      {/* Hero Section */}
      <section className="w-full bg-muted/30 py-16 px-4 sm:px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-3xl mx-auto w-full">
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
              <li className="text-foreground font-medium" aria-current="page">Wordle Guide</li>
            </ol>
          </nav>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight text-balance">
              Master Wordle: The Complete Strategy Guide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[65ch]">
              Wordle has captivated millions with its elegant simplicity. But beneath the surface lies a game of strategy, pattern recognition, and linguistic intuition. Learn the tactics that separate casual players from consistent winners.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto w-full">
          <div className="space-y-16">
            {strategies.map((strategy, index) => (
              <motion.article 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  {strategy.icon}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {strategy.title}
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[65ch]">
                    {strategy.content}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Tips Section */}
      <section className="w-full bg-muted/30 py-16 px-4 sm:px-6 lg:px-8 border-y border-border/50">
        <div className="max-w-3xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-foreground mb-8">Quick Pro Tips</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Avoid guessing the same letter twice in one word unless you're certain of its position",
              "Keep a mental note of letters that have turned gray—they're eliminated entirely",
              "If you're stuck, think of less common words; Wordle occasionally surprises with obscure choices",
              "The second guess is crucial—use it to test new vowels and common consonants",
              "Don't waste guesses on words you've already partially solved; push for the answer",
              "Practice recognizing word patterns; familiarity with English morphology is your secret weapon"
            ].map((tip, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="p-4 rounded-xl bg-background border border-border/50 flex items-start gap-3"
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tip}
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
              Need help finding words?
            </h2>
            <p className="text-lg md:text-xl text-secondary-foreground/80 mb-10 max-w-2xl mx-auto">
              When you're stuck on a Wordle puzzle, our Word Unscrambler tool can help you discover valid words from your available letters. Perfect for brainstorming your next strategic guess.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="h-14 px-8 text-lg font-bold rounded-xl shadow-lg hover:-translate-y-1 transition-all"
            >
              <Link to="/unscrambler">
                Try the Word Unscrambler <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default WordleGuidePage;