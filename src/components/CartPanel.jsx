import { Check, Minus, Plus, Trash2 } from 'lucide-react';
import { FALLBACK_COVER } from '../constants/books';
import { formatINR } from '../utils/currency';

export function CartPanel({ cart, pricing, onUpdateQuantity, onPlaceOrder }) {
  const handleCoverError = (event, fallbackCover) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = fallbackCover;
  };

  return (
    <section className="panel-block">
      <div className="panel-title">
        <h2>Cart</h2>
        <span>{cart.length} titles</span>
      </div>
      <div className="cart-list">
        {cart.length === 0 && <p className="empty">Your cart is ready for books.</p>}
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img
              src={item.book.cover || item.book.fallbackCover || FALLBACK_COVER}
              alt={`${item.book.title} book cover`}
              onError={(event) => handleCoverError(event, item.book.fallbackCover || FALLBACK_COVER)}
            />
            <div>
              <strong>{item.book.title}</strong>
              <span>{formatINR.format(item.book.price)}</span>
              <div className="quantity">
                <button onClick={() => onUpdateQuantity(item.id, -1)} aria-label="Decrease">
                  {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, 1)} aria-label="Increase">
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="summary">
        <div>
          <span>Subtotal</span>
          <strong>{formatINR.format(pricing.subtotal)}</strong>
        </div>
        <div>
          <span>Student discount</span>
          <strong>-{formatINR.format(pricing.studentDiscount)}</strong>
        </div>
        <div>
          <span>Shipping</span>
          <strong>{pricing.shipping === 0 ? 'Free' : formatINR.format(pricing.shipping)}</strong>
        </div>
        <div className="total">
          <span>Total</span>
          <strong>{formatINR.format(pricing.total)}</strong>
        </div>
      </div>
      <button className="checkout" onClick={onPlaceOrder} disabled={!cart.length}>
        <Check size={18} />
        Place order
      </button>
    </section>
  );
}
