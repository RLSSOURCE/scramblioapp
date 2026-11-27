import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer.jsx';

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Privacy Policy - ScramblioApp</title>
        <meta name="description" content="Read the ScramblioApp Privacy Policy to understand how we collect, use, and protect your data." />
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
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Last updated: October 15, 2025
          </p>
        </div>

        <article className="prose prose-slate dark:prose-invert max-w-none text-foreground/80 leading-relaxed space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              At ScramblioApp, we believe in minimizing data collection. We only collect information that is strictly necessary to provide our word tools and improve your experience. When you use our service, we may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-muted-foreground">
              <li><strong>Usage Data:</strong> Information about how you interact with our tools, such as the features you use most frequently and error logs to help us fix bugs.</li>
              <li><strong>Device Information:</strong> Basic analytics such as browser type, operating system, and screen resolution to ensure our app displays correctly on your device.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              The information we collect is used primarily to maintain and improve the ScramblioApp platform. Specifically, we use it to:
            </p>
            <ul className="list-disc pl-6 space-y-2 marker:text-muted-foreground">
              <li>Analyze performance metrics and optimize tool response times.</li>
              <li>Identify and resolve technical issues quickly.</li>
              <li>Understand which language tools are most popular to guide future development.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data Protection and Security</h2>
            <p>
              We implement reasonable security measures to protect the limited data we process. However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee absolute security, but we continuously review and update our practices to keep your session data safe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Third-Party Services</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We may use trusted third-party analytics services (such as generic website counters) that assist us in operating our website, provided those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@scramblioapp.com. We typically respond within 3-5 business days.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPolicyPage;