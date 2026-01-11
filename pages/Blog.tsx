import React from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../constants';
import { Page, BlogPost } from '../types';

interface BlogProps {
    setPage?: (page: Page) => void;
    setSelectedBlogPost?: (post: BlogPost) => void;
}

const Blog: React.FC<BlogProps> = ({ setPage, setSelectedBlogPost }) => {
    const handleReadMore = (post: BlogPost) => {
        if (setPage && setSelectedBlogPost) {
            setSelectedBlogPost(post);
            setPage(Page.BlogPost);
        }
    };

    return (
        <div className="pb-24">
            <section className="py-20 px-4 bg-gray-50 border-b border-gray-200">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-100 rounded-full">
                        Insights & News
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black mb-6">Latest from Softvex</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Expert perspectives on technology, business strategy, and digital transformation.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {BLOG_POSTS.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white voxel-border overflow-hidden flex flex-col h-full group"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
                                    {post.category}
                                </div>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <p className="text-xs font-medium text-gray-400 mb-3">{post.date}</p>
                                <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <button
                                    onClick={() => handleReadMore(post)}
                                    className="text-sm font-bold text-black uppercase tracking-widest self-start border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-colors"
                                >
                                    Read Article
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
