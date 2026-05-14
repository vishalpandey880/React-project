import { Heart, ShieldCheck, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/formatCurrency';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Stars } from './Stars';

function availabilityLabel(stock) {
  if (stock <= 0) return 'Out of Stock';
  if (stock <= 3) return 'Only few left';
  return 'In Stock';
}

export function QuickViewDialog({ book, open, onClose }) {
  const { addToCart, toggleWishlist, isWishlisted, saveApiBook } = useStore();

  if (!book) return null;

  const wished = isWishlisted(book.id);
  const outOfStock = book.stock <= 0;

  return (
    <Dialog open={open}>
      <DialogContent className="quick-view-dialog">
        <button className="dialog-close" onClick={onClose} aria-label="Close quick view">
          <X size={18} />
        </button>
        <div className="quick-view-grid">
          <div className="quick-view-cover">
            <img src={book.image} alt={`${book.title} cover`} />
            <Badge className={`condition-badge ${book.condition.toLowerCase().replaceAll(' ', '-')}`}>{book.condition}</Badge>
          </div>
          <div className="quick-view-copy">
            <DialogHeader>
              <DialogDescription>{book.genre}</DialogDescription>
              <DialogTitle>{book.title}</DialogTitle>
            </DialogHeader>
            <p className="muted">by {book.author}</p>
            <Stars rating={book.rating} />
            <p>{book.description}</p>
            <div className="quick-price-row">
              <strong>{formatCurrency.format(book.price)}</strong>
              <span>{formatCurrency.format(book.originalPrice)}</span>
            </div>
            <div className="seller-card">
              <div>
                <span className="muted">Student seller</span>
                <strong>{book.seller?.name || 'Digital Bookstore'}</strong>
                <p>{book.seller?.college || 'Verified student marketplace listing'}</p>
              </div>
              {book.seller?.verified && (
                <Badge className="verified-badge">
                  <ShieldCheck size={14} />
                  Verified
                </Badge>
              )}
            </div>
            <div className="quick-meta">
              <span>{book.conditionDetails || 'Checked by the student seller before listing.'}</span>
              <strong className={outOfStock ? 'danger-text' : ''}>{availabilityLabel(book.stock)}</strong>
              <span>{outOfStock ? 'Currently unavailable' : `${book.stock} copies available`}</span>
            </div>
            <DialogFooter>
              <button className="primary" onClick={() => addToCart(book)} disabled={outOfStock}>
                <ShoppingBag size={16} />
                {outOfStock ? 'Sold out' : 'Add to cart'}
              </button>
              <button className={`secondary ${wished ? 'active-heart' : ''}`} onClick={() => toggleWishlist(book)}>
                <Heart size={16} fill="currentColor" />
                {wished ? 'Wishlisted' : 'Wishlist'}
              </button>
              <Link
                className="details-link"
                to={`/books/${book.id}`}
                onClick={() => {
                  saveApiBook(book);
                  onClose();
                }}
              >
                View details
              </Link>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
