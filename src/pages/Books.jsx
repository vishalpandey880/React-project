import { useEffect, useMemo, useState } from 'react';
import { BookCard } from '../components/BookCard';
import { EmptyState } from '../components/EmptyState';
import { FilterSidebar } from '../components/FilterSidebar';
import { SearchBar } from '../components/SearchBar';
import { SortDropdown } from '../components/SortDropdown';
import { useStore } from '../context/StoreContext';

export function Books() {
  const { books: allBooks } = useStore();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');
  const [author, setAuthor] = useState('All');
  const [condition, setCondition] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1200);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  const genres = useMemo(() => [...new Set(allBooks.map((book) => book.genre))], [allBooks]);
  const authors = useMemo(() => [...new Set(allBooks.map((book) => book.author))], [allBooks]);
  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return allBooks
      .filter((book) => book.title.toLowerCase().includes(term))
      .slice(0, 5)
      .map((book) => book.title);
  }, [allBooks, query]);

  const books = useMemo(() => {
    const term = query.trim().toLowerCase();
    return allBooks
      .filter((book) => {
        // Search and filters are combined so every control works together.
        const matchesSearch = [book.title, book.author, book.genre].some((value) =>
          value.toLowerCase().includes(term),
        );
        return (
          matchesSearch &&
          (genre === 'All' || book.genre === genre) &&
          (author === 'All' || book.author === author) &&
          (condition === 'All' || book.condition === condition) &&
          book.price <= maxPrice &&
          book.rating >= minRating
        );
      })
      .sort((a, b) => {
        if (sort === 'price-low') return a.price - b.price;
        if (sort === 'price-high') return b.price - a.price;
        if (sort === 'rating') return b.rating - a.rating;
        if (sort === 'rating-low') return a.rating - b.rating;
        return b.rating - a.rating || a.price - b.price;
      });
  }, [allBooks, author, condition, genre, maxPrice, minRating, query, sort]);

  const resetFilters = () => {
    setGenre('All');
    setAuthor('All');
    setCondition('All');
    setMaxPrice(1200);
    setMinRating(0);
    setQuery('');
    setSort('featured');
  };

  return (
    <section className="page-shell">
      <div className="page-head">
        <div>
          <span className="eyebrow">Book catalog</span>
          <h1>Find your next course book</h1>
        </div>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <SearchBar value={query} onChange={setQuery} suggestions={suggestions} />

      <div className="catalog-layout">
        <FilterSidebar
          genres={genres}
          authors={authors}
          genre={genre}
          author={author}
          condition={condition}
          maxPrice={maxPrice}
          minRating={minRating}
          onGenreChange={setGenre}
          onAuthorChange={setAuthor}
          onConditionChange={setCondition}
          onMaxPriceChange={setMaxPrice}
          onMinRatingChange={setMinRating}
          onReset={resetFilters}
        />
        <div>
          <p className="results-count">{books.length} books found</p>
          {loading ? (
            <div className="book-grid">
              {Array.from({ length: 8 }, (_, index) => <div className="skeleton-card" key={index} />)}
            </div>
          ) : books.length ? (
            <div className="book-grid">
              {books.map((book) => <BookCard key={book.id} book={book} />)}
            </div>
          ) : (
            <EmptyState title="No books found" text="Try another search term or reset the filters." />
          )}
        </div>
      </div>
    </section>
  );
}
