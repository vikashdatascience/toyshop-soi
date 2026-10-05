import React from 'react';
import { Toy } from '../types/toy';
import { X, Heart, Plus, Trash2, ArrowRight } from 'lucide-react';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Toy[];
  onRemoveFromWishlist: (toyId: string) => void;
  onAddToCart: (toy: Toy) => void;
  onSelectProduct: (toy: Toy) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-600 fill-current" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Saved Keepsakes & Wishlist
            </h3>
            <span className="text-xs text-stone-500 tabular-nums">
              ({wishlist.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-3">
          {wishlist.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-base font-semibold text-stone-800">
                No saved toys yet
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Click the heart icon on any handcrafted rocking horse, clockwork train, or puppet to save it for later.
              </p>
            </div>
          ) : (
            wishlist.map((toy) => (
              <div
                key={toy.id}
                className="p-3 bg-white rounded-xl border border-stone-200 flex items-center justify-between gap-3 hover:border-stone-300"
              >
                <div
                  onClick={() => {
                    onClose();
                    onSelectProduct(toy);
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                >
                  <img
                    src={toy.image}
                    alt={toy.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg object-cover bg-stone-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <h5 className="font-serif text-xs font-bold text-stone-900 truncate">
                      {toy.name}
                    </h5>
                    <div className="text-[11px] text-stone-500">
                      {toy.ageLabel} · {toy.categoryLabel}
                    </div>
                    <div className="font-sans text-xs font-bold text-stone-900 tabular-nums mt-0.5">
                      ${toy.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => {
                      onAddToCart(toy);
                      onRemoveFromWishlist(toy.id);
                    }}
                    className="px-3 py-1.5 bg-[#2D2A26] hover:bg-stone-800 text-amber-50 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
                    title="Move to shopping bag"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Bag</span>
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(toy.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
