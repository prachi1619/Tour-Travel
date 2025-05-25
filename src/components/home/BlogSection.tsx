import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ChevronRight } from 'lucide-react';
import { blogs } from '../../data/blogs';
import { formatDate, truncateText } from '../../lib/utils';

export default function BlogSection() {
  const recentBlogs = blogs.slice(0, 3);
  
  return (
    <section className="py-16 bg-gray-50 dark:dark:bg-navy-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Travel Stories & Guides
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get inspired by our latest travel stories, tips, and comprehensive guides
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentBlogs.map((blog, index) => (
            <Link 
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center mr-4">
                    <User size={14} className="mr-1" />
                    <span>{blog.author.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{formatDate(blog.date)}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                  {truncateText(blog.excerpt, 120)}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <span className="text-primary-500 font-medium text-sm flex items-center">
                  Read More
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-medium transition duration-300"
          >
            View All Posts
            <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}