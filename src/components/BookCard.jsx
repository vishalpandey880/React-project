import { Eye, GitCompare, Heart, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/formatCurrency';
import { QuickViewDialog } from './QuickViewDialog';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { Stars } from './Stars';

export function BookCard({ book }) {
  const { addToCart, toggleWishlist, isWishlisted, toggleCompare, compareIds, saveApiBook } = useStore();
  const [quickOpen, setQuickOpen] = useState(false);
  const wished = isWishlisted(book.id);
  const outOfStock = book.stock <= 0;
  const availability = outOfStock ? 'Out of Stock' : book.stock <= 3 ? 'Only few left' : 'In Stock';

  return (
    <>
      <SpotlightCard as="article" className="book-card">
        <Link to={`/books/${book.id}`} className="book-cover" onClick={() => saveApiBook(book)}>
          <img src={book.image} alt={`${book.title} cover`} />
          <span className={`condition-badge ${book.condition.toLowerCase().replaceAll(' ', '-')}`}>{book.condition}</span>
        </Link>
        <div className={`stock-pill ${outOfStock ? 'out' : book.stock <= 3 ? 'few' : ''}`}>{availability}</div>
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
          <Link to={`/books/${book.id}`} className="book-title" onClick={() => saveApiBook(book)} title={book.title}>{book.title}</Link>
          <p className="muted book-author" title={book.author}>by {book.author}</p>
          <div className="seller-line">
            <ShieldCheck size={14} />
            <span title={`${book.seller?.name || 'Student seller'} · ${book.seller?.college || 'Campus listing'}`}>
              {book.seller?.name || 'Student seller'} · {book.seller?.college || 'Campus listing'}
            </span>
          </div>
          <p className="book-description" title={book.description}>{book.description}</p>
          <div className="card-actions-grid">
            <button className="details-link quick-link" onClick={() => setQuickOpen(true)}>
              <Eye size={15} />
              Quick view
            </button>
            <Link className="details-link" to={`/books/${book.id}`} onClick={() => saveApiBook(book)}>Details</Link>
            <button className={`compare-chip ${compareIds.includes(book.id) ? 'active' : ''}`} onClick={() => toggleCompare(book)}>
              <GitCompare size={15} />
              Compare
            </button>
            <button className="primary small add-cart-button" onClick={() => addToCart(book)} disabled={outOfStock}>
              <ShoppingBag size={16} />
              {outOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
          <div className="price-row">
            <div>
              <strong>{formatCurrency.format(book.price)}</strong>
              <span>{formatCurrency.format(book.originalPrice)}</span>
            </div>
          </div>
        </div>
      </SpotlightCard>
      <QuickViewDialog book={book} open={quickOpen} onClose={() => setQuickOpen(false)} />
    </>
  );
}
