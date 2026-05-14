import { BarChart3, BookOpen, ChevronDown, GitCompare, Heart, Home, Info, LogIn, Menu, Moon, PackageCheck, PlusCircle, SearchCheck, ShoppingCart, Sun, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const primaryLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/books', label: 'Books', icon: BookOpen },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/cart', label: 'Cart', icon: ShoppingCart },
];

const moreLinks = [
  { to: '/orders', label: 'Orders', icon: PackageCheck },
  { to: '/compare', label: 'Compare', icon: GitCompare },
  { to: '/sell', label: 'Sell', icon: PlusCircle },
  { to: '/request', label: 'Request', icon: SearchCheck },
  { to: '/admin', label: 'Admin', icon: BarChart3 },
  { to: '/about', label: 'About', icon: Info },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist, currentUser, logout, theme, setTheme } = useStore();
  const profileLink = currentUser ? [{ to: '/profile', label: 'Profile', icon: UserRound }] : [];
  const desktopMoreLinks = [...profileLink, ...moreLinks];
  const mobileNavLinks = [...primaryLinks, ...profileLink, ...moreLinks];

  const countFor = (label) => {
    if (label === 'Cart') return cartCount;
    if (label === 'Wishlist') return wishlist.length;
    return 0;
  };

  return (
    <header className="navbar">
      <NavLink to="/" className="nav-brand" onClick={() => setOpen(false)}>
        <span><BookOpen size={24} /></span>
        <div>
          <strong>Digital Bookstore</strong>
          <small>Student book marketplace</small>
        </div>
      </NavLink>

      <nav className="nav-links" aria-label="Primary navigation">
        {primaryLinks.map(({ to, label, icon: Icon }) => {
          const count = countFor(label);
          return (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              <Icon size={17} />
              {label}
              {count > 0 && <span className="badge">{count}</span>}
            </NavLink>
          );
        })}
        <div className="more-menu">
          <button className="more-trigger">
            More
            <ChevronDown size={16} />
          </button>
          <div className="more-dropdown">
            {desktopMoreLinks.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} onClick={() => setOpen(false)}>
                <Icon size={17} />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <div className="nav-actions">
        <button className="nav-icon-action" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle dark mode">
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        {currentUser ? (
          <button className="nav-user" onClick={logout}>{currentUser.name}</button>
        ) : (
          <NavLink to="/login" onClick={() => setOpen(false)}>
            <LogIn size={17} />
            Login
          </NavLink>
        )}
        <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <nav className={`mobile-nav ${open ? 'open' : ''}`} aria-label="Mobile navigation">
        {mobileNavLinks.map(({ to, label, icon: Icon }) => {
          const count = countFor(label);
          return (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              <Icon size={17} />
              {label}
              {count > 0 && <span className="badge">{count}</span>}
            </NavLink>
          );
        })}
        {currentUser ? (
          <button className="nav-user mobile-only" onClick={() => { logout(); setOpen(false); }}>{currentUser.name}</button>
        ) : (
          <NavLink to="/login" onClick={() => setOpen(false)}>
            <LogIn size={17} />
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}
