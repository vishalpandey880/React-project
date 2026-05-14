import { Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function ProfileReviews({ reviews }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Reviews</CardTitle>
        <CardDescription>Ratings and comments you submitted on book pages.</CardDescription>
      </CardHeader>
      <CardContent className="sh-list">
        {reviews.length ? reviews.map((review) => (
          <article className="sh-review-row" key={`${review.bookTitle}-${review.comment}`}>
            <div>
              <strong>{review.bookTitle}</strong>
              <span>{review.comment}</span>
            </div>
            <span className="sh-rating"><Star size={15} fill="currentColor" /> {review.rating}</span>
          </article>
        )) : <div className="sh-empty-state"><strong>No reviews submitted yet.</strong><span>Review a book from its details page to build your activity.</span></div>}
      </CardContent>
    </Card>
  );
}
