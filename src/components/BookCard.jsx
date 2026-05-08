import { Heart, ShoppingBag, Star } from 'lucide-react';
import { FALLBACK_COVER } from '../constants/books';
import { formatINR } from '../utils/currency';

export function BookCard({ book, wishlisted, onAddToCart, onToggleWishlist }) {
  const fallbackCover = book.fallbackCover || FALLBACK_COVER;

  const handleCoverError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackCover;
  };

  return (
    <article className="book-card">
      <div className="cover-wrap">
        <img
          src={book.cover || fallbackCover}
          alt={`${book.title} book cover`}
          onError={handleCoverError}
        />
        <button
          className={`icon-button ${wishlisted ? 'active' : ''}`}
          onClick={() => onToggleWishlist(book)}
          aria-label={`Toggle wishlist for ${book.title}`}
          title="Add to wishlist"
        >
          <Heart size={18} fill="currentColor" />
        </button>
      </div>
      <div className="book-content">
        <div className="book-meta">
          <span>{book.genre}</span>
          <span>{book.condition}</span>
        </div>
        <h3>{book.title}</h3>
        <p className="author">by {book.author}</p>
        <div className="rating">
          <Star size={17} fill="currentColor" />
          <strong>{book.rating}</strong>
          <span>({book.reviews})</span>
        </div>
        <p className="review">"{book.reviewText}"</p>
        <div className="tag-row">
          {book.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="buy-row">
          <div>
            <strong>{formatINR.format(book.price)}</strong>
            {book.originalPrice !== book.price && <span>{formatINR.format(book.originalPrice)}</span>}
          </div>
          <button onClick={() => onAddToCart(book)}>
            <ShoppingBag size={17} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
