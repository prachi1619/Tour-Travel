import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { cn, formatDate, truncateText } from '../../lib/utils';
import type { BlogPost } from '../../types';

interface BlogCardProps {
  blog: BlogPost;
  className?: string;
}

export default function BlogCard({ blog, className }: BlogCardProps) {
  return (
    <Link 
      to={`/blog/${blog.slug}`}
      className={cn(
        "group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col",
        className
      )}
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
  );
}