import React, { useState, useEffect } from 'react';
import menuItems from './menuItems';
import { ChevronDown } from 'lucide-react';
import './Menu.css';
import logo from '../../assets/logo.png';

function MobileMenu({ isOpen, onClose }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleSubmenu = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className="mobile-menu-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`mobile-menu ${isAnimating ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <button className="close-menu" onClick={onClose}>
            &times;
          </button>
        </div>

        <ul className="mobile-menu-list">
          {menuItems.map((item) => (
            <li key={item.id} className="mobile-menu-item">
              <div className="mobile-menu-link-container">
                <a href={item.url} className="mobile-menu-link">
                  {item.name}
                </a>
                {item.subItems && (
                  <button
                    className="expand-submenu"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSubmenu(item.id);
                    }}
                  >
                    <ChevronDown size={16} className={`chevron ${expandedItems[item.id] ? 'expanded' : ''}`} />
                  </button>
                )}
              </div>

              {item.subItems && (
                <ul className={`mobile-submenu ${expandedItems[item.id] ? 'expanded' : ''}`}>
                  {item.subItems.map((sub, i) => (
                    <li key={i} className="mobile-submenu-item">
                      <a href={sub.url} className="mobile-submenu-link">
                        {sub.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MobileMenu;
