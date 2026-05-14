import { BookMarked, Heart, MessageSquareText, PackageCheck, ShoppingCart } from 'lucide-react';

const icons = {
  orders: PackageCheck,
  wishlist: Heart,
  cart: ShoppingCart,
  selling: BookMarked,
  reviews: MessageSquareText,
};

export function ProfileStats({ stats }) {
  return (
    <section className="profile-stats">
      {stats.map((item) => {
        const Icon = icons[item.key];
        return (
          <div className="profile-stat-card" key={item.key}>
            <span><Icon size={20} /></span>
            <strong>{item.value}</strong>
            <p>{item.label}</p>
          </div>
        );
      })}
    </section>
  );
}
