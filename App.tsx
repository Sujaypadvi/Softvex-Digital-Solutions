
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { Page, BlogPost as BlogPostType } from './types';
import { motion, AnimatePresence } from 'framer-motion';

import { BLOG_POSTS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    const params = new URLSearchParams(window.location.search);
    return (params.get('page') as Page) || Page.Home;
  });

  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPostType | null>(() => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('postId');
    if (postId) {
      return BLOG_POSTS.find(p => p.id === parseInt(postId)) || null;
    }
    return null;
  });

  const [selectedService, setSelectedService] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('serviceId') || null;
  });

  const [targetSection, setTargetSection] = useState<string | null>(null);

  // Handle URL updates and Browser History
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page') as Page || Page.Home;

      // Restore Blog Post
      const postId = params.get('postId');
      if (postId) {
        const post = BLOG_POSTS.find(p => p.id === parseInt(postId));
        setSelectedBlogPost(post || null);
      } else {
        setSelectedBlogPost(null);
      }

      // Restore Service Selection
      const serviceId = params.get('serviceId');
      setSelectedService(serviceId || null);

      setCurrentPage(page);
    };

    // Initialize state from URL on first load
    handlePopState();

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync state changes to URL
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', currentPage);

    if (currentPage === Page.BlogPost && selectedBlogPost) {
      url.searchParams.set('postId', selectedBlogPost.id.toString());
    } else {
      url.searchParams.delete('postId');
    }

    if (selectedService) {
      url.searchParams.set('serviceId', selectedService);
    } else {
      url.searchParams.delete('serviceId');
    }

    // Only push if the URL has actually changed (prevents pushing on popstate)
    if (url.search !== window.location.search) {
      window.history.pushState({}, '', url.toString());
    }
  }, [currentPage, selectedBlogPost, selectedService]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home: return <Home setPage={setCurrentPage} />;
      case Page.About: return <About />;
      case Page.Services: return <Services setPage={setCurrentPage} setSelectedService={setSelectedService} targetSection={targetSection} setTargetSection={setTargetSection} />;
      case Page.Contact: return <Contact selectedService={selectedService} />;
      case Page.Blog: return <Blog setPage={setCurrentPage} setSelectedBlogPost={setSelectedBlogPost} />;
      case Page.BlogPost: return <BlogPost post={selectedBlogPost} setPage={setCurrentPage} setSelectedBlogPost={setSelectedBlogPost} />;
      default: return <Home setPage={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} setPage={setCurrentPage} setTargetSection={setTargetSection}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
