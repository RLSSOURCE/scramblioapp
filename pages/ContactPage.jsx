import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Send, Loader2, Mail, User, MessageSquare, Text } from 'lucide-react';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Label } from '@/components/ui/label.jsx';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient.js';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      await pb.collection('contact_submissions').create(formData, { $autoCancel: false });
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact submission error:', error);
      toast.error(error?.response?.message || 'Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <Helmet>
        <title>Contact Us - Scramblio</title>
        <meta name="description" content="Get in touch with the Scramblio team. We'd love to hear your feedback, questions, or feature requests." />
      </Helmet>

      <section className="w-full bg-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
              Have a question, feedback, or a feature request? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] shadow-xl border border-white"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-bold text-secondary uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4" /> Your Name
                  </Label>
                  <Input
                    id="name" name="name" value={formData.name} onChange={handleChange}
                    placeholder="Maya Chen" disabled={isSubmitting}
                    className="h-14 px-5 text-lg rounded-xl border-2 border-border focus-visible:ring-primary focus-visible:border-primary bg-white text-foreground"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-bold text-secondary uppercase tracking-wider flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Email Address
                  </Label>
                  <Input
                    id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                    placeholder="maya@example.com" disabled={isSubmitting}
                    className="h-14 px-5 text-lg rounded-xl border-2 border-border focus-visible:ring-primary focus-visible:border-primary bg-white text-foreground"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="subject" className="text-sm font-bold text-secondary uppercase tracking-wider flex items-center gap-2">
                  <Text className="w-4 h-4" /> Subject
                </Label>
                <Input
                  id="subject" name="subject" value={formData.subject} onChange={handleChange}
                  placeholder="How can we help you?" disabled={isSubmitting}
                  className="h-14 px-5 text-lg rounded-xl border-2 border-border focus-visible:ring-primary focus-visible:border-primary bg-white text-foreground"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="message" className="text-sm font-bold text-secondary uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Message
                </Label>
                <Textarea
                  id="message" name="message" value={formData.message} onChange={handleChange}
                  placeholder="Write your message here..." disabled={isSubmitting}
                  className="min-h-[200px] p-5 text-lg rounded-xl border-2 border-border focus-visible:ring-primary focus-visible:border-primary bg-white text-foreground resize-y"
                  required
                />
              </div>

              <Button
                type="submit" disabled={isSubmitting}
                className="w-full h-16 text-xl font-extrabold rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> Sending Message...</>
                ) : (
                  <><Send className="w-6 h-6 mr-3" /> Send Message</>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;