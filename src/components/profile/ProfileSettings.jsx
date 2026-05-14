import { Bell, LogOut, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';

export function ProfileSettings({ theme, setTheme, changePassword, onLogout }) {
  const [notifications, setNotifications] = useState({ orders: true, deals: true, selling: false });
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [message, setMessage] = useState(null);

  const submit = (event) => {
    event.preventDefault();
    const result = changePassword(form);
    setMessage(result);
    if (result.ok) setForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="sh-settings-grid">
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Control theme and demo notification settings.</CardDescription>
        </CardHeader>
        <CardContent className="sh-list">
          <div className="sh-setting-row">
            <div><strong>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</strong><span>Saved in localStorage.</span></div>
            <Switch checked={theme === 'dark'} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
          </div>
          <Separator />
          {[
            ['orders', 'Order updates'],
            ['deals', 'Student deals'],
            ['selling', 'Selling listing alerts'],
          ].map(([key, label]) => (
            <div className="sh-setting-row" key={key}>
              <div><strong>{label}</strong><span><Bell size={14} /> Demo preference only</span></div>
              <Switch checked={notifications[key]} onCheckedChange={(checked) => setNotifications({ ...notifications, [key]: checked })} />
            </div>
          ))}
          <Button variant="destructive" onClick={onLogout}><LogOut size={16} /> Logout</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Demo validation using your localStorage user record.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="sh-password-form" onSubmit={submit}>
            {message && (
              <Alert variant={message.ok ? 'success' : 'destructive'}>
                <AlertTitle>{message.ok ? 'Success' : 'Error'}</AlertTitle>
                <AlertDescription>{message.message}</AlertDescription>
              </Alert>
            )}
            <Label>Old password<Input type="password" value={form.oldPassword} onChange={(e) => setForm({ ...form, oldPassword: e.target.value })} required /></Label>
            <Label>New password<Input type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} required /></Label>
            <Label>Confirm password<Input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required /></Label>
            <Button>Update password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
