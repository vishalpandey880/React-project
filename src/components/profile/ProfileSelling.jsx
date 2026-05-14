import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { formatCurrency } from '../../utils/formatCurrency';

export function ProfileSelling({ books, onDelete, preview = false }) {
  const visibleBooks = preview ? books.slice(0, 4) : books;

  return (
    <Card>
      <CardHeader className="sh-section-head">
        <div>
          <CardTitle>{preview ? 'Selling Preview' : 'Your Selling Listings'}</CardTitle>
          <CardDescription>Used books listed from your student account.</CardDescription>
        </div>
        <Link className="ui-button ui-button-outline ui-button-sm" to="/sell">Sell Another Book</Link>
      </CardHeader>
      <CardContent className="sh-list">
        {visibleBooks.length ? visibleBooks.map((book) => (
          <article className="sh-selling-row" key={book.id}>
            <div>
              <strong>{book.title}</strong>
              <span>{book.author} / {book.condition} / {formatCurrency.format(book.price)}</span>
            </div>
            <Badge variant="success">{book.listingStatus || 'Listed'}</Badge>
            {!preview && (
              <div className="sh-row-actions">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(book.id)}>Delete</Button>
              </div>
            )}
          </article>
        )) : <div className="sh-empty-state"><strong>No books listed for selling yet</strong><span>Sell a used book and it will appear here.</span></div>}
      </CardContent>
    </Card>
  );
}
