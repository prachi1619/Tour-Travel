import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface TripCosts {
  accommodation: number;
  transportation: number;
  food: number;
  activities: number;
  miscellaneous: number;
  total: number;
}

const TripCalculator = () => {
  const [formData, setFormData] = useState({
    destination: '',
    duration: 1,
    travelStyle: 'Budget' as 'Budget' | 'Mid-range' | 'Luxury'
  });
  const [costs, setCosts] = useState<TripCosts | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value) || 1 : value
    }));
  };

  const calculateTripCost = (data: typeof formData): TripCosts => {
    let baseRates = {
      accommodation: 0,
      transportation: 0,
      food: 0,
      activities: 0,
      miscellaneous: 0
    };

    // Set base rates according to travel style
    switch (data.travelStyle) {
      case 'Budget':
        baseRates = {
          accommodation: 1000,
          transportation: 500,
          food: 500,
          activities: 300,
          miscellaneous: 200
        };
        break;
      case 'Mid-range':
        baseRates = {
          accommodation: 3000,
          transportation: 1000,
          food: 1000,
          activities: 800,
          miscellaneous: 500
        };
        break;
      case 'Luxury':
        baseRates = {
          accommodation: 8000,
          transportation: 2500,
          food: 2000,
          activities: 2000,
          miscellaneous: 1000
        };
        break;
    }

    // Calculate total costs based on duration
    const totalCosts = {
      accommodation: baseRates.accommodation * data.duration,
      transportation: baseRates.transportation * data.duration,
      food: baseRates.food * data.duration,
      activities: baseRates.activities * data.duration,
      miscellaneous: baseRates.miscellaneous * data.duration,
      total: 0
    };

    // Calculate total
    totalCosts.total = Object.values(totalCosts).reduce((a, b) => a + b, 0) - totalCosts.total;

    return totalCosts;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateTripCost(formData);
    setCosts(result);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Trip Cost Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="Where are you going?"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Duration (days)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="1"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Travel Style</label>
              <select
                name="travelStyle"
                value={formData.travelStyle}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option>Budget</option>
                <option>Mid-range</option>
                <option>Luxury</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Calculate Cost
            </button>
          </form>
        </div>
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-bold mb-4">Estimated Costs</h3>
          <div className="space-y-2">
            {costs ? (
              <>
                <p>Accommodation: ₹{costs.accommodation.toFixed(0)}</p>
                <p>Transportation: ₹{costs.transportation.toFixed(0)}</p>
                <p>Food & Drinks: ₹{costs.food.toFixed(0)}</p>
                <p>Activities: ₹{costs.activities.toFixed(0)}</p>
                <p>Miscellaneous: ₹{costs.miscellaneous.toFixed(0)}</p>
                <div className="border-t pt-2 mt-4">
                  <p className="font-bold">Total: ₹{costs.total.toFixed(0)}</p>
                </div>
              </>
            ) : (
              <>
                <p>Accommodation: ₹0</p>
                <p>Transportation: ₹0</p>
                <p>Food & Drinks: ₹0</p>
                <p>Activities: ₹0</p>
                <p>Miscellaneous: ₹0</p>
                <div className="border-t pt-2 mt-4">
                  <p className="font-bold">Total: ₹0</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCalculator; 