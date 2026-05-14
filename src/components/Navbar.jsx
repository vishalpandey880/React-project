import { BarChart3, BookOpen, ChevronDown, GitCompare, Heart, Home, Info, LogIn, Menu, Moon, PackageCheck, PlusCircle, SearchCheck, ShoppingCart, Sun, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

const primaryLinks = [
  { to: '/', label: 'Home', icon: Home, tone: 'home' },
  { to: '/books', label: 'Books', icon: BookOpen, tone: 'books' },
  { to: '/wishlist', label: 'Wishlist', icon: Heart, tone: 'wishlist' },
  { to: '/cart', label: 'Cart', icon: ShoppingCart, tone: 'cart' },
];

const moreLinks = [
  { to: '/orders', label: 'Orders', icon: PackageCheck, tone: 'orders' },
  { to: '/compare', label: 'Compare', icon: GitCompare, tone: 'compare' },
  { to: '/sell', label: 'Sell', icon: PlusCircle, tone: 'sell' },
  { to: '/request', label: 'Request', icon: SearchCheck, tone: 'request' },
  { to: '/admin', label: 'Admin', icon: BarChart3, tone: 'admin' },
  { to: '/about', label: 'About', icon: Info, tone: 'about' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist, currentUser, logout, theme, setTheme } = useStore();
  const navigate = useNavigate();
  const profileLink = currentUser ? [{ to: '/profile', label: 'Profile', icon: UserRound, tone: 'profile' }] : [];
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
        <span className="brand-mark" aria-hidden="true">
          <BookOpen size={24} />
          <i />
          <b />
        </span>
        <div>
          <strong>Digital Bookstore</strong>
          <small>Student book marketplace</small>
        </div>
      </NavLink>

      <nav className="nav-links" aria-label="Primary navigation">
        {primaryLinks.map(({ to, label, icon: Icon, tone }) => {
          const count = countFor(label);
          return (
            <NavLink key={to} to={to} className={`nav-link tone-${tone}`} onClick={() => setOpen(false)}>
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
            {desktopMoreLinks.map(({ to, label, icon: Icon, tone }) => (
              <NavLink key={to} to={to} className={`tone-${tone}`} onClick={() => setOpen(false)}>
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
          <DropdownMenu>
            {({ open: menuOpen, setOpen: setMenuOpen }) => (
              <>
                <DropdownMenuTrigger className="nav-avatar-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open profile menu">
                  <Avatar className="nav-avatar">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{currentUser.name}</span>
                  <ChevronDown size={15} />
                </DropdownMenuTrigger>
                <DropdownMenuContent open={menuOpen} className="nav-profile-dropdown">
                  <DropdownMenuItem onClick={() => { navigate('/profile'); setMenuOpen(false); }}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { navigate('/orders'); setMenuOpen(false); }}>Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { navigate('/wishlist'); setMenuOpen(false); }}>Wishlist</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { navigate('/profile'); setMenuOpen(false); }}>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { logout(); setMenuOpen(false); navigate('/login'); }}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </>
            )}
          </DropdownMenu>
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
        {mobileNavLinks.map(({ to, label, icon: Icon, tone }) => {
          const count = countFor(label);
          return (
            <NavLink key={to} to={to} className={`tone-${tone}`} onClick={() => setOpen(false)}>
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
