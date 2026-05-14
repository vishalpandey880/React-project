import { ArrowRight, BadgeCheck, BookOpenCheck, HeartHandshake, SearchCheck, ShoppingBag, Star, Store, Truck, WalletCards } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BookCard } from '../components/BookCard';
import { EmptyState } from '../components/EmptyState';
import { MagneticButton } from '../components/reactbits/MagneticButton';
import { ReactBitsBackground } from '../components/reactbits/ReactBitsBackground';
import { Reveal } from '../components/reactbits/Reveal';
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
      <ReactBitsBackground className="hero">
        <div className="hero-copy">
          <span className="eyebrow">New and used textbooks</span>
          <h1>Buy, sell, and discover affordable books for students.</h1>
          <p>
            A campus-style marketplace for course books, used copies, wishlists, comparisons,
            and student listings without the clutter of a generic store.
          </p>
          <div className="hero-trust-row">
            <span><BookOpenCheck size={15} /> Used books from students</span>
            <span><WalletCards size={15} /> Affordable prices</span>
            <span><HeartHandshake size={15} /> Wishlist & compare</span>
          </div>
          <div className="hero-actions">
            <MagneticButton><Link className="primary" to="/books">Browse Books <ArrowRight size={18} /></Link></MagneticButton>
            <MagneticButton><Link className="secondary" to="/sell">Sell Used Book</Link></MagneticButton>
          </div>
          <div className="hero-stats-row">
            <div><strong>500+</strong><span>Books Listed</span></div>
            <div><strong>120+</strong><span>Student Sellers</span></div>
            <div><strong>4.8</strong><span>Average Rating</span></div>
          </div>
        </div>
        <div className="hero-market-card" aria-hidden="true">
          <div className="market-card-head">
            <span>Today on campus</span>
            <strong>Book exchange board</strong>
          </div>
          <div className="market-search"><SearchCheck size={17} /> Search syllabus books</div>
          <div className="market-book-stack">
            {featured.slice(0, 2).map((book) => (
              <div className="market-book-row" key={book.id}>
                <img src={book.image} alt="" />
                <div>
                  <strong>{book.title}</strong>
                  <span>{book.condition} / ₹{book.price}</span>
                </div>
                <span><Star size={13} fill="currentColor" /> {book.rating}</span>
              </div>
            ))}
          </div>
          <div className="market-card-foot">
            <span>Available today</span>
            <strong>Campus pickup or delivery</strong>
          </div>
        </div>
      </ReactBitsBackground>

      <Reveal as="section" className="feature-strip">
        <div><BadgeCheck /><strong>Verified listings</strong><span>Clear condition and pricing.</span></div>
        <div><WalletCards /><strong>Student discount</strong><span>Automatic 10% discount in cart.</span></div>
        <div><Truck /><strong>Fast delivery</strong><span>Free delivery on orders over ₹1,499.</span></div>
      </Reveal>

      <Reveal as="section" className="section">
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
      </Reveal>
      <BookShelf title="Best sellers" eyebrow="Popular" books={bestSellers} />
      <BookShelf title="Used books under ₹300" eyebrow="Save more" books={budgetUsed} />
      <BookShelf title="Top Rated Books" eyebrow="Student picks" books={topRated} />
      <BookShelf title="New arrivals" eyebrow="Fresh listings" books={newArrivals} />
      <Reveal as="section" className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">How it works</span>
            <h2>Simple book buying for campus life</h2>
            <p>Find the right copy, compare value, and checkout or list your own used books in minutes.</p>
          </div>
        </div>
        <div className="how-grid">
          <div><SearchCheck /><strong>Find a course book</strong><span>Search by title, author, genre, condition, price, and rating.</span></div>
          <div><ShoppingBag /><strong>Buy or wishlist</strong><span>Add to cart, compare options, or save books for later.</span></div>
          <div><Store /><strong>Sell after semester</strong><span>List used books locally so another student can save money.</span></div>
        </div>
      </Reveal>
      {recentlyViewed.length > 0 ? (
        <BookShelf title="Recently viewed" eyebrow="Continue browsing" books={recentlyViewed} />
      ) : (
        <section className="section">
          <EmptyState title="No recently viewed books" text="Open a book details page and it will appear here for quick access." />
        </section>
      )}
      <Reveal as="section" className="discount-banner">
        <div>
          <span className="eyebrow">Student discount</span>
          <h2>Use STUDENT10, BOOK50, or FREESHIP at checkout.</h2>
        </div>
        <Link className="secondary" to="/books">Shop deals</Link>
      </Reveal>
      <Reveal as="section" className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">Why choose us</span>
            <h2>Why Students Choose Us</h2>
          </div>
        </div>
        <div className="why-grid">
          <div><strong>Budget-first</strong><span>Compare new and used books before you buy.</span></div>
          <div><strong>Campus selling</strong><span>List books locally using only browser storage.</span></div>
          <div><strong>Study tools</strong><span>Save notes, reviews, and recently viewed books.</span></div>
        </div>
      </Reveal>
    </>
  );
}

function BookShelf({ title, eyebrow, books }) {
  if (!books.length) return null;
  return (
    <Reveal as="section" className="section">
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
    </Reveal>
  );
}
