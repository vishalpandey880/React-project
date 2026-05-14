import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { formatCurrency } from '../../utils/formatCurrency';

const statusVariant = {
  Confirmed: 'secondary',
  Packed: 'outline',
  Shipped: 'default',
  Delivered: 'success',
};

export function ProfileOrders({ orders, preview = false }) {
  const visibleOrders = preview ? orders.slice(0, 3) : orders;

  return (
    <Card>
      <CardHeader className="sh-section-head">
        <div>
          <CardTitle>{preview ? 'Recent Orders' : 'All Orders'}</CardTitle>
          <CardDescription>Track your bookstore purchases and delivery status.</CardDescription>
        </div>
        {preview && <Link className="ui-button ui-button-outline ui-button-sm" to="/orders">View all</Link>}
      </CardHeader>
      <CardContent className="sh-list">
        {visibleOrders.length ? visibleOrders.map((order) => (
          <article className="sh-order-card" key={order.id}>
            <div>
              <strong>{order.id}</strong>
              <span>{order.date}</span>
            </div>
            <div className="sh-order-books">
              {order.books.map((item) => <span key={item.id}>{item.quantity} x {item.book.title}</span>)}
            </div>
            <strong>{formatCurrency.format(order.total)}</strong>
            <Badge variant={statusVariant[order.status] || 'default'}>{order.status}</Badge>
          </article>
        )) : <EmptyCopy text="No orders yet" />}
        {!preview && orders.length > 0 && <Button asChild variant="outline"><Link to="/books">Continue shopping</Link></Button>}
      </CardContent>
    </Card>
  );
}

function EmptyCopy({ text }) {
  return <div className="sh-empty-state"><strong>{text}</strong><span>Your order history will appear here.</span></div>;
}
