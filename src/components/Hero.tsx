import React, { useState } from 'react';
import { ArrowRight, Clock, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onWorkshopClick: () => void;
  onOpenStoreInfo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onWorkshopClick,
  onOpenStoreInfo,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-20 border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text & Editorial Area */}
          <div className="lg:col-span-6 space-y-6">
            {/* Subtle editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-800 uppercase">
              <span>Independent Toymakers</span>
              <span aria-hidden="true">·</span>
              <span>42 Elm Street</span>
              <span aria-hidden="true">·</span>
              <span>Est. 1988</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-5xl leading-[1.12] text-stone-900 tracking-tight text-balance">
              Heirloom toys built to inspire wonder, not screen time.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Cherished wooden toys, honest clockwork trains, and tactile organic wool figures carved, assembled, and finished with organic beeswax in our neighborhood workshop.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 bg-[#2D2A26] text-amber-50 px-6 py-3 rounded-lg text-sm font-medium hover:bg-stone-800 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Browse the Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onWorkshopClick}
                className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 px-5 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer border border-stone-300/80 whitespace-nowrap"
              >
                <span>Our Workshop & Classes</span>
              </button>
            </div>

            {/* Neighborhood Trust Markers */}
            <div className="pt-4 border-t border-stone-200/90 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Open today 'til 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>100% Non-Toxic & Screen-Free</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                <button
                  onClick={onOpenStoreInfo}
                  className="hover:underline text-left text-stone-700 font-medium"
                >
                  Pickup at 42 Elm St
                </button>
              </div>
            </div>
          </div>

          {/* Right Showcase Image Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/90 bg-[#F6F3EE] aspect-[16/10] sm:aspect-[16/11]">
              {!imageError && (
                <img
                  src="/src/assets/images/hero_toy_shop_storefront_1791180730139.jpg"
                  alt="Juniper & Sprout Toymakers storefront window on Elm Street glowing with handcrafted wooden toys and rocking horses"
                  referrerPolicy="no-referrer"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  className={`w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02] ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              )}

              {/* Styled fallback container if image loading */}
              {(!imageLoaded || imageError) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#EFEAE2] to-[#DFD7CB] p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-amber-800/10 flex items-center justify-center text-amber-800 mb-3">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-stone-800">
                    Juniper & Sprout Workshop
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 max-w-xs">
                    42 Elm Street, Historic Artisan Quarter
                  </p>
                </div>
              )}

              {/* Image subtle overlay badge */}
              <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto sm:max-w-xs bg-[#2D2A26]/85 backdrop-blur-md text-amber-100 px-3.5 py-2.5 rounded-lg text-xs flex items-center gap-2.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="leading-snug">
                  The Elm Street Workshop is open today. Free gift-wrapping on all visits.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
