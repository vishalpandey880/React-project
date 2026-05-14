import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export function Signup() {
  const { signup } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const result = signup(form);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate('/books');
  };

  return (
    <section className="auth-page">
      <form className="form-card" onSubmit={submit}>
        <span className="eyebrow">Student account</span>
        <h1>Create your bookstore profile</h1>
        {error && <p className="form-error">{error}</p>}
        <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Password<input type="password" required minLength="4" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <button className="primary full">Sign up</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}
