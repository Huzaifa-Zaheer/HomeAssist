import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from 'lucide-react';

export function RatingForm({ bookingId, providerName, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ bookingId, rating, comment });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold mb-4">Rate Your Experience with {providerName}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="form-label">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="text-2xl focus:outline-none"
              >
                <Star 
                  className={`h-8 w-8 ${
                    (hoveredRating || rating) >= star 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-300"
                  }`} 
                />
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="comment" className="form-label">Your Review</label>
          <textarea
            id="comment"
            className="form-input min-h-[100px]"
            placeholder="Share your experience with this service provider..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={rating === 0}
          className="btn btn-primary w-full"
        >
          Submit Review
        </button>
      </form>
    </motion.div>
  );
}

export default RatingForm;