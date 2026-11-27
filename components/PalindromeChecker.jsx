import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowLeftRight, 
  Info, 
  HelpCircle, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { isPalindrome, cleanText, getCleanedVersion } from '@/utils/palindromeUtils.js';

export default function PalindromeChecker() {
  const [text, setText] = useState('');

  const result = useMemo(() => {
    if (!text.trim()) return null;
    const cleaned = cleanText(text);
    if (cleaned.length === 0) return null;
    
    return {
      isPal: isPalindrome(text),
      cleanedText: getCleanedVersion(text),
      charCount: text.length,
      cleanCount: cleaned.length
    };
  }, [text]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto pb-6"
    >
      <Helmet>
        <title>Palindrome Checker - Check if Words are Palindromes</title>
        <meta name="description" content="Palindrome checker - check if words and phrases are palindromes instantly. Learn what makes a palindrome and test your own words" />
        <meta property="og:title" content="Palindrome Checker - Check if Words are Palindromes" />
        <meta property="og:description" content="Palindrome checker - check if words and phrases are palindromes instantly. Learn what makes a palindrome and test your own words" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scramblio.com/#palindrome" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Palindrome Checker - Check if Words are Palindromes" />
        <meta name="twitter:description" content="Palindrome checker - check if words and phrases are palindromes instantly. Learn what makes a palindrome and test your own words" />
      </Helmet>

      <div className="text-center mb-8 max-w-4xl mx-auto">
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-primary/20">
          <ArrowLeftRight className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
          Palindrome Checker
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
          Type a word, phrase, or sentence to see if it reads the same forwards and backwards. 
          Punctuation, spaces, and capitalization are ignored.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-lg border border-white/50 mb-10 max-w-4xl mx-auto">
        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="e.g., A man, a plan, a canal: Panama"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-20 text-xl sm:text-2xl px-6 rounded-2xl border-2 border-primary/20 focus-visible:ring-primary focus-visible:border-primary shadow-inner bg-white/90 text-foreground placeholder:text-muted-foreground/50 font-medium transition-all duration-300 pr-24"
          />
          {text.length > 0 && (
            <div className="absolute top-1/2 -translate-y-1/2 right-6 text-sm font-bold text-muted-foreground bg-white px-2 py-1 rounded-md border border-muted/30">
              {text.length} chars
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result-active"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
              className={`rounded-2xl p-6 border-2 text-center shadow-sm transition-colors duration-500 ${
                result.isPal 
                  ? 'bg-green-50/80 border-green-200' 
                  : 'bg-red-50/80 border-red-100'
              }`}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", bounce: 0.5 }}
                className="flex justify-center mb-3"
              >
                {result.isPal ? (
                  <CheckCircle2 className="w-12 h-12 text-green-500 drop-shadow-sm" />
                ) : (
                  <XCircle className="w-12 h-12 text-red-400 drop-shadow-sm" />
                )}
              </motion.div>
              
              <h3 className={`text-2xl font-extrabold mb-5 tracking-tight ${
                result.isPal ? 'text-green-700' : 'text-red-600'
              }`}>
                {result.isPal ? 'Yes, it is a palindrome!' : 'Not a palindrome'}
              </h3>

              <div className="bg-white/60 rounded-xl p-5 inline-block text-left border border-white/40 shadow-sm max-w-full overflow-hidden">
                <div className="flex items-start gap-3 mb-2">
                  <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      Cleaned Text Preview
                    </p>
                    <p className="text-lg font-medium text-foreground break-all">
                      {result.cleanedText}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-black/5 flex gap-6 text-sm font-medium text-muted-foreground">
                  <span>Original length: <strong className="text-foreground">{result.charCount}</strong></span>
                  <span>Cleaned length: <strong className="text-foreground">{result.cleanCount}</strong></span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl p-10 border-2 border-dashed border-muted bg-muted/10 text-center"
            >
              <p className="text-muted-foreground text-lg font-medium">
                Start typing to see the result instantly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Comprehensive SEO Content Section */}
      <div className="seo-container">
        <div className="seo-card">
          <h2 className="seo-h2">What Are Palindromes</h2>
          <p className="seo-p">
            A palindrome is a fascinating linguistic phenomenon: a word, number, phrase, or other sequence of characters that reads exactly the same backward as it does forward. The word itself comes from the Greek roots "palin" (meaning "again" or "back") and "dromos" (meaning "way" or "direction").
          </p>
          <p className="seo-p">
            The defining characteristic of a palindrome is its perfect symmetry. However, when evaluating phrases or sentences, standard rules dictate that we ignore spaces, punctuation marks, and capitalization. This allows for complex, creative sentences to qualify as palindromes even if their visual structure isn't perfectly mirrored.
          </p>
          <p className="seo-p">
            Palindromes can exist at multiple levels: single words (like "civic"), entire phrases, or even numbers (like the year 2002). They represent a playful intersection of language and mathematics.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Famous Palindrome Examples</h2>
          <p className="seo-p">
            Throughout history, writers and puzzle enthusiasts have crafted incredibly clever palindromes. Here are some practical examples of how they work:
          </p>
          <div className="seo-example-grid">
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: RACECAR</span>
              <span className="text-xl font-extrabold text-foreground mb-1">✅ Valid Palindrome</span>
              <p className="text-sm text-foreground/80">A classic single-word example used to teach children about symmetry in language.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: A man, a plan, a canal: Panama</span>
              <span className="text-xl font-extrabold text-foreground mb-1">✅ Valid Palindrome</span>
              <p className="text-sm text-foreground/80">Demonstrates how punctuation and spaces are ignored to form complex phrases.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: Madam, I'm Adam</span>
              <span className="text-xl font-extrabold text-foreground mb-1">✅ Valid Palindrome</span>
              <p className="text-sm text-foreground/80">A famous historical quote showing how apostrophes are bypassed in checking.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: Was it a car or a cat I saw?</span>
              <span className="text-xl font-extrabold text-foreground mb-1">✅ Valid Palindrome</span>
              <p className="text-sm text-foreground/80">A fun, longer sentence often used in word puzzles and brain teasers.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: Step on no pets</span>
              <span className="text-xl font-extrabold text-foreground mb-1">✅ Valid Palindrome</span>
              <p className="text-sm text-foreground/80">A short action phrase that perfectly mirrors itself, great for logic exercises.</p>
            </div>
          </div>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Why Palindromes Matter in Language</h2>
          <p className="seo-p">
            While they might seem like mere novelties, palindromes hold a special place in linguistics and literature. They demonstrate the flexibility and structural possibilities of a language.
          </p>
          <p className="seo-p">
            <strong>Linguistic Interest:</strong> Creating a long, coherent palindrome requires an immense vocabulary and a deep understanding of syntax. It forces the creator to bend grammatical rules without breaking them.
          </p>
          <p className="seo-p">
            <strong>Wordplay and Poetry:</strong> Writers use palindromes to add hidden layers of meaning or structural beauty to their work. Entire poems have been written where the second half is a perfect mirror of the first.
          </p>
          <p className="seo-p">
            <strong>Pattern Recognition:</strong> Identifying palindromes trains the brain to look beyond the surface meaning of words and analyze their underlying alphabetical structure.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Educational Uses</h2>
          <p className="seo-p">
            Teachers frequently use palindromes in the classroom as an engaging educational tool.
          </p>
          <ul className="seo-list">
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong>Teaching Spelling:</strong> Because palindromes require exact letter placement, they are excellent for reinforcing spelling rules and letter order.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong>Logic Puzzles:</strong> Challenging students to create their own palindromes develops critical thinking and problem-solving skills.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span><strong>Engagement:</strong> The "magic" of a sentence reading the same backward captures students' attention and makes language arts more enjoyable.</span>
            </li>
          </ul>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Programming and Logic Applications</h2>
          <p className="seo-p">
            Interestingly, palindromes are a staple in computer science education. Writing a program to check for palindromes is a classic introductory coding exercise.
          </p>
          <p className="seo-p">
            <strong>Algorithm Practice:</strong> It teaches students how to iterate through arrays, compare variables, and handle edge cases (like ignoring punctuation).
          </p>
          <p className="seo-p">
            <strong>String Manipulation:</strong> Developers learn how to clean data, convert cases, and reverse strings efficiently—skills that translate directly to real-world data processing tasks.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">FAQ Section</h2>
          <div className="faq-container">
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                <span>Does punctuation ruin a palindrome?</span>
              </div>
              <div className="faq-a">
                No. By standard definition, punctuation marks (commas, periods, apostrophes) and spaces are completely ignored when determining if a phrase is a palindrome.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                <span>Are palindromes case-sensitive?</span>
              </div>
              <div className="faq-a">
                No, capitalization does not matter. "Racecar" and "RaceCar" are both considered valid palindromes.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                <span>What is the longest single-word palindrome?</span>
              </div>
              <div className="faq-a">
                In the English language, "tattarrattat" (a word coined by James Joyce meaning a knock on the door) is often cited as the longest, at 12 letters.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                <span>Can numbers be palindromes?</span>
              </div>
              <div className="faq-a">
                Yes! Numbers like 101, 1221, or dates like 02/02/2020 are considered palindromic numbers.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-primary shrink-0" />
                <span>Is there a word for a fear of palindromes?</span>
              </div>
              <div className="faq-a">
                Yes, humorously, the fictional phobia is called "aibohphobia"—which is itself a palindrome!
              </div>
            </div>
          </div>
        </div>

        <div className="seo-card bg-primary/5 border-primary/20">
          <h2 className="seo-h2 mb-4">Explore More Tools</h2>
          <p className="seo-p mb-5">
            Continue exploring the patterns and structures of language with our other tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/word-counter" className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold text-secondary hover:bg-secondary hover:text-white transition-colors border border-secondary/20 shadow-sm">
              <ArrowRight className="w-5 h-5" />
              Try Word Counter
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