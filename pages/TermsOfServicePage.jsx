import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer.jsx';

function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Terms of Service - ScramblioApp</title>
        <meta name="description" content="Read the Terms of Service for using ScramblioApp's word tools and language utilities." />
      </Helmet>

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="mb-10">
          <Button variant="ghost" asChild className="mb-8 hover:bg-muted/50 -ml-4">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Terms of Service
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Effective Date: October 15, 2025
          </p>
        </div>

        <article className="prose prose-slate dark:prose-invert max-w-none text-foreground/80 leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using ScramblioApp, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use of Service</h2>
            <p className="mb-4">
              ScramblioApp provides tools for word unscrambling, anagram solving, and text analysis. You agree to use these tools only for lawful purposes. You are strictly prohibited from:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-muted-foreground">
              <li>Attempting to interfere with the proper working of the platform or accessing it using automated scripts (unless explicitly permitted).</li>
              <li>Using our tools to generate offensive, illegal, or harmful content.</li>
              <li>Reverse-engineering the algorithms that power our unscrambler and solvers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Disclaimer of Warranties</h2>
            <p>
              Our services are provided "as is" and "as available" without any warranty or representations of any kind, whether express or implied. We do not guarantee that the service will be uninterrupted, timely, secure, or error-free, nor do we guarantee that the dictionary results will always be 100% accurate for specific competitive gameplay.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Limitation of Liability</h2>
            <p>
              In no event shall ScramblioApp or its operators be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the site. This includes, but is not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We do so by posting the updated terms on this page. Your continued use of the platform after any such changes constitutes your acceptance of the new Terms of Service.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default TermsOfServicePage;