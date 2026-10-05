import React, { useState } from 'react';
import { Toy, AgeBracket } from '../types/toy';
import { Sparkles, ArrowRight, RotateCcw, Check, Plus } from 'lucide-react';

interface GiftFinderWizardProps {
  toys: Toy[];
  onSelectProduct: (toy: Toy) => void;
  onAddToCart: (toy: Toy) => void;
}

export const GiftFinderWizard: React.FC<GiftFinderWizardProps> = ({
  toys,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedAge, setSelectedAge] = useState<AgeBracket | null>(null);
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const ageOptions = [
    { id: '0-2' as AgeBracket, title: '0–2 Years', desc: 'Toddlers & Sensory' },
    { id: '3-5' as AgeBracket, title: '3–5 Years', desc: 'Pretend & Creative' },
    { id: '6-8' as AgeBracket, title: '6–8 Years', desc: 'Explorers & STEM' },
    { id: '9+' as AgeBracket, title: '9+ Years', desc: 'Makers & Strategy' },
  ];

  const interestOptions = [
    { id: 'hands-on', title: 'Hands-On Building', desc: 'Blocks, kinetic sets & architecture' },
    { id: 'pretend', title: 'Storytelling & Pretend', desc: 'Puppets, figures & imaginative roles' },
    { id: 'curious', title: 'Curious Science & Gears', desc: 'Clockwork, mechanicals & optics' },
    { id: 'outdoor', title: 'Outdoor & Nature Play', desc: 'Lawn games, greenhouse & botany' },
  ];

  const budgetOptions = [
    { id: 'under-50', title: 'Under $50', desc: 'Thoughtful everyday delights' },
    { id: '50-100', title: 'Under $100', desc: 'Special celebration gifts' },
    { id: 'all', title: 'Heirloom Keepsakes', desc: 'Generational showstoppers' },
  ];

  // Filtering recommendation logic
  const getRecommendations = (): Toy[] => {
    return toys.filter((toy) => {
      if (selectedAge && toy.ageBracket !== selectedAge && selectedAge !== 'all') {
        // Also allow slightly flexible matches
        const matchesCategory =
          (selectedAge === '0-2' && (toy.id === 'heirloom-rocking-horse' || toy.category === 'wooden')) ||
          (selectedAge === '3-5' && (toy.category === 'plush' || toy.category === 'wooden' || toy.id === 'kaleidoscope-brass')) ||
          (selectedAge === '6-8' && (toy.category === 'stem' || toy.category === 'creative' || toy.category === 'games')) ||
          (selectedAge === '9+' && (toy.category === 'stem' || toy.category === 'games'));
        if (!matchesCategory) return false;
      }

      if (selectedInterest) {
        if (selectedInterest === 'hands-on' && toy.category !== 'wooden') return false;
        if (selectedInterest === 'pretend' && toy.category !== 'plush' && toy.id !== 'heirloom-rocking-horse') return false;
        if (selectedInterest === 'curious' && toy.category !== 'stem' && toy.id !== 'kaleidoscope-brass') return false;
        if (selectedInterest === 'outdoor' && toy.category !== 'games' && toy.category !== 'creative') return false;
      }

      if (selectedBudget) {
        if (selectedBudget === 'under-50' && toy.price > 50) return false;
        if (selectedBudget === '50-100' && toy.price > 100) return false;
      }

      return true;
    }).slice(0, 3);
  };

  const recommendations = getRecommendations();
  const hasSelectedAll = selectedAge && selectedInterest && selectedBudget;

  const handleReset = () => {
    setSelectedAge(null);
    setSelectedInterest(null);
    setSelectedBudget(null);
  };

  const handleQuickAdd = (toy: Toy) => {
    onAddToCart(toy);
    setAddedIds((prev) => ({ ...prev, [toy.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [toy.id]: false }));
    }, 1500);
  };

  return (
    <section id="gift-finder" className="py-14 sm:py-18 bg-[#F3EFEA] border-y border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/80 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Toymaker's Assistant</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Find the Perfect Heirloom Gift
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Tell us about the lucky child. We'll curate handcrafted toys designed for their developmental wonder.
          </p>
        </div>

        {/* 3 Steps in Clean Box Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-sm">
          {/* Step 1: Age */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-50 flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Child's Age</span>
            </div>
            <div className="space-y-2">
              {ageOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedAge(opt.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-colors cursor-pointer ${
                    selectedAge === opt.id
                      ? 'border-amber-800 bg-amber-50/70 text-amber-950 font-medium'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="text-xs font-semibold">{opt.title}</div>
                  <div className="text-[11px] text-stone-500">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Play Style */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-50 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Their Play Curiosity</span>
            </div>
            <div className="space-y-2">
              {interestOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedInterest(opt.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-colors cursor-pointer ${
                    selectedInterest === opt.id
                      ? 'border-amber-800 bg-amber-50/70 text-amber-950 font-medium'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="text-xs font-semibold">{opt.title}</div>
                  <div className="text-[11px] text-stone-500">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Budget */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-900">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-50 flex items-center justify-center text-[10px]">
                3
              </span>
              <span>Gift Budget</span>
            </div>
            <div className="space-y-2">
              {budgetOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedBudget(opt.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-colors cursor-pointer ${
                    selectedBudget === opt.id
                      ? 'border-amber-800 bg-amber-50/70 text-amber-950 font-medium'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700'
                  }`}
                >
                  <div className="text-xs font-semibold">{opt.title}</div>
                  <div className="text-[11px] text-stone-500">{opt.desc}</div>
                </button>
              ))}
            </div>

            {(selectedAge || selectedInterest || selectedBudget) && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 pt-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset selections</span>
              </button>
            )}
          </div>
        </div>

        {/* Curated Results Showcase */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              {hasSelectedAll ? 'Recommended Gifts for Your Child' : 'Handpicked Toymaker Favorites'}
            </h3>
            <span className="text-xs text-stone-500">
              Includes free gift wrap & card note
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(recommendations.length > 0 ? recommendations : toys.slice(0, 3)).map((toy) => (
              <div
                key={toy.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden p-4 flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div
                  onClick={() => onSelectProduct(toy)}
                  className="cursor-pointer space-y-3"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100">
                    <img
                      src={toy.image}
                      alt={toy.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <div className="text-[11px] text-stone-500 font-medium">
                      {toy.ageLabel} · {toy.categoryLabel}
                    </div>
                    <h4 className="font-serif text-base font-semibold text-stone-900 mt-0.5 line-clamp-1 group-hover:text-amber-900">
                      {toy.name}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                      {toy.tagline}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="font-sans text-base font-bold text-stone-900 tabular-nums">
                    ${toy.price.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(toy)}
                      className="text-xs text-stone-600 hover:text-stone-900 font-medium px-2 py-1 rounded cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleQuickAdd(toy)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
                        addedIds[toy.id]
                          ? 'bg-emerald-700 text-white'
                          : 'bg-stone-900 hover:bg-stone-800 text-amber-50'
                      }`}
                    >
                      {addedIds[toy.id] ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
