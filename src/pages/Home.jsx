import { ArrowRight, BadgeCheck, Truck, WalletCards } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BookCard } from '../components/BookCard';
import { EmptyState } from '../components/EmptyState';
import { useStore } from '../context/StoreContext';

export function Home() {
  const { books, recentlyViewed } = useStore();
  const featured = books.filter((book) => book.rating >= 4.8).slice(0, 4);
  const bestSellers = [...books].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 4);
  const topRated = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const budgetUsed = books.filter((book) => book.condition === 'Used' && book.price <= 300).slice(0, 4);
  const newArrivals = [...books].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">New and used textbooks</span>
          <h1>Buy, sell, and discover affordable books made for students.</h1>
          <p>
            Browse curated books for computer science, business, science, literature, design, and more.
            Save favorites, compare prices, and checkout in seconds.
          </p>
          <div className="hero-actions">
            <Link className="primary" to="/books">Browse books <ArrowRight size={18} /></Link>
            <Link className="secondary" to="/about">Learn more</Link>
          </div>
        </div>
        <div className="hero-showcase" aria-hidden="true">
          {featured.slice(0, 3).map((book) => <img key={book.id} src={book.image} alt="" />)}
        </div>
      </section>

      <section className="feature-strip">
        <div><BadgeCheck /><strong>Verified listings</strong><span>Clear condition and pricing.</span></div>
        <div><WalletCards /><strong>Student discount</strong><span>Automatic 10% discount in cart.</span></div>
        <div><Truck /><strong>Fast delivery</strong><span>Free delivery on orders over ₹1,499.</span></div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Top rated</span>
            <h2>Books students keep recommending</h2>
          </div>
          <Link to="/books">View all</Link>
        </div>
        <div className="book-grid">
          {featured.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </section>
      <BookShelf title="Best sellers" eyebrow="Popular" books={bestSellers} />
      <BookShelf title="Top-rated books" eyebrow="Student picks" books={topRated} />
      <BookShelf title="Used books under ₹300" eyebrow="Save more" books={budgetUsed} />
      <BookShelf title="New arrivals" eyebrow="Fresh listings" books={newArrivals} />
      {recentlyViewed.length > 0 ? (
        <BookShelf title="Recently viewed" eyebrow="Continue browsing" books={recentlyViewed} />
      ) : (
        <section className="section">
          <EmptyState title="No recently viewed books" text="Open a book details page and it will appear here for quick access." />
        </section>
      )}
      <section className="discount-banner">
        <div>
          <span className="eyebrow">Student discount</span>
          <h2>Use STUDENT10, BOOK50, or FREESHIP at checkout.</h2>
        </div>
        <Link className="secondary" to="/books">Shop deals</Link>
      </section>
      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Why choose us</span>
            <h2>Built around student buying habits</h2>
          </div>
        </div>
        <div className="why-grid">
          <div><strong>Budget-first</strong><span>Compare new and used books before you buy.</span></div>
          <div><strong>Campus selling</strong><span>List books locally using only browser storage.</span></div>
          <div><strong>Study tools</strong><span>Save notes, reviews, and recently viewed books.</span></div>
        </div>
      </section>
    </>
  );
}

function BookShelf({ title, eyebrow, books }) {
  if (!books.length) return null;
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
        </div>
        <Link to="/books">View all</Link>
      </div>
      <div className="book-grid">
        {books.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
    </section>
  );
}
