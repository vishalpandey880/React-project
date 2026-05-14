import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditProfileDialog } from '../components/profile/EditProfileDialog';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileStats } from '../components/profile/ProfileStats';
import { ProfileTabs } from '../components/profile/ProfileTabs';
import { Reveal } from '../components/reactbits/Reveal';
import { useStore } from '../context/StoreContext';

export function Profile() {
  const {
    currentUser,
    books,
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
    moveWishlistToCart,
    removeFromWishlist,
    deleteBook,
  } = useStore();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const sellingBooks = customBooks.filter((book) => book.sellerEmail === currentUser.email);
  const userReviews = useMemo(() => {
    return Object.entries(reviewsByBook).flatMap(([bookId, reviews]) =>
      reviews
        .filter((review) => review.name === currentUser.name)
        .map((review) => ({
          ...review,
          bookTitle: books.find((book) => book.id === bookId)?.title || bookId.replaceAll('-', ' '),
        })),
    );
  }, [books, currentUser.name, reviewsByBook]);
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  const completion = useMemo(() => {
    const fields = [
      currentUser.name,
      currentUser.email,
      currentUser.phone,
      currentUser.college,
      currentUser.studentId,
      currentUser.location,
      currentUser.avatar,
      currentUser.bio,
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [currentUser]);

  const stats = [
    { key: 'orders', label: 'Total orders', value: orders.length },
    { key: 'wishlist', label: 'Wishlist items', value: wishlist.length },
    { key: 'cart', label: 'Cart items', value: cart.reduce((sum, item) => sum + item.quantity, 0) },
    { key: 'selling', label: 'Books listed', value: sellingBooks.length },
    { key: 'reviews', label: 'Reviews submitted', value: userReviews.length },
    { key: 'spent', label: 'Total money spent', value: totalSpent, money: true },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <section className="page-shell sh-profile-page">
      <Reveal><ProfileHeader user={currentUser} completion={completion} onEdit={() => setEditing(true)} /></Reveal>
      <Reveal delay={80}><ProfileStats stats={stats} /></Reveal>
      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        orders={orders}
        wishlist={wishlist}
        sellingBooks={sellingBooks}
        reviews={userReviews}
        theme={theme}
        setTheme={setTheme}
        changePassword={changePassword}
        onLogout={handleLogout}
        onMoveToCart={moveWishlistToCart}
        onRemoveWishlist={removeFromWishlist}
        onDeleteBook={deleteBook}
      />
      <EditProfileDialog
        open={editing}
        user={currentUser}
        onClose={() => setEditing(false)}
        onSave={updateProfile}
      />
    </section>
  );
}
