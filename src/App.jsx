import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import HorizontalMenu from './components/Menu/HorizontalMenu';
import MobileMenu from './components/Menu/MobileMenu';
import PostsList from './components/Posts/PostsList';

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch('https://cloud.codesupply.co/endpoint/react/data.json')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          post.text.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
      );
      setFilteredPosts(filtered);
    }
  }, [debouncedSearchTerm, posts]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="app">
      <Header onMenuToggle={toggleMobileMenu} onSearch={handleSearch} />
      <HorizontalMenu />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
      <PostsList
        posts={filteredPosts}
        onPostClick={handlePostClick}
        selectedPost={selectedPost}
        onClosePopup={closePopup}
      />
    </div>
  );
}

export default App;
