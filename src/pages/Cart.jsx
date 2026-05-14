import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../components/CartItem';
import { EmptyState } from '../components/EmptyState';
import { PriceSummary } from '../components/PriceSummary';
import { useStore } from '../context/StoreContext';
import { BookCard } from '../components/BookCard';
import { useState } from 'react';

export function Cart() {
  const { cart, pricing, applyCoupon, coupon, couponMessage, clearCoupon, savedForLater, placeOrder } = useStore();
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const orderNow = () => {
    const order = placeOrder();
    if (order) navigate('/orders');
  };

  return (
    <section className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">Shopping cart</span>
          <h1>Your selected books</h1>
        </div>
      </div>

      {cart.length ? (
        <div className="checkout-layout">
          <div className="stack">
            {cart.map((item) => <CartItem key={item.id} item={item} />)}
          </div>
          <PriceSummary pricing={pricing}>
            <form className="coupon-box" onSubmit={(event) => { event.preventDefault(); applyCoupon(code); }}>
              <input value={code} onChange={(event) => setCode(event.target.value)} placeholder="Coupon code" />
              <button className="secondary">Apply</button>
            </form>
            {couponMessage && <p className={`coupon-message ${coupon ? 'valid' : ''}`}>{couponMessage}</p>}
            {coupon && <button className="ghost full" onClick={clearCoupon}>Remove coupon</button>}
            <button className="primary full" onClick={orderNow}>Place order</button>
            <Link className="primary full" to="/checkout">Checkout</Link>
          </PriceSummary>
        </div>
      ) : (
        <EmptyState title="Your cart is empty" text="Add books from the catalog to start an order." action={<Link className="primary" to="/books">Browse books</Link>} />
      )}
      {savedForLater.length > 0 && (
        <section className="section">
          <div className="section-head"><h2>Saved for later</h2></div>
          <div className="book-grid">{savedForLater.map((book) => <BookCard key={book.id} book={book} />)}</div>
        </section>
      )}
    </section>
  );
}
