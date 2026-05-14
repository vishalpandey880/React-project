import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { booksData } from '../data/booksData';

const StoreContext = createContext(null);
const DELIVERY_CHARGE = 79;
const STUDENT_DISCOUNT_RATE = 0.1;
const COUPONS = {
  STUDENT10: { type: 'percent', value: 10, label: '10% student coupon' },
  BOOK50: { type: 'flat', value: 50, label: '₹50 book coupon' },
  FREESHIP: { type: 'shipping', value: 0, label: 'Free delivery coupon' },
};
const ORDER_STEPS = ['Confirmed', 'Packed', 'Shipped', 'Delivered'];

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function withDefaults(book, index = 0) {
  return {
    stock: Math.max(0, 8 - (index % 5) * 2),
    sold: 16 + index * 5,
    createdAt: Date.now() - index * 86400000,
    ...book,
  };
}

function createProfile(user = {}) {
  const name = user.name || user.fullName || 'Student Reader';
  return {
    name,
    email: user.email || '',
    phone: user.phone || '',
    college: user.college || '',
    location: user.location || '',
    avatar:
      user.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c3aed&color=fff&size=160`,
    joinedDate:
      user.joinedDate ||
      new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    studentId: user.studentId || `STU-${String(user.email || name).length}${new Date().getFullYear()}`,
  };
}

export function StoreProvider({ children }) {
  // Lazy initial state reads localStorage once when the app starts.
  const [cart, setCartState] = useState(() => readStorage('digitalBookstoreCart', []));
  const [wishlist, setWishlistState] = useState(() => readStorage('digitalBookstoreWishlist', []));
  const [orders, setOrdersState] = useState(() => readStorage('digitalBookstoreOrders', []));
  const [users, setUsersState] = useState(() => readStorage('digitalBookstoreUsers', []));
  const [currentUser, setCurrentUserState] = useState(() => readStorage('digitalBookstoreCurrentUser', null));
  const [theme, setThemeState] = useState(() => readStorage('digitalBookstoreTheme', 'light'));
  const [customBooks, setCustomBooksState] = useState(() => readStorage('digitalBookstoreCustomBooks', []));
  const [deletedBookIds, setDeletedBookIdsState] = useState(() => readStorage('digitalBookstoreDeletedBooks', []));
  const [reviewsByBook, setReviewsByBookState] = useState(() => readStorage('digitalBookstoreReviews', {}));
  const [stockByBook, setStockByBookState] = useState(() => readStorage('digitalBookstoreStock', {}));
  const [recentlyViewed, setRecentlyViewedState] = useState(() => readStorage('digitalBookstoreRecent', []));
  const [notes, setNotesState] = useState(() => readStorage('digitalBookstoreNotes', {}));
  const [requests, setRequestsState] = useState(() => readStorage('digitalBookstoreRequests', []));
  const [savedForLater, setSavedForLaterState] = useState(() => readStorage('digitalBookstoreSavedLater', []));
  const [compareIds, setCompareIdsState] = useState(() => readStorage('digitalBookstoreCompare', []));
  const [coupon, setCouponState] = useState(() => readStorage('digitalBookstoreCoupon', null));
  const [couponMessage, setCouponMessage] = useState('');
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const persist = (setter, key, value) => {
    setter((current) => {
      const next = typeof value === 'function' ? value(current) : value;
      writeStorage(key, next);
      return next;
    });
  };

  const setCart = (value) => persist(setCartState, 'digitalBookstoreCart', value);
  const setWishlist = (value) => persist(setWishlistState, 'digitalBookstoreWishlist', value);
  const setOrders = (value) => persist(setOrdersState, 'digitalBookstoreOrders', value);
  const setUsers = (value) => persist(setUsersState, 'digitalBookstoreUsers', value);
  const setCustomBooks = (value) => persist(setCustomBooksState, 'digitalBookstoreCustomBooks', value);
  const setDeletedBookIds = (value) => persist(setDeletedBookIdsState, 'digitalBookstoreDeletedBooks', value);
  const setReviewsByBook = (value) => persist(setReviewsByBookState, 'digitalBookstoreReviews', value);
  const setStockByBook = (value) => persist(setStockByBookState, 'digitalBookstoreStock', value);
  const setRecentlyViewed = (value) => persist(setRecentlyViewedState, 'digitalBookstoreRecent', value);
  const setNotes = (value) => persist(setNotesState, 'digitalBookstoreNotes', value);
  const setRequests = (value) => persist(setRequestsState, 'digitalBookstoreRequests', value);
  const setSavedForLater = (value) => persist(setSavedForLaterState, 'digitalBookstoreSavedLater', value);
  const setCompareIds = (value) => persist(setCompareIdsState, 'digitalBookstoreCompare', value);

  const showToast = (message) => {
    const id = Date.now();
    setToasts((items) => [...items, { id, message }]);
    window.setTimeout(() => {
      setToasts((items) => items.filter((toast) => toast.id !== id));
    }, 2600);
  };

  const baseBooks = useMemo(
    () => booksData.map((book, index) => withDefaults(book, index)).filter((book) => !deletedBookIds.includes(book.id)),
    [deletedBookIds],
  );

  const books = useMemo(() => {
    return [...baseBooks, ...customBooks].map((book) => {
      const extraReviews = reviewsByBook[book.id] || [];
      const allReviews = [...(book.reviews || []), ...extraReviews];
      const average =
        allReviews.length > 0
          ? allReviews.reduce((sum, review) => sum + Number(review.rating), 0) / allReviews.length
          : book.rating;
      return {
        ...book,
        reviews: allReviews,
        rating: Number(average.toFixed(1)),
        stock: stockByBook[book.id] ?? book.stock ?? 0,
      };
    });
  }, [baseBooks, customBooks, reviewsByBook, stockByBook]);

  const getBook = (id) => books.find((book) => book.id === id);

  const setTheme = (nextTheme) => {
    setThemeState(nextTheme);
    writeStorage('digitalBookstoreTheme', nextTheme);
  };

  const login = ({ email, password }) => {
    const user = users.find((item) => item.email === email && item.password === password);
    if (!user) return { ok: false, message: 'Invalid email or password' };
    const safeUser = createProfile(user);
    setCurrentUserState(safeUser);
    writeStorage('digitalBookstoreCurrentUser', safeUser);
    showToast(`Welcome back, ${safeUser.name}`);
    return { ok: true };
  };

  const signup = ({ name, email, password }) => {
    if (users.some((user) => user.email === email)) return { ok: false, message: 'Email already exists' };
    const profile = createProfile({ name, email });
    const nextUser = { ...profile, password };
    setUsers((items) => [...items, nextUser]);
    setCurrentUserState(profile);
    writeStorage('digitalBookstoreCurrentUser', profile);
    showToast(`Account created for ${name}`);
    return { ok: true };
  };

  const logout = () => {
    setCurrentUserState(null);
    localStorage.removeItem('digitalBookstoreCurrentUser');
    showToast('Logged out successfully');
  };

  const updateProfile = (updates) => {
    if (!currentUser) return;
    const nextProfile = createProfile({ ...currentUser, ...updates });
    setCurrentUserState(nextProfile);
    writeStorage('digitalBookstoreCurrentUser', nextProfile);
    setUsers((items) =>
      items.map((user) => (user.email === currentUser.email ? { ...user, ...nextProfile } : user)),
    );
    showToast('Profile updated successfully');
  };

  const changePassword = ({ oldPassword, newPassword, confirmPassword }) => {
    if (!currentUser) return { ok: false, message: 'Please login again.' };
    if (newPassword !== confirmPassword) return { ok: false, message: 'New password and confirm password do not match.' };
    const user = users.find((item) => item.email === currentUser.email);
    if (!user || user.password !== oldPassword) return { ok: false, message: 'Old password is incorrect.' };
    setUsers((items) =>
      items.map((item) => (item.email === currentUser.email ? { ...item, password: newPassword } : item)),
    );
    showToast('Password updated successfully');
    return { ok: true, message: 'Password updated successfully.' };
  };

  const addToCart = (book) => {
    if ((book.stock ?? 0) <= 0) {
      showToast('This book is out of stock');
      return;
    }
    setCart((items) => {
      const existing = items.find((item) => item.id === book.id);
      if (existing) {
        // Prevent duplicate cart rows by increasing quantity for the same book.
        if (existing.quantity >= book.stock) return items;
        return items.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1, book } : item,
        );
      }
      return [...items, { id: book.id, book, quantity: 1 }];
    });
    showToast('Book added to cart');
  };

  const updateQuantity = (id, delta) => {
    const book = getBook(id);
    setCart((items) =>
      items
        .map((item) => {
          if (item.id !== id) return item;
          const nextQuantity = Math.min(Math.max(item.quantity + delta, 0), book?.stock ?? item.quantity);
          return { ...item, quantity: nextQuantity };
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id) => {
    setCart((items) => items.filter((item) => item.id !== id));
    showToast('Removed from cart');
  };

  const saveForLater = (item) => {
    setSavedForLater((items) => (items.some((book) => book.id === item.book.id) ? items : [...items, item.book]));
    removeFromCart(item.id);
    showToast('Saved for later');
  };

  const toggleWishlist = (book) => {
    const exists = wishlist.some((item) => item.id === book.id);
    setWishlist((items) =>
      // A book can appear only once in the wishlist.
      exists ? items.filter((item) => item.id !== book.id) : [...items, book],
    );
    showToast(exists ? 'Removed from wishlist' : 'Book added to wishlist');
  };

  const removeFromWishlist = (id) => {
    setWishlist((items) => items.filter((item) => item.id !== id));
    showToast('Removed from wishlist');
  };

  const moveWishlistToCart = (book) => {
    addToCart(book);
    removeFromWishlist(book.id);
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  const applyCoupon = (code) => {
    const normalized = code.trim().toUpperCase();
    if (!COUPONS[normalized]) {
      setCoupon(null);
      writeStorage('digitalBookstoreCoupon', null);
      setCouponMessage('Invalid coupon code');
      showToast('Invalid coupon');
      return false;
    }
    setCouponState(normalized);
    writeStorage('digitalBookstoreCoupon', normalized);
    setCouponMessage(`${COUPONS[normalized].label} applied`);
    showToast('Coupon applied');
    return true;
  };

  const clearCoupon = () => {
    setCouponState(null);
    writeStorage('digitalBookstoreCoupon', null);
    setCouponMessage('');
  };

  const pricing = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
    const studentDiscount = subtotal ? Math.round(subtotal * STUDENT_DISCOUNT_RATE) : 0;
    const couponConfig = coupon ? COUPONS[coupon] : null;
    const couponDiscount = couponConfig
      ? couponConfig.type === 'percent'
        ? Math.round(subtotal * (couponConfig.value / 100))
        : couponConfig.type === 'flat'
          ? couponConfig.value
          : 0
      : 0;
    const discount = Math.min(subtotal, studentDiscount + couponDiscount);
    const delivery = couponConfig?.type === 'shipping' ? 0 : subtotal && subtotal < 1499 ? DELIVERY_CHARGE : 0;
    return { subtotal, discount, delivery, total: subtotal - discount + delivery, couponDiscount, studentDiscount };
  }, [cart, coupon]);

  const placeOrder = () => {
    if (!cart.length) return null;
    const order = {
      id: `DB-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      books: cart,
      total: pricing.total,
      status: 'Confirmed',
    };
    setOrders((items) => [order, ...items]);
    setStockByBook((stock) => {
      const next = { ...stock };
      cart.forEach((item) => {
        const current = getBook(item.id)?.stock ?? 0;
        next[item.id] = Math.max(0, current - item.quantity);
      });
      return next;
    });
    // Checkout is complete, so the saved cart is cleared too.
    setCart([]);
    clearCoupon();
    showToast('Order placed successfully');
    return order;
  };

  const markRecentlyViewed = (book) => {
    setRecentlyViewed((items) => [book.id, ...items.filter((id) => id !== book.id)].slice(0, 6));
  };

  const addReview = (bookId, review) => {
    setReviewsByBook((current) => ({
      ...current,
      [bookId]: [...(current[bookId] || []), { ...review, date: new Date().toISOString() }],
    }));
    showToast('Review submitted');
  };

  const saveNote = (bookId, text) => {
    setNotes((current) => ({ ...current, [bookId]: text }));
    showToast('Note saved');
  };

  const addUsedBook = (book) => {
    const nextBook = withDefaults(
      {
        ...book,
        id: `student-${Date.now()}`,
        genre: book.genre || 'Student Listing',
        condition: book.condition,
        originalPrice: Number(book.originalPrice || book.price),
        price: Number(book.price),
        rating: 4,
        stock: 1,
        sold: 0,
        reviews: [],
        createdAt: Date.now(),
        sellerEmail: currentUser?.email || '',
        listingStatus: 'Listed',
      },
      0,
    );
    setCustomBooks((items) => [nextBook, ...items]);
    showToast('Book added for selling');
  };

  const addRequest = (request) => {
    setRequests((items) => [{ id: `REQ-${Date.now().toString().slice(-6)}`, ...request }, ...items]);
    showToast('Book request submitted');
  };

  const adminAddBook = (book) => addUsedBook({ ...book, condition: book.condition || 'New' });

  const deleteBook = (id) => {
    if (customBooks.some((book) => book.id === id)) {
      setCustomBooks((items) => items.filter((book) => book.id !== id));
    } else {
      setDeletedBookIds((items) => [...items, id]);
    }
    showToast('Book deleted locally');
  };

  const toggleCompare = (book) => {
    setCompareIds((items) => {
      if (items.includes(book.id)) return items.filter((id) => id !== book.id);
      if (items.length >= 3) {
        showToast('You can compare up to 3 books');
        return items;
      }
      showToast('Book added to compare');
      return [...items, book.id];
    });
  };

  const value = {
    books,
    cart,
    wishlist,
    orders,
    users,
    currentUser,
    theme,
    customBooks,
    reviewsByBook,
    requests,
    savedForLater,
    recentlyViewed: recentlyViewed.map(getBook).filter(Boolean),
    notes,
    compareBooks: compareIds.map(getBook).filter(Boolean),
    compareIds,
    coupon,
    couponMessage,
    pricing,
    toasts,
    orderSteps: ORDER_STEPS,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    getBook,
    setTheme,
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
    addToCart,
    updateQuantity,
    removeFromCart,
    saveForLater,
    toggleWishlist,
    removeFromWishlist,
    moveWishlistToCart,
    isWishlisted,
    applyCoupon,
    clearCoupon,
    placeOrder,
    markRecentlyViewed,
    addReview,
    saveNote,
    addUsedBook,
    addRequest,
    adminAddBook,
    deleteBook,
    toggleCompare,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}
