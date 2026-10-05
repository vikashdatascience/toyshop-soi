import React from 'react';
import { Calendar, Wrench, Sparkles, Trees, HeartHandshake } from 'lucide-react';

interface WorkshopSectionProps {
  onOpenEvents: () => void;
  onOpenVisit: () => void;
}

export const WorkshopSection: React.FC<WorkshopSectionProps> = ({
  onOpenEvents,
  onOpenVisit,
}) => {
  return (
    <section id="workshop" className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Workshop Imagery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-md aspect-[16/10] bg-stone-100">
              <img
                src="/src/assets/images/store_artisan_workshop_1791180774555.jpg"
                alt="Inside the sunlit artisan craft workshop at Juniper & Sprout Toymakers with wooden chisels, spinning tops, and benches"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="font-semibold text-amber-200">The Back Workshop</span>
                <span className="mx-2 text-stone-300">·</span>
                <span>Open for public viewing during Saturday classes</span>
              </div>
            </div>

            {/* Quote from Arthur */}
            <div className="p-4 bg-white rounded-xl border border-stone-200/90 text-xs text-stone-600 italic">
              "A plastic toy made for five minutes of noise gets discarded in six months. A wooden horse or clockwork engine made with honest materials becomes part of childhood memory, surviving through brothers, sisters, and grandchildren."
              <div className="not-italic font-semibold text-stone-800 mt-1.5">
                — Arthur Pendelton, Founder & Master Toymaker
              </div>
            </div>
          </div>

          {/* Right Workshop Editorial */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Craftsmanship & Community
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                Our Elm Street Workshop & Toy Clinic
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Step through the red door at 42 Elm Street, and you’ll smell cedar sawdust and beeswax. Every Saturday, our workshop tables open up to neighborhood children to build, tinker, and understand how simple machines work.
              </p>
            </div>

            {/* Three Pillars */}
            <div className="space-y-4 pt-1">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-900 shrink-0 mt-0.5">
                  <Trees className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">
                    Sustainably Farmed Timber
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    We source exclusively from FSC-certified Baltic birch and fallen orchard timbers, sealed with organic linseed and beeswax.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-900 shrink-0 mt-0.5">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">
                    Free Neighborhood Toy Repair Clinic
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Broken wheel on an old wooden train? Split teddy bear seam? Bring it in on the 1st and 3rd Saturday of each month. We repair community toys for free.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-900 shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-stone-900">
                    Hands-On Weekend Workshops
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Carving, painting, and puppet storytelling sessions led by local craftspeople every weekend for kids and families.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenEvents}
                className="inline-flex items-center gap-2 bg-[#2D2A26] text-amber-50 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>View Event Calendar & RSVP</span>
              </button>

              <button
                onClick={onOpenVisit}
                className="text-xs sm:text-sm text-stone-700 hover:text-stone-900 font-medium px-4 py-2.5 rounded-lg border border-stone-300 hover:border-stone-400 transition-colors cursor-pointer"
              >
                Shop Hours & Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
