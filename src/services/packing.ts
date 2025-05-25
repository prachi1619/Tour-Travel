interface PackingCategory {
  name: string;
  items: Array<{
    name: string;
    essential: boolean;
  }>;
}

const baseItems: PackingCategory[] = [
  {
    name: 'Documents',
    items: [
      { name: 'Passport/ID', essential: true },
      { name: 'Travel Insurance', essential: true },
      { name: 'Booking Confirmations', essential: true },
      { name: 'Emergency Contacts', essential: true },
      { name: 'Vaccination Records', essential: false },
      { name: 'Travel Itinerary', essential: false },
    ]
  },
  {
    name: 'Clothing',
    items: [
      { name: 'T-shirts/Shirts', essential: true },
      { name: 'Pants/Shorts', essential: true },
      { name: 'Undergarments', essential: true },
      { name: 'Socks', essential: true },
      { name: 'Sleepwear', essential: true },
      { name: 'Light Jacket', essential: false },
      { name: 'Formal Wear', essential: false },
      { name: 'Swimming Gear', essential: false },
    ]
  },
  {
    name: 'Toiletries',
    items: [
      { name: 'Toothbrush & Toothpaste', essential: true },
      { name: 'Soap/Body Wash', essential: true },
      { name: 'Shampoo', essential: true },
      { name: 'Deodorant', essential: true },
      { name: 'Sunscreen', essential: true },
      { name: 'Hand Sanitizer', essential: true },
      { name: 'First Aid Kit', essential: false },
      { name: 'Medications', essential: false },
    ]
  },
  {
    name: 'Electronics',
    items: [
      { name: 'Phone & Charger', essential: true },
      { name: 'Power Bank', essential: true },
      { name: 'Universal Adapter', essential: false },
      { name: 'Camera', essential: false },
      { name: 'Laptop/Tablet', essential: false },
      { name: 'E-reader', essential: false },
    ]
  },
  {
    name: 'Accessories',
    items: [
      { name: 'Wallet', essential: true },
      { name: 'Sunglasses', essential: true },
      { name: 'Day Bag/Backpack', essential: true },
      { name: 'Water Bottle', essential: true },
      { name: 'Umbrella', essential: false },
      { name: 'Travel Pillow', essential: false },
    ]
  }
];

interface PackingOptions {
  duration: number;
  includeBeach?: boolean;
  includeHiking?: boolean;
  includeBusiness?: boolean;
}

export function generatePackingList(options: PackingOptions): PackingCategory[] {
  let checklist = JSON.parse(JSON.stringify(baseItems)) as PackingCategory[];

  // Add beach items
  if (options.includeBeach) {
    checklist.push({
      name: 'Beach Essentials',
      items: [
        { name: 'Beach Towel', essential: true },
        { name: 'Swimwear', essential: true },
        { name: 'Beach Bag', essential: true },
        { name: 'Sunhat', essential: true },
        { name: 'Beach Sandals', essential: true },
        { name: 'After-sun Lotion', essential: false },
      ]
    });
  }

  // Add hiking items
  if (options.includeHiking) {
    checklist.push({
      name: 'Hiking Gear',
      items: [
        { name: 'Hiking Boots', essential: true },
        { name: 'Hiking Socks', essential: true },
        { name: 'Backpack', essential: true },
        { name: 'Water Bottle', essential: true },
        { name: 'Trail Mix/Snacks', essential: true },
        { name: 'First Aid Kit', essential: true },
        { name: 'Hiking Poles', essential: false },
      ]
    });
  }

  // Add business items
  if (options.includeBusiness) {
    checklist.push({
      name: 'Business Essentials',
      items: [
        { name: 'Business Suits', essential: true },
        { name: 'Formal Shoes', essential: true },
        { name: 'Business Cards', essential: true },
        { name: 'Laptop & Charger', essential: true },
        { name: 'Notebook & Pen', essential: true },
        { name: 'Presentation Materials', essential: false },
      ]
    });
  }

  return checklist;
} 