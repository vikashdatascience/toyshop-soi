import React, { useState } from 'react';
import { CustomerReview } from '../types/toy';
import { Star, MessageSquarePlus, X, Check, Heart } from 'lucide-react';

interface CustomerReviewsProps {
  reviews: CustomerReview[];
  onAddReview: (review: CustomerReview) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({
  reviews,
  onAddReview,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [toyPurchased, setToyPurchased] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author,
      location: location || 'Millwood Local',
      rating,
      date: 'Just now',
      toyPurchased: toyPurchased || 'Heirloom Wooden Toy',
      comment,
    };

    onAddReview(newRev);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setAuthor('');
      setLocation('');
      setToyPurchased('');
      setComment('');
    }, 1200);
  };

  return (
    <section className="py-14 sm:py-18 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Community Voices
            </div>
            <h2 className="font-serif text-3xl font-bold text-stone-900 tracking-tight">
              Stories from Local Families
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Passed-down heirlooms, weekend workshop memories, and generations of playtime.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-stone-300 rounded-lg text-xs font-medium text-stone-800 hover:bg-stone-50 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-amber-800" />
            <span>Share Your Family's Story</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 rounded-xl border border-stone-200/90 shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-current text-amber-500' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.date}</span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-stone-900">{rev.author}</div>
                  <div className="text-[11px] text-stone-500">{rev.location}</div>
                </div>
                <div className="text-[10px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded font-medium line-clamp-1 max-w-[120px]">
                  {rev.toyPurchased}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-stone-200 animate-in fade-in duration-200">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900">
                  Thank You for Sharing Your Story!
                </h4>
                <p className="text-xs text-stone-600">
                  Arthur, Clara, and our workshop team treasure every family note.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    Share Your Family's Experience
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Your words inspire future generations of neighborhood toymakers.
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Maria Gonzalez"
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        Neighborhood
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Millwood North"
                        className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-800"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-stone-700 mb-1">
                        Toy or Event
                      </label>
                      <input
                        type="text"
                        value={toyPurchased}
                        onChange={(e) => setToyPurchased(e.target.value)}
                        placeholder="e.g. Rocking Horse"
                        className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setRating(s)}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              s <= rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">
                      Your Story or Review *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us how the toy brought joy or how your workshop visit went..."
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-800"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2D2A26] hover:bg-stone-800 text-amber-50 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                  >
                    Publish Note
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
