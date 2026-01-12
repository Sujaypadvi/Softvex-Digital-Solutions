import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogPost as BlogPostType } from '../types';
import { BLOG_POSTS } from '../constants';

const BlogPost: React.FC = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const post = postId ? BLOG_POSTS.find(p => p.id === parseInt(postId)) : null;

    // Scroll to top when post changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [postId]);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                    <button
                        onClick={() => navigate('/blog')}
                        className="text-blue-600 hover:underline flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={20} /> Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="pb-24 pt-20">
            <div className="max-w-4xl mx-auto px-4">
                <button
                    onClick={() => navigate('/blog')}
                    className="mb-8 flex items-center text-gray-500 hover:text-black transition-colors group"
                >
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Articles
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-4 flex items-center justify-between text-sm">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                            <Tag size={12} /> {post.category}
                        </span>
                        <span className="text-gray-500 flex items-center gap-2">
                            <Calendar size={14} /> {post.date}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{post.title}</h1>

                    <div className="bg-white voxel-border p-2 mb-12">
                        <div className="aspect-video w-full overflow-hidden bg-gray-100">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:font-sans prose-p:text-gray-600 prose-p:leading-relaxed">
                        {post.content.map((paragraph, index) => (
                            <p key={index} className="mb-6">{paragraph}</p>
                        ))}
                    </div>
                    <div className="mt-16 pt-8 border-t border-gray-200">
                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mb-12">
                            {(() => {
                                const currentIndex = BLOG_POSTS.findIndex(p => p.id === post.id);
                                const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
                                const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

                                return (
                                    <>
                                        <div>
                                            {prevPost && (
                                                <button
                                                    onClick={() => navigate(`/blog/${prevPost.id}`)}
                                                    className="text-left group"
                                                >
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">Previous</p>
                                                    <p className="text-sm font-bold max-w-[150px] md:max-w-xs truncate">{prevPost.title}</p>
                                                </button>
                                            )}
                                        </div>
                                        <div>
                                            {nextPost && (
                                                <button
                                                    onClick={() => navigate(`/blog/${nextPost.id}`)}
                                                    className="text-right group"
                                                >
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1 group-hover:text-blue-600 transition-colors">Next</p>
                                                    <p className="text-sm font-bold max-w-[150px] md:max-w-xs truncate">{nextPost.title}</p>
                                                </button>
                                            )}
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogPost;
