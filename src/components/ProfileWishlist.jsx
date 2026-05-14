import { Link } from 'react-router-dom';
import { Stars } from './Stars';
import { formatCurrency } from '../utils/formatCurrency';

export function ProfileWishlist({ wishlist }) {
  return (
    <section className="profile-panel">
      <div className="profile-panel-head">
        <div>
          <span className="eyebrow">Wishlist</span>
          <h2>Saved books</h2>
        </div>
        <Link className="secondary small" to="/wishlist">View Wishlist</Link>
      </div>
      {wishlist.length ? (
        <div className="profile-book-list">
          {wishlist.slice(0, 4).map((book) => (
            <Link className="profile-book-row" to={`/books/${book.id}`} key={book.id}>
              <img src={book.image} alt={book.title} />
              <div>
                <strong>{book.title}</strong>
                <span>{formatCurrency.format(book.price)}</span>
                <Stars rating={book.rating} compact />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="panel-empty">No wishlist items yet</p>
      )}
    </section>
  );
}
