import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { destinationService } from '../../services/destinationService';
import { Destination } from '../../types/destination';
import IndiaMap from '../../components/destinations/IndiaMap';
import DestinationCard from '../../components/destinations/DestinationCard';
import SearchFilters from '../../components/destinations/SearchFilters';

const DestinationsPage: React.FC = () => {
  const [featuredDestinations, setFeaturedDestinations] = useState<Destination[]>([]);
  const [trendingDestinations, setTrendingDestinations] = useState<Destination[]>([]);
  const [hiddenGems, setHiddenGems] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    state: '',
    type: '',
    featured: false,
    trending: false,
    hiddenGem: false,
  });

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const [featured, trending, hidden] = await Promise.all([
          destinationService.getFeaturedDestinations(),
          destinationService.getTrendingDestinations(),
          destinationService.getHiddenGems(),
        ]);

        setFeaturedDestinations(featured);
        setTrendingDestinations(trending);
        setHiddenGems(hidden);
      } catch (err) {
        setError('Failed to load destinations');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleStateSelect = async (state: string) => {
    try {
      setSelectedState(state);
      const destinations = await destinationService.getDestinationsByState(state);
      // Handle the destinations for the selected state
    } catch (err) {
      setError('Failed to load state destinations');
    }
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    // Apply filters to the destinations
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            {/* Loading skeleton */}
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Explore India</h1>

        {/* Interactive Map */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Discover by Region</h2>
          <IndiaMap onStateSelect={handleStateSelect} selectedState={selectedState} />
        </section>

        {/* Search and Filters */}
        <section className="mb-12">
          <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
        </section>

        {/* Featured Destinations */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Featured Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </section>

        {/* Trending Now */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </section>

        {/* Hidden Gems */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Hidden Gems</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hiddenGems.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default DestinationsPage; 