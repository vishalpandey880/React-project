import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';

export function ProfileSellingBooks({ books }) {
  return (
    <section className="profile-panel">
      <div className="profile-panel-head">
        <div>
          <span className="eyebrow">Selling</span>
          <h2>Your listings</h2>
        </div>
        <Link className="secondary small" to="/sell">Sell Another Book</Link>
      </div>
      {books.length ? (
        <div className="profile-list">
          {books.slice(0, 4).map((book) => (
            <article className="selling-row" key={book.id}>
              <div>
                <strong>{book.title}</strong>
                <span>{book.condition} / {formatCurrency.format(book.price)}</span>
              </div>
              <span className="listing-status">{book.listingStatus || 'Listed'}</span>
            </article>
          ))}
        </div>
      ) : (
        <p className="panel-empty">No books listed for selling yet</p>
      )}
    </section>
  );
}
