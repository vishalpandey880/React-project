import { Star } from 'lucide-react';

export function Stars({ rating, compact = false }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={compact ? 14 : 16} fill={index < Math.round(rating) ? 'currentColor' : 'none'} />
      ))}
      <strong>{rating}</strong>
    </span>
  );
}
