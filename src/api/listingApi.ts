import axios from 'axios';
import { ListingItem } from '../types/listing';

const BASE_URL = 'http://localhost:8080/api/listings';

interface ListingResponse {
  items: ListingItem[];
  total: number;
  totalPages: number;
}

export const listingApi = {
  getListings: async (page: number = 1, pageSize: number = 10): Promise<ListingResponse> => {
    const response = await axios.get(`${BASE_URL}?page=${page}&size=${pageSize}`);
    return response.data;
  },

  getAllListings: async (): Promise<ListingItem[]> => {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  },

  getListing: async (id: number): Promise<ListingItem> => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  createListing: async (listing: Omit<ListingItem, 'id'>): Promise<ListingItem> => {
    const response = await axios.post(BASE_URL, listing);
    return response.data;
  },

  updateListing: async (listing: ListingItem): Promise<ListingItem> => {
    const response = await axios.put(`${BASE_URL}/${listing.id}`, listing);
    return response.data;
  },

  deleteListing: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
