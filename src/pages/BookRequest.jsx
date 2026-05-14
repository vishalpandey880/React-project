import { useState } from 'react';
import { useStore } from '../context/StoreContext';

export function BookRequest() {
  const { addRequest, requests } = useStore();
  const [form, setForm] = useState({ title: '', author: '', subject: '', urgency: 'Normal', contact: '' });

  const submit = (event) => {
    event.preventDefault();
    addRequest(form);
    setForm({ title: '', author: '', subject: '', urgency: 'Normal', contact: '' });
  };

  return (
    <section className="page-shell">
      <form className="form-card wide" onSubmit={submit}>
        <span className="eyebrow">Can’t find a book?</span>
        <h1>Request a book</h1>
        <div className="form-grid">
          <label>Book title<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
          <label>Author<input required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></label>
          <label>Subject<input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></label>
          <label>Urgency<select value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value })}><option>Normal</option><option>Urgent</option><option>This week</option></select></label>
          <label>Contact<input required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></label>
        </div>
        <button className="primary">Submit request</button>
      </form>

      <div className="stack request-list">
        {requests.map((request) => (
          <article className="order-card" key={request.id}>
            <strong>{request.title}</strong>
            <span>{request.author} / {request.subject} / {request.urgency}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
