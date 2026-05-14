import { ShoppingCart, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/formatCurrency';

export function WishlistItem({ book }) {
  const { moveWishlistToCart, removeFromWishlist } = useStore();
  return (
    <article className="line-item">
      <img src={book.image} alt={book.title} />
      <div>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <strong>{formatCurrency.format(book.price)}</strong>
      </div>
      <button className="primary small" onClick={() => moveWishlistToCart(book)}><ShoppingCart size={16} /> Move to cart</button>
      <button className="ghost danger" onClick={() => removeFromWishlist(book.id)}><Trash2 size={16} /> Remove</button>
    </article>
  );
}
