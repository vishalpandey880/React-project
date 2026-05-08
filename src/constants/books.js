export const API_BASE = 'https://openlibrary.org/search.json';

export const DEFAULT_SEARCH_TERM = 'college textbooks';

export const FREE_SHIPPING_THRESHOLD = 2500;

export const FALLBACK_COVER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200"%3E%3Crect width="900" height="1200" fill="%23e6ece3"/%3E%3Crect x="180" y="170" width="540" height="860" rx="28" fill="%23ffffff" stroke="%23255f57" stroke-width="24"/%3E%3Crect x="250" y="280" width="400" height="42" rx="21" fill="%23255f57"/%3E%3Crect x="250" y="370" width="320" height="30" rx="15" fill="%23667085"/%3E%3Crect x="250" y="430" width="360" height="30" rx="15" fill="%23667085"/%3E%3Crect x="250" y="740" width="400" height="4" fill="%23d8e0d5"/%3E%3Crect x="250" y="790" width="230" height="30" rx="15" fill="%23255f57"/%3E%3C/svg%3E';

const coverPalettes = [
  ['#255f57', '#b9e0cf', '#ffffff'],
  ['#513c8c', '#d9cff8', '#ffffff'],
  ['#8a4d20', '#f2d0a4', '#ffffff'],
  ['#2f527f', '#c9dff5', '#ffffff'],
  ['#7a2f4f', '#f0bfd0', '#ffffff'],
  ['#3d6141', '#d5e7c1', '#ffffff'],
];

const escapeSvgText = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const wrapWords = (text, maxLength, maxLines) => {
  const words = String(text || 'Book Cover').split(/\s+/).filter(Boolean);
  const lines = [];

  words.forEach((word) => {
    const current = lines[lines.length - 1] || '';
    if (!current || `${current} ${word}`.length > maxLength) {
      if (lines.length < maxLines) lines.push(word);
      return;
    }
    lines[lines.length - 1] = `${current} ${word}`;
  });

  return lines.length ? lines : ['Book Cover'];
};

export const createBookCover = (title, author = 'Unknown Author', genre = 'General') => {
  const paletteIndex = [...String(title)].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const [primary, accent, paper] = coverPalettes[paletteIndex % coverPalettes.length];
  const titleLines = wrapWords(title, 18, 4);
  const authorLine = wrapWords(author, 24, 1)[0];

  const titleMarkup = titleLines
    .map(
      (line, index) =>
        `<text x="98" y="${270 + index * 64}" font-size="54" font-weight="800" fill="${paper}">${escapeSvgText(line)}</text>`,
    )
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
    <rect width="900" height="1200" fill="${primary}"/>
    <rect x="62" y="62" width="776" height="1076" rx="38" fill="none" stroke="${accent}" stroke-width="18"/>
    <rect x="98" y="118" width="250" height="44" rx="22" fill="${accent}"/>
    <text x="122" y="148" font-family="Arial, sans-serif" font-size="24" font-weight="800" fill="${primary}">${escapeSvgText(genre)}</text>
    ${titleMarkup}
    <rect x="98" y="780" width="704" height="3" fill="${accent}" opacity="0.85"/>
    <text x="98" y="860" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="${accent}">${escapeSvgText(authorLine)}</text>
    <rect x="98" y="944" width="170" height="170" rx="20" fill="${accent}" opacity="0.88"/>
    <path d="M150 1040h66m-33-34v68" stroke="${primary}" stroke-width="18" stroke-linecap="round"/>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const getOpenLibraryCover = (coverId) =>
  coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg?default=false` : '';

export const getOpenLibraryIsbnCover = (isbn) =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;

export const BOOK_SEARCH_FIELDS = [
  'key',
  'title',
  'author_name',
  'first_publish_year',
  'cover_i',
  'subject',
  'ratings_average',
  'ratings_count',
  'edition_count',
].join(',');

export const genreKeywords = [
  ['Computer Science', ['computer', 'programming', 'software', 'algorithm', 'data']],
  ['Science', ['science', 'biology', 'chemistry', 'physics', 'laboratory']],
  ['Mathematics', ['mathematics', 'calculus', 'algebra', 'statistics', 'geometry']],
  ['Business', ['business', 'finance', 'accounting', 'economics', 'management']],
  ['Literature', ['literature', 'fiction', 'poetry', 'novel', 'drama']],
  ['Social Science', ['sociology', 'history', 'politics', 'psychology', 'anthropology']],
];

export const fallbackBooks = [
  {
    id: 'fallback-algorithms',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    genre: 'Computer Science',
    condition: 'Used',
    price: 899,
    originalPrice: 1499,
    rating: 4.8,
    reviews: 310,
    cover: createBookCover('Introduction to Algorithms', 'Thomas H. Cormen', 'Computer Science'),
    tags: ['Open Library', 'Course book'],
    reviewText: 'Reliable course pick with strong reader demand.',
  },
  {
    id: 'fallback-calculus',
    title: 'Calculus',
    author: 'Gilbert Strang',
    genre: 'Mathematics',
    condition: 'New',
    price: 1249,
    originalPrice: 1249,
    rating: 4.6,
    reviews: 144,
    cover: createBookCover('Calculus', 'Gilbert Strang', 'Mathematics'),
    tags: ['Open Library', 'STEM'],
    reviewText: 'Useful for problem practice and first-year revision.',
  },
];

export const initialOrders = [
  {
    id: 'CR-1024',
    date: 'Apr 22, 2026',
    items: 3,
    total: 2487,
    status: 'Delivered',
  },
];
