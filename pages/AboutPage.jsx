import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Puzzle, Brain, Gamepad2, Zap, ArrowRight, GraduationCap, PenTool, Trophy, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Footer from '@/components/Footer.jsx';

function AboutPage() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Free Access to All Tools",
      description: "No paywalls, no hidden fees. Every unscrambler, anagram solver, and word finder is completely free to use, forever."
    },
    {
      icon: <Brain className="w-8 h-8 text-secondary" />,
      title: "Multiple Capabilities",
      description: "From simple anagrams to complex crossword patterns, our algorithms are designed to find the exact words you need in milliseconds."
    },
    {
      icon: <Puzzle className="w-8 h-8 text-accent" />,
      title: "For Puzzle Lovers & Students",
      description: "Whether you're stuck on a Sunday crossword, studying vocabulary, or just love wordplay, we've built these tools for you."
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-primary" />,
      title: "Gamer Friendly",
      description: "Gain the upper hand in your favorite word games. Our intuitive interface makes it easy to find high-scoring words quickly."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Helmet>
        <title>About ScramblioApp - Word Solving Tools</title>
        <meta 
          name="description" 
          content="Learn about ScramblioApp, a free collection of word-solving tools designed for puzzle lovers, students, and gamers." 
        />
      </Helmet>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[auto] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1565780889035-6bb01ace53c3" 
              alt="Scrabble tiles spelling words" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 text-foreground">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ScramblioApp</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed">
                Empowering your vocabulary with lightning-fast word discovery.
              </p><div className="flex flex-wrap justify-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-primary">7+</div>
                  <div className="text-sm text-muted-foreground mt-1">Free Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground mt-1">No Sign-up Needed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-primary">0</div>
                  <div className="text-sm text-muted-foreground mt-1">Hidden Fees</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-primary">instant</div>
                  <div className="text-sm text-muted-foreground mt-1">Results</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
            <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
              ScramblioApp is a free collection of word-solving tools including unscramblers, anagram solvers, and more. Designed specifically for puzzle lovers, students, and gamers, our goal is to make word discovery accessible, fast, and incredibly easy to use.
            </p>
          </motion.div>
        </section>

        {/* Feature Highlights Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 border-y border-border/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We've built our tools from the ground up to provide the best possible experience for word enthusiasts.
              </p>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <CardHeader>
                      <div className="mb-4 p-3 bg-background rounded-2xl w-fit shadow-sm border border-border/50">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-muted-foreground leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Who We Built ScramblioApp For Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Built ScramblioApp For</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  ScramblioApp is designed for anyone who enjoys working with words. Whether you're a student improving your vocabulary, a puzzle enthusiast solving crosswords, or a competitive player in word games like Scrabble or Wordle, our tools are built to give you an edge.
                </p>
                <p>
                  Our platform is also helpful for writers, educators, and anyone who needs quick access to word insights such as letter combinations, word counts, and anagram solutions. By combining speed, accuracy, and simplicity, ScramblioApp makes word discovery effortless.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <Card className="bg-primary/5 border-primary/10 shadow-none">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Students</h3>
                  <p className="text-sm text-muted-foreground">Expand vocabulary and learn new letter combinations.</p>
                </CardContent>
              </Card>
              <Card className="bg-secondary/5 border-secondary/10 shadow-none sm:translate-y-8">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-secondary/10 rounded-full">
                    <Trophy className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Gamers</h3>
                  <p className="text-sm text-muted-foreground">Gain a competitive edge in your favorite word games.</p>
                </CardContent>
              </Card>
              <Card className="bg-accent/5 border-accent/10 shadow-none">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <PenTool className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">Writers</h3>
                  <p className="text-sm text-muted-foreground">Find the perfect anagrams and word variations.</p>
                </CardContent>
              </Card>
              <Card className="bg-highlight/5 border-highlight/10 shadow-none sm:translate-y-8">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-highlight/10 rounded-full">
                    <Puzzle className="w-6 h-6 text-highlight-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Enthusiasts</h3>
                  <p className="text-sm text-muted-foreground">Solve complex crosswords and daily puzzles with ease.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 border-y border-border/50 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center p-4 bg-background rounded-2xl mb-6 shadow-sm border border-border/50">
                <Cpu className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">How It Works</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-8">How ScramblioApp Works</h3>
              <p className="text-xl leading-relaxed text-muted-foreground">
                Our tools use advanced word-matching logic to quickly analyze your input and return accurate results in real time. Simply enter your letters or words, choose a tool, and let ScramblioApp do the rest. We continuously improve our algorithms to ensure fast performance and reliable results across all devices.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 gradient-atmospheric opacity-50"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to solve?</h2>
              <p className="text-xl text-muted-foreground mb-10">
                Stop staring at those scrambled letters. Let our tools do the heavy lifting so you can get back to enjoying the game.
              </p>
              <Button asChild size="lg" className="rounded-full px-8 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                <Link to="/">
                  Try the Tools Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;