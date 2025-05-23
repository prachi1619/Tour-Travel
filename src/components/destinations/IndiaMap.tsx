import React from 'react';

interface IndiaMapProps {
  onStateSelect: (state: string) => void;
  selectedState: string | null;
}

const IndiaMap: React.FC<IndiaMapProps> = ({ onStateSelect, selectedState }) => {
  return (
    <div className="relative w-full aspect-[4/5] max-w-3xl mx-auto">
      <svg
        viewBox="0 0 500 600"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
      >
        {/* This is a placeholder. You'll need to add actual SVG paths for each state */}
        {/* Example state path */}
        <path
          d="M200,150 L220,160 L240,155 L230,180 Z"
          className={`cursor-pointer transition-colors ${
            selectedState === 'Maharashtra'
              ? 'fill-blue-500'
              : 'fill-gray-200 hover:fill-blue-300'
          }`}
          onClick={() => onStateSelect('Maharashtra')}
        />
        {/* Add more state paths here */}
      </svg>

      {/* State Tooltip */}
      {selectedState && (
        <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md">
          {selectedState}
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-md">
        <h4 className="font-semibold mb-2">Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 mr-2"></div>
            <span className="text-sm">Unselected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 mr-2"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-300 mr-2"></div>
            <span className="text-sm">Hover</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;

// Note: For a production application, you would want to:
// 1. Add actual SVG paths for each state of India
// 2. Consider using a library like react-simple-maps for better interactivity
// 3. Add proper tooltips and hover effects
// 4. Include state boundaries and names
// 5. Add zoom and pan capabilities for better UX 