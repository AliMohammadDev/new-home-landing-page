const RatingStars = ({ rating = 0, onRate }) => {
  return (
    <div className="flex gap-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate(star)}
          className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
