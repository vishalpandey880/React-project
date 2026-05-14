import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/formatCurrency';

export function Compare() {
  const { compareBooks, toggleCompare } = useStore();

  if (!compareBooks.length) {
    return (
      <section className="page-shell">
        <EmptyState title="No books selected for compare" text="Select 2 or 3 books from the catalog to compare them side by side." action={<Link className="primary" to="/books">Browse books</Link>} />
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">Compare books</span>
          <h1>Side-by-side decision table</h1>
        </div>
      </div>
      <div className="compare-table">
        <table>
          <thead>
            <tr>
              <th>Book</th>
              {compareBooks.map((book) => <th key={book.id}>{book.title}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr><td>Price</td>{compareBooks.map((book) => <td key={book.id}>{formatCurrency.format(book.price)}</td>)}</tr>
            <tr><td>Rating</td>{compareBooks.map((book) => <td key={book.id}>{book.rating}</td>)}</tr>
            <tr><td>Author</td>{compareBooks.map((book) => <td key={book.id}>{book.author}</td>)}</tr>
            <tr><td>Genre</td>{compareBooks.map((book) => <td key={book.id}>{book.genre}</td>)}</tr>
            <tr><td>Condition</td>{compareBooks.map((book) => <td key={book.id}>{book.condition}</td>)}</tr>
            <tr><td>Stock</td>{compareBooks.map((book) => <td key={book.id}>{book.stock}</td>)}</tr>
            <tr><td>Action</td>{compareBooks.map((book) => <td key={book.id}><button className="ghost danger" onClick={() => toggleCompare(book)}>Remove</button></td>)}</tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
