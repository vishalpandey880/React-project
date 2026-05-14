import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <strong>Digital Bookstore</strong>
        <span>Made for students who buy smarter, sell faster, and keep books in circulation.</span>
      </div>
      <div className="footer-grid">
        <div>
          <h3>Marketplace</h3>
          <Link to="/books">Browse books</Link>
          <Link to="/sell">Sell used book</Link>
          <Link to="/compare">Compare</Link>
        </div>
        <div>
          <h3>Account</h3>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
        </div>
        <div>
          <h3>Student support</h3>
          <Link to="/about">Project details</Link>
          <a href="mailto:support@digitalbookstore.local">support@digitalbookstore.local</a>
          <span>Campus pickup · COD · UPI demo</span>
        </div>
        <div>
          <h3>Social</h3>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          <span>Built with React, localStorage, and student-first workflows.</span>
        </div>
      </div>
    </footer>
  );
}
