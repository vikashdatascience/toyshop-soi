import React, { useState } from 'react';
import { StoreEvent } from '../types/toy';
import { X, Calendar, Clock, Users, Check, Sparkles, MapPin } from 'lucide-react';

interface EventsCalendarModalProps {
  events: StoreEvent[];
  isOpen: boolean;
  onClose: () => void;
}

export const EventsCalendarModal: React.FC<EventsCalendarModalProps> = ({
  events,
  isOpen,
  onClose,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<StoreEvent | null>(null);
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [childCount, setChildCount] = useState(1);
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !email) return;
    setRsvpConfirmed(true);
  };

  const handleReset = () => {
    setSelectedEvent(null);
    setParentName('');
    setEmail('');
    setChildCount(1);
    setRsvpConfirmed(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
              Community Calendar
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Workshop Sessions & Storytime
            </h3>
          </div>
          <button
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/50"
            aria-label="Close events"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {rsvpConfirmed && selectedEvent ? (
            <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-xl font-bold text-emerald-950">
                Seat Reserved! We Can't Wait to See You.
              </h4>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                A confirmation voucher has been held for <strong>{parentName}</strong> ({childCount} {childCount === 1 ? 'child' : 'children'}) for <strong>{selectedEvent.title}</strong> at 42 Elm Street.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-medium rounded-lg cursor-pointer transition-colors"
                >
                  View other sessions
                </button>
              </div>
            </div>
          ) : selectedEvent ? (
            /* RSVP Form for selected event */
            <form onSubmit={handleRSVP} className="space-y-4">
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/70">
                <div className="text-xs font-semibold text-amber-900">{selectedEvent.title}</div>
                <div className="text-xs text-stone-600 mt-1">{selectedEvent.dayTime}</div>
                <div className="text-[11px] text-stone-500 mt-0.5">
                  Instructor: {selectedEvent.instructor} · {selectedEvent.cost}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address (for reminder & materials note) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Number of Children Attending
                  </label>
                  <select
                    value={childCount}
                    onChange={(e) => setChildCount(Number(e.target.value))}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-800 bg-white"
                  >
                    <option value={1}>1 Child</option>
                    <option value={2}>2 Children</option>
                    <option value={3}>3 Children</option>
                    <option value={4}>4 Children</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-300 rounded-lg cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#2D2A26] hover:bg-stone-800 text-amber-50 text-xs font-medium rounded-lg cursor-pointer transition-colors shadow-xs"
                >
                  Confirm Free Reservation
                </button>
              </div>
            </form>
          ) : (
            /* Events List */
            <div className="space-y-4">
              {events.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-stone-200 bg-white hover:border-amber-700/60 transition-colors flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-serif text-base font-bold text-stone-900">
                        {item.title}
                      </h4>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {item.cost}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                      <span className="flex items-center gap-1 text-amber-900 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {item.dayTime}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.ageRecommendation}</span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      {item.seatsLeft} workbench spots remaining
                    </span>

                    <button
                      onClick={() => setSelectedEvent(item)}
                      className="px-3.5 py-1.5 bg-[#2D2A26] hover:bg-stone-800 text-amber-50 rounded-lg font-medium cursor-pointer transition-colors"
                    >
                      RSVP Spot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
          <span>Location: 42 Elm Street Workshop Floor</span>
          <span>Questions? Call (555) 382-7688</span>
        </div>
      </div>
    </div>
  );
};
