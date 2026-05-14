import { CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../components/CartItem';
import { EmptyState } from '../components/EmptyState';
import { PriceSummary } from '../components/PriceSummary';
import { useStore } from '../context/StoreContext';

export function Checkout() {
  const { cart, pricing, placeOrder } = useStore();
  const [ordered, setOrdered] = useState(null);

  if (ordered) {
    return (
      <section className="page-shell center-copy">
        <CheckCircle size={54} className="success-icon" />
        <h1>Order placed</h1>
        <p>Your order {ordered.id} has been saved to order history.</p>
        <Link className="primary" to="/orders">View orders</Link>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">Checkout</span>
          <h1>Order summary</h1>
        </div>
      </div>
      {cart.length ? (
        <div className="checkout-layout">
          <div className="stack">{cart.map((item) => <CartItem key={item.id} item={item} />)}</div>
          <PriceSummary pricing={pricing}>
            <button className="primary full" onClick={() => setOrdered(placeOrder())}>Place order</button>
          </PriceSummary>
        </div>
      ) : (
        <EmptyState title="No books selected" text="Your checkout is empty right now." action={<Link className="primary" to="/books">Browse books</Link>} />
      )}
    </section>
  );
}
