import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Search, User } from 'lucide-react';
import SearchBar from '../ui/SearchBar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-2xl font-bold"
          >
            <MapPin className={`${isScrolled ? 'text-emerald-600' : 'text-white'}`} />
            <span className={`${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              JelajahID
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" active={isActive('/')} isScrolled={isScrolled}>
              Home
            </NavLink>
            <NavLink to="/attractions" active={isActive('/attractions')} isScrolled={isScrolled}>
              Attractions
            </NavLink>
            <NavLink to="/hotels" active={isActive('/hotels')} isScrolled={isScrolled}>
              Hotels
            </NavLink>
            <NavLink to="/add-attraction" active={isActive('/add-attraction')} isScrolled={isScrolled}>
              Add Place
            </NavLink>
          </nav>

          {/* Search and User Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className={`p-2 rounded-full hover:bg-gray-100 transition ${
                isScrolled ? 'text-gray-700' : 'text-white hover:text-gray-700'
              }`}
            >
              <Search size={20} />
            </button>
            <button
              className={`p-2 rounded-full hover:bg-gray-100 transition ${
                isScrolled ? 'text-gray-700' : 'text-white hover:text-gray-700'
              }`}
            >
              <User size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={isScrolled ? 'text-gray-900' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="absolute top-full left-0 right-0 bg-white p-4 shadow-md">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-20">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-6 py-8">
              <MobileNavLink to="/" onClick={toggleMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/attractions" onClick={toggleMenu}>
                Attractions
              </MobileNavLink>
              <MobileNavLink to="/hotels" onClick={toggleMenu}>
                Hotels
              </MobileNavLink>
              <MobileNavLink to="/add-attraction" onClick={toggleMenu}>
                Add Place
              </MobileNavLink>
              <div className="pt-4">
                <SearchBar />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  isScrolled: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, isScrolled, children }) => (
  <Link
    to={to}
    className={`transition-colors duration-300 font-medium ${
      active 
        ? 'text-emerald-600' 
        : isScrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white hover:text-emerald-100'
    }`}
  >
    {children}
  </Link>
);

interface MobileNavLinkProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, onClick, children }) => (
  <Link
    to={to}
    className="text-2xl font-semibold text-gray-800 hover:text-emerald-600 transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Header;