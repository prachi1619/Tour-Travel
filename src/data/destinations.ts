import type { Destination } from '../types';

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Taj Mahal, Agra',
    slug: 'taj-mahal-agra',
    state: 'Uttar Pradesh',
    region: 'North',
    type: ['Historical', 'Cultural'],
    budget: 'Mid-range',
    bestSeason: ['Winter', 'Autumn'],
    description: 'The Taj Mahal is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.',
    shortDescription: 'An iconic symbol of love, the Taj Mahal is one of the seven wonders of the world.',
    imageUrl: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg',
    imageGallery: [
      'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg',
      'https://images.pexels.com/photos/3522572/pexels-photo-3522572.jpeg',
      'https://images.pexels.com/photos/16902749/pexels-photo-16902749/free-photo-of-taj-mahal-in-agra-india.jpeg',
      'https://images.pexels.com/photos/19768562/pexels-photo-19768562/free-photo-of-the-sun-shining-on-taj-mahal.jpeg'
    ],
    bestTimeToVisit: 'October to March when the weather is pleasant. Visit during sunrise for a magical experience.',
    howToReach: {
      air: 'Agra Airport is connected to major cities. Delhi Airport is 230 km away with better connectivity.',
      train: 'Agra Cantt is well connected to major cities including Delhi, Mumbai, and Kolkata.',
      road: 'Well-connected by highways. Delhi to Agra is around 4 hours via Yamuna Expressway.'
    },
    nearbyPlaces: [
      {
        id: '101',
        name: 'Agra Fort',
        slug: 'agra-fort',
        distance: '3 km',
        imageUrl: 'https://images.pexels.com/photos/18897910/pexels-photo-18897910/free-photo-of-agra-fort-in-india.jpeg'
      },
      {
        id: '102',
        name: 'Fatehpur Sikri',
        slug: 'fatehpur-sikri',
        distance: '40 km',
        imageUrl: 'https://images.pexels.com/photos/18094883/pexels-photo-18094883/free-photo-of-buland-darwaza-at-fatehpur-sikri.jpeg'
      }
    ],
    localFood: [
      'Petha (a translucent soft candy)',
      'Agra Chaat',
      'Bedai with Aloo Sabzi',
      'Dalmoth'
    ],
    stayOptions: [
      {
        type: 'Budget',
        description: 'Hostels and budget hotels near Taj Ganj area.',
        priceRange: '₹800-₹2,000'
      },
      {
        type: 'Mid-range',
        description: 'Comfortable hotels with good amenities and Taj views.',
        priceRange: '₹2,000-₹6,000'
      },
      {
        type: 'Luxury',
        description: 'Five-star hotels offering excellent services and perfect Taj views.',
        priceRange: '₹8,000-₹30,000'
      }
    ],
    culturalSignificance: 'The Taj Mahal represents the finest example of Mughal architecture, a blend of Indian, Persian, and Islamic styles. It stands as a symbol of eternal love and is recognized as a UNESCO World Heritage Site.',
    featured: true,
    trending: true
  },
  {
    id: '2',
    name: 'Varanasi',
    slug: 'varanasi',
    state: 'Uttar Pradesh',
    region: 'North',
    type: ['Spiritual', 'Cultural', 'Historical'],
    budget: 'Budget',
    bestSeason: ['Winter', 'Autumn'],
    description: 'Varanasi, also known as Banaras, is a city on the banks of the Ganges in Uttar Pradesh, India. A major religious hub in India, it is the holiest of the seven sacred cities in Hinduism and Jainism, and played an important role in the development of Buddhism.',
    shortDescription: 'One of the world\'s oldest continuously inhabited cities and a spiritual center of India.',
    imageUrl: 'https://images.pexels.com/photos/5257534/pexels-photo-5257534.jpeg',
    imageGallery: [
      'https://images.pexels.com/photos/5257534/pexels-photo-5257534.jpeg',
      'https://images.pexels.com/photos/2387871/pexels-photo-2387871.jpeg',
      'https://images.pexels.com/photos/3894807/pexels-photo-3894807.jpeg',
      'https://images.pexels.com/photos/8896883/pexels-photo-8896883.jpeg'
    ],
    bestTimeToVisit: 'October to March for pleasant weather. Visit during Dev Deepawali in November for a magical experience.',
    howToReach: {
      air: 'Lal Bahadur Shastri International Airport has connections to major Indian cities.',
      train: 'Varanasi Junction is well connected to major cities across India.',
      road: 'Connected by highways to major cities in North India.'
    },
    nearbyPlaces: [
      {
        id: '201',
        name: 'Sarnath',
        slug: 'sarnath',
        distance: '10 km',
        imageUrl: 'https://images.pexels.com/photos/15239284/pexels-photo-15239284/free-photo-of-dhamekh-stupa-in-sarnath-india.jpeg'
      },
      {
        id: '202',
        name: 'Chunar Fort',
        slug: 'chunar-fort',
        distance: '40 km',
        imageUrl: 'https://images.pexels.com/photos/19662949/pexels-photo-19662949/free-photo-of-fort-in-india.jpeg'
      }
    ],
    localFood: [
      'Banarasi Paan',
      'Kachori Sabzi',
      'Choora Matar',
      'Lassi',
      'Malaiyyo (seasonal milk dessert)'
    ],
    stayOptions: [
      {
        type: 'Budget',
        description: 'Guesthouses and hostels near the ghats.',
        priceRange: '₹500-₹1,500'
      },
      {
        type: 'Mid-range',
        description: 'Comfortable hotels with river views and good amenities.',
        priceRange: '₹1,500-₹4,000'
      },
      {
        type: 'Luxury',
        description: 'Heritage hotels and luxury accommodations with exceptional services.',
        priceRange: '₹5,000-₹20,000'
      }
    ],
    culturalSignificance: 'Varanasi is a spiritual capital of India. The Ganga Aarti performed every evening at Dashashwamedh Ghat attracts thousands of visitors. It is believed that dying in Varanasi brings salvation (moksha).',
    featured: true,
    trending: false
  },
  {
    id: '3',
    name: 'Jaipur',
    slug: 'jaipur',
    state: 'Rajasthan',
    region: 'North',
    type: ['Historical', 'Cultural'],
    budget: 'Mid-range',
    bestSeason: ['Winter', 'Autumn'],
    description: 'Jaipur is the capital of India\'s Rajasthan state. It evokes the royal family that once ruled the region and that, in 1727, founded what is now called the Old City, or "Pink City" for its trademark building color. With its stunning Amber Fort, City Palace, and vibrant markets, Jaipur forms part of India\'s popular Golden Triangle tourist circuit.',
    shortDescription: 'Known as the Pink City, Jaipur is famous for its majestic palaces, vibrant culture, and traditional crafts.',
    imageUrl: 'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg',
    imageGallery: [
      'https://images.pexels.com/photos/3581364/pexels-photo-3581364.jpeg',
      'https://images.pexels.com/photos/3581344/pexels-photo-3581344.jpeg',
      'https://images.pexels.com/photos/4115131/pexels-photo-4115131.jpeg',
      'https://images.pexels.com/photos/9412508/pexels-photo-9412508.jpeg'
    ],
    bestTimeToVisit: 'October to March when the weather is pleasant. January is ideal for the kite festival.',
    howToReach: {
      air: 'Jaipur International Airport has good connectivity to major cities.',
      train: 'Jaipur Junction is well connected to major cities across India.',
      road: 'Excellent highway connections to Delhi, Agra, and other cities in North India.'
    },
    nearbyPlaces: [
      {
        id: '301',
        name: 'Amer Fort',
        slug: 'amer-fort',
        distance: '11 km',
        imageUrl: 'https://images.pexels.com/photos/13446950/pexels-photo-13446950.jpeg'
      },
      {
        id: '302',
        name: 'Pushkar',
        slug: 'pushkar',
        distance: '150 km',
        imageUrl: 'https://images.pexels.com/photos/18939653/pexels-photo-18939653/free-photo-of-brahma-temple-in-pushkar-india.jpeg'
      }
    ],
    localFood: [
      'Dal Baati Churma',
      'Pyaaz Kachori',
      'Ghewar',
      'Laal Maas',
      'Ker Sangri'
    ],
    stayOptions: [
      {
        type: 'Budget',
        description: 'Guesthouses and hostels in the old city area.',
        priceRange: '₹700-₹2,000'
      },
      {
        type: 'Mid-range',
        description: 'Heritage havelis converted to hotels with traditional decor.',
        priceRange: '₹2,000-₹5,000'
      },
      {
        type: 'Luxury',
        description: 'Palace hotels and luxury resorts offering royal experiences.',
        priceRange: '₹7,000-₹50,000'
      }
    ],
    culturalSignificance: 'Jaipur\'s architecture, crafts, and cultural practices reflect the rich Rajput heritage. The city is known for its textiles, jewelry, blue pottery, and traditional block printing techniques.',
    featured: true,
    trending: true
  },
  {
    id: '4',
    name: 'Goa',
    slug: 'goa',
    state: 'Goa',
    region: 'West',
    type: ['Beach', 'Cultural'],
    budget: 'Mid-range',
    bestSeason: ['Winter', 'Autumn'],
    description: 'Goa is a state on India\'s southwestern coast known for its beaches, cuisine, and Portuguese-colonial architecture. It\'s a popular destination for both Indian and international tourists seeking sun, sand, and a vibrant nightlife.',
    shortDescription: 'India\'s beach paradise with a unique blend of Indian and Portuguese culture.',
    imageUrl: 'https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg',
    imageGallery: [
      'https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg',
      'https://images.pexels.com/photos/19652490/pexels-photo-19652490/free-photo-of-arambol-beach-in-goa-india.jpeg',
      'https://images.pexels.com/photos/14584293/pexels-photo-14584293.jpeg',
      'https://images.pexels.com/photos/11249808/pexels-photo-11249808.jpeg'
    ],
    bestTimeToVisit: 'November to February for pleasant weather and festive atmosphere. Monsoon (June-September) offers lush green landscapes.',
    howToReach: {
      air: 'Dabolim Airport connects Goa to major cities in India and some international destinations.',
      train: 'Madgaon and Thivim are major railway stations connected to major cities.',
      road: 'Connected by highways to major cities in western India.'
    },
    nearbyPlaces: [
      {
        id: '401',
        name: 'Dudhsagar Falls',
        slug: 'dudhsagar-falls',
        distance: '60 km from Panaji',
        imageUrl: 'https://images.pexels.com/photos/13990210/pexels-photo-13990210.jpeg'
      },
      {
        id: '402',
        name: 'Hampi',
        slug: 'hampi',
        distance: '320 km',
        imageUrl: 'https://images.pexels.com/photos/19011354/pexels-photo-19011354/free-photo-of-hampi-in-karnataka-india.jpeg'
      }
    ],
    localFood: [
      'Goan Fish Curry',
      'Vindaloo',
      'Bebinca',
      'Sorpotel',
      'Feni (local liquor)'
    ],
    stayOptions: [
      {
        type: 'Budget',
        description: 'Beach huts and hostels near popular beaches.',
        priceRange: '₹800-₹2,000'
      },
      {
        type: 'Mid-range',
        description: 'Comfortable hotels and resorts with good amenities.',
        priceRange: '₹2,500-₹6,000'
      },
      {
        type: 'Luxury',
        description: 'Luxury beach resorts and boutique hotels with premium services.',
        priceRange: '₹8,000-₹30,000'
      }
    ],
    culturalSignificance: 'Goa\'s culture is a unique blend of Indian and Portuguese influences, evident in its architecture, cuisine, music, and festivals. The churches and convents of Old Goa are UNESCO World Heritage Sites.',
    featured: true,
    trending: true
  },
  {
    id: '5',
    name: 'Darjeeling',
    slug: 'darjeeling',
    state: 'West Bengal',
    region: 'East',
    type: ['Hill Station', 'Nature'],
    budget: 'Mid-range',
    bestSeason: ['Spring', 'Autumn'],
    description: 'Darjeeling is a town in India\'s West Bengal state, in the Himalayan foothills. It remains the iconic hill station developed during British colonial rule, and is internationally renowned for its tea industry and the Darjeeling Himalayan Railway, a UNESCO World Heritage Site.',
    shortDescription: 'A charming hill station known for its tea plantations and stunning views of the Himalayas.',
    imageUrl: 'https://images.pexels.com/photos/19249285/pexels-photo-19249285/free-photo-of-darjeeling-himalayan-railway-toy-train.jpeg',
    imageGallery: [
      'https://images.pexels.com/photos/19249285/pexels-photo-19249285/free-photo-of-darjeeling-himalayan-railway-toy-train.jpeg',
      'https://images.pexels.com/photos/15245562/pexels-photo-15245562/free-photo-of-view-on-kanchenjunga-from-darjeeling-india.jpeg',
      'https://images.pexels.com/photos/9084443/pexels-photo-9084443.jpeg',
      'https://images.pexels.com/photos/15245559/pexels-photo-15245559/free-photo-of-tea-plantation-in-darjeeling-india.jpeg'
    ],
    bestTimeToVisit: 'April to June for clear views of Kanchenjunga. September to November for pleasant weather after monsoon.',
    howToReach: {
      air: 'Bagdogra Airport (95 km) is the nearest airport with connections to major cities.',
      train: 'New Jalpaiguri (NJP) station (80 km) is well connected to major cities.',
      road: 'Connected by mountain roads to Siliguri and other nearby towns.'
    },
    nearbyPlaces: [
      {
        id: '501',
        name: 'Tiger Hill',
        slug: 'tiger-hill',
        distance: '11 km',
        imageUrl: 'https://images.pexels.com/photos/13292769/pexels-photo-13292769.jpeg'
      },
      {
        id: '502',
        name: 'Mirik',
        slug: 'mirik',
        distance: '50 km',
        imageUrl: 'https://images.pexels.com/photos/9979045/pexels-photo-9979045.jpeg'
      }
    ],
    localFood: [
      'Darjeeling Tea',
      'Momos',
      'Thukpa',
      'Sel Roti',
      'Gundruk'
    ],
    stayOptions: [
      {
        type: 'Budget',
        description: 'Homestays and budget hotels in the town area.',
        priceRange: '₹800-₹2,000'
      },
      {
        type: 'Mid-range',
        description: 'Comfortable hotels with mountain views and good amenities.',
        priceRange: '₹2,000-₹5,000'
      },
      {
        type: 'Luxury',
        description: 'Heritage hotels and luxury resorts with exceptional services.',
        priceRange: '₹6,000-₹20,000'
      }
    ],
    culturalSignificance: 'Darjeeling represents a blend of Nepali, Tibetan, and Bengali cultures. The town is famous for its tea gardens, the toy train, and as a gateway to Eastern Himalayan culture.',
    featured: false,
    trending: true
  },
  {
    id: '6',
    name: 'Kerala Backwaters',
    slug: 'kerala-backwaters',
    state: 'Kerala',
    region: 'South',
    type: ['Nature', 'Cultural'],
    budget: 'Mid-range',
    bestSeason: ['Winter', 'Autumn'],
    description: 'The Kerala backwaters are a network of interconnected canals, rivers, lakes, and inlets formed by more than 900 km of waterways. These serene waterways offer a unique experience of rural Kerala life, with traditional houseboats providing accommodation and transportation.',
    shortDescription: 'A tranquil network of lagoons, lakes, and canals parallel to the Arabian Sea coast.',
    imageUrl: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
    imageGallery: [
      'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
      'https://images.pexels.com/photos/1310755/pexels-photo-1310755.jpeg',
      'https://images.pexels.com/photos/3520635/pexels-photo-3520635.jpeg',
      'https://images.pexels.com/photos/3224533/pexels-photo-3224533.jpeg'
    ],
    bestTimeToVisit: 'October to March for pleasant weather after monsoon. August-September for Onam festival celebrations.',
    howToReach: {
      air: 'Cochin International Airport has connections to major cities and international destinations.',
      train: 'Alappuzha and Kochi railway stations are well connected to major cities.',
      road: 'Good road connectivity to major cities in South India.'
    },
    nearbyPlaces: [
      {
        id: '601',
        name: 'Kumarakom',
        slug: 'kumarakom',
        distance: '16 km from Alappuzha',
        imageUrl: 'https://images.pexels.com/photos/1796505/pexels-photo-1796505.jpeg'
      },
      {
        id: '602',
        name: 'Fort Kochi',
        slug: 'fort-kochi',
        distance: '50 km from Alappuzha',
        imageUrl: 'https://images.pexels.com/photos/12850029/pexels-photo-12850029.jpeg'
      }
    ],
    localFood: [
      'Kerala Fish Curry',
      'Appam with Stew',
      'Puttu and Kadala Curry',
      'Karimeen Pollichathu',
      'Kerala Sadya'
    ],
    stayOptions: [
      {
        type: 'Budget',
        description: 'Homestays and budget houseboats.',
        priceRange: '₹1,500-₹3,000'
      },
      {
        type: 'Mid-range',
        description: 'Comfortable houseboats and waterfront resorts.',
        priceRange: '₹3,000-₹8,000'
      },
      {
        type: 'Luxury',
        description: 'Premium houseboats and luxury waterfront resorts.',
        priceRange: '₹8,000-₹25,000'
      }
    ],
    culturalSignificance: 'The backwaters showcase traditional Kerala lifestyle, with villages lining the waterways where fishing and farming are primary occupations. The kettuvallam (houseboats) were traditionally used to transport rice and spices but now serve tourists.',
    featured: true,
    trending: false
  }
];