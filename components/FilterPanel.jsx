import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

export default function FilterPanel({ filters, setFilters, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const activeFilterCount = Object.values(filters).filter(val => val !== '').length;

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = (e) => {
    e.stopPropagation();
    setFilters({
      startsWith: '',
      endsWith: '',
      contains: '',
      length: ''
    });
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "w-full max-w-2xl mx-auto mb-10 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white transition-all duration-300 overflow-hidden",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          className="w-full flex items-center justify-between p-6 md:p-8 h-auto hover:bg-white/50 rounded-none"
        >
          <div className="flex items-center gap-3">
            <div className="bg-secondary/15 p-2.5 rounded-xl shadow-inner border border-secondary/10">
              <Filter className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
              Options
            </h2>
            {activeFilterCount > 0 && (
              <span className="ml-2 bg-secondary text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {activeFilterCount} active
              </span>
            )}
          </div>
          <div className="bg-secondary/10 p-2 rounded-full">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-secondary" />
            ) : (
              <ChevronDown className="w-5 h-5 text-secondary" />
            )}
          </div>
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Starts With */}
            <div className="space-y-2.5">
              <Label className="text-foreground/80 font-bold text-sm uppercase tracking-wider ml-1">Starts with</Label>
              <Input
                type="text"
                placeholder="e.g. A"
                value={filters.startsWith}
                onChange={(e) => handleFilterChange('startsWith', e.target.value)}
                className="h-14 rounded-2xl border-2 border-primary/20 focus-visible:ring-primary focus-visible:border-primary bg-white shadow-inner text-lg font-bold placeholder:text-muted-foreground/40 px-5"
                maxLength={10}
              />
            </div>

            {/* Ends With */}
            <div className="space-y-2.5">
              <Label className="text-foreground/80 font-bold text-sm uppercase tracking-wider ml-1">Ends with</Label>
              <Input
                type="text"
                placeholder="e.g. S"
                value={filters.endsWith}
                onChange={(e) => handleFilterChange('endsWith', e.target.value)}
                className="h-14 rounded-2xl border-2 border-primary/20 focus-visible:ring-primary focus-visible:border-primary bg-white shadow-inner text-lg font-bold placeholder:text-muted-foreground/40 px-5"
                maxLength={10}
              />
            </div>

            {/* Contains */}
            <div className="space-y-2.5">
              <Label className="text-foreground/80 font-bold text-sm uppercase tracking-wider ml-1">Contains</Label>
              <Input
                type="text"
                placeholder="e.g. TH"
                value={filters.contains}
                onChange={(e) => handleFilterChange('contains', e.target.value)}
                className="h-14 rounded-2xl border-2 border-primary/20 focus-visible:ring-primary focus-visible:border-primary bg-white shadow-inner text-lg font-bold placeholder:text-muted-foreground/40 px-5"
                maxLength={10}
              />
            </div>

            {/* Word Length */}
            <div className="space-y-2.5">
              <Label className="text-foreground/80 font-bold text-sm uppercase tracking-wider ml-1">Exact length</Label>
              <Input
                type="number"
                placeholder="e.g. 5"
                value={filters.length}
                onChange={(e) => handleFilterChange('length', e.target.value)}
                min={3}
                max={15}
                className="h-14 rounded-2xl border-2 border-primary/20 focus-visible:ring-primary focus-visible:border-primary bg-white shadow-inner text-lg font-bold placeholder:text-muted-foreground/40 px-5"
              />
            </div>
          </div>

          {activeFilterCount > 0 && (
            <div className="mt-8 pt-6 border-t border-border/60 flex justify-end">
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-12 px-6 rounded-xl font-bold transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}