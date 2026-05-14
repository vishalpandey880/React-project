import { Bookmark, Minus, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrency } from '../utils/formatCurrency';

export function CartItem({ item }) {
  const { updateQuantity, removeFromCart, saveForLater } = useStore();
  return (
    <article className="line-item">
      <img src={item.book.image} alt={item.book.title} />
      <div>
        <h3>{item.book.title}</h3>
        <p>{item.book.author}</p>
        <strong>{formatCurrency.format(item.book.price)}</strong>
      </div>
      <div className="quantity">
        <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus size={15} /></button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity"><Plus size={15} /></button>
      </div>
      <button className="ghost" onClick={() => saveForLater(item)}><Bookmark size={16} /> Save</button>
      <button className="ghost danger" onClick={() => removeFromCart(item.id)}><Trash2 size={16} /> Remove</button>
    </article>
  );
}
