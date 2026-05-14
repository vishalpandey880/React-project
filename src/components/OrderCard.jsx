import { formatCurrency } from '../utils/formatCurrency';

export function OrderCard({ order }) {
  const steps = ['Confirmed', 'Packed', 'Shipped', 'Delivered'];
  const activeIndex = steps.indexOf(order.status || 'Confirmed');

  return (
    <article className="order-card">
      <div className="order-head">
        <div>
          <span>Order ID</span>
          <strong>{order.id}</strong>
        </div>
        <div>
          <span>Date</span>
          <strong>{order.date}</strong>
        </div>
        <div>
          <span>Total</span>
          <strong>{formatCurrency.format(order.total)}</strong>
        </div>
      </div>
      <div className="order-books">
        {order.books.map((item) => (
          <span key={item.id}>{item.quantity} x {item.book.title}</span>
        ))}
      </div>
      <div className="status-track">
        {steps.map((step, index) => (
          <span className={index <= activeIndex ? 'active' : ''} key={step}>{step}</span>
        ))}
      </div>
    </article>
  );
}
