import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils.js';

export default function ToolFilter({ categories, activeCategory, onCategoryChange, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, onSearch]);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-between w-full p-6 bg-card rounded-2xl shadow-sm border border-border">
      
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <button
          onClick={() => onCategoryChange('All')}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-bold transition-all duration-200",
            activeCategory === 'All'
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          )}
        >
          All Tools
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-bold transition-all duration-200",
              activeCategory === category
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative w-full md:w-80 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          className="w-full bg-muted/50 border border-border/50 text-foreground placeholder:text-muted-foreground text-sm rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
          placeholder="Search tools (e.g. Unscrambler)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

    </div>
  );
}