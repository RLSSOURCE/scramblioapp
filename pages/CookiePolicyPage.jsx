import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer.jsx';

function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Cookie Policy - ScramblioApp</title>
        <meta name="description" content="Learn about how ScramblioApp uses cookies and similar tracking technologies." />
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
            Cookie Policy
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Effective Date: October 15, 2025
          </p>
        </div>

        <article className="prose prose-slate dark:prose-invert max-w-none text-foreground/80 leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the site owners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">
              ScramblioApp uses cookies to enhance your experience in the following ways:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-muted-foreground">
              <li><strong>Essential Cookies:</strong> Required to operate our core tools and save your active tab state as you navigate between the Unscrambler and other tools.</li>
              <li><strong>Preference Cookies:</strong> Used to remember your interface choices, such as dark mode or filter settings, so you don't have to reapply them upon your next visit.</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our site by collecting and reporting information anonymously.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Managing Your Preferences</h2>
            <p>
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like theme choices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this page periodically to stay aware of any changes.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default CookiePolicyPage;