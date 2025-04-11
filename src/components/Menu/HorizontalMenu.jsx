import React, { useState, useEffect } from 'react';
import menuItems from './menuItems';
import './Menu.css';
import { ChevronDown } from 'lucide-react';

function HorizontalMenu() {
  const [isSticky, setIsSticky] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 100;

      if (currentScrollY > headerHeight) {
        setIsSticky(true);
        setIsHidden(currentScrollY > lastScrollY && currentScrollY > headerHeight + 200);
      } else {
        setIsSticky(false);
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleMouseEnter = (itemId) => {
    setActiveSubmenu(itemId);
  };

  const handleMouseLeave = () => {
    setActiveSubmenu(null);
  };

  return (
    <nav className={`horizontal-menu ${isSticky ? 'sticky' : ''} ${isHidden ? 'hidden' : ''}`}>
      <div className="menu-container">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`menu-item ${activeSubmenu === item.id ? 'active' : ''}`}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="menu-link-container">
                <a href={item.url} className="menu-link">
                  {item.name}
                </a>
                {item.subItems && <ChevronDown size={16} className="dropdown-icon" />}
              </div>

              {item.subItems && (
                <div className={`submenu-container ${activeSubmenu === item.id ? 'active' : ''}`}>
                  <ul className="submenu">
                    {item.subItems.map((sub, i) => (
                      <li key={i} className="submenu-item">
                        <a href={sub.url} className="submenu-link">
                          {sub.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default HorizontalMenu;
