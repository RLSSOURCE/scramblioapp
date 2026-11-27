import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  Copy, 
  RefreshCw, 
  Type, 
  AlignLeft, 
  FileText, 
  HelpCircle, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  countWords,
  countCharacters,
  countSentences,
  countParagraphs,
  calculateAverageWordLength,
  calculateAverageWordsPerSentence
} from '@/utils/WordCounterUtils';

function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => ({
    words: countWords(text),
    charsWithSpaces: countCharacters(text, true),
    charsNoSpaces: countCharacters(text, false),
    sentences: countSentences(text),
    paragraphs: countParagraphs(text),
    avgWordLength: calculateAverageWordLength(text),
    avgSentenceLength: calculateAverageWordsPerSentence(text)
  }), [text]);

  const handleClear = () => {
    setText('');
    toast.success('Text cleared');
  };

  const handleCopyStats = () => {
    const statsText = `
Text Statistics:
- Words: ${stats.words}
- Characters (with spaces): ${stats.charsWithSpaces}
- Characters (no spaces): ${stats.charsNoSpaces}
- Sentences: ${stats.sentences}
- Paragraphs: ${stats.paragraphs}
- Avg. Word Length: ${stats.avgWordLength} characters
- Avg. Sentence Length: ${stats.avgSentenceLength} words
    `.trim();

    navigator.clipboard.writeText(statsText)
      .then(() => toast.success('Statistics copied to clipboard!'))
      .catch(() => toast.error('Failed to copy statistics.'));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full pb-6"
    >
      <Helmet>
        <title>Free Word Counter Tool - Count Words, Characters & Sentences</title>
        <meta name="description" content="Free word counter tool - analyze text to count words, characters, sentences, paragraphs, and average word length in real-time" />
        <meta property="og:title" content="Free Word Counter Tool - Count Words, Characters & Sentences" />
        <meta property="og:description" content="Free word counter tool - analyze text to count words, characters, sentences, paragraphs, and average word length in real-time" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://scramblio.com/#counter" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free Word Counter Tool - Count Words, Characters & Sentences" />
        <meta name="twitter:description" content="Free word counter tool - analyze text to count words, characters, sentences, paragraphs, and average word length in real-time" />
      </Helmet>

      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-foreground mb-4 tracking-tight">
        Word Counter
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-base md:text-lg text-muted-foreground leading-relaxed font-medium text-center max-w-2xl mx-auto mb-8"
      >
        Analyze your text in real-time. Instantly count words, characters, sentences, and paragraphs to meet your exact requirements.
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 space-y-5"
        >
          <div className="bg-white/60 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] shadow-sm border border-white/60 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <label className="text-secondary font-extrabold text-xl uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Text Input
              </label>
              {text.length > 0 && (
                <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">
                  {stats.words} words
                </span>
              )}
            </div>
            
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here to begin analysis..."
              className="w-full flex-grow min-h-[350px] p-6 text-lg font-medium rounded-3xl border-4 border-primary/20 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary shadow-inner bg-white/90 backdrop-blur-md text-foreground placeholder:text-muted-foreground/50 resize-y transition-all"
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-5 mt-auto">
              <Button
                onClick={handleCopyStats}
                disabled={!text}
                className="h-14 px-8 text-lg font-extrabold rounded-2xl bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg shadow-secondary/30 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex-1"
              >
                <Copy className="w-5 h-5 mr-2" />
                Copy Statistics
              </Button>
              
              <Button
                onClick={handleClear}
                disabled={!text}
                variant="outline"
                className="h-14 px-8 text-lg font-bold rounded-2xl border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300 shadow-sm bg-white/50 backdrop-blur-sm"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] shadow-xl border border-white h-full flex flex-col">
            <h2 className="text-2xl font-extrabold mb-6 text-secondary tracking-tight border-b-2 border-secondary/10 pb-4 flex items-center gap-2">
              <AlignLeft className="w-6 h-6" />
              Real-time Analysis
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-5 rounded-[1.5rem] border border-primary/20 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold text-primary mb-1">{stats.words}</span>
                <span className="text-sm font-bold text-foreground/70 uppercase tracking-wider">Words</span>
              </div>
              <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-5 rounded-[1.5rem] border border-secondary/20 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold text-secondary mb-1">{stats.charsWithSpaces}</span>
                <span className="text-sm font-bold text-foreground/70 uppercase tracking-wider">Characters</span>
              </div>
            </div>

            <div className="space-y-3 flex-grow">
              <StatRow label="Characters (no spaces)" value={stats.charsNoSpaces} icon={<Type className="w-4 h-4" />} />
              <StatRow label="Sentences" value={stats.sentences} icon={<AlignLeft className="w-4 h-4" />} />
              <StatRow label="Paragraphs" value={stats.paragraphs} icon={<FileText className="w-4 h-4" />} />
              
              <div className="pt-4 mt-4 border-t border-border/50 space-y-3">
                <StatRow label="Avg. Word Length" value={`${stats.avgWordLength} chars`} />
                <StatRow label="Avg. Sentence" value={`${stats.avgSentenceLength} words`} />
              </div>
            </div>
            
            {!text && (
              <div className="mt-6 pt-5 border-t border-border/40 text-center">
                <p className="text-sm font-medium text-muted-foreground/80">
                  Stats will update automatically as you type.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Comprehensive SEO Content Section */}
      <div className="seo-container">
        <div className="seo-card">
          <h2 className="seo-h2">Why Word Counters Matter</h2>
          <p className="seo-p">
            In the digital age, writing is rarely just about putting thoughts on a page; it is about meeting specific standards and content requirements. A word counter is an indispensable tool that ensures your text aligns with the expectations of your platform, publisher, or professor.
          </p>
          <p className="seo-p">
            Whether you are drafting a concise tweet, a comprehensive academic essay, or an SEO-optimized blog post, knowing your exact word and character count prevents you from overwriting or falling short. It helps maintain writing discipline, ensuring that every word serves a purpose and contributes to the overall message without unnecessary fluff.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Writing Use Cases</h2>
          <p className="seo-p">
            Word counters are utilized across a vast spectrum of professional and personal writing tasks.
          </p>
          <ul className="seo-list">
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span><strong>Essays and Assignments:</strong> Students must adhere to strict minimum and maximum word limits to avoid grade penalties.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span><strong>Resumes and Cover Letters:</strong> Job seekers use character counts to keep their applications concise, impactful, and usually under one or two pages.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span><strong>Blog Posts:</strong> Content creators target specific word counts to ensure their articles are comprehensive enough to rank well on search engines.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span><strong>Professional Emails:</strong> Keeping emails brief and to the point respects the recipient's time and improves response rates.</span>
            </li>
          </ul>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Social Media Character Limits</h2>
          <p className="seo-p">
            Social media platforms enforce strict character limits. A character counter is crucial for drafting posts that won't get cut off mid-sentence.
          </p>
          <ul className="seo-list">
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span><strong>Twitter/X:</strong> Limited to 280 characters for standard users. Every letter, space, and punctuation mark counts.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span><strong>Instagram Captions:</strong> Allows up to 2,200 characters, but truncates with a "Read more" prompt after the first 125 characters.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span><strong>LinkedIn Posts:</strong> Personal posts are limited to 3,000 characters, making it important to balance depth with readability.</span>
            </li>
            <li className="seo-list-item">
              <ChevronRight className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span><strong>YouTube Titles:</strong> Capped at 100 characters, though keeping them under 70 ensures they display fully on most devices.</span>
            </li>
          </ul>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Academic Writing Requirements</h2>
          <p className="seo-p">
            In academia, word counts are not suggestions; they are strict guidelines. A standard college essay might require exactly 1,500 words, while a master's thesis could demand upwards of 20,000 words.
          </p>
          <p className="seo-p">
            Professors use word limits to gauge a student's ability to explore a topic with sufficient depth without resorting to repetition. Falling short implies a lack of research, while exceeding the limit suggests an inability to edit and synthesize information effectively. A real-time word counter helps students pace their writing and structure their arguments proportionally.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">SEO and Content Writing Benefits</h2>
          <p className="seo-p">
            For digital marketers and bloggers, word count directly impacts Search Engine Optimization (SEO). Search engines like Google tend to favor long-form, comprehensive content because it usually provides more value to the reader.
          </p>
          <p className="seo-p">
            <strong>Keyword Density:</strong> Knowing your total word count allows you to calculate keyword density, ensuring you aren't "keyword stuffing" (which incurs penalties) or under-optimizing your text.
          </p>
          <p className="seo-p">
            <strong>Readability:</strong> Advanced counters track average sentence length. Shorter sentences (15-20 words) improve readability, keeping online audiences engaged longer and reducing bounce rates.
          </p>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">Common Word Count Goals</h2>
          <p className="seo-p">
            Different formats require different lengths. Here are some practical examples of text analysis:
          </p>
          <div className="seo-example-grid">
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: "Hello world!"</span>
              <span className="text-xl font-extrabold text-foreground mb-1">2 words, 12 chars</span>
              <p className="text-sm text-foreground/80">Basic check to ensure spaces are counted correctly for short inputs.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: "It's a beautiful day."</span>
              <span className="text-xl font-extrabold text-foreground mb-1">4 words, 1 sentence</span>
              <p className="text-sm text-foreground/80">Demonstrates how contractions and punctuation are handled.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: Standard Blog Post</span>
              <span className="text-xl font-extrabold text-foreground mb-1">800 - 1,200 words</span>
              <p className="text-sm text-foreground/80">The sweet spot for SEO content to rank well on search engines.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: Short Story</span>
              <span className="text-xl font-extrabold text-foreground mb-1">1,000 - 7,500 words</span>
              <p className="text-sm text-foreground/80">Helps authors pace their narrative arcs within standard publishing limits.</p>
            </div>
            <div className="seo-example-card">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input: News Article</span>
              <span className="text-xl font-extrabold text-foreground mb-1">400 - 800 words</span>
              <p className="text-sm text-foreground/80">Ensures journalistic pieces remain concise and easily digestible.</p>
            </div>
          </div>
        </div>

        <div className="seo-card">
          <h2 className="seo-h2">FAQ Section</h2>
          <div className="faq-container">
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-secondary shrink-0" />
                <span>Does the counter include spaces in the character count?</span>
              </div>
              <div className="faq-a">
                Our tool provides two separate metrics: "Characters (with spaces)" which is useful for social media limits, and "Characters (no spaces)" which is often required for academic or technical submissions.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-secondary shrink-0" />
                <span>How are hyphenated words counted?</span>
              </div>
              <div className="faq-a">
                Standard word counting algorithms treat hyphenated words (like "state-of-the-art") as a single word.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-secondary shrink-0" />
                <span>Is my text saved or stored anywhere?</span>
              </div>
              <div className="faq-a">
                No. The word counter processes your text entirely within your browser. Nothing is sent to our servers, ensuring your writing remains 100% private and secure.
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-secondary shrink-0" />
                <span>Why does my word processor show a slightly different count?</span>
              </div>
              <div className="faq-a">
                Different programs use slightly different rules for counting punctuation, em-dashes, and line breaks. However, the difference is usually negligible (1-2 words per page).
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-q">
                <HelpCircle className="w-6 h-6 text-secondary shrink-0" />
                <span>Can I paste text directly from Microsoft Word or Google Docs?</span>
              </div>
              <div className="faq-a">
                Yes, you can safely copy and paste text from any word processor. The tool will strip out the hidden formatting and accurately count the plain text.
              </div>
            </div>
          </div>
        </div>

        <div className="seo-card bg-secondary/5 border-secondary/20">
          <h2 className="seo-h2 mb-4">Explore More Tools</h2>
          <p className="seo-p mb-5">
            Need to manipulate words rather than just count them? Try our other free utilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/unscrambler" className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl font-bold text-primary hover:bg-primary hover:text-white transition-colors border border-primary/20 shadow-sm">
              <ArrowRight className="w-5 h-5" />
              Try Word Unscrambler
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

function StatRow({ label, value, icon }) {
  return (
    <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-border/50 hover:bg-white/80 transition-colors">
      <div className="flex items-center gap-2 text-foreground/80">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <span className="font-bold text-sm tracking-wide">{label}</span>
      </div>
      <span className="text-lg font-extrabold text-foreground">{value}</span>
    </div>
  );
}

export default WordCounter;