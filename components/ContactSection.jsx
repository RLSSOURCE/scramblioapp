import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Send, RefreshCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import pb from '@/lib/pocketbaseClient.js';

function ContactSection() {
  const initialFormState = {
    name: '',
    email: '',
    message: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      await pb.collection('contact_submissions').create(formData, { $autoCancel: false });
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData(initialFormState);
    } catch (error) {
      console.error('Contact submission error:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      <div className="bg-contact text-contact-fg rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 relative">
        {/* Subtle decorative background gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
          
          {/* Left Column: Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Get in touch
            </h2>
            <p className="text-contact-fg/80 text-lg md:text-xl leading-relaxed max-w-md mb-12 font-medium">
              We aim to provide accurate and helpful word-solving tools. Have a question, found a bug, or want to say hello? Drop us a message and our team will respond as soon as possible.
            </p>
            
            <div className="space-y-10 mt-auto">
              <div>
                <p className="text-sm font-extrabold text-contact-cta uppercase tracking-widest mb-2">
                  Response Time
                </p>
                <p className="text-xl font-bold text-white">
                  Usually within 24-48 hours
                </p>
              </div>
              
              <div>
                <p className="text-sm font-extrabold text-contact-cta uppercase tracking-widest mb-2">
                  Direct Support
                </p>
                <a 
                  href="mailto:support@scramblioapp.com"
                  className="text-xl font-bold text-white hover:text-contact-cta transition-colors duration-300 inline-block"
                >
                  support@scramblioapp.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="p-8 md:p-12 bg-black/40 flex flex-col justify-center backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-contact-fg font-bold text-base">
                  Full Name <span className="text-contact-cta">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Maya Chen"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-contact-cta focus-visible:border-contact-cta h-14 px-5 rounded-2xl transition-all shadow-inner text-lg font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-contact-fg font-bold text-base">
                  Email Address <span className="text-contact-cta">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="maya@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-contact-cta focus-visible:border-contact-cta h-14 px-5 rounded-2xl transition-all shadow-inner text-lg font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-contact-fg font-bold text-base">
                  Message <span className="text-contact-cta">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="How can we help you today?"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-contact-cta focus-visible:border-contact-cta min-h-[160px] p-5 rounded-2xl resize-y transition-all shadow-inner text-lg font-medium"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-5">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-contact-cta hover:bg-contact-cta/90 text-contact-cta-fg h-16 rounded-2xl font-extrabold text-lg transition-all duration-300 active:scale-[0.98] shadow-lg shadow-contact-cta/20"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <RefreshCcw className="w-6 h-6 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      <Send className="w-6 h-6" />
                      Send Message
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </motion.section>
  );
}

export default ContactSection;