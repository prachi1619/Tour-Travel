import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the email to a server
    setIsSubmitted(true);
    setEmail('');
  };
  
  return (
    <section className="py-16 bg-primary-500 dark:bg-primary-600 text-white dark:text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Stay Updated with India Travel Tips
          </h2>
          <p className="text-lg text-white/90 dark:text-white/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive travel deals, seasonal guides, and insider tips for your next Indian adventure
          </p>
          
          {isSubmitted ? (
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg animate-fade-in">
              <div className="flex flex-col items-center">
                <div className="bg-white rounded-full p-3 mb-4">
                  <Mail size={24} className="text-primary-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Thank You for Subscribing!</h3>
                <p className="text-white/90">
                  You'll soon receive our latest travel updates and exclusive offers.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-grow bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-white text-primary-500 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition duration-300 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-white/80 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}