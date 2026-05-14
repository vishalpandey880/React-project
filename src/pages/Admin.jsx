import { useMemo, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/formatCurrency';

export function Admin() {
  const { books, orders, users, wishlist, cart, adminAddBook, deleteBook } = useStore();
  const [form, setForm] = useState({ title: '', author: '', genre: 'General', condition: 'New', price: '', image: '', description: '' });
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const mostSold = useMemo(() => [...books].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 5), [books]);
  const recentlyAdded = useMemo(() => [...books].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5), [books]);

  const submit = (event) => {
    event.preventDefault();
    adminAddBook({
      ...form,
      price: Number(form.price),
      originalPrice: Number(form.price),
      rating: 4,
      stock: 5,
      sold: 0,
      reviews: [],
      image: form.image || 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
    });
    setForm({ title: '', author: '', genre: 'General', condition: 'New', price: '', image: '', description: '' });
  };

  return (
    <section className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">Demo admin</span>
          <h1>Local dashboard</h1>
        </div>
      </div>
      <div className="admin-grid">
        <div><strong>{books.length}</strong><span>Total books</span></div>
        <div><strong>{orders.length}</strong><span>Total orders</span></div>
        <div><strong>{formatCurrency.format(revenue)}</strong><span>Total revenue</span></div>
        <div><strong>{users.length}</strong><span>Total users</span></div>
        <div><strong>{wishlist.length}</strong><span>Wishlist items</span></div>
        <div><strong>{cart.reduce((sum, item) => sum + item.quantity, 0)}</strong><span>Cart items</span></div>
      </div>
      <div className="dashboard-layout">
        <form className="form-card" onSubmit={submit}>
          <h2>Add book locally</h2>
          <label>Title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
          <label>Author<input required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></label>
          <label>Genre<input required value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} /></label>
          <label>Price<input required type="number" min="1" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></label>
          <label>Image URL<input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></label>
          <label>Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          <button className="primary">Add book</button>
        </form>
        <div className="stack">
          <h2>Most sold books</h2>
          {mostSold.map((book) => (
            <article className="order-card admin-book" key={book.id}>
              <div><strong>{book.title}</strong><span>{book.sold || 0} sold / stock {book.stock}</span></div>
              <button className="ghost danger" onClick={() => deleteBook(book.id)}>Delete</button>
            </article>
          ))}
          <h2>Recently added books</h2>
          {recentlyAdded.map((book) => (
            <article className="order-card admin-book" key={`recent-${book.id}`}>
              <div><strong>{book.title}</strong><span>{book.genre} / {formatCurrency.format(book.price)}</span></div>
              <button className="ghost danger" onClick={() => deleteBook(book.id)}>Delete</button>
            </article>
          ))}
          <h2>Recent orders</h2>
          {orders.slice(0, 5).map((order) => (
            <article className="order-card" key={order.id}>
              <strong>{order.id}</strong>
              <span>{order.date} / {order.status} / {formatCurrency.format(order.total)}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
