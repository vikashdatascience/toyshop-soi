import React, { useState } from 'react';
import { STORE_DETAILS } from '../data/toys';
import { Mail, Trees, Check, ArrowRight, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-[#2D2A26] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-stone-800/80">
          {/* Brand & Neighborhood Note */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl font-bold text-amber-100 tracking-tight">
              Juniper & Sprout
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An independent neighborhood toy shop & woodcraft workshop on Elm Street. We believe in screen-free childhood, natural materials, and toys made with enough care to be loved by more than one generation.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-200/90 pt-1">
              <Trees className="w-4 h-4 text-emerald-400" />
              <span>FSC Certified Timber & Non-Toxic Finishes</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-100">
              The Shop
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigateSection('catalog')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  All Handcrafted Toys
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('age-groups')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  Shop By Age
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('gift-finder')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  Interactive Gift Finder
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('workshop')}
                  className="hover:text-amber-200 transition-colors cursor-pointer"
                >
                  Workshop & Events
                </button>
              </li>
            </ul>
          </div>

          {/* Store & Visit */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-100">
              Visit 42 Elm Street
            </h4>
            <div className="space-y-1.5 text-xs text-stone-400">
              <p className="text-stone-300 font-medium">Historic Artisan Quarter, Millwood</p>
              <p>Mon – Fri: 9:30 AM – 6:00 PM</p>
              <p>Saturday: 9:00 AM – 6:30 PM</p>
              <p>Sunday: 11:00 AM – 5:00 PM</p>
              <p className="pt-1 text-amber-300/80">Phone: {STORE_DETAILS.phone}</p>
            </div>
          </div>

          {/* Workshop Dispatch Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-100">
              The Toymaker's Journal
            </h4>
            <p className="text-xs text-stone-400">
              Receive notifications for upcoming weekend carving classes, puppet shows, and new limited-batch wooden toys.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-700/60 rounded-lg text-emerald-200 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>You're on the list! See you at the workshop.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full text-xs bg-stone-800/80 border border-stone-700 rounded-lg px-3 py-2 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 bg-amber-400 text-stone-950 rounded text-xs font-bold hover:bg-amber-300 transition-colors flex items-center"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-stone-500 block">
                  No spam. Unsubscribe anytime.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Quiet Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 1988–{new Date().getFullYear()} Juniper & Sprout Toymakers LLC. Handcrafted in Millwood.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Free Community Repair Clinic</span>
            <span aria-hidden="true">·</span>
            <span>Plastic-Free Guarantee</span>
            <span aria-hidden="true">·</span>
            <span>Local Neighborhood Proud</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
