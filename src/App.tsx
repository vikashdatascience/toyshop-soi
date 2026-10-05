/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { TOYS, UPCOMING_EVENTS, CUSTOMER_REVIEWS as INITIAL_REVIEWS } from './data/toys';
import { Toy, AgeBracket, ToyCategory, CartItem, GiftWrapOption, CustomerReview } from './types/toy';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryAgeFilter } from './components/CategoryAgeFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { GiftFinderWizard } from './components/GiftFinderWizard';
import { WorkshopSection } from './components/WorkshopSection';
import { EventsCalendarModal } from './components/EventsCalendarModal';
import { StoreLocationVisit } from './components/StoreLocationVisit';
import { CustomerReviews } from './components/CustomerReviews';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';
import { Sparkles, RotateCcw } from 'lucide-react';

export default function App() {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('juniper_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<Toy[]>(() => {
    try {
      const saved = localStorage.getItem('juniper_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Customer Reviews state
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('juniper_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Filter and Search states
  const [selectedAge, setSelectedAge] = useState<AgeBracket>('all');
  const [selectedCategory, setSelectedCategory] = useState<ToyCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Modal states
  const [selectedProduct, setSelectedProduct] = useState<Toy | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutFulfillment, setCheckoutFulfillment] = useState<'pickup' | 'courier'>('pickup');

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('juniper_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('juniper_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('juniper_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  // Cart operations
  const handleAddToCart = (
    toy: Toy,
    quantity: number = 1,
    giftWrap: GiftWrapOption = 'kraft-twine',
    giftNote?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.toy.id === toy.id && item.giftWrap === giftWrap);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (giftNote) updated[existingIndex].giftNote = giftNote;
        return updated;
      }
      return [...prev, { toy, quantity, giftWrap, giftNote }];
    });
  };

  const handleUpdateCartQuantity = (toyId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(toyId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.toy.id === toyId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (toyId: string) => {
    setCart((prev) => prev.filter((item) => item.toy.id !== toyId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (toy: Toy) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === toy.id);
      if (exists) {
        return prev.filter((item) => item.id !== toy.id);
      }
      return [...prev, toy];
    });
  };

  const handleRemoveFromWishlist = (toyId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== toyId));
  };

  const isWishlisted = (toyId: string) => wishlist.some((t) => t.id === toyId);

  // Reviews submission
  const handleAddReview = (newReview: CustomerReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  // Navigation smoothly to element
  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered and sorted products
  const filteredToys = useMemo(() => {
    return TOYS.filter((toy) => {
      // Age filter
      if (selectedAge !== 'all' && toy.ageBracket !== selectedAge) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && toy.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = toy.name.toLowerCase().includes(query);
        const matchesTagline = toy.tagline.toLowerCase().includes(query);
        const matchesDesc = toy.description.toLowerCase().includes(query);
        const matchesMat = toy.materials.toLowerCase().includes(query);
        const matchesCat = toy.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesTagline && !matchesDesc && !matchesMat && !matchesCat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedAge, selectedCategory, searchQuery, sortBy]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-200 selection:text-amber-950 flex flex-col">
      {/* 1. Neighborhood Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* 3. Hero Section with Real Storefront Photography */}
        <Hero
          onExploreClick={() => handleNavigateSection('catalog')}
          onWorkshopClick={() => handleNavigateSection('workshop')}
          onOpenStoreInfo={() => handleNavigateSection('visit')}
        />

        {/* 4. Featured Product Catalog & Interactive Filters */}
        <section id="catalog" className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="space-y-2 mb-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Handcrafted on Elm Street
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                Cherished Toys & Keepsakes
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md">
                Honest materials, rounded edges, and non-toxic beeswax finishes. All items available for in-store pickup within 2 hours.
              </p>
            </div>
          </div>

          {/* Interactive Filter Ribbons */}
          <CategoryAgeFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedAge={selectedAge}
            onSelectAge={setSelectedAge}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalFiltered={filteredToys.length}
          />

          {/* Product Grid */}
          {filteredToys.length === 0 ? (
            <div className="py-20 text-center space-y-3 bg-white rounded-2xl border border-stone-200 p-8 my-6">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-800">
                No toys match your criteria
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try loosening your search terms or view our full collection of heirloom wooden toys and puzzles.
              </p>
              <button
                onClick={() => {
                  setSelectedAge('all');
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setSortBy('featured');
                }}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-[#2D2A26] text-amber-50 text-xs font-medium rounded-lg hover:bg-stone-800 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
              {filteredToys.map((toy) => (
                <ProductCard
                  key={toy.id}
                  toy={toy}
                  isWishlisted={isWishlisted(toy.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={(t) => handleAddToCart(t, 1, 'kraft-twine')}
                  onSelectProduct={(t) => setSelectedProduct(t)}
                />
              ))}
            </div>
          )}
        </section>

        {/* 5. Interactive Gift Finder Wizard */}
        <GiftFinderWizard
          toys={TOYS}
          onSelectProduct={(t) => setSelectedProduct(t)}
          onAddToCart={(t) => handleAddToCart(t, 1, 'kraft-twine')}
        />

        {/* 6. Artisan Workshop & Repair Clinic Spotlight */}
        <WorkshopSection
          onOpenEvents={() => setIsEventsOpen(true)}
          onOpenVisit={() => handleNavigateSection('visit')}
        />

        {/* 7. Community Testimonials & Family Stories */}
        <CustomerReviews
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* 8. Store Location, Hours, Directions & Curbside Details */}
        <StoreLocationVisit />
      </main>

      {/* 9. Tasteful Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* --- Modals & Drawers --- */}

      {/* Product Detail Modal */}
      <ProductDetailModal
        toy={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? isWishlisted(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={(fulfillment) => {
          setCheckoutFulfillment(fulfillment);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout & Reservation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        fulfillmentType={checkoutFulfillment}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(t) => handleAddToCart(t, 1, 'kraft-twine')}
        onSelectProduct={(t) => setSelectedProduct(t)}
      />

      {/* Events & Workshop RSVP Modal */}
      <EventsCalendarModal
        events={UPCOMING_EVENTS}
        isOpen={isEventsOpen}
        onClose={() => setIsEventsOpen(false)}
      />
    </div>
  );
}
