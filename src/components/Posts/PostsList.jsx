import React from 'react';
import PostCard from './PostCard';
import PostPopup from './PostPopup';
import './Posts.css';

function PostsList({ posts, onPostClick, selectedPost, onClosePopup }) {
  return (
    <div className="posts-container">
      <div className="posts-grid">
        {posts && posts.length > 0 ? (
          posts.map((post, index) => <PostCard key={post.id || index} post={post} onClick={() => onPostClick(post)} />)
        ) : (
          <div className="no-posts">No posts found matching your search criteria.</div>
        )}
      </div>

      {selectedPost && <PostPopup post={selectedPost} onClose={onClosePopup} />}
    </div>
  );
}

export default PostsList;
