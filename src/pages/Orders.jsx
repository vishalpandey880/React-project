import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { OrderCard } from '../components/OrderCard';
import { useStore } from '../context/StoreContext';

export function Orders() {
  const { orders } = useStore();
  return (
    <section className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">Order history</span>
          <h1>Previous orders</h1>
        </div>
      </div>
      {orders.length ? (
        <div className="stack">{orders.map((order) => <OrderCard key={order.id} order={order} />)}</div>
      ) : (
        <EmptyState title="No orders placed yet" text="Placed orders will appear here with date, books, and total amount." action={<Link className="primary" to="/books">Start shopping</Link>} />
      )}
    </section>
  );
}
