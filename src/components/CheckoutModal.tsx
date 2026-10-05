import React, { useState } from 'react';
import { CartItem } from '../types/toy';
import { X, Check, MapPin, Bike, Sparkles, Receipt, Printer, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  fulfillmentType: 'pickup' | 'courier';
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  fulfillmentType,
  onClearCart,
}) => {
  const [step, setStep] = useState<'form' | 'confirmed'>('form');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupSlot, setPickupSlot] = useState('Today (2:00 PM – 5:00 PM)');
  const [address, setAddress] = useState('');
  const [paymentOption, setPaymentOption] = useState<'pay-on-arrival' | 'card'>('pay-on-arrival');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.toy.price * item.quantity, 0);
  const deliveryFee = fulfillmentType === 'pickup' || subtotal >= 75 ? 0 : 4.95;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `JS-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedId);
    setStep('confirmed');
    onClearCart();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
              {fulfillmentType === 'pickup' ? 'In-Store Pickup Reservation' : 'Local Courier Checkout'}
            </span>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              {step === 'form' ? 'Complete Your Order' : 'Order Receipt & Confirmation'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {step === 'confirmed' ? (
            <div className="space-y-6 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-2xl font-bold text-stone-900">
                  Thank You, {name}!
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Order <strong>#{orderNumber}</strong> has been received by Arthur & Clara at the 42 Elm Street workshop. We are hand-checking your items and carefully wrapping them with natural twine.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-stone-200 text-left text-xs space-y-3">
                <div className="flex justify-between font-bold text-stone-900 border-b border-stone-200 pb-2">
                  <span>Order Reference</span>
                  <span className="font-mono text-amber-900">#{orderNumber}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-stone-600">
                    <span>Fulfillment:</span>
                    <span className="font-medium text-stone-800">
                      {fulfillmentType === 'pickup' ? `In-Store Pickup (${pickupSlot})` : `Local Bicycle Delivery to ${address}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Customer Contact:</span>
                    <span className="font-medium text-stone-800">{phone} · {email}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Payment Selection:</span>
                    <span className="font-medium text-stone-800">
                      {paymentOption === 'pay-on-arrival' ? 'Pay upon pickup (Cash or Card)' : 'Online Card Verification'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-900">
                  <span>Total Amount</span>
                  <span className="tabular-nums">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-[#2D2A26] hover:bg-stone-800 text-amber-50 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                >
                  Back to Shop
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitOrder} className="space-y-5">
              {/* Order quick overview */}
              <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-amber-950">
                    {cartItems.reduce((a, b) => a + b.quantity, 0)} handcrafted items in bag
                  </span>
                  <div className="text-[11px] text-amber-900/80">
                    Free gift wrapping & handwritten tag included
                  </div>
                </div>
                <div className="font-sans font-bold text-sm text-amber-950 tabular-nums">
                  ${grandTotal.toFixed(2)}
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jessica Miller"
                    className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jessica@example.com"
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Phone Number (for pickup SMS) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-800"
                    />
                  </div>
                </div>

                {fulfillmentType === 'pickup' ? (
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Preferred Pickup Time Slot at 42 Elm St *
                    </label>
                    <select
                      value={pickupSlot}
                      onChange={(e) => setPickupSlot(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-800 bg-white"
                    >
                      <option value="Today (2:00 PM – 5:00 PM)">Today (2:00 PM – 5:00 PM)</option>
                      <option value="Today Curbside (5:00 PM – 6:00 PM)">Today Curbside (5:00 PM – 6:00 PM)</option>
                      <option value="Tomorrow Morning (9:30 AM – 12:00 PM)">Tomorrow Morning (9:30 AM – 12:00 PM)</option>
                      <option value="Saturday Workshop Hours (10:00 AM – 4:00 PM)">Saturday Workshop Hours (10:00 AM – 4:00 PM)</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Delivery Address in Millwood Area *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 114 Maple Leaf Lane, Millwood"
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-800"
                    />
                  </div>
                )}

                {/* Payment Option */}
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Payment Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentOption('pay-on-arrival')}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                        paymentOption === 'pay-on-arrival'
                          ? 'border-amber-800 bg-amber-50 text-amber-950 font-medium'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      <div className="font-semibold text-stone-900">
                        {fulfillmentType === 'pickup' ? 'Pay upon Counter Pickup' : 'Pay on Delivery'}
                      </div>
                      <div className="text-[10px] text-stone-500">
                        Cash or Card at shop counter
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentOption('card')}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                        paymentOption === 'card'
                          ? 'border-amber-800 bg-amber-50 text-amber-950 font-medium'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      <div className="font-semibold text-stone-900">Credit / Debit Card</div>
                      <div className="text-[10px] text-stone-500">
                        Zero extra processing fees
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 border border-stone-300 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2D2A26] hover:bg-stone-800 text-amber-50 rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-xs"
                >
                  Place Reservation · ${grandTotal.toFixed(2)}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
