import { BookOpenCheck, Heart, MessageSquareText, PackageCheck, ShoppingCart, Wallet } from 'lucide-react';
import { AnimatedNumber } from '../reactbits/AnimatedNumber';
import { SpotlightCard } from '../reactbits/SpotlightCard';
import { Card, CardContent } from '../ui/card';
import { formatCurrency } from '../../utils/formatCurrency';

const icons = {
  orders: PackageCheck,
  wishlist: Heart,
  cart: ShoppingCart,
  selling: BookOpenCheck,
  reviews: MessageSquareText,
  spent: Wallet,
};

export function ProfileStats({ stats }) {
  return (
    <section className="sh-stats-grid">
      {stats.map((stat) => {
        const Icon = icons[stat.key];
        return (
          <SpotlightCard as={Card} className="sh-stat-card" key={stat.key}>
            <CardContent>
              <span><Icon size={20} /></span>
              <strong>
                <AnimatedNumber
                  value={stat.value}
                  formatter={(item) => (stat.money ? formatCurrency.format(item) : item)}
                />
              </strong>
              <p>{stat.label}</p>
            </CardContent>
          </SpotlightCard>
        );
      })}
    </section>
  );
}
