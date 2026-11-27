import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Book, 
  Layers, 
  Target, 
  Settings, 
  Shield,
  Dumbbell,
  Lightbulb
} from 'lucide-react';

function ScrabbleTipsPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>{`How to Win at Scrabble: A Strategy Guide from Beginner to Intermediate | Scramblio Tools`}</title>
        <meta name="description" content="Master Scrabble with our advanced strategy guide. Learn vocabulary building, board control, rack management, and defensive plays." />
        <link rel="canonical" href="https://scramblioapp.com/blog/how-to-win-at-scrabble" />
      </Helmet>

      {/* Hero Section */}
      <section className="w-full bg-muted/30 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-3xl mx-auto w-full">
          <nav className="flex text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              </li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li>
                <Link to="/tools" className="hover:text-foreground transition-colors">Blog</Link>
              </li>
              <li><ChevronRight className="w-4 h-4" /></li>
              <li className="text-foreground font-medium" aria-current="page">Scrabble Strategy</li>
            </ol>
          </nav>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold tracking-wide">
                Strategy Guide
              </span>
              <span className="text-sm text-muted-foreground font-medium">12 min read</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight text-balance">
              How to Win at Scrabble: A Strategy Guide from Beginner to Intermediate
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article>
          <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground mb-12">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-muted-foreground leading-relaxed mb-12"
              >
                Whether you're playing a casual game with family or looking to climb the competitive rankings, Scrabble success comes down to strategy, not luck. If you've been frustrated losing games or plateauing at the same score, it's usually because you're missing a few core principles that separate average players from winning ones.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-muted-foreground leading-relaxed"
              >
                In this guide, I'll walk you through five strategies that actually work—with real examples you can practice today.
              </motion.p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl flex items-center gap-3 text-foreground font-bold tracking-tight mb-8">
                <Book className="w-7 h-7 text-blue-600 shrink-0" strokeWidth={2.5} />
                Master Two-Letter Words: Your Hidden Scoring Weapon
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                Here's a truth about Scrabble: <strong>the players who win aren't the ones with the biggest vocabulary. They're the ones who know the two-letter words.</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                Two-letter words are the backbone of high-level Scrabble play. Why? Because they let you do something called "parallel play"—placing a word alongside an existing word so that every tile you play forms a valid word perpendicular to it.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>Here's what that looks like:</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                Imagine your opponent plays CAT on the board. You have the letters: Q, I, R, E, S, T, N.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                If you play QI (the Chinese concept of life force) <em>next to</em> the A in CAT, you've now formed two words: QI <em>and</em> CA (which is valid in Scrabble). That's 11 points for QI + points for CA, when you might have only gotten 5 points playing those letters elsewhere.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                But QI alone isn't the win. <strong>The real power is this</strong>: once you know the 100+ legal two-letter words in the official Scrabble dictionary, you can parallel play almost <em>anywhere</em> on the board. That means more board control, higher scores, and flexibility when your rack is awkward.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>Common two-letter words beginners miss:</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 ml-6"
              >
                • QI, QAT, QUA (Q words that don't need U)<br/>
                • ZA, ZO, ZEE (Z words)<br/>
                • XI, XU (X words)<br/>
                • JO, JOE, JEW (J words)<br/>
                • AA, AE, AI (uncommon A words)<br/>
                • OE, OI, OU (O words)
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800"
              >
                <strong>Practice step:</strong> Spend 10 minutes a day memorizing these. Write them on flashcards. Know them cold. This single skill will boost your average score by 20-30 points per game.
              </motion.p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl flex items-center gap-3 text-foreground font-bold tracking-tight mb-8">
                <Layers className="w-7 h-7 text-purple-600 shrink-0" strokeWidth={2.5} />
                Look for Prefixes and Suffixes: Turn Seven Tiles Into 60 Points
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                When you draw seven new tiles and your rack looks like: B, E, S, T, I, N, G—you might see random letters. But an intermediate player sees a pattern: <strong>a suffix waiting to happen.</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                Here's why this matters: instead of playing three separate short words, you can build one longer word that uses multiple tiles at once. That's how you rack up points fast.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>Here's the strategy:</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                Before trying to invent entirely new words, <strong>scan your rack for common word patterns:</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 ml-6"
              >
                • <strong>Prefixes:</strong> UN-, RE-, IN-, DIS-, PRE-<br/>
                • <strong>Suffixes:</strong> -ING, -ED, -S, -ER, -EST, -TION, -LY<br/>
                • <strong>Common cores:</strong> TION, ABLE, MENT
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                Once you spot a pattern, pull those letters to one side of your rack. Now look at the remaining letters—what word can you build around them?
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>Real example:</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                You have: T, R, A, I, N, E, D
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                You see: <strong>TRAINED</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                Trained uses all 7 tiles (a "bingo" in Scrabble), which gives you a <strong>50-point bonus</strong>. The word itself might be worth 30-40 points, but add the bonus and you're at 80-90 points in a single move.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>Why this works:</strong> Longer words = higher base score + potential bingo bonus (if all 7 tiles). Plus, the more tiles you use, the fewer weaknesses you leave on the board for your opponent.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800"
              >
                <strong>Practice step:</strong> When you play casually, consciously look for 6-7 letter words using prefixes and suffixes. You don't have to find them every turn, but when you do, you'll dominate that round.
              </motion.p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl flex items-center gap-3 text-foreground font-bold tracking-tight mb-8">
                <Target className="w-7 h-7 text-orange-600 shrink-0" strokeWidth={2.5} />
                Target Premium Squares Strategically (Not Recklessly)
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                Every Scrabble board has colored squares that multiply your points: <strong>double letter (light blue), triple letter (dark blue), double word (pink), triple word (red)</strong>.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                Most beginners see a triple word score and immediately try to place a word there. <strong>That's not strategy—that's luck.</strong> Real strategy is about <em>which</em> premium squares you target and <em>when</em>.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>Here's the difference:</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-lg text-muted-foreground leading-relaxed mb-4 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800"
              >
                <strong>Beginners:</strong> "I have a high-value word; I'll put it on a triple word score."
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800"
              >
                <strong>Intermediate players:</strong> "I'm looking three turns ahead. If I take this double letter now, my opponent won't reach the triple word score in the corner. And I'm setting up <em>my</em> triple word play for next turn."
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>How to play premium squares intelligently:</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 ml-6"
              >
                1. <strong>Scan the entire board.</strong> Which premium squares are still open? Which are near high-value tiles (Q, Z, X)?<br/><br/>
                2. <strong>Think about board blocking.</strong> If your opponent has a high-scoring word ready and you can't beat it, can you <em>block</em> their access to the best premium squares?<br/><br/>
                3. <strong>Plan ahead.</strong> A smaller score now that sets you up for a massive score next turn often beats taking a big score and leaving the board wide open for your opponent.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>Real scenario:</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                The triple word score in the top-left corner is still open. You have:
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 ml-6"
              >
                • <strong>Option A:</strong> Play a 25-point word on it for 75 points total.<br/>
                • <strong>Option B:</strong> Play a 15-point word on a double letter (30 points), and strategically block your opponent from reaching the triple word score next turn.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                Often, Option B is smarter because you've denied your opponent 60+ points <em>and</em> kept the board balanced.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800"
              >
                <strong>Practice step:</strong> Play a few games where you focus <em>only</em> on board control, not on maximizing your score. You'll lose some games. But you'll learn how premium squares shape the flow of the match.
              </motion.p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl flex items-center gap-3 text-foreground font-bold tracking-tight mb-8">
                <Settings className="w-7 h-7 text-green-600 shrink-0" strokeWidth={2.5} />
                Practice Rack Management: The Foundation of Everything
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                All of the above strategies fall apart if your rack is a mess. That's where rack management comes in.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>What is rack management?</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                It's the art of playing tiles in a way that leaves you with the best possible next draw. Sounds simple, but it changes everything.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>Here's why it matters:</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                Every tile you play affects what letters are left in your rack for the next turn. If you play carelessly, you might end up with five consonants and two vowels—a "terrible rack" that limits your options.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>Rack management rules:</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 ml-6"
              >
                1. <strong>Keep vowels balanced.</strong> After each play, try to have 2-3 vowels in your rack. Vowels are glue; consonants are flavor.<br/><br/>
                2. <strong>Avoid dead tiles.</strong> Q without a U, Z without a good setup, or five consonants in a row will haunt you. Sometimes it's worth playing a lower-scoring word just to clear dead tiles.<br/><br/>
                3. <strong>Play off one or two high-value tiles per turn.</strong> If you have Q, Z, and X in your rack, don't play all three in one turn (unless it's a bingo). Spread them across multiple plays so you always have a scoring opportunity.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>Real example:</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                You have: Q, U, I, R, E, S, T
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="text-lg text-muted-foreground leading-relaxed mb-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
              >
                <strong>Bad play:</strong> Use all 7 tiles for QUIETERS (50-point bonus), which leaves you with... nothing. Next turn, you draw 7 brand-new tiles. You might get an amazing rack, or a terrible one. You have zero control.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
              >
                <strong>Better play:</strong> Play QUEST (25 points), leaving U, I, R, E in your rack plus whatever you draw. Now you control your next three turns because you have vowels and common consonants ready.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800"
              >
                <strong>Practice step:</strong> Next time you play, after each move, ask yourself: "Did I make my next turn easier or harder?" You'll start naturally playing with better rack awareness.
              </motion.p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl flex items-center gap-3 text-foreground font-bold tracking-tight mb-8">
                <Shield className="w-7 h-7 text-red-600 shrink-0" strokeWidth={2.5} />
                Play Defensively When Behind (and Aggressively When Ahead)
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                This sounds obvious, but most casual players ignore it completely.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>The principle:</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                When you're losing, opening up the board and taking risks is smart. When you're winning, <em>shut down</em> the board and make it hard for your opponent to score.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>What this looks like:</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>Defensive (when ahead):</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 ml-6"
              >
                • Play shorter words that don't open premium squares.<br/>
                • Block high-value letter combinations (like QU placement).<br/>
                • Create board positions where your opponent has few good options.<br/>
                • Score 20 points safely instead of risking 50 points and giving them 70.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>Aggressive (when behind):</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 ml-6"
              >
                • Take calculated risks to land on premium squares.<br/>
                • Play longer words that open the board for your next turn.<br/>
                • Set up high-value plays for yourself, even if it helps your opponent slightly.<br/>
                • Go for bingos and big scores—playing safe when you're down isn't a strategy, it's surrender.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                <strong>Real scenario:</strong>
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                You're behind 120-95. Your opponent just scored 35 points.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg text-muted-foreground leading-relaxed mb-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
              >
                <strong>Bad move:</strong> Play defensively and score 18 points. You're now 137-113 behind, and the game is slipping away.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800"
              >
                <strong>Good move:</strong> Take a risk. Play a 40-point word on a double word score. Yes, you're opening the board—but you <em>have to</em> take big risks when you're behind. The math doesn't work otherwise.
              </motion.p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl text-foreground font-bold tracking-tight mb-8">
                Practice Drills (Do These This Week)
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6 ml-6"
              >
                1. <strong>Spend 10 minutes learning the 100 legal two-letter words.</strong> Use an online list (search "Scrabble two-letter words official list").<br/><br/>
                2. <strong>Play one casual game focusing <em>only</em> on rack management.</strong> Don't worry about winning. Just notice how your rack feels after each move.<br/><br/>
                3. <strong>Play one game focusing <em>only</em> on finding 6-7 letter words.</strong> Hunt for prefixes and suffixes. Go for bingos.<br/><br/>
                4. <strong>Analyze one game you lost.</strong> Where did your opponent beat you? Was it a two-letter word you didn't know? A premium square they controlled better? A rack management issue? Write it down.
              </motion.p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h2 className="text-3xl text-foreground font-bold tracking-tight mb-8">
                Final Thought
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed mb-6"
              >
                Scrabble isn't about having a massive vocabulary. It's about strategy, board control, and understanding the game's depth. These five principles will take you from casual player to someone who actually wins consistently.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                The best part? You can start implementing them <em>today</em>.
              </motion.p>
            </motion.section>
          </div>
        </article>
    </div>
  );
}

export default ScrabbleTipsPage;