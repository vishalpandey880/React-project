const OPEN_LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json';
const GOOGLE_BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes';
const PLACEHOLDER_COVER =
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80';

const CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];
const PAGE_SIZE = 24;
const SELLERS = [
  { name: 'Riya Sharma', college: 'Delhi School of Technology', verified: true },
  { name: 'Arjun Mehta', college: 'City Commerce College', verified: true },
  { name: 'Neha Rao', college: 'National Arts College', verified: false },
  { name: 'Kabir Singh', college: 'Metro Engineering Institute', verified: true },
];

function hashValue(value = '') {
  return String(value)
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function demoNumber(seed, min, max) {
  return min + (seed % (max - min + 1));
}

function availabilityFromStock(stock) {
  if (stock <= 0) return 'Out of Stock';
  if (stock <= 3) return 'Only few left';
  return 'In Stock';
}

function pickFirstString(value, fallback = 'Unknown') {
  if (Array.isArray(value)) {
    const first = value.find((item) => typeof item === 'string' && item.trim());
    return first || fallback;
  }
  if (typeof value === 'string' && value.trim()) return value;
  return fallback;
}

export function normalizeBookData(apiBook) {
  const rawId = apiBook.key || apiBook.edition_key?.[0] || apiBook.cover_edition_key || apiBook.title;
  const id = `open-library-${String(rawId).replaceAll('/', '-')}`;
  const seed = hashValue(id);
  const author = pickFirstString(apiBook.author_name, 'Unknown Author');
  const publishYear = apiBook.first_publish_year || pickFirstString(apiBook.publish_year, 'Unknown');
  const price = demoNumber(seed, 150, 899);
  const stock = demoNumber(seed + 7, 0, 10);
  const rating = Number((3.5 + ((seed % 16) / 10)).toFixed(1));
  const coverId = apiBook.cover_i || null;
  const condition = CONDITIONS[seed % CONDITIONS.length];
  const genre =
    pickFirstString(
      apiBook.subject?.filter((subject) => typeof subject === 'string' && subject.length < 28),
      '',
    ) ||
    pickFirstString(
      apiBook.subject_facet?.filter((subject) => typeof subject === 'string' && subject.length < 28),
      '',
    ) ||
    'General';

  return {
    id,
    title: apiBook.title || 'Untitled Book',
    author,
    genre,
    condition,
    price,
    originalPrice: price + demoNumber(seed + 13, 100, 300),
    rating: Math.min(rating, 5),
    image: coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : PLACEHOLDER_COVER,
    description: `${apiBook.title || 'This book'} by ${author}${publishYear !== 'Unknown' ? ` was first published in ${publishYear}` : ''}. A useful marketplace listing for students comparing affordable study copies.`,
    reviews: [
      { user: 'Student Reader', rating: 4.4, comment: 'Helpful copy for coursework and quick revision.' },
      { user: 'Campus Buyer', rating: 4.7, comment: 'Good value compared with buying a brand-new copy.' },
    ],
    source: 'Open Library',
    publishYear,
    isbn: apiBook.isbn?.[0] || '',
    coverId,
    availability: availabilityFromStock(stock),
    stock,
    sold: demoNumber(seed + 21, 4, 84),
    createdAt: Date.now() - demoNumber(seed, 1, 60) * 86400000,
    seller: SELLERS[seed % SELLERS.length],
    conditionDetails:
      condition === 'New'
        ? 'Fresh marketplace copy with clean pages.'
        : condition === 'Like New'
          ? 'Barely used by a student seller.'
          : condition === 'Good'
            ? 'Readable copy with light notes or highlights.'
            : 'Budget copy with visible wear but usable pages.',
  };
}

async function fetchJson(url, { signal, timeoutMs = 6000 } = {}) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(new DOMException('Request timed out', 'AbortError')),
    timeoutMs,
  );

  const abort = () => controller.abort(signal?.reason || new DOMException('Request cancelled', 'AbortError'));

  if (signal) {
    if (signal.aborted) abort();
    signal.addEventListener('abort', abort, { once: true });
  }

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    return response.json();
  } finally {
    window.clearTimeout(timeoutId);
    if (signal) signal.removeEventListener('abort', abort);
  }
}

function toApiResponse(data, source, page) {
  const docs = Array.isArray(data.docs) ? data.docs : [];
  const total = Number(data.numFound || 0);
  return {
    books: docs.slice(0, PAGE_SIZE).map(normalizeBookData),
    total,
    source,
    hasMore: page * PAGE_SIZE < total,
  };
}

export async function searchBooks(query = 'programming', page = 1, options = {}) {
  const searchTerm = query.trim() || 'programming';
  const url = `${OPEN_LIBRARY_SEARCH_URL}?q=${encodeURIComponent(searchTerm)}&page=${page}`;

  try {
    const data = await fetchJson(url, options);
    return toApiResponse(data, 'Open Library', page);
  } catch (openLibraryError) {
    try {
      const fallback = await fetchJson(`${GOOGLE_BOOKS_URL}?q=${encodeURIComponent(searchTerm)}`, options);
      return {
        books: (fallback.items || []).map((item) =>
          normalizeBookData({
            key: item.id,
            title: item.volumeInfo?.title,
            author_name: item.volumeInfo?.authors,
            subject: item.volumeInfo?.categories,
            first_publish_year: item.volumeInfo?.publishedDate?.slice(0, 4),
            isbn: item.volumeInfo?.industryIdentifiers?.map((identifier) => identifier.identifier),
            cover_i: item.volumeInfo?.imageLinks?.thumbnail || null,
          }),
        ),
        total: fallback.totalItems || 0,
        source: 'Google Books fallback',
        hasMore: false,
      };
    } catch {
      throw openLibraryError;
    }
  }
}

export async function getBooksBySubject(subject = 'programming', page = 1) {
  return searchBooks(subject, page);
}
