import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowRight, 
  CalendarDays, 
  BookOpen, 
  PencilLine, 
  Repeat, 
  Library,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import Footer from '@/components/Footer.jsx';

function VocabularyTipsPage() {
  const weeklyPlan = [
    {
      icon: <CalendarDays className="w-6 h-6 text-primary" />,
      week: "Week 1",
      title: "Assess and Learn Core Roots",
      content: "Begin by learning common Latin and Greek roots, prefixes, and suffixes. Understanding that 'bene' means good or 'dict' means speak allows you to decode words like 'benediction' without ever looking them up in a dictionary."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      week: "Week 2",
      title: "Contextual Reading",
      content: "Shift your focus to reading slightly above your current comfort level. Whether it's literary fiction, long-form journalism, or academic articles, seeing new words in their natural habitat helps you grasp nuance and proper usage far better than flashcards alone."
    },
    {
      icon: <PencilLine className="w-6 h-6 text-primary" />,
      week: "Week 3",
      title: "Active Usage and Writing",
      content: "A word isn't truly yours until you use it. Challenge yourself to use 3-5 new words in your daily conversations, emails, or journal entries. The act of retrieving and applying the word solidifies neural pathways."
    },
    {
      icon: <Repeat className="w-6 h-6 text-primary" />,
      week: "Week 4",
      title: "Spaced Repetition and Review",
      content: "Use the final week to review everything you've learned. Utilize spaced repetition systems (SRS) to test your memory right before you're likely to forget. This cements the vocabulary into your long-term memory."
    }
  ];

  const resources = [
    {
      title: "Merriam-Webster's Word of the Day",
      description: "A fantastic, low-effort daily habit to introduce yourself to interesting vocabulary and etymology."
    },
    {
      title: "Anki or Quizlet",
      description: "Digital flashcard apps that utilize spaced repetition algorithms to ensure you remember what you learn."
    },
    {
      title: "Project Gutenberg",
      description: "Access thousands of free classic books. Older literature is incredibly rich in diverse vocabulary."
    }
  ];

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Helmet>
        <title>{`How to Improve Your Vocabulary in 30 Days | Scramblio`}</title>
        <meta name="description" content="A comprehensive 30-day guide to improving your vocabulary. Learn weekly strategies, root words, active usage techniques, and discover the best resources." />
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
              <li className="text-foreground font-medium" aria-current="page">Vocabulary Tips</li>
            </ol>
          </nav>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 tracking-tight text-balance">
              How to Improve Your Vocabulary in 30 Days
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[65ch]">
              Building a powerful vocabulary isn't about memorizing thick dictionaries—it's about strategic learning, contextual understanding, and active practice. Here is your definitive four-week blueprint.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Weekly Breakdown */}
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto w-full">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Your 4-Week Blueprint</h2>
            <p className="text-muted-foreground text-lg">Follow this structured approach to permanently upgrade your lexicon.</p>
          </div>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {weeklyPlan.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-primary/10 text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {step.icon}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-card p-6 rounded-2xl shadow-sm border border-border/50">
                  <div className="text-sm font-bold tracking-widest text-primary uppercase mb-2">
                    {step.week}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Resources */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 border-y border-border/50">
        <div className="max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-8">
            <Library className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Recommended Resources</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {resources.map((resource, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-background border border-border shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {resource.description}
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
              Expand your word knowledge today
            </h2>
            <p className="text-lg md:text-xl text-secondary-foreground/80 mb-10 max-w-2xl mx-auto">
              Ready to discover new words from the letters you already know? Jumpstart your vocabulary practice with our powerful Word Unscrambler tool.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="h-14 px-8 text-lg font-bold rounded-xl shadow-lg hover:-translate-y-1 transition-all"
            >
              <Link to="/unscrambler">
                Use the Word Unscrambler <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default VocabularyTipsPage;