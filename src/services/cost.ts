interface CostFactors {
  destination: string;
  duration: number;
  travelStyle: 'Budget' | 'Mid-range' | 'Luxury';
}

interface CostBreakdown {
  accommodation: number;
  transportation: number;
  food: number;
  activities: number;
  miscellaneous: number;
  total: number;
}

const costMultipliers = {
  Budget: {
    accommodation: 1000,
    transportation: 500,
    food: 500,
    activities: 300,
    miscellaneous: 200
  },
  'Mid-range': {
    accommodation: 2500,
    transportation: 1000,
    food: 1000,
    activities: 800,
    miscellaneous: 500
  },
  Luxury: {
    accommodation: 5000,
    transportation: 2000,
    food: 2000,
    activities: 1500,
    miscellaneous: 1000
  }
};

// Destination cost factors (relative to base costs)
const destinationFactors: { [key: string]: number } = {
  'Mumbai': 1.2,
  'Delhi': 1.1,
  'Bangalore': 1.15,
  'Goa': 1.3,
  'Jaipur': 0.9,
  'Kolkata': 0.85,
  'Chennai': 0.95,
  'default': 1.0
};

export function calculateTripCost(factors: CostFactors): CostBreakdown {
  const multipliers = costMultipliers[factors.travelStyle];
  const destinationFactor = destinationFactors[factors.destination] || destinationFactors.default;

  const costs = {
    accommodation: multipliers.accommodation * factors.duration * destinationFactor,
    transportation: multipliers.transportation * destinationFactor,
    food: multipliers.food * factors.duration * destinationFactor,
    activities: multipliers.activities * factors.duration * destinationFactor,
    miscellaneous: multipliers.miscellaneous * factors.duration * destinationFactor
  };

  const total = Object.values(costs).reduce((sum, cost) => sum + cost, 0);

  return {
    ...costs,
    total
  };
} 