export function About() {
  const features = ['Search, filters, sorting, wishlist, compare, and quick view', 'Cart, coupon discounts, checkout details, and order history', 'Student seller listings, profile dashboard, admin demo, and dark mode'];
  const stack = ['React + Vite', 'React Router DOM', 'Context API', 'localStorage', 'shadcn-style UI components', 'ReactBits-style animations'];
  const future = ['Backend authentication and seller verification', 'Real payment gateway and delivery partner integration', 'College-wise communities, chat, and book request matching'];

  return (
    <section className="page-shell about-page">
      <div className="about-hero">
        <span className="eyebrow">College presentation ready</span>
        <h1>Digital Bookstore solves the everyday student problem of finding affordable books quickly.</h1>
        <p>
          The project is a frontend-only student marketplace where learners can buy, sell, compare,
          wishlist, and track new or used books without a backend. All demo data is handled through
          React state, Context API, routing, and localStorage.
        </p>
      </div>
      <div className="about-grid">
        <div><strong>500+</strong><span>Marketplace-style listings</span></div>
        <div><strong>4.8</strong><span>Average demo rating</span></div>
        <div><strong>0</strong><span>Backend dependencies</span></div>
      </div>
      <div className="about-sections">
        <article>
          <h2>Problem Statement</h2>
          <p>Students often need course books for short semesters, but new copies are costly and second-hand options are scattered across chats, notice boards, and informal groups.</p>
        </article>
        <article>
          <h2>Core Features</h2>
          {features.map((item) => <span key={item}>{item}</span>)}
        </article>
        <article>
          <h2>Tech Stack</h2>
          {stack.map((item) => <span key={item}>{item}</span>)}
        </article>
        <article>
          <h2>Future Scope</h2>
          {future.map((item) => <span key={item}>{item}</span>)}
        </article>
      </div>
    </section>
  );
}
