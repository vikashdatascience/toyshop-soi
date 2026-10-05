import React, { useState } from 'react';
import { STORE_DETAILS } from '../data/toys';
import { MapPin, Clock, Phone, Mail, Navigation, Car, Sparkles, Check } from 'lucide-react';

export const StoreLocationVisit: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${STORE_DETAILS.street}, ${STORE_DETAILS.district}, ${STORE_DETAILS.city}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="visit" className="py-16 sm:py-20 bg-white border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Hours & Visiting Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Neighborhood Toy Shop & Workshop
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
                Visit Us on Elm Street
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Whether you’re searching for a cherished birthday present, bringing a broken wooden car for the repair clinic, or just letting little hands explore our tactile play tables.
              </p>
            </div>

            {/* Operating Hours Box */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-800" />
                  Store & Workshop Hours
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Open Today 'til 6:00 PM
                </span>
              </div>

              <div className="space-y-2 text-xs text-stone-700 divide-y divide-stone-200/60 pt-1">
                <div className="flex justify-between pt-1">
                  <span className="font-medium text-stone-800">Monday – Friday</span>
                  <span className="tabular-nums">9:30 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-medium text-stone-800">Saturday (Workshop Open)</span>
                  <span className="tabular-nums">9:00 AM – 6:30 PM</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-medium text-stone-800">Sunday (Storytime at 11:15)</span>
                  <span className="tabular-nums">11:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>

            {/* Contact & Address Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
                <div className="flex items-center gap-2 text-stone-900 font-semibold mb-1">
                  <MapPin className="w-4 h-4 text-amber-800" />
                  <span>Our Address</span>
                </div>
                <p className="text-stone-600 leading-snug">
                  42 Elm Street, Artisan Quarter<br />
                  Millwood
                </p>
                <button
                  onClick={handleCopyAddress}
                  className="mt-2 text-amber-800 hover:underline font-medium flex items-center gap-1 cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied to clipboard</span>
                    </>
                  ) : (
                    <span>Copy full address</span>
                  )}
                </button>
              </div>

              <div className="p-3.5 rounded-xl border border-stone-200 bg-white">
                <div className="flex items-center gap-2 text-stone-900 font-semibold mb-1">
                  <Phone className="w-4 h-4 text-amber-800" />
                  <span>Call the Shop</span>
                </div>
                <p className="text-stone-600 leading-snug">
                  {STORE_DETAILS.phone}<br />
                  {STORE_DETAILS.email}
                </p>
                <a
                  href="tel:5553827688"
                  className="mt-2 inline-block text-amber-800 hover:underline font-medium cursor-pointer"
                >
                  Speak with a toymaker
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Illustrated Interactive Neighborhood Map & Curbside Details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-[#F4F1EB] border border-stone-200 relative overflow-hidden shadow-xs">
              {/* Map Graphic Mock */}
              <div className="relative h-64 rounded-xl bg-stone-200 overflow-hidden border border-stone-300/80">
                {/* Visual streets & roads layout */}
                <div className="absolute inset-0 bg-[#E8E4DC] flex flex-col justify-between p-4">
                  {/* Street grid visual */}
                  <div className="h-6 bg-stone-300/80 rounded w-full flex items-center px-3 text-[10px] font-mono text-stone-600">
                    OAK STREET (NORTH)
                  </div>
                  <div className="flex-1 flex items-center justify-around py-4">
                    <div className="w-16 h-20 bg-stone-300/60 rounded flex flex-col items-center justify-center text-center p-1 text-[9px] text-stone-600">
                      <span>Baker's Square</span>
                      <span className="text-[8px] text-stone-500">P Parking</span>
                    </div>

                    {/* Store Marker Pin */}
                    <div className="flex flex-col items-center animate-bounce">
                      <div className="w-10 h-10 rounded-full bg-amber-800 text-amber-100 flex items-center justify-center shadow-lg border-2 border-white">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <span className="bg-[#2D2A26] text-amber-100 font-serif font-bold text-[11px] px-2.5 py-0.5 rounded shadow-md mt-1 whitespace-nowrap">
                        Juniper & Sprout
                      </span>
                    </div>

                    <div className="w-16 h-20 bg-stone-300/60 rounded flex flex-col items-center justify-center text-center p-1 text-[9px] text-stone-600">
                      <span>Town Fountain</span>
                      <span className="text-[8px] text-stone-500">Park Bench</span>
                    </div>
                  </div>
                  <div className="h-6 bg-amber-800/10 rounded w-full flex items-center px-3 text-[10px] font-mono text-amber-900 font-semibold border-t border-b border-amber-800/20">
                    ELM STREET (HISTORIC PEDESTRIAN & CYCLING LANE)
                  </div>
                </div>

                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-[10px] font-medium text-stone-700 shadow-2xs">
                  Historic Quarter
                </div>
              </div>

              {/* Curbside pickup instructions */}
              <div className="mt-4 pt-4 border-t border-stone-300/70 space-y-2 text-xs text-stone-700">
                <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <Car className="w-4 h-4 text-amber-800" />
                  Free 15-Minute Curbside Pickup Available
                </div>
                <p className="text-stone-600 leading-relaxed">
                  Ordered online? Pull up to our loading bay on the Pinewood Lane alleyway, call or text our shop counter, and Clara or Arthur will bring your gift-wrapped parcel directly to your car.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
