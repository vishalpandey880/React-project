import {
  API_BASE,
  BOOK_SEARCH_FIELDS,
  DEFAULT_SEARCH_TERM,
  createBookCover,
  fallbackBooks,
  genreKeywords,
  getOpenLibraryCover,
} from '../constants/books';

const getGenre = (subjects = [], title = '') => {
  const source = `${title} ${subjects.slice(0, 12).join(' ')}`.toLowerCase();
  const match = genreKeywords.find(([, keywords]) =>
    keywords.some((keyword) => source.includes(keyword)),
  );
  return match ? match[0] : 'General';
};

const getPrice = (doc) => {
  const editions = Math.min(doc.edition_count || 1, 30);
  const ageDiscount = doc.first_publish_year && doc.first_publish_year < 2015 ? 160 : 0;
  const base = 399 + editions * 45 + (doc.title?.length || 0) * 4;
  return Math.max(199, Math.round((base - ageDiscount) / 10) * 10);
};

const getRating = (doc, index) => {
  if (doc.ratings_average) return Math.min(5, Number(doc.ratings_average.toFixed(1)));
  return Number((4 + ((index * 7) % 10) / 10).toFixed(1));
};

const normalizeBook = (doc, index) => {
  const price = getPrice(doc);
  const condition = doc.first_publish_year && doc.first_publish_year < 2018 ? 'Used' : 'New';
  const rating = getRating(doc, index);
  const reviews = doc.ratings_count || Math.max(18, (doc.edition_count || 1) * 9 + index * 3);
  const title = doc.title || 'Untitled Book';
  const author = doc.author_name?.[0] || 'Unknown Author';
  const genre = getGenre(doc.subject, title);

  return {
    id: doc.key || `${title}-${index}`,
    title,
    author,
    genre,
    condition,
    price,
    originalPrice: condition === 'Used' ? Math.round(price * 1.45) : price,
    rating,
    reviews,
    cover: getOpenLibraryCover(doc.cover_i),
    fallbackCover: createBookCover(title, author, genre),
    tags: [
      doc.first_publish_year ? `${doc.first_publish_year}` : 'Edition',
      `${doc.edition_count || 1} editions`,
    ],
    reviewText:
      rating >= 4.6
        ? 'Highly rated by readers and suitable for semester planning.'
        : 'A practical option for students comparing budget and condition.',
  };
};

export async function searchBooks(query, signal) {
  const params = new URLSearchParams({
    q: query.trim() || DEFAULT_SEARCH_TERM,
    limit: '32',
    fields: BOOK_SEARCH_FIELDS,
  });

  const response = await fetch(`${API_BASE}?${params.toString()}`, { signal });
  if (!response.ok) throw new Error('Open Library request failed');

  const data = await response.json();
  const books = (data.docs || [])
    .filter((doc) => doc.title && doc.author_name?.length)
    .slice(0, 24)
    .map(normalizeBook);

  return books.length ? books : fallbackBooks;
}
