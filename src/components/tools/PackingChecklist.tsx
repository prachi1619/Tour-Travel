import React, { useState } from 'react';

interface ChecklistOptions {
  duration: number;
  includeBeach: boolean;
  includeHiking: boolean;
  includeBusiness: boolean;
}

interface ChecklistItem {
  name: string;
  essential: boolean;
}

interface ChecklistCategory {
  name: string;
  items: ChecklistItem[];
}

const generatePackingList = (options: ChecklistOptions): ChecklistCategory[] => {
  const essentials: ChecklistCategory = {
    name: 'Essentials',
    items: [
      { name: 'Passport', essential: true },
      { name: 'Travel Insurance', essential: true },
      { name: 'Credit/Debit Cards', essential: true },
      { name: 'Phone & Charger', essential: true },
      { name: 'Power Bank', essential: false },
      { name: 'Travel Adapter', essential: true },
      { name: 'Basic Medicines', essential: true },
    ]
  };

  const clothing: ChecklistCategory = {
    name: 'Clothing',
    items: [
      { name: 'T-shirts/Tops', essential: true },
      { name: 'Pants/Shorts', essential: true },
      { name: 'Underwear', essential: true },
      { name: 'Socks', essential: true },
      { name: 'Sleepwear', essential: true },
      { name: 'Light Jacket', essential: false },
    ]
  };

  const toiletries: ChecklistCategory = {
    name: 'Toiletries',
    items: [
      { name: 'Toothbrush & Toothpaste', essential: true },
      { name: 'Shampoo & Soap', essential: true },
      { name: 'Deodorant', essential: true },
      { name: 'Sunscreen', essential: true },
      { name: 'Hand Sanitizer', essential: true },
    ]
  };

  let categories = [essentials, clothing, toiletries];

  // Add beach items
  if (options.includeBeach) {
    categories.push({
      name: 'Beach Items',
      items: [
        { name: 'Swimwear', essential: true },
        { name: 'Beach Towel', essential: true },
        { name: 'Sunglasses', essential: true },
        { name: 'Beach Bag', essential: false },
        { name: 'Flip Flops', essential: true },
      ]
    });
  }

  // Add hiking items
  if (options.includeHiking) {
    categories.push({
      name: 'Hiking Gear',
      items: [
        { name: 'Hiking Boots', essential: true },
        { name: 'Hiking Socks', essential: true },
        { name: 'Water Bottle', essential: true },
        { name: 'First Aid Kit', essential: true },
        { name: 'Map/Compass', essential: false },
        { name: 'Hiking Backpack', essential: true },
      ]
    });
  }

  // Add business items
  if (options.includeBusiness) {
    categories.push({
      name: 'Business Items',
      items: [
        { name: 'Formal Attire', essential: true },
        { name: 'Business Cards', essential: true },
        { name: 'Laptop & Charger', essential: true },
        { name: 'Notebook & Pen', essential: false },
        { name: 'Presentation Materials', essential: false },
      ]
    });
  }

  // Adjust clothing quantities based on duration
  const longTrip = options.duration > 7;
  if (longTrip) {
    clothing.items.push(
      { name: 'Additional Clothing Set', essential: true },
      { name: 'Laundry Bag', essential: true }
    );
  }

  return categories;
};

const PackingChecklist = () => {
  const [options, setOptions] = useState<ChecklistOptions>({
    duration: 7,
    includeBeach: false,
    includeHiking: false,
    includeBusiness: false
  });
  const [checklist, setChecklist] = useState(generatePackingList(options));
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, type, value } = e.target;
    const newValue = type === 'checkbox' ? checked : parseInt(value);
    setOptions(prev => ({
      ...prev,
      [name]: newValue
    }));
    setChecklist(generatePackingList({
      ...options,
      [name]: newValue
    }));
  };

  const toggleItem = (itemName: string) => {
    const newChecked = new Set(checked);
    if (newChecked.has(itemName)) {
      newChecked.delete(itemName);
    } else {
      newChecked.add(itemName);
    }
    setChecked(newChecked);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Packing Checklist</h2>
      
      <div className="mb-6 space-y-4">
        <div>
          <label className="block mb-2">Trip Duration (days)</label>
          <input
            type="number"
            name="duration"
            value={options.duration}
            onChange={handleOptionChange}
            min="1"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="includeBeach"
              checked={options.includeBeach}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Beach Trip
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="includeHiking"
              checked={options.includeHiking}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Hiking Trip
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="includeBusiness"
              checked={options.includeBusiness}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Business Trip
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {checklist.map((category) => (
          <div key={category.name} className="bg-gray-50 p-4 rounded">
            <h3 className="font-bold mb-4">{category.name}</h3>
            <div className="space-y-2">
              {category.items.map((item) => (
                <label key={item.name} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={checked.has(item.name)}
                    onChange={() => toggleItem(item.name)}
                    className="mr-2"
                  />
                  <span className={item.essential ? 'font-medium' : ''}>
                    {item.name}
                    {item.essential && <span className="text-red-500 ml-1">*</span>}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackingChecklist; 