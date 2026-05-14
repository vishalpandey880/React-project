import { GitCompare, Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Stars } from './Stars';

export function BookCard({ book }) {
  const { addToCart, toggleWishlist, isWishlisted, toggleCompare, compareIds } = useStore();
  const wished = isWishlisted(book.id);
  const outOfStock = book.stock <= 0;

  return (
    <article className="book-card">
      <Link to={`/books/${book.id}`} className="book-cover">
        <img src={book.image} alt={`${book.title} cover`} />
        <span>{book.condition}</span>
      </Link>
      <div className={`stock-pill ${outOfStock ? 'out' : ''}`}>{outOfStock ? 'Out of Stock' : `${book.stock} in stock`}</div>
      <button
        className={`wishlist-button ${wished ? 'active' : ''}`}
        onClick={() => toggleWishlist(book)}
        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart size={18} fill="currentColor" />
      </button>
      <div className="book-body">
        <div className="book-kicker">
          <span>{book.genre}</span>
          <Stars rating={book.rating} compact />
        </div>
        <Link to={`/books/${book.id}`} className="book-title">{book.title}</Link>
        <p className="muted">by {book.author}</p>
        <p>{book.description}</p>
        <div className="card-actions-row">
          <Link className="details-link" to={`/books/${book.id}`}>View Details</Link>
          <button className={`compare-chip ${compareIds.includes(book.id) ? 'active' : ''}`} onClick={() => toggleCompare(book)}>
            <GitCompare size={15} />
            Compare
          </button>
        </div>
        <div className="price-row">
          <div>
            <strong>{formatCurrency.format(book.price)}</strong>
            <span>{formatCurrency.format(book.originalPrice)}</span>
          </div>
          <button className="primary small" onClick={() => addToCart(book)} disabled={outOfStock}>
            <ShoppingBag size={16} />
            {outOfStock ? 'Sold out' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
}
