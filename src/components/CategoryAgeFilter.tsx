import React from 'react';
import { AgeBracket, ToyCategory } from '../types/toy';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

interface CategoryAgeFilterProps {
  selectedCategory: ToyCategory;
  onSelectCategory: (cat: ToyCategory) => void;
  selectedAge: AgeBracket;
  onSelectAge: (age: AgeBracket) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalFiltered: number;
}

export const CategoryAgeFilter: React.FC<CategoryAgeFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedAge,
  onSelectAge,
  sortBy,
  onSortChange,
  totalFiltered,
}) => {
  const categories: { id: ToyCategory; label: string }[] = [
    { id: 'all', label: 'All Toys' },
    { id: 'wooden', label: 'Handcrafted Wooden' },
    { id: 'stem', label: 'STEM & Mechanical' },
    { id: 'plush', label: 'Organic Plush' },
    { id: 'creative', label: 'Creative & Nature' },
    { id: 'games', label: 'Puzzles & Games' },
  ];

  const ageBrackets: { id: AgeBracket; label: string; sublabel: string }[] = [
    { id: 'all', label: 'All Ages', sublabel: '0 to 99' },
    { id: '0-2', label: '0–2 Years', sublabel: 'Sensory & First Steps' },
    { id: '3-5', label: '3–5 Years', sublabel: 'Pretend & Wooden' },
    { id: '6-8', label: '6–8 Years', sublabel: 'STEM & Curious Minds' },
    { id: '9+', label: '9+ Years', sublabel: 'Complex & Strategy' },
  ];

  return (
    <div className="space-y-6 pt-2 pb-6">
      {/* Age Brackets Ribbon */}
      <div id="age-groups" className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Shop By Developmental Stage
          </span>
          <span className="text-xs text-stone-400">
            Curated for milestones
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {ageBrackets.map((bracket) => {
            const isActive = selectedAge === bracket.id;
            return (
              <button
                key={bracket.id}
                onClick={() => onSelectAge(bracket.id)}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2D2A26] border-[#2D2A26] text-amber-50 shadow-sm'
                    : 'bg-white border-stone-200/90 text-stone-700 hover:border-stone-400/80 hover:bg-stone-50'
                }`}
              >
                <div className="text-sm font-semibold whitespace-nowrap">{bracket.label}</div>
                <div
                  className={`text-[11px] mt-0.5 line-clamp-1 ${
                    isActive ? 'text-amber-200/80' : 'text-stone-500'
                  }`}
                >
                  {bracket.sublabel}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Pills & Sorting Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 border-t border-stone-200/80">
        {/* Category Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-amber-800 text-amber-50 shadow-xs'
                    : 'bg-stone-200/60 text-stone-700 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Sort & Counter */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 text-xs">
          <span className="text-stone-500 tabular-nums">
            Showing <strong className="font-semibold text-stone-800">{totalFiltered}</strong> heirloom items
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-stone-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-amber-700 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
