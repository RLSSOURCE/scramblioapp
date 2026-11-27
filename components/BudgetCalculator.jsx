import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  Calculator, 
  RefreshCw, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Star
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function BudgetCalculator() {
  const [isBonusOpen, setIsBonusOpen] = useState(false);
  const [inputs, setInputs] = useState({
    income: '',
    housing: '',
    food: '',
    transportation: '',
    entertainment: '',
    utilities: '',
    other: ''
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (field, value) => {
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setInputs(prev => ({ ...prev, [field]: value }));
    }
  };

  const calculateBudget = () => {
    const income = parseFloat(inputs.income) || 0;
    
    const expenses = {
      housing: parseFloat(inputs.housing) || 0,
      food: parseFloat(inputs.food) || 0,
      transportation: parseFloat(inputs.transportation) || 0,
      entertainment: parseFloat(inputs.entertainment) || 0,
      utilities: parseFloat(inputs.utilities) || 0,
      other: parseFloat(inputs.other) || 0
    };

    const totalExpenses = Object.values(expenses).reduce((acc, curr) => acc + curr, 0);
    const remaining = income - totalExpenses;
    
    const breakdown = Object.entries(expenses)
      .filter(([_, amount]) => amount > 0)
      .map(([category, amount]) => ({
        category: category.charAt(0).toUpperCase() + category.slice(1),
        amount,
        percentage: totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(1) : 0
      }))
      .sort((a, b) => b.amount - a.amount);

    setResults({
      income,
      totalExpenses,
      remaining,
      breakdown
    });
  };

  const handleReset = () => {
    setInputs({
      income: '',
      housing: '',
      food: '',
      transportation: '',
      entertainment: '',
      utilities: '',
      other: ''
    });
    setResults(null);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <motion.div 
        className="w-full mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="bg-bonus-gradient rounded-[3rem] p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/10 relative overflow-hidden group">
          {/* Decorative Background Orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 blur-[100px] rounded-full mix-blend-overlay pointer-events-none animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/20 blur-[80px] rounded-full mix-blend-overlay pointer-events-none animate-float" style={{animationDelay: '2s'}}></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="badge-premium mb-8">
                <Star className="w-4 h-4 text-bonus-accent fill-current" />
                <span className="text-white tracking-wide">Pro Tool Discovery</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                Smart <span className="text-bonus-accent drop-shadow-sm">Planner</span>
              </h2>
              
              <p className="text-white/80 text-xl leading-relaxed mb-10 max-w-lg font-medium">
                Take complete control of your finances. Seamlessly track your income, break down expenses, and visualize your financial health with our extra budgeting feature.
              </p>
              
              <Button 
                onClick={() => setIsBonusOpen(!isBonusOpen)}
                className="h-16 px-10 text-xl font-extrabold rounded-2xl bg-white text-[hsl(var(--bonus-gradient-start))] hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl shadow-white/10"
              >
                {isBonusOpen ? 'Close Budget Planner' : 'Explore Bonus Tool'}
              </Button>
            </div>
            
            {/* Right Decorative Mockup */}
            <div className="hidden lg:flex justify-center items-center relative">
              <motion.div 
                className="w-full max-w-sm aspect-square relative"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-[2.5rem] backdrop-blur-xl border border-white/30 shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex flex-col p-10 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                  <div className="w-16 h-16 rounded-2xl bg-bonus-accent/20 mb-10 flex items-center justify-center border border-bonus-accent/30 shadow-inner">
                    <Calculator className="w-8 h-8 text-bonus-accent" />
                  </div>
                  
                  <div className="space-y-6 w-full flex-grow">
                    <div className="h-6 bg-white/20 rounded-full w-3/4 shadow-inner"></div>
                    <div className="h-6 bg-white/20 rounded-full w-1/2 shadow-inner"></div>
                    <div className="h-6 bg-white/20 rounded-full w-5/6 shadow-inner"></div>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-end">
                    <div className="h-24 w-24 rounded-full bg-bonus-accent/30 border-2 border-white/20 shadow-inner"></div>
                    <div className="h-12 w-32 bg-white/20 rounded-xl shadow-inner"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expanded Calculator Area */}
      <AnimatePresence>
        {isBonusOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-background text-foreground rounded-[2.5rem] p-6 sm:p-10 shadow-lg border border-border mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
                
                {/* Input Form */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="lg:col-span-7 space-y-8"
                >
                  {/* Income Section */}
                  <div className="bg-card p-8 rounded-[2rem] shadow-sm border border-border">
                    <label className="block text-secondary font-extrabold text-xl mb-4 uppercase tracking-wide">
                      Total Monthly Income
                    </label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/50 text-2xl font-bold">
                        $
                      </div>
                      <Input
                        type="text"
                        placeholder="0.00"
                        value={inputs.income}
                        onChange={(e) => handleInputChange('income', e.target.value)}
                        className="w-full h-20 pl-14 text-left text-2xl sm:text-3xl font-bold rounded-3xl border-4 border-primary/20 focus-visible:ring-primary focus-visible:border-primary shadow-inner bg-muted/30 text-foreground placeholder:text-muted-foreground/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Expenses Section */}
                  <div className="bg-card p-8 rounded-[2rem] shadow-sm border border-border">
                    <h3 className="text-primary font-extrabold text-xl mb-6 uppercase tracking-wide flex items-center gap-2">
                      <PieChart className="w-6 h-6" />
                      Monthly Expenses
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {['housing', 'food', 'transportation', 'entertainment', 'utilities', 'other'].map((category) => (
                        <div key={category} className="space-y-2">
                          <label className="block text-foreground/80 font-bold text-sm uppercase tracking-wide">
                            {category}
                          </label>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 text-xl font-bold">
                              $
                            </div>
                            <Input
                              type="text"
                              placeholder="0.00"
                              value={inputs[category]}
                              onChange={(e) => handleInputChange(category, e.target.value)}
                              className="w-full h-14 pl-10 text-left text-xl font-bold rounded-2xl border-2 border-border focus-visible:ring-primary focus-visible:border-primary shadow-inner bg-muted/10 text-foreground placeholder:text-muted-foreground/40 transition-all"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      onClick={calculateBudget}
                      disabled={!inputs.income && !inputs.housing}
                      className="h-16 px-10 text-xl font-extrabold rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/30 transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] flex-1"
                    >
                      <Calculator className="w-6 h-6 mr-3" />
                      Calculate Budget
                    </Button>
                    
                    {(results || inputs.income || inputs.housing) && (
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="h-16 px-8 text-lg font-bold rounded-2xl border-2 hover:bg-muted transition-all duration-300 shadow-sm"
                      >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Reset
                      </Button>
                    )}
                  </div>
                </motion.div>

                {/* Results Section */}
                <div className="lg:col-span-5">
                  {results ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="bg-card p-8 rounded-[2rem] shadow-xl border border-border h-full"
                    >
                      <h2 className="text-2xl font-extrabold mb-8 text-foreground tracking-tight border-b-2 border-muted pb-4">
                        Budget Summary
                      </h2>

                      <div className="space-y-6 mb-10">
                        <div className="flex justify-between items-center bg-primary/5 p-5 rounded-2xl border border-primary/10">
                          <span className="text-foreground/70 font-bold uppercase tracking-wide text-sm">Total Income</span>
                          <span className="text-2xl font-extrabold text-primary">${results.income.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center bg-secondary/5 p-5 rounded-2xl border border-secondary/10">
                          <span className="text-foreground/70 font-bold uppercase tracking-wide text-sm">Total Expenses</span>
                          <span className="text-2xl font-extrabold text-secondary">${results.totalExpenses.toFixed(2)}</span>
                        </div>

                        <div className={`flex justify-between items-center p-6 rounded-2xl border-2 ${results.remaining >= 0 ? 'bg-green-50 border-green-200 shadow-green-100' : 'bg-red-50 border-red-200 shadow-red-100'} shadow-lg mt-4`}>
                          <div className="flex items-center gap-2">
                            {results.remaining >= 0 ? (
                              <TrendingUp className="w-6 h-6 text-green-600" />
                            ) : (
                              <TrendingDown className="w-6 h-6 text-red-600" />
                            )}
                            <span className={`font-extrabold uppercase tracking-wide text-sm ${results.remaining >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                              {results.remaining >= 0 ? 'Surplus' : 'Deficit'}
                            </span>
                          </div>
                          <span className={`text-3xl font-extrabold ${results.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${Math.abs(results.remaining).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {results.breakdown.length > 0 && (
                        <div>
                          <h3 className="text-lg font-extrabold text-foreground/80 mb-6 uppercase tracking-wide">
                            Expense Breakdown
                          </h3>
                          <div className="space-y-5">
                            {results.breakdown.map((item, index) => (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-end text-sm font-bold">
                                  <span className="text-foreground/80">{item.category}</span>
                                  <div className="text-right">
                                    <span className="text-secondary">${item.amount.toFixed(2)}</span>
                                    <span className="text-muted-foreground ml-2 text-xs">({item.percentage}%)</span>
                                  </div>
                                </div>
                                <div className="h-3 w-full bg-secondary/10 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.percentage}%` }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-full flex flex-col items-center justify-center text-center py-20 px-8 bg-muted/30 rounded-[2rem] border-2 border-dashed border-border"
                    >
                      <div className="w-28 h-28 mb-8 rounded-full bg-primary/10 flex items-center justify-center shadow-inner">
                        <DollarSign className="w-14 h-14 text-primary" />
                      </div>
                      <h3 className="text-2xl font-extrabold mb-4 text-foreground tracking-tight">Awaiting Numbers</h3>
                      <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                        Fill in your income and expenses, then click calculate to see your financial breakdown here.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BudgetCalculator;