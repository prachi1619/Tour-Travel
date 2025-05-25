import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'United States',
    rating: 5,
    text: 'Our trip to India was absolutely magical. From the majestic Taj Mahal to the serene Kerala backwaters, every moment was filled with wonder. The itinerary suggested by this website was perfect for our first visit.',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
  },
  {
    id: '2',
    name: 'Raj Patel',
    location: 'United Kingdom',
    rating: 5,
    text: 'As someone of Indian heritage visiting for the first time, I was amazed by how comprehensive this website was. The local insights helped me discover places I wouldn\'t have found otherwise. Truly an incredible experience!',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  {
    id: '3',
    name: 'Emma Chen',
    location: 'Singapore',
    rating: 4,
    text: 'The detailed information about each destination helped us plan our trip perfectly. The tips about local cuisine were especially helpful - we tried so many delicious dishes we wouldn\'t have known about otherwise!',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
  }
];

export default function TestimonialSection() {
  return (
    <section className="py-16 bg-white dark:bg-navy-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            What Travelers Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Hear from travelers who have experienced the wonders of India
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              
              <blockquote className="text-gray-600 dark:text-gray-300 mb-6">
                "{testimonial.text}"
              </blockquote>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}