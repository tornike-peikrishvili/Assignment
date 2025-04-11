import React, { useEffect, useRef } from 'react';
import './Posts.css';

function PostPopup({ post, onClose }) {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="popup-overlay">
      <div className="popup-content" ref={popupRef}>
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="popup-title">{post.title}</h2>
        <div className="post-meta">
          <span className="post-author">{post.autor}</span>
          <span className="post-date">- {post.date} -</span>
          <span className="post-views">{post.views} Views</span>
        </div>
        <div className="popup-image-container">
          <img
            src={post.image}
            srcSet={`${post.img} 1x, ${post.img_2x || post.image} 2x`}
            alt={post.title}
            className="popup-image"
          />
        </div>
        <p className="post-tag">{post.tags}</p>
        <div className="popup-description">{post.text}</div>
      </div>
    </div>
  );
}

export default PostPopup;
