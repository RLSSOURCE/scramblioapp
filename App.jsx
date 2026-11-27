import React, { Suspense, lazy } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import AdSense from '@/components/AdSense.jsx';
import ToolLayout from '@/layouts/ToolLayout.jsx';

// Fixed import extension for shadcn ui components
import { Skeleton } from '@/components/ui/skeleton.jsx';

// Static import specifically requested for WordFinderByLettersPage
import WordFinderByLettersPage from '@/pages/WordFinderByLettersPage.jsx';

// Lazy load pages
const HomePage = lazy(() => import('@/pages/HomePage.jsx'));
const AboutPage = lazy(() => import('@/pages/AboutPage.jsx'));
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage.jsx'));
const TermsOfServicePage = lazy(() => import('@/pages/TermsOfServicePage.jsx'));
const CookiePolicyPage = lazy(() => import('@/pages/CookiePolicyPage.jsx'));
const ContactPage = lazy(() => import('@/pages/ContactPage.jsx'));
const ToolsPage = lazy(() => import('@/pages/ToolsPage.jsx'));
const ScrabbleTipsPage = lazy(() => import('@/pages/ScrabbleTipsPage.jsx'));
const WordleSolverPage = lazy(() => import('@/pages/WordleSolverPage.jsx'));
const CrosswordSolverPage = lazy(() => import('@/pages/CrosswordSolverPage.jsx'));

// Lazy load tools
const UnscrambleApp = lazy(() => import('@/components/UnscrambleApp.jsx'));
const AnagramSolver = lazy(() => import('@/components/AnagramSolver.jsx'));
const RhymeFinder = lazy(() => import('@/components/RhymeFinder.jsx'));
const WordGenerator = lazy(() => import('@/components/WordGenerator.jsx'));
const WordCounter = lazy(() => import('@/components/WordCounter.jsx'));
const PalindromeChecker = lazy(() => import('@/components/PalindromeChecker.jsx'));
const BudgetCalculator = lazy(() => import('@/components/BudgetCalculator.jsx'));
const IdeaGenerator = lazy(() => import('@/components/IdeaGenerator.jsx'));

const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <div className="space-y-4 w-full max-w-md px-4">
      <Skeleton className="h-12 w-3/4 mx-auto rounded-xl" />
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div>
        <Header />
        
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/word-finder-by-letters" element={<WordFinderByLettersPage />} />
              <Route path="/wordle-solver" element={<WordleSolverPage />} />
              <Route path="/crossword-solver" element={<CrosswordSolverPage />} />
              
              <Route element={<ToolLayout />}>
                <Route path="/unscrambler" element={<UnscrambleApp />} />
                <Route path="/anagram-solver" element={<AnagramSolver />} />
                <Route path="/rhyme-finder" element={<RhymeFinder />} />
                <Route path="/word-generator" element={<WordGenerator />} />
                <Route path="/word-counter" element={<WordCounter />} />
                <Route path="/palindrome" element={<PalindromeChecker />} />
                <Route path="/budget-calculator" element={<BudgetCalculator />} />
                <Route path="/idea-generator" element={<IdeaGenerator />} />
              </Route>

              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/cookies" element={<CookiePolicyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog/how-to-win-at-scrabble" element={<ScrabbleTipsPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </main>
        
        <aside className="w-full">
          <AdSense />
        </aside>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;