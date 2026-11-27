import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, BookOpen, History, Lightbulb, Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import Footer from '@/components/Footer.jsx';

function AnagramGuidePage() {
  const sections = [
    {
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      title: "What is an Anagram?",
      content: "An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once. Beyond being a delightful form of wordplay, anagrams challenge our pattern recognition skills and expand our vocabulary."
    },
    {
      icon: <History className="w-6 h-6 text-primary" />,
      title: "A Brief History",
      content: "The art of the anagram dates back to ancient Greece, often attributed to the poet Lycophron in the 3rd century BCE. During the Renaissance, scientists like Galileo and Huygens used anagrams to securely claim new discoveries before they were ready to formally publish, effectively date-stamping their intellectual property while keeping the details secret from rivals."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-primary" />,
      title: "Famous Examples",
      content: "Some of the best anagrams reveal a hidden, ironic, or poetic connection to the original word—these are sometimes called 'aptagrams'. For instance, 'Listen' perfectly scrambles into 'Silent'. 'Astronomer' transforms into 'Moon starer'. And the ever-classic 'Dormitory' shifts seamlessly into 'Dirty room'."
    },
    {
      icon: <Puzzle className="w-6 h-6 text-primary" />,
      title: "Strategies for Solving",
      content: "Staring at a jumbled string of letters can be frustrating. To break the gridlock, try physically separating the vowels from the consonants. Next, look for common natural pairings like 'CH', 'ST', 'TH', or 'QU'. Isolate potential prefixes ('RE-', 'UN-') and suffixes ('-ING', '-TION'). If you're still stuck, write the letters in a circle instead of a straight line—this breaks your brain's linear reading habit and makes new patterns jump out."
    }
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>{`Ultimate Guide to Anagrams: History, Examples, & Strategies | Scramblio`}</title>
        <meta name="description" content="Learn everything you need to know about anagrams. Discover famous examples, historical uses, and top strategies for solving tricky word puzzles." />
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
              <li className="text-foreground font-medium" aria-current="page">Anagram Guide</li>
            </ol>
          </nav>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight text-balance">
              The Ultimate Guide to Anagrams
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[65ch]">
              From ancient Greek poets to secretive Renaissance astronomers, anagrams have fascinated humans for centuries. Master the art of the scramble with our definitive guide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto w-full">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <motion.article 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[65ch]">
                    {section.content}
                  </p>
                </div>
              </motion.article>
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
              Ready to test your skills?
            </h2>
            <p className="text-lg md:text-xl text-secondary-foreground/80 mb-10 max-w-2xl mx-auto">
              Whether you're playing Scrabble, solving a crossword, or just love word puzzles, our free Anagram Solver will help you discover every possible word hidden in your letters.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="h-14 px-8 text-lg font-bold rounded-xl shadow-lg hover:-translate-y-1 transition-all"
            >
              <Link to="/anagram-solver">
                Try the Anagram Solver <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AnagramGuidePage;