import { SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BookCard } from '../components/BookCard';
import { EmptyState } from '../components/EmptyState';
import { FilterSidebar } from '../components/FilterSidebar';
import { SearchBar } from '../components/SearchBar';
import { SortDropdown } from '../components/SortDropdown';
import { useStore } from '../context/StoreContext';
import { searchBooks } from '../services/booksApi';

const SUBJECT_CHIPS = [
  'Programming',
  'Computer Science',
  'Data Science',
  'Artificial Intelligence',
  'Mathematics',
  'Business',
  'Literature',
  'Design',
  'Engineering',
];

const DEFAULT_QUERY = 'programming';
const CACHE_TTL = 24 * 60 * 60 * 1000;
const CACHE_PREFIX = 'digitalBookstoreBooksCache';
const PRESENTATION_MODE = true;

function slugify(value = '') {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

function cacheKey(query) {
  return `${CACHE_PREFIX}_${slugify(query || DEFAULT_QUERY)}`;
}

function readBooksCache(query) {
  try {
    const raw = localStorage.getItem(cacheKey(query));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.timestamp || Date.now() - parsed.timestamp > CACHE_TTL) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeBooksCache(query, payload) {
  try {
    localStorage.setItem(
      cacheKey(query),
      JSON.stringify({
        query,
        timestamp: Date.now(),
        ...payload,
      }),
    );
  } catch {
    // Cache is optional.
  }
}

function dedupeBooks(list = []) {
  const seen = new Set();
  return list.filter((book) => {
    if (!book || seen.has(book.id)) return false;
    seen.add(book.id);
    return true;
  });
}

export function Books() {
  const { books: localBooks, saveApiBook } = useStore();
  const initialCache = readBooksCache(DEFAULT_QUERY);
  const [apiBooks, setApiBooks] = useState(() => initialCache?.books || []);
  const [fetchState, setFetchState] = useState(() => (initialCache?.books?.length ? 'cache' : 'idle'));
  const [statusMessage, setStatusMessage] = useState(() =>
    initialCache?.books?.length ? 'Showing cached books while updating the library...' : '',
  );
  const [apiError, setApiError] = useState('');
  const [activeSearch, setActiveSearch] = useState(DEFAULT_QUERY);
  const [page, setPage] = useState(initialCache?.page || 1);
  const [apiSource, setApiSource] = useState(initialCache?.source || 'Open Library');
  const [hasMore, setHasMore] = useState(initialCache?.hasMore ?? true);
  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState('All');
  const [author, setAuthor] = useState('All');
  const [condition, setCondition] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1200);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('digitalBookstoreRecentSearches')) || [];
    } catch {
      return [];
    }
  });
  const requestRef = useRef({ id: 0, controller: null });
  const apiBooksRef = useRef(apiBooks);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      requestRef.current.controller?.abort();
    };
  }, []);

  useEffect(() => {
    apiBooksRef.current = apiBooks;
  }, [apiBooks]);

  const runSearch = async ({ term, nextPage = 1, append = false }) => {
    const cleanTerm = term.trim() || DEFAULT_QUERY;
    const cache = nextPage === 1 ? readBooksCache(cleanTerm) : null;
    const requestId = Date.now();

    requestRef.current.controller?.abort();
    const controller = new AbortController();
    requestRef.current = { id: requestId, controller };

    setApiError('');
    setActiveSearch(cleanTerm);
    setPage(nextPage);

    if (cache && nextPage === 1 && !append) {
      setApiBooks(cache.books || []);
      setApiSource(cache.source || 'Open Library cache');
      setHasMore(cache.hasMore ?? ((cache.books || []).length > 0));
      setStatusMessage('Showing cached books while refreshing the library...');
    } else {
      setStatusMessage(localBooks.length ? 'Updating books from library...' : 'Fetching books from library...');
    }

    setFetchState('refreshing');

    try {
      const result = await searchBooks(cleanTerm, nextPage, {
        signal: controller.signal,
        timeoutMs: 6000,
      });

      if (!mountedRef.current || requestRef.current.id !== requestId) return;

      const nextBooks = append ? dedupeBooks([...apiBooksRef.current, ...result.books]) : dedupeBooks(result.books);
      setApiBooks(nextBooks);
      nextBooks.slice(0, 8).forEach(saveApiBook);
      writeBooksCache(cleanTerm, {
        books: nextBooks,
        total: result.total,
        source: result.source,
        hasMore: result.hasMore,
        page: nextPage,
      });
      setApiSource(result.source);
      setHasMore(Boolean(result.hasMore));
      setStatusMessage('');
      setApiError('');
    } catch (error) {
      if (!mountedRef.current || requestRef.current.id !== requestId) return;

      const isTimeout = error?.name === 'AbortError' && String(error?.message || '').toLowerCase().includes('timed out');
      console.warn('Open Library API failed, showing fallback books', error);

      if (cache?.books?.length) {
        setApiBooks(cache.books);
        setApiSource(cache.source || 'Open Library cache');
        setHasMore(cache.hasMore ?? cache.books.length > 0);
        setApiError('');
      } else {
        setApiBooks((current) => current);
        setHasMore(false);
        setApiError(PRESENTATION_MODE ? '' : 'Open Library is unavailable right now. Showing local demo books instead.');
      }
    } finally {
      if (mountedRef.current && requestRef.current.id === requestId) {
        setFetchState('idle');
      }
    }
  };

  useEffect(() => {
    runSearch({ term: DEFAULT_QUERY, nextPage: 1, append: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayBooks = useMemo(() => {
    return dedupeBooks([...apiBooks, ...localBooks]);
  }, [apiBooks, localBooks]);

  const genres = useMemo(() => [...new Set(displayBooks.map((book) => book.genre))], [displayBooks]);
  const authors = useMemo(() => [...new Set(displayBooks.map((book) => book.author))], [displayBooks]);

  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return displayBooks
      .filter((book) => book.title.toLowerCase().includes(term))
      .slice(0, 5)
      .map((book) => book.title);
  }, [displayBooks, query]);

  const books = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = displayBooks.filter((book) => {
      const matchesSearch = [book.title, book.author, book.genre, book.source || '', String(book.publishYear || '')].some((value) =>
        String(value).toLowerCase().includes(term),
      );

      return (
        matchesSearch &&
        (genre === 'All' || book.genre === genre) &&
        (author === 'All' || book.author === author) &&
        (condition === 'All' || book.condition === condition) &&
        (availability === 'All' ||
          (availability === 'In Stock' && book.stock > 3) ||
          (availability === 'Only few left' && book.stock > 0 && book.stock <= 3) ||
          (availability === 'Out of Stock' && book.stock === 0)) &&
        book.price <= maxPrice &&
        book.rating >= minRating
      );
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'rating-low') return a.rating - b.rating;
      if (sort === 'newest') return Number(b.publishYear || 0) - Number(a.publishYear || 0);
      return b.rating - a.rating || a.price - b.price;
    });
  }, [availability, author, condition, displayBooks, genre, maxPrice, minRating, query, sort]);

  const saveSearch = (term) => {
    const clean = term.trim();
    if (!clean) return;
    const next = [clean, ...recentSearches.filter((item) => item !== clean)].slice(0, 4);
    setRecentSearches(next);
    localStorage.setItem('digitalBookstoreRecentSearches', JSON.stringify(next));
    runSearch({ term: clean, nextPage: 1, append: false });
  };

  const searchSubject = (term) => {
    setQuery(term);
    saveSearch(term);
  };

  const loadMore = () => {
    if (fetchState !== 'idle' || !hasMore) return;
    runSearch({ term: activeSearch, nextPage: page + 1, append: true });
  };

  const resetFilters = () => {
    setGenre('All');
    setAuthor('All');
    setCondition('All');
    setAvailability('All');
    setMaxPrice(1200);
    setMinRating(0);
    setQuery('');
    setSort('featured');
  };

  const showSkeleton = displayBooks.length === 0 && fetchState !== 'idle';
  const isRefreshing = fetchState !== 'idle' && displayBooks.length > 0;
  return (
    <section className="page-shell books-page">
      <div className="page-head">
        <div>
          <span className="eyebrow">Book catalog</span>
          <h1>Find your next course book</h1>
          {isRefreshing && <span className="library-loading inline" aria-hidden="true" />}
        </div>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        suggestions={suggestions}
        recentSearches={recentSearches}
        popularSearches={SUBJECT_CHIPS}
        onSubmitSearch={saveSearch}
        loading={fetchState !== 'idle'}
      />
      <div className="subject-chip-row">
        {SUBJECT_CHIPS.map((term) => (
          <button key={term} onClick={() => searchSubject(term)}>{term}</button>
        ))}
      </div>
      <button className="mobile-filter-button" onClick={() => setFiltersOpen(true)}>
        <SlidersHorizontal size={17} />
        Filters
      </button>

      <div className="books-content-layout">
        <div className={`filter-drawer ${filtersOpen ? 'open' : ''}`}>
          <button className="filter-close" onClick={() => setFiltersOpen(false)}>
            <X size={18} /> Close
          </button>
          <div className="filters-sidebar">
            <FilterSidebar
              genres={genres}
              authors={authors}
              genre={genre}
              author={author}
              condition={condition}
              availability={availability}
              maxPrice={maxPrice}
              minRating={minRating}
              onGenreChange={setGenre}
              onAuthorChange={setAuthor}
              onConditionChange={setCondition}
              onAvailabilityChange={setAvailability}
              onMaxPriceChange={setMaxPrice}
              onMinRatingChange={setMinRating}
              onReset={resetFilters}
            />
          </div>
        </div>
        <aside className="filters-sidebar">
          <FilterSidebar
            genres={genres}
            authors={authors}
            genre={genre}
            author={author}
            condition={condition}
            availability={availability}
            maxPrice={maxPrice}
            minRating={minRating}
            onGenreChange={setGenre}
            onAuthorChange={setAuthor}
            onConditionChange={setCondition}
            onAvailabilityChange={setAvailability}
            onMaxPriceChange={setMaxPrice}
            onMinRatingChange={setMinRating}
            onReset={resetFilters}
          />
        </aside>
        <div className="books-main-content">
          <div className="books-result-bar">
            <p className="results-count">{books.length} books found</p>
            {isRefreshing && <span className="library-loading" aria-hidden="true" />}
          </div>
          {showSkeleton ? (
            <div className="book-grid">
              {Array.from({ length: 8 }, (_, index) => <div className="skeleton-card" key={index} />)}
            </div>
          ) : books.length ? (
            <>
              <div className="book-grid">
                {books.map((book) => <BookCard key={book.id} book={book} />)}
              </div>
              {hasMore && apiBooks.length > 0 && (
                <div className="load-more-row">
                  <button className="secondary" onClick={loadMore} disabled={fetchState !== 'idle'}>
                    {fetchState !== 'idle' ? 'Loading...' : 'Load more from Open Library'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              title="No books found"
              text="Try clearing filters, lowering the rating, or searching Programming, Mathematics, Business, or Literature."
              action={<button className="primary" onClick={resetFilters}>Clear filters</button>}
            />
          )}
        </div>
      </div>
    </section>
  );
}
