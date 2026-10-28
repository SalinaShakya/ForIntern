"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";

export default function ReviewsSection({ initialReviews = [] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { user, openAuthModal } = useAuth();
  const supabase = createClient();

  // Helper to extract up to 2 uppercase initials from a full name
  const getInitials = (fullName) => {
    if (!fullName) return "TL";
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleOpenModal = () => {
    // Only signed-in users can write a review
    if (!user) {
      openAuthModal("signin");
      return;
    }

    const userFullName =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "";
    setName(userFullName);
    setRating(5);
    setHoverRating(0);
    setComment("");
    setErrorMessage("");
    setSuccessMessage("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setIsModalOpen(false);
      openAuthModal("signin");
      return;
    }
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!comment.trim()) {
      setErrorMessage("Please share your thoughts in the review.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const newReviewPayload = {
        name: name.trim(),
        rating,
        comment: comment.trim(),
        is_verified: true,
      };

      const { data, error } = await supabase
        .from("reviews")
        .insert([newReviewPayload])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Optimistically add the new review to the top of the list
      if (data) {
        setReviews((prev) => [data, ...prev]);
      } else {
        setReviews((prev) => [{ ...newReviewPayload, id: Date.now() }, ...prev]);
      }

      setSuccessMessage("Thank you! Your review has been published.");
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1500);
    } catch (err) {
      console.error("Error submitting review:", err);
      setErrorMessage(err.message || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="text-black py-16 bg-[#FBF5EF] border-t border-[#FBF5EF]/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-[#3B6B4A] text-3xl font-bold">
              What Our Tea Lovers Say
            </h2>
            <div className="w-16 h-1 bg-[#3B6B4A] mx-auto sm:mx-0 mt-2 rounded-full" />
          </div>

          {/* Write a Review Button */}
          <button
            onClick={handleOpenModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3B6B4A] text-white text-sm font-semibold shadow-md hover:bg-[#2C3A1E] hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-95"
          >
            <svg
              className="w-4 h-4 fill-none stroke-currentColor stroke-2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
            Write a Review
          </button>
        </div>

        {/* Reviews Grid */}
        {reviews.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E8DFCF]/60 shadow-sm max-w-md mx-auto">
            <p className="text-[#5C6650] text-base mb-4">
              No reviews yet. Be the first tea lover to share your experience!
            </p>
            <button
              onClick={handleOpenModal}
              className="text-[#3B6B4A] font-semibold underline hover:text-[#2C3A1E] transition-colors"
            >
              Write the first review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-8 rounded-2xl border border-[#E8DFCF]/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Stars */}
                  <div className="flex gap-1 text-amber-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < (review.rating || 5)
                            ? "fill-current text-amber-500"
                            : "fill-gray-200 text-gray-200"
                        }`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-[#5C6650] italic leading-relaxed text-base mb-6">
                    "{review.comment}"
                  </p>
                </div>

                {/* User info */}
                <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                  <div className="w-12 h-12 rounded-full bg-[#EAF0EB] text-[#3B6B4A] flex items-center justify-center font-bold text-lg shadow-inner group-hover:bg-[#3B6B4A] group-hover:text-white transition-colors duration-300">
                    {getInitials(review.name)}
                  </div>
                  <div>
                    <h4 className="text-[#2C3A1E] font-bold text-sm">
                      {review.name}
                    </h4>
                    <span className="text-xs text-[#5C6650] font-medium bg-[#EAF0EB]/60 px-2 py-0.5 rounded">
                      {review.is_verified ? "Verified Buyer" : "Tea Enthusiast"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#E8DFCF] overflow-hidden p-6 sm:p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors p-1"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Title */}
            <h3 className="text-2xl font-bold text-[#2C3A1E] mb-1">
              Share Your Experience
            </h3>
            <p className="text-sm text-[#5C6650] mb-6">
              Let fellow tea lovers know what you think about our blends.
            </p>

            {/* Success Alert */}
            {successMessage && (
              <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 text-sm rounded-xl border border-emerald-200">
                {successMessage}
              </div>
            )}

            {/* Error Alert */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-rose-50 text-rose-800 text-sm rounded-xl border border-rose-200">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Signed-in account indicator */}
              {user && (
                <div className="flex items-center gap-3 p-3 bg-[#EAF0EB]/80 rounded-xl border border-[#3B6B4A]/20">
                  <div className="w-10 h-10 rounded-full bg-[#3B6B4A] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {getInitials(name || user.email)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-[#5C6650] font-medium">Reviewing as</p>
                    <p className="text-sm font-bold text-[#2C3A1E] truncate">
                      {name || user.email}
                    </p>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-[#2C3A1E] mb-2">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const activeRating = hoverRating || rating;
                    return (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                      >
                        <svg
                          className={`w-7 h-7 ${
                            star <= activeRating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-gray-200 text-gray-200"
                          } transition-colors`}
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    );
                  })}
                  <span className="text-xs font-medium text-[#5C6650] ml-2">
                    {rating === 5 && "Outstanding"}
                    {rating === 4 && "Very Good"}
                    {rating === 3 && "Average"}
                    {rating === 2 && "Not Great"}
                    {rating === 1 && "Poor"}
                  </span>
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-[#2C3A1E] mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Salina Shakya"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3B6B4A]/50 focus:border-[#3B6B4A] transition-all text-sm"
                  required
                />
              </div>

              {/* Comment Textarea */}
              <div>
                <label className="block text-sm font-semibold text-[#2C3A1E] mb-1">
                  Your Review
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did you think of the tea blend, aroma, packaging, or taste?"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3B6B4A]/50 focus:border-[#3B6B4A] transition-all text-sm resize-none"
                  required
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-[#3B6B4A] text-white text-sm font-semibold shadow hover:bg-[#2C3A1E] transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
