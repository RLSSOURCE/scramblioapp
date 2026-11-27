import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Twitter, Instagram, Linkedin, Mail, BookOpen, Puzzle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate newsletter subscription
    toast.success('Thanks for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <footer className="footer-wrapper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="footer-grid">
          
          {/* Section 1: Branding & Description (4 columns on desktop) */}
          <div className="lg:col-span-4 flex flex-col">
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-primary">SCRAMBLIO</span><span className="text-[hsl(var(--footer-fg))]">APP</span>
              </span>
            </Link>
            <p className="text-[hsl(var(--footer-muted))] leading-relaxed mb-8 max-w-sm">
              Your ultimate toolkit for mastering the English language. From word puzzles to creative writing and academic essays, we provide free, instant utilities to help you achieve your goals.
            </p>
          </div>

          {/* Section 2: Quick Links (2 columns on desktop) */}
          <div className="lg:col-span-2">
            <h3 className="footer-heading">Platform</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/tools" className="footer-link">All Tools</Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Legal & Socials (2 columns on desktop) */}
          <div className="lg:col-span-2">
            <h3 className="footer-heading">Legal</h3>
            <ul className="space-y-4 mb-8">
              <li>
                <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link">Terms of Service</Link>
              </li>
              <li>
                <Link to="/cookies" className="footer-link">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Newsletter Signup (4 columns on desktop) */}
          <div className="lg:col-span-4">
            <h3 className="footer-heading">Stay Updated</h3>
            <p className="text-[hsl(var(--footer-muted))] mb-5 leading-relaxed">
              Join our newsletter for the latest word puzzles, feature updates, and writing tips delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[hsl(var(--footer-border))] border-transparent text-[hsl(var(--footer-fg))] placeholder:text-[hsl(var(--footer-muted))] focus-visible:ring-primary h-12 rounded-xl"
              />
              <Button 
                type="submit" 
                className="h-12 px-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-bold shadow-none"
              >
                Subscribe
              </Button>
            </form>
            
            {/* Social Icons row placed under newsletter for better space usage */}
            <div className="flex gap-3 mt-8">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="footer-social-icon">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-social-icon">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:support@scramblioapp.com" aria-label="Email Support" className="footer-social-icon">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-[hsl(var(--footer-border))] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[hsl(var(--footer-muted))] text-sm">
            &copy; {currentYear} ScramblioApp. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[hsl(var(--footer-muted))]">
            <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4"/> Vocab Builder</span>
            <span className="flex items-center gap-1.5"><Puzzle className="w-4 h-4"/> Puzzle Solver</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;