import { formatCurrency } from '../utils/formatCurrency';

export function OrderCard({ order }) {
  const steps = ['Confirmed', 'Packed', 'Shipped', 'Delivered'];
  const activeIndex = steps.indexOf(order.status || 'Confirmed');
  const progress = ((activeIndex + 1) / steps.length) * 100;

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
      {order.checkoutDetails && (
        <div className="order-delivery-card">
          <div>
            <span>Deliver to</span>
            <strong>{order.checkoutDetails.fullName}</strong>
            <p>{order.checkoutDetails.college} · {order.checkoutDetails.paymentMethod}</p>
          </div>
          <p>{order.checkoutDetails.address}</p>
        </div>
      )}
      <div className="status-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="status-track status-timeline">
        {steps.map((step, index) => (
          <span className={index <= activeIndex ? 'active' : ''} key={step}>
            <i>{index + 1}</i>
            {step}
          </span>
        ))}
      </div>
    </article>
  );
}
