import React from 'react';

export default function ToolNavigation({ tools }) {
  if (!tools || tools.length === 0) return null;

  return (
    <div className="mt-12 bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col items-center justify-center w-full transition-all duration-300 hover:shadow-md hover:bg-white/50">
      <h3 className="text-xs sm:text-sm font-extrabold text-foreground/50 uppercase tracking-widest mb-5">
        Try Our Other Tools
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4 sm:gap-x-6 text-sm sm:text-base font-bold">
        {tools.map((tool, index) => (
          <React.Fragment key={tool.tabId || index}>
            <a 
              href={`#${tool.tabId}`} 
              className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors duration-200 hover:underline underline-offset-4 decoration-primary/30 group"
            >
              {tool.icon && (
                <span className="text-foreground/40 group-hover:text-primary transition-colors duration-200">
                  {tool.icon}
                </span>
              )}
              {tool.name}
            </a>
            {index < tools.length - 1 && (
              <span className="text-foreground/20 select-none hidden sm:inline-block">|</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}