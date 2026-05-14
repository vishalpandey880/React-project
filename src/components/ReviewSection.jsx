import { Stars } from './Stars';

export function ReviewSection({ reviews, onSubmit }) {
  return (
    <section className="reviews">
      <h2>Student Reviews</h2>
      {onSubmit && <ReviewForm onSubmit={onSubmit} />}
      {reviews.map((review) => (
        <article key={`${review.name}-${review.comment}`}>
          <div>
            <strong>{review.name}</strong>
            <Stars rating={review.rating} compact />
          </div>
          <p>{review.comment}</p>
        </article>
      ))}
    </section>
  );
}

function ReviewForm({ onSubmit }) {
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit({
      name: data.get('name'),
      rating: Number(data.get('rating')),
      comment: data.get('comment'),
    });
    event.currentTarget.reset();
  };

  return (
    <form className="review-form" onSubmit={submit}>
      <input name="name" placeholder="Your name" required />
      <select name="rating" defaultValue="5">
        <option value="5">5 stars</option>
        <option value="4">4 stars</option>
        <option value="3">3 stars</option>
        <option value="2">2 stars</option>
        <option value="1">1 star</option>
      </select>
      <input name="comment" placeholder="Write a short review" required />
      <button className="primary small">Submit review</button>
    </form>
  );
}
