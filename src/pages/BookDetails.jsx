import { Heart, Share2, ShoppingCart } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookCard } from '../components/BookCard';
import { ReviewSection } from '../components/ReviewSection';
import { Stars } from '../components/Stars';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/formatCurrency';

export function BookDetails() {
  const { id } = useParams();
  const {
    books,
    getBook,
    addToCart,
    toggleWishlist,
    isWishlisted,
    markRecentlyViewed,
    addReview,
    saveNote,
    notes,
    recentlyViewed,
  } = useStore();
  const book = getBook(id);
  const [note, setNote] = useState(notes[id] || '');

  useEffect(() => {
    if (book) markRecentlyViewed(book);
  }, [id]);

  useEffect(() => {
    setNote(notes[id] || '');
  }, [id, notes]);

  const deliveryDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 4);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }, []);

  if (!book) {
    return (
      <section className="page-shell center-copy">
        <h1>Book not found</h1>
        <Link className="primary" to="/books">Back to books</Link>
      </section>
    );
  }
  const related = books.filter((item) => item.genre === book.genre && item.id !== book.id).slice(0, 4);
  const recommendations = books.filter((item) => item.id !== book.id).sort((a, b) => b.rating - a.rating).slice(0, 4);
  const outOfStock = book.stock <= 0;

  return (
    <section className="page-shell">
      <div className="details-layout">
        <div className="details-cover">
          <img src={book.image} alt={`${book.title} cover`} />
        </div>
        <div className="details-copy">
          <span className="eyebrow">{book.genre} / {book.condition}</span>
          <h1>{book.title}</h1>
          <p className="muted">by {book.author}</p>
          <Stars rating={book.rating} />
          <p>{book.description}</p>
          <div className="detail-badges">
            <span className={outOfStock ? 'danger-text' : ''}>{outOfStock ? 'Out of Stock' : `In Stock: ${book.stock} copies`}</span>
            <span>Estimated delivery: {deliveryDate}</span>
          </div>
          <div className="details-price">
            <strong>{formatCurrency.format(book.price)}</strong>
            <span>{formatCurrency.format(book.originalPrice)}</span>
          </div>
          <div className="hero-actions">
            <button className="primary" disabled={outOfStock} onClick={() => addToCart(book)}><ShoppingCart size={18} /> {outOfStock ? 'Sold out' : 'Add to cart'}</button>
            <button className="secondary" onClick={() => toggleWishlist(book)}>
              <Heart size={18} fill={isWishlisted(book.id) ? 'currentColor' : 'none'} />
              {isWishlisted(book.id) ? 'Wishlisted' : 'Wishlist'}
            </button>
            <button className="secondary" onClick={() => navigator.clipboard.writeText(window.location.href)}><Share2 size={18} /> Share</button>
          </div>
        </div>
      </div>
      <section className="notes-card">
        <h2>Personal study notes</h2>
        <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Write private notes about this book..." />
        <button className="primary small" onClick={() => saveNote(book.id, note)}>Save note</button>
      </section>
      <ReviewSection reviews={book.reviews} onSubmit={(review) => addReview(book.id, review)} />
      <BookShelf title="Related books" books={related} />
      <BookShelf title="You may also like" books={recommendations} />
      {recentlyViewed.length > 0 && <BookShelf title="Recently viewed" books={recentlyViewed.filter((item) => item.id !== book.id)} />}
    </section>
  );
}

function BookShelf({ title, books }) {
  if (!books.length) return null;
  return (
    <section className="section">
      <div className="section-head">
        <h2>{title}</h2>
      </div>
      <div className="book-grid">
        {books.map((item) => <BookCard key={item.id} book={item} />)}
      </div>
    </section>
  );
}
