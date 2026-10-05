import React, { useState } from 'react';
import { CartItem, GiftWrapOption } from '../types/toy';
import { X, Trash2, Gift, ShoppingBag, ArrowRight, MapPin, Bike } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (toyId: string, quantity: number) => void;
  onRemoveItem: (toyId: string) => void;
  onProceedToCheckout: (fulfillmentType: 'pickup' | 'courier') => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'courier'>('pickup');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.toy.price * item.quantity, 0);
  const courierFee = subtotal >= 75 || fulfillmentType === 'pickup' ? 0 : 4.95;
  const grandTotal = subtotal + courierFee;

  const wrapLabels: Record<GiftWrapOption, string> = {
    none: 'Standard Box',
    'kraft-twine': 'Kraft Paper & Twine',
    'starry-night': 'Starry Sky Wrap',
    'forest-green': 'Evergreen Ribbon',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-2xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-stone-200">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-800" />
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Your Shopping Bag
              </h3>
              <span className="text-xs text-stone-500 font-medium tabular-nums">
                ({cartItems.reduce((a, b) => a + b.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-stone-200/70 flex items-center justify-center mx-auto text-stone-500">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-base font-semibold text-stone-800">
                  Your bag is currently empty
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our handcrafted rocking horses, clockwork trains, and puzzles.
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-4 py-2 bg-stone-900 text-amber-50 text-xs font-medium rounded-lg hover:bg-stone-800 cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.toy.id}
                  className="p-3.5 bg-white rounded-xl border border-stone-200/90 shadow-2xs flex gap-3.5"
                >
                  <div className="w-18 h-18 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                    <img
                      src={item.toy.image}
                      alt={item.toy.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-xs font-bold text-stone-900 line-clamp-1">
                          {item.toy.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.toy.id)}
                          className="text-stone-400 hover:text-rose-600 p-0.5"
                          aria-label={`Remove ${item.toy.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-500 font-medium mt-0.5">
                        {wrapLabels[item.giftWrap]}
                      </div>

                      {item.giftNote && (
                        <div className="text-[10px] text-amber-900 bg-amber-50 p-1 rounded mt-1 line-clamp-1 italic">
                          "{item.giftNote}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-1 border-t border-stone-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-md">
                        <button
                          onClick={() => onUpdateQuantity(item.toy.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-600 hover:text-stone-900 text-xs"
                        >
                          −
                        </button>
                        <span className="px-2 text-xs font-semibold tabular-nums text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.toy.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 hover:text-stone-900 text-xs"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-sans text-xs font-bold text-stone-900 tabular-nums">
                        ${(item.toy.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Fulfillment Options */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-stone-200 space-y-4">
              {/* Pickup / Courier Toggle */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                  How would you like to receive it?
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFulfillmentType('pickup')}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                      fulfillmentType === 'pickup'
                        ? 'border-amber-800 bg-amber-50 text-amber-950 font-medium shadow-2xs'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                      <MapPin className="w-3.5 h-3.5 text-amber-800" />
                      <span>Elm St Pickup</span>
                    </div>
                    <div className="text-[10px] text-emerald-700 mt-0.5 font-medium">
                      Free · Ready in 2h
                    </div>
                  </button>

                  <button
                    onClick={() => setFulfillmentType('courier')}
                    className={`p-2.5 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                      fulfillmentType === 'courier'
                        ? 'border-amber-800 bg-amber-50 text-amber-950 font-medium shadow-2xs'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                      <Bike className="w-3.5 h-3.5 text-amber-800" />
                      <span>Cargo Bike</span>
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5">
                      {subtotal >= 75 ? 'Free over $75' : '$4.95 local'}
                    </div>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 divide-y divide-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900 tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Fulfillment</span>
                  <span className="tabular-nums">
                    {courierFee === 0 ? 'Complimentary' : `$${courierFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>Complimentary Gift Wrapping</span>
                  <span className="text-emerald-700 font-medium">Included</span>
                </div>
                <div className="flex justify-between pt-2 text-sm font-bold text-stone-900">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={() => onProceedToCheckout(fulfillmentType)}
                className="w-full py-3 bg-[#2D2A26] hover:bg-stone-800 text-amber-50 rounded-lg text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <span>
                  {fulfillmentType === 'pickup'
                    ? 'Reserve for In-Store Pickup'
                    : 'Proceed to Local Delivery'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
