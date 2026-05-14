export function About() {
  return (
    <section className="page-shell about-page">
      <span className="eyebrow">About</span>
      <h1>Built for students who need books fast and affordably.</h1>
      <p>
        Digital Bookstore is a frontend-only React project that lets students browse new and used
        books, filter by course needs, save a wishlist, manage a cart, checkout, and keep order
        history in localStorage.
      </p>
      <div className="about-grid">
        <div><strong>12+</strong><span>Curated books</span></div>
        <div><strong>10%</strong><span>Student discount</span></div>
        <div><strong>0</strong><span>Backend required</span></div>
      </div>
    </section>
  );
}
