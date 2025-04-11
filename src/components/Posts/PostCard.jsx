import React from 'react';
import './Posts.css';

function PostCard({ post, onClick }) {
  if (!post) {
    return <div className="post-card post-card-loading">Loading...</div>;
  }

  const getShortDescription = () => {
    if (post.text) {
      return post.text.substring(0, 180) + '...';
    } else {
      return 'No description available';
    }
  };

  return (
    <div className="post-card" onClick={onClick}>
      <div className="post-image-container">
        <img src={post.img} srcSet={`${post.img} 1x, ${post.img_2x} 2x`} alt={post.title} className="post-image" />
      </div>
      <div className="post-content">
        <p className="post-tag">{post.tags}</p>
        <h3 className="post-title">{post.title}</h3>
        <div className="post-meta">
          <span className="post-author">{post.autor}</span>
          <span className="post-date">- {post.date} -</span>
          <span className="post-views">{post.views} Views</span>
        </div>
        <p className="post-description">{getShortDescription()}</p>
      </div>
    </div>
  );
}

export default PostCard;
