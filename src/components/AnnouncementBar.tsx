import React, { useState } from 'react';
import { X, Sparkles, MapPin } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#2D2A26] text-[#F3EFEA] text-xs font-medium px-4 py-2 relative z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>
            Free neighborhood click & collect at 42 Elm Street
          </span>
          <span className="text-stone-500 hidden sm:inline" aria-hidden="true">·</span>
          <span className="hidden sm:inline text-stone-300">
            Complimentary craft gift-wrapping on all holiday & birthday orders
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-stone-400 hover:text-white transition-colors p-0.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-300 shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
