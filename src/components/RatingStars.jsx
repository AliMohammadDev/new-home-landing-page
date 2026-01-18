import { useState } from 'react';

const RatingStars = ({ rating = 0, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || rating;

  return (
    <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={(e) => {
            e.stopPropagation();
            onRate(star);
          }}
          onMouseEnter={() => setHoverRating(star)}
          className={`text-xl transition-colors duration-200 cursor-pointer ${star <= displayRating ? 'text-yellow-400' : 'text-gray-300'
            } hover:scale-110 transform`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;