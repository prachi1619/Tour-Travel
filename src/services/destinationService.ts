import axios from 'axios';
import { Destination } from '../types/destination';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

export const destinationService = {
  // Get all destinations with optional filters
  async getAllDestinations(filters?: {
    state?: string;
    type?: string;
    featured?: boolean;
    trending?: boolean;
    hiddenGem?: boolean;
  }): Promise<Destination[]> {
    const response = await axios.get(`${API_BASE_URL}/destinations`, { params: filters });
    return response.data;
  },

  // Get destinations by state
  async getDestinationsByState(state: string): Promise<Destination[]> {
    const response = await axios.get(`${API_BASE_URL}/destinations/state/${state}`);
    return response.data;
  },

  // Get featured destinations
  async getFeaturedDestinations(): Promise<Destination[]> {
    const response = await axios.get(`${API_BASE_URL}/destinations/featured`);
    return response.data;
  },

  // Get trending destinations
  async getTrendingDestinations(): Promise<Destination[]> {
    const response = await axios.get(`${API_BASE_URL}/destinations/trending`);
    return response.data;
  },

  // Get hidden gems
  async getHiddenGems(): Promise<Destination[]> {
    const response = await axios.get(`${API_BASE_URL}/destinations/hidden-gems`);
    return response.data;
  },

  // Get single destination by ID
  async getDestinationById(id: string): Promise<Destination> {
    const response = await axios.get(`${API_BASE_URL}/destinations/${id}`);
    return response.data;
  },

  // Get nearby destinations
  async getNearbyDestinations(id: string, radius: number): Promise<Destination[]> {
    const response = await axios.get(`${API_BASE_URL}/destinations/${id}/nearby`, {
      params: { radius }
    });
    return response.data;
  },

  // Search destinations
  async searchDestinations(query: string): Promise<Destination[]> {
    const response = await axios.get(`${API_BASE_URL}/destinations/search`, {
      params: { q: query }
    });
    return response.data;
  }
}; 