import { X } from 'lucide-react';
import { useState } from 'react';

export function EditProfileForm({ user, onClose, onSave }) {
  const [form, setForm] = useState({
    name: user.name || '',
    phone: user.phone || '',
    college: user.college || '',
    location: user.location || '',
    avatar: user.avatar || '',
  });

  const submit = (event) => {
    event.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <form className="form-card profile-modal" onSubmit={submit}>
        <div className="modal-head">
          <div>
            <span className="eyebrow">Edit profile</span>
            <h2>Update student details</h2>
          </div>
          <button className="ghost" type="button" onClick={onClose} aria-label="Close edit profile">
            <X size={18} />
          </button>
        </div>
        <label>Full name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label>Phone number<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
        <label>College name<input value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} /></label>
        <label>Location<input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
        <label>Profile image URL<input value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} /></label>
        <button className="primary">Save profile</button>
      </form>
    </div>
  );
}
