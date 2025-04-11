import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import logo from '../../assets/logo.png';

function Header({ onMenuToggle, onSearch }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleSearch = () => {
    if (!isMobile) {
      setIsSearchOpen(!isSearchOpen);
      if (!isSearchOpen) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 300);
      }
    } else {
      setIsSearchOpen(!isSearchOpen);
      if (!isSearchOpen) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchOpen && searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <header className="header">
      <div className="header-container">
        {isMobile && (
          <>
            <div className="mobile-header-layout">
              <button className="menu-toggle" onClick={onMenuToggle}>
                <span className="menu-icon"></span>
                <span className="menu-icon"></span>
                <span className="menu-icon"></span>
              </button>

              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
              <button className="mobile-search-button" onClick={toggleSearch} aria-label="Search">
                <svg
                  className="search-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
            {isSearchOpen && (
              <div className="mobile-search-container" ref={searchContainerRef}>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="mobile-search-input"
                />
              </div>
            )}
          </>
        )}
        {!isMobile && (
          <>
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>

            <div className="header-right">
              <div ref={searchContainerRef} className={`search-circle ${isSearchOpen ? 'expanded' : ''}`}>
                <button className="search-icon-button" onClick={toggleSearch} aria-label="Search">
                  <svg
                    className="search-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={`search-input ${isSearchOpen ? 'visible' : ''}`}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
