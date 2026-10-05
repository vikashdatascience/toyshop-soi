import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif text-2xl sm:text-2xl font-semibold text-stone-900 tracking-tight hover:text-amber-800 transition-colors whitespace-nowrap"
        >
          Juniper & Sprout
        </a>

        {/* Zone 2: 4–6 nav links, single-line */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => handleLinkClick('catalog')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap py-1 cursor-pointer"
          >
            Toy Catalog
          </button>
          <button
            onClick={() => handleLinkClick('age-groups')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap py-1 cursor-pointer"
          >
            By Age
          </button>
          <button
            onClick={() => handleLinkClick('gift-finder')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap py-1 cursor-pointer"
          >
            Gift Finder
          </button>
          <button
            onClick={() => handleLinkClick('workshop')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap py-1 cursor-pointer"
          >
            Workshop & Events
          </button>
          <button
            onClick={() => handleLinkClick('visit')}
            className="hover:text-stone-900 transition-colors whitespace-nowrap py-1 cursor-pointer"
          >
            Visit Shop
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {searchOpen ? (
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search toys, wood, train..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="w-40 sm:w-56 text-xs bg-white border border-stone-300 rounded-full px-3 py-1.5 pr-7 focus:outline-none focus:border-amber-700 text-stone-800 placeholder-stone-400"
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  onSearchChange('');
                }}
                className="absolute right-2 text-stone-400 hover:text-stone-600 p-0.5"
                aria-label="Close search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-full transition-colors"
              aria-label="Open search input"
              title="Search toys"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
          )}

          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-full transition-colors"
            aria-label="View saved toys wishlist"
            title="Wishlist"
          >
            <Heart className="w-4.5 h-4.5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#2D2A26] text-amber-50 px-3.5 py-2 rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Shopping Bag</span>
            <span className="bg-amber-400 text-stone-950 px-1.5 py-0.2 rounded-full text-[10px] font-bold tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg hover:bg-stone-200/50"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF8F5] px-6 py-5 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3 text-base font-medium text-stone-700">
            <button
              onClick={() => handleLinkClick('catalog')}
              className="text-left py-2 border-b border-stone-200/60 hover:text-amber-800"
            >
              Toy Catalog
            </button>
            <button
              onClick={() => handleLinkClick('age-groups')}
              className="text-left py-2 border-b border-stone-200/60 hover:text-amber-800"
            >
              Shop By Age
            </button>
            <button
              onClick={() => handleLinkClick('gift-finder')}
              className="text-left py-2 border-b border-stone-200/60 hover:text-amber-800"
            >
              Interactive Gift Finder
            </button>
            <button
              onClick={() => handleLinkClick('workshop')}
              className="text-left py-2 border-b border-stone-200/60 hover:text-amber-800"
            >
              Artisan Workshop & Events
            </button>
            <button
              onClick={() => handleLinkClick('visit')}
              className="text-left py-2 hover:text-amber-800"
            >
              Hours & Store Directions
            </button>
          </div>
          <div className="pt-2 text-xs text-stone-500">
            42 Elm Street, Millwood · Open Mon–Sat 9:30 AM – 6:00 PM
          </div>
        </div>
      )}
    </header>
  );
};
