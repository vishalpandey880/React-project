import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    const result = login(form);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate(location.state?.from || '/books');
  };

  return (
    <section className="auth-page">
      <form className="form-card" onSubmit={submit}>
        <span className="eyebrow">Welcome back</span>
        <h1>Login to Digital Bookstore</h1>
        {error && <p className="form-error">{error}</p>}
        <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label>Password<input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
        <button className="primary full">Login</button>
        <p>New here? <Link to="/signup">Create an account</Link></p>
      </form>
    </section>
  );
}
