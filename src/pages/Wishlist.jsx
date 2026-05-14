import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { WishlistItem } from '../components/WishlistItem';
import { useStore } from '../context/StoreContext';

export function Wishlist() {
  const { wishlist } = useStore();

  return (
    <section className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">Wishlist</span>
          <h1>Books saved for later</h1>
        </div>
      </div>
      {wishlist.length ? (
        <div className="stack">
          {wishlist.map((book) => <WishlistItem key={book.id} book={book} />)}
        </div>
      ) : (
        <EmptyState title="Your wishlist is empty" text="Tap the heart on any book to save it here." action={<Link className="primary" to="/books">Explore books</Link>} />
      )}
    </section>
  );
}
