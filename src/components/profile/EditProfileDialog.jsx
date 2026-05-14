import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export function EditProfileDialog({ open, user, onClose, onSave }) {
  const [form, setForm] = useState({
    name: user.name || '',
    phone: user.phone || '',
    college: user.college || '',
    studentId: user.studentId || '',
    location: user.location || '',
    avatar: user.avatar || '',
    bio: user.bio || '',
  });

  const submit = (event) => {
    event.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <form className="sh-dialog-form" onSubmit={submit}>
          <DialogHeader>
            <div>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Update your student account dashboard details.</DialogDescription>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close dialog">
              <X size={17} />
            </Button>
          </DialogHeader>
          <div className="sh-form-grid">
            <Label>Full name<Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Label>
            <Label>Phone number<Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Label>
            <Label>College name<Input value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} /></Label>
            <Label>Student ID<Input value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })} /></Label>
            <Label>Location<Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></Label>
            <Label>Profile image URL<Input value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} /></Label>
          </div>
          <Label>Bio<Textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></Label>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
