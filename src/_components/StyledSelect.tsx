"use client";

import React, { useEffect, useRef, useState } from 'react';

type Option = { value: string; label: string };

interface StyledSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  ariaLabel?: string;
}

export default function StyledSelect({ options, value, onChange, className = '', ariaLabel }: StyledSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState<number>(() => Math.max(0, options.findIndex(o => o.value === value)));
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    const idx = options.findIndex(o => o.value === value);
    setHighlight(idx < 0 ? 0 : idx);
  }, [value, options]);

  useEffect(() => {
    if (open && listRef.current) {
      const el = listRef.current.querySelector(`[data-index="${highlight}"]`);
      if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
    }
  }, [open, highlight]);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlight(h => Math.min(options.length - 1, h + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      setHighlight(h => Math.max(0, h - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const opt = options[highlight];
      if (opt) onChange(opt.value);
      setOpen(false);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  const selectedLabel = options.find(o => o.value === value)?.label ?? '';

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/* Custom select with border styling to match the website theme */}
      <div className="relative w-full">
        {/* Actual select button with permanent border */}
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={ariaLabel}
          onKeyDown={onKey}
          onClick={() => setOpen(v => !v)}
          className="w-full text-left px-4 pr-10 py-3 bg-[#2E2B29] text-white border-2 border-[#C9B99E] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B99E] focus:border-transparent transition-all duration-200 cursor-pointer font-norwester"
        >
          <span className="truncate">{selectedLabel}</span>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#C9B99E]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>

      {open && (
        <div
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          className="absolute left-0 right-0 mt-2 z-50 max-h-56 overflow-auto rounded-lg bg-[#2E2B29] border-2 border-[#C9B99E] text-white shadow-lg"
        >
          {options.map((opt, i) => {
            const isHighlighted = i === highlight;
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value + i}
                data-index={i}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`px-4 py-2 cursor-pointer ${isHighlighted ? 'bg-[#C9B99E]/20' : ''} ${isSelected ? 'font-semibold' : ''} font-norwester`}
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}