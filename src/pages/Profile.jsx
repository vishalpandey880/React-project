import { Bell, Lock, LogOut, Moon, Sun } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditProfileForm } from '../components/EditProfileForm';
import { ProfileCard } from '../components/ProfileCard';
import { ProfileSellingBooks } from '../components/ProfileSellingBooks';
import { ProfileStats } from '../components/ProfileStats';
import { ProfileWishlist } from '../components/ProfileWishlist';
import { RecentOrders } from '../components/RecentOrders';
import { useStore } from '../context/StoreContext';

export function Profile() {
  const {
    currentUser,
    orders,
    wishlist,
    cart,
    customBooks,
    reviewsByBook,
    theme,
    setTheme,
    logout,
    updateProfile,
    changePassword,
  } = useStore();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordMessage, setPasswordMessage] = useState('');
  const [notifications, setNotifications] = useState({ orders: true, deals: true });

  const sellingBooks = customBooks.filter((book) => book.sellerEmail === currentUser.email);
  const reviewCount = useMemo(() => {
    return Object.values(reviewsByBook).flat().filter((review) => review.name === currentUser.name).length;
  }, [currentUser.name, reviewsByBook]);

  const completion = useMemo(() => {
    const fields = [currentUser.name, currentUser.email, currentUser.phone, currentUser.college, currentUser.location, currentUser.avatar];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [currentUser]);

  const stats = [
    { key: 'orders', label: 'Total orders', value: orders.length },
    { key: 'wishlist', label: 'Wishlist items', value: wishlist.length },
    { key: 'cart', label: 'Cart items', value: cart.reduce((sum, item) => sum + item.quantity, 0) },
    { key: 'selling', label: 'Books listed', value: sellingBooks.length },
    { key: 'reviews', label: 'Reviews submitted', value: reviewCount },
  ];

  const submitPassword = (event) => {
    event.preventDefault();
    const result = changePassword(passwordForm);
    setPasswordMessage(result.message);
    if (result.ok) setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <section className="page-shell profile-page">
      <ProfileCard user={currentUser} completion={completion} onEdit={() => setEditing(true)} />
      <ProfileStats stats={stats} />

      <div className="profile-dashboard-grid">
        <RecentOrders orders={orders} />
        <ProfileWishlist wishlist={wishlist} />
        <ProfileSellingBooks books={sellingBooks} />

        <section className="profile-panel account-settings">
          <div className="profile-panel-head">
            <div>
              <span className="eyebrow">Account</span>
              <h2>Settings</h2>
            </div>
          </div>

          <form className="settings-form" onSubmit={submitPassword}>
            <h3><Lock size={18} /> Change password</h3>
            {passwordMessage && <p className="settings-message">{passwordMessage}</p>}
            <input type="password" placeholder="Old password" value={passwordForm.oldPassword} onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })} required />
            <input type="password" placeholder="New password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} required />
            <input type="password" placeholder="Confirm password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} required />
            <button className="primary small">Update password</button>
          </form>

          <div className="settings-options">
            <h3><Bell size={18} /> Notifications</h3>
            <label><input type="checkbox" checked={notifications.orders} onChange={(e) => setNotifications({ ...notifications, orders: e.target.checked })} /> Order updates</label>
            <label><input type="checkbox" checked={notifications.deals} onChange={(e) => setNotifications({ ...notifications, deals: e.target.checked })} /> Student deals</label>
          </div>

          <div className="settings-actions">
            <button className="secondary" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
            <button className="ghost danger" onClick={handleLogout}>
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </section>
      </div>

      {editing && <EditProfileForm user={currentUser} onClose={() => setEditing(false)} onSave={updateProfile} />}
    </section>
  );
}
