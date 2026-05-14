import { useState } from 'react';
import { useStore } from '../context/StoreContext';

export function SellBook() {
  const { addUsedBook } = useStore();
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    condition: 'Good',
    price: '',
    originalPrice: '',
    contact: '',
    image: '',
    description: '',
  });

  const submit = (event) => {
    event.preventDefault();
    addUsedBook({
      ...form,
      image: form.image || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80',
      description: form.description || `Student-listed ${form.condition.toLowerCase()} book. Contact: ${form.contact}`,
    });
    setForm({ title: '', author: '', genre: '', condition: 'Good', price: '', originalPrice: '', contact: '', image: '', description: '' });
  };

  return (
    <section className="page-shell">
      <form className="form-card wide" onSubmit={submit}>
        <span className="eyebrow">Student marketplace</span>
        <h1>Sell your used book</h1>
        <div className="form-grid">
          <label>Book title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
          <label>Author<input required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></label>
          <label>Genre<input required value={form.genre} onChange={(e) => setForm({ ...form, genre: e.target.value })} /></label>
          <label>Condition<select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })}><option>New</option><option>Like New</option><option>Good</option><option>Fair</option><option>Old but usable</option></select></label>
          <label>Price<input required type="number" min="1" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></label>
          <label>Original price<input required type="number" min="1" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} /></label>
          <label>Contact<input required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></label>
          <label>Image URL<input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></label>
        </div>
        <label>Description<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
        <button className="primary">Submit listing</button>
      </form>
    </section>
  );
}
