import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';

export function RecentOrders({ orders }) {
  return (
    <section className="profile-panel">
      <div className="profile-panel-head">
        <div>
          <span className="eyebrow">Orders</span>
          <h2>Recent orders</h2>
        </div>
        <Link className="secondary small" to="/orders">View all</Link>
      </div>
      {orders.length ? (
        <div className="profile-list">
          {orders.slice(0, 3).map((order) => (
            <article className="profile-order-row" key={order.id}>
              <div>
                <strong>{order.id}</strong>
                <span>{order.date} / {order.status}</span>
              </div>
              <strong>{formatCurrency.format(order.total)}</strong>
              <Link className="ghost small" to="/orders"><Eye size={15} /> View</Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="panel-empty">No orders yet</p>
      )}
    </section>
  );
}
