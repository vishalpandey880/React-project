import { formatCurrency } from '../utils/formatCurrency';

export function PriceSummary({ pricing, children }) {
  return (
    <aside className="summary-card">
      <h2>Order Summary</h2>
      <div><span>Subtotal</span><strong>{formatCurrency.format(pricing.subtotal)}</strong></div>
      <div><span>Delivery</span><strong>{pricing.delivery ? formatCurrency.format(pricing.delivery) : 'Free'}</strong></div>
      <div><span>Student discount</span><strong>-{formatCurrency.format(pricing.studentDiscount || 0)}</strong></div>
      <div><span>Coupon discount</span><strong>-{formatCurrency.format(pricing.couponDiscount || 0)}</strong></div>
      <div className="grand-total"><span>Total</span><strong>{formatCurrency.format(pricing.total)}</strong></div>
      {children}
    </aside>
  );
}
