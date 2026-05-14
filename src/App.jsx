import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Toasts } from './components/Toasts';
import { About } from './pages/About';
import { Admin } from './pages/Admin';
import { BookDetails } from './pages/BookDetails';
import { Books } from './pages/Books';
import { BookRequest } from './pages/BookRequest';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Compare } from './pages/Compare';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Orders } from './pages/Orders';
import { Profile } from './pages/Profile';
import { SellBook } from './pages/SellBook';
import { Signup } from './pages/Signup';
import { Wishlist } from './pages/Wishlist';
import './styles.css';

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Navbar />
      <main className="rb-page-transition" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/sell" element={<SellBook />} />
          <Route path="/request" element={<BookRequest />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
      <Toasts />
    </div>
  );
}

export default App;
