import React, { useState } from 'react';
import { Toy, GiftWrapOption } from '../types/toy';
import { X, Star, ShieldCheck, MapPin, Gift, Check, Heart, PackageCheck, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  toy: Toy | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (toy: Toy, quantity: number, giftWrap: GiftWrapOption, giftNote?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (toy: Toy) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  toy,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedWrap, setSelectedWrap] = useState<GiftWrapOption>('kraft-twine');
  const [giftNote, setGiftNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!isOpen || !toy) return null;

  const handleAdd = () => {
    onAddToCart(toy, quantity, selectedWrap, showNoteInput ? giftNote : undefined);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full transition-colors shadow-2xs"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Showcase & Workshop Story */}
          <div className="md:col-span-6 bg-[#F6F4F0] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
            <div className="space-y-6">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-xs border border-stone-200/80">
                <img
                  src={toy.image}
                  alt={toy.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Craftsmanship Credentials */}
              <div className="space-y-3 pt-2 text-xs text-stone-600">
                <div className="font-semibold uppercase tracking-wider text-stone-800 text-[11px]">
                  Workshop & Safety Standards
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-stone-900">Safety Verified:</span> {toy.safetyCert}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <PackageCheck className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-stone-900">Materials:</span> {toy.materials}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-stone-900">Origin:</span> {toy.origin}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* In-store badge */}
            <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {toy.inStockCount} in stock at 42 Elm Street
              </span>
              <span>Dimensions: {toy.dimensions}</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Clean Metadata & Category */}
              <div className="flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <span>{toy.ageLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{toy.categoryLabel}</span>
                </div>
                <button
                  onClick={() => onToggleWishlist(toy)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-colors ${
                    isWishlisted
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                  {toy.name}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-sans text-2xl font-bold text-stone-900 tabular-nums">
                    ${toy.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-700">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="font-semibold tabular-nums">{toy.rating.toFixed(1)}</span>
                    <span className="text-stone-400">({toy.reviewsCount} local reviews)</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 leading-relaxed">
                {toy.description}
              </p>

              {/* Features List */}
              <div className="space-y-1.5 pt-1">
                {toy.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-800 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Complimentary Gift Wrapping Section */}
              <div className="pt-4 border-t border-stone-200 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-amber-800" />
                    Complimentary Gift Wrapping
                  </span>
                  <span className="text-stone-500">Free of charge</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'kraft-twine' as GiftWrapOption, label: 'Kraft & Twine' },
                    { id: 'starry-night' as GiftWrapOption, label: 'Starry Sky' },
                    { id: 'forest-green' as GiftWrapOption, label: 'Evergreen Bow' },
                  ].map((wrap) => (
                    <button
                      key={wrap.id}
                      onClick={() => setSelectedWrap(wrap.id)}
                      className={`p-2 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                        selectedWrap === wrap.id
                          ? 'border-amber-800 bg-amber-50 text-amber-900 font-medium'
                          : 'border-stone-200 text-stone-600 hover:border-stone-400'
                      }`}
                    >
                      {wrap.label}
                    </button>
                  ))}
                </div>

                {/* Optional gift note */}
                <div className="pt-1">
                  {!showNoteInput ? (
                    <button
                      onClick={() => setShowNoteInput(true)}
                      className="text-xs text-amber-800 hover:underline font-medium"
                    >
                      + Add a handwritten gift card note
                    </button>
                  ) : (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-medium text-stone-600">
                          Handwritten Card Message:
                        </label>
                        <button
                          onClick={() => {
                            setShowNoteInput(false);
                            setGiftNote('');
                          }}
                          className="text-[11px] text-stone-400 hover:text-stone-600"
                        >
                          Cancel note
                        </button>
                      </div>
                      <textarea
                        value={giftNote}
                        onChange={(e) => setGiftNote(e.target.value)}
                        placeholder="e.g., Happy 4th Birthday Leo! Love, Aunt Clara & Uncle Ben"
                        rows={2}
                        className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-800"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Bar (Quantity + Add to Bag) */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-l-lg text-sm font-semibold"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-3 py-2 text-sm font-semibold text-stone-800 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(toy.inStockCount, quantity + 1))}
                    className="px-3 py-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-r-lg text-sm font-semibold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                    addedSuccess
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#2D2A26] hover:bg-stone-800 text-amber-50'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">${(toy.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
                <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>Ready for pickup in 2 hours at 42 Elm Street or local delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
