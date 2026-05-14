import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { formatCurrency } from '../../utils/formatCurrency';

export function ProfileWishlist({ wishlist, onMoveToCart, onRemove, preview = false }) {
  const visibleBooks = preview ? wishlist.slice(0, 4) : wishlist;

  return (
    <Card>
      <CardHeader className="sh-section-head">
        <div>
          <CardTitle>{preview ? 'Wishlist Preview' : 'Wishlist Books'}</CardTitle>
          <CardDescription>Books you saved for later purchase.</CardDescription>
        </div>
        {preview && <Link className="ui-button ui-button-outline ui-button-sm" to="/wishlist">View Wishlist</Link>}
      </CardHeader>
      <CardContent className="sh-book-list">
        {visibleBooks.length ? visibleBooks.map((book) => (
          <article className="sh-wishlist-row" key={book.id}>
            <img src={book.image} alt={book.title} />
            <div>
              <Link to={`/books/${book.id}`}><strong>{book.title}</strong></Link>
              <span>{book.author}</span>
              <div className="sh-row-meta">
                <Badge variant="outline">{formatCurrency.format(book.price)}</Badge>
                <span><Star size={14} fill="currentColor" /> {book.rating}</span>
              </div>
            </div>
            {!preview && (
              <div className="sh-row-actions">
                <Button size="sm" onClick={() => onMoveToCart(book)}>Move to cart</Button>
                <Button size="sm" variant="destructive" onClick={() => onRemove(book.id)}>Remove</Button>
              </div>
            )}
          </article>
        )) : <div className="sh-empty-state"><strong>No wishlist items yet</strong><span>Save books from the catalog to see them here.</span></div>}
      </CardContent>
    </Card>
  );
}
