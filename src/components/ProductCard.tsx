import React, { useState } from 'react';
import { Toy } from '../types/toy';
import { Heart, Plus, Star, Sparkles, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  toy: Toy;
  isWishlisted: boolean;
  onToggleWishlist: (toy: Toy) => void;
  onAddToCart: (toy: Toy) => void;
  onSelectProduct: (toy: Toy) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  toy,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(toy);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1400);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(toy);
  };

  return (
    <article
      onClick={() => onSelectProduct(toy)}
      className="group relative flex flex-col bg-white rounded-xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    >
      {/* Visual Image Container (65-70% visual height) */}
      <div className="relative aspect-[4/3] bg-[#F7F5F1] overflow-hidden">
        {!imageError && (
          <img
            src={toy.image}
            alt={toy.name}
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Fallback container if loading or error */}
        {(!imageLoaded || imageError) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#EFECE6]">
            <div className="w-10 h-10 rounded-full bg-amber-800/10 flex items-center justify-center text-amber-800 mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-serif text-xs text-stone-700 font-medium line-clamp-1">
              {toy.name}
            </span>
          </div>
        )}

        {/* Subtle Heirloom distinction - clean 1-line text note, NOT a heavy pill sandwich */}
        {toy.isHeirloomChoice && (
          <div className="absolute top-2.5 left-2.5 text-[10px] font-semibold tracking-wider uppercase text-amber-900 bg-amber-100/90 backdrop-blur-xs px-2 py-0.5 rounded shadow-2xs">
            Heirloom Choice
          </div>
        )}

        {/* Wishlist toggle */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full transition-colors backdrop-blur-xs shadow-2xs ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/80 text-stone-600 hover:text-rose-600 hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View overlay on desktop hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(toy);
            }}
            className="flex-1 bg-stone-900/85 hover:bg-stone-900 text-stone-100 py-1.5 px-2 rounded-lg text-xs font-medium backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1.5">
          {/* Clean unboxed metadata with dot separators */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <span>{toy.ageLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{toy.categoryLabel}</span>
          </div>

          <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1">
            {toy.name}
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {toy.tagline}
          </p>
        </div>

        {/* Price & Add to Bag Footer */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="font-sans text-base font-bold text-stone-900 tabular-nums">
              ${toy.price.toFixed(2)}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-amber-700">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="font-medium tabular-nums">{toy.rating.toFixed(1)}</span>
              <span className="text-stone-400">({toy.reviewsCount})</span>
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
              addedNotice
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-amber-50'
            }`}
            aria-label={`Add ${toy.name} to shopping bag`}
          >
            {addedNotice ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
