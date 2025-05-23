import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const sampleDestinations = [
  {
    name: 'Taj Mahal, Agra',
    description: 'One of the seven wonders of the world, this ivory-white marble mausoleum is a testament to eternal love and architectural brilliance.',
    imageUrl: 'https://source.unsplash.com/1600x900/?taj-mahal',
    category: 'Historical',
    rating: 4.9,
    price: '₹1,500',
    location: 'Agra, Uttar Pradesh',
    duration: '1-2 days',
    groupSize: '1-15 people',
    bestTime: 'October to March',
    featured: true,
    highlights: [
      'Guided tour of the Taj Mahal',
      'Sunrise or sunset viewing',
      'Professional photography spots',
      'Historical storytelling',
      'Nearby Agra Fort visit'
    ],
    includes: [
      'Entry tickets',
      'Professional guide',
      'Hotel pickup and drop-off',
      'Bottled water',
      'Breakfast'
    ],
    gallery: [
      'https://source.unsplash.com/1600x900/?taj-mahal-front',
      'https://source.unsplash.com/1600x900/?taj-mahal-garden',
      'https://source.unsplash.com/1600x900/?taj-mahal-sunset',
      'https://source.unsplash.com/1600x900/?agra-fort'
    ]
  },
  {
    name: 'Kerala Backwaters',
    description: 'Experience the serene beauty of Kerala\'s backwaters on a traditional houseboat, surrounded by lush palm trees and tranquil waters.',
    imageUrl: 'https://source.unsplash.com/1600x900/?kerala-backwaters',
    category: 'Nature',
    rating: 4.8,
    price: '₹8,500',
    location: 'Alleppey, Kerala',
    duration: '2-3 days',
    groupSize: '2-8 people',
    bestTime: 'September to March',
    featured: true,
    highlights: [
      'Houseboat cruise',
      'Village life experience',
      'Traditional Kerala cuisine',
      'Sunset views',
      'Bird watching'
    ],
    includes: [
      'Houseboat stay',
      'All meals',
      'Fishing activities',
      'Village tours',
      'Cultural programs'
    ],
    gallery: [
      'https://source.unsplash.com/1600x900/?kerala-houseboat',
      'https://source.unsplash.com/1600x900/?kerala-village',
      'https://source.unsplash.com/1600x900/?kerala-nature',
      'https://source.unsplash.com/1600x900/?kerala-culture'
    ]
  },
  {
    name: 'Varanasi Ghats',
    description: 'Discover the spiritual heart of India along the sacred Ganges River, where ancient traditions and rituals come alive.',
    imageUrl: 'https://source.unsplash.com/1600x900/?varanasi-ghats',
    category: 'Spiritual',
    rating: 4.7,
    price: '₹3,500',
    location: 'Varanasi, Uttar Pradesh',
    duration: '2-3 days',
    groupSize: '1-10 people',
    bestTime: 'October to March',
    featured: true,
    highlights: [
      'Morning boat ride',
      'Evening Ganga Aarti',
      'Temple visits',
      'Cultural walks',
      'Spiritual ceremonies'
    ],
    includes: [
      'Boat rides',
      'Guide services',
      'Temple visits',
      'Cultural show',
      'Airport transfers'
    ],
    gallery: [
      'https://source.unsplash.com/1600x900/?varanasi-evening',
      'https://source.unsplash.com/1600x900/?varanasi-boat',
      'https://source.unsplash.com/1600x900/?varanasi-temple',
      'https://source.unsplash.com/1600x900/?varanasi-life'
    ]
  },
  {
    name: 'Ladakh Adventure',
    description: 'Experience the breathtaking landscapes of Ladakh, with its high-altitude deserts, ancient monasteries, and stunning mountain views.',
    imageUrl: 'https://source.unsplash.com/1600x900/?ladakh',
    category: 'Adventure',
    rating: 4.9,
    price: '₹25,000',
    location: 'Leh, Ladakh',
    duration: '7-10 days',
    groupSize: '4-12 people',
    bestTime: 'June to September',
    featured: true,
    highlights: [
      'Pangong Lake visit',
      'Monastery tours',
      'Mountain biking',
      'Camping under stars',
      'Local culture experience'
    ],
    includes: [
      'Accommodation',
      'All meals',
      'Transport',
      'Activities',
      'Oxygen support'
    ],
    gallery: [
      'https://source.unsplash.com/1600x900/?ladakh-mountain',
      'https://source.unsplash.com/1600x900/?pangong-lake',
      'https://source.unsplash.com/1600x900/?ladakh-monastery',
      'https://source.unsplash.com/1600x900/?ladakh-camping'
    ]
  }
];

export const addSampleDestinations = async () => {
  try {
    const destinationsRef = collection(db, 'destinations');
    
    for (const destination of sampleDestinations) {
      await addDoc(destinationsRef, {
        ...destination,
        createdAt: new Date()
      });
      console.log(`Added destination: ${destination.name}`);
    }
    
    console.log('Successfully added all sample destinations!');
  } catch (error) {
    console.error('Error adding sample destinations:', error);
  }
};

// To use this function, import and call it once:
// import { addSampleDestinations } from './utils/addSampleDestinations';
// addSampleDestinations(); 