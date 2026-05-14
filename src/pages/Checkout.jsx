import { CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../components/CartItem';
import { EmptyState } from '../components/EmptyState';
import { PriceSummary } from '../components/PriceSummary';
import { useStore } from '../context/StoreContext';

export function Checkout() {
  const { cart, pricing, placeOrder, currentUser } = useStore();
  const [ordered, setOrdered] = useState(null);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    college: currentUser?.college || '',
    address: currentUser?.location || '',
    paymentMethod: 'Cash on Delivery',
  });

  const updateField = (field, value) => {
    setCheckoutForm((previous) => ({ ...previous, [field]: value }));
  };

  const submitOrder = (event) => {
    event.preventDefault();
    setOrdered(placeOrder(checkoutForm));
  };

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
          <div className="stack">
            <form className="checkout-form-card" id="checkout-form" onSubmit={submitOrder}>
              <div>
                <span className="eyebrow">Delivery details</span>
                <h2>Where should we send your books?</h2>
              </div>
              <div className="form-grid">
                <label>Full name<input required value={checkoutForm.fullName} onChange={(e) => updateField('fullName', e.target.value)} /></label>
                <label>Phone<input required value={checkoutForm.phone} onChange={(e) => updateField('phone', e.target.value)} /></label>
                <label>College<input required value={checkoutForm.college} onChange={(e) => updateField('college', e.target.value)} /></label>
                <label>Payment method<select value={checkoutForm.paymentMethod} onChange={(e) => updateField('paymentMethod', e.target.value)}><option>Cash on Delivery</option><option>UPI Demo</option></select></label>
              </div>
              <label>Campus address<textarea required rows="3" value={checkoutForm.address} onChange={(e) => updateField('address', e.target.value)} /></label>
              <p className="muted">Demo checkout only. These details are saved with the order in localStorage.</p>
            </form>
            {cart.map((item) => <CartItem key={item.id} item={item} />)}
          </div>
          <PriceSummary pricing={pricing}>
            <button className="primary full" type="submit" form="checkout-form">Place order</button>
          </PriceSummary>
        </div>
      ) : (
        <EmptyState title="No books selected" text="Your checkout is empty right now." action={<Link className="primary" to="/books">Browse books</Link>} />
      )}
    </section>
  );
}
