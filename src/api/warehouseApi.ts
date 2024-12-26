import axios from 'axios';

interface Warehouse {
  id: number;
  name: string;
  price: number;
}

const BASE_URL = 'http://localhost:8080/api/warehouses';

export const warehouseApi = {
  getWarehouses: async (): Promise<Warehouse[]> => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  getWarehouse: async (id: number): Promise<Warehouse> => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  createWarehouse: async (warehouse: Omit<Warehouse, 'id'>): Promise<Warehouse> => {
    const response = await axios.post(BASE_URL, warehouse);
    return response.data;
  },

  updateWarehouse: async (warehouse: Warehouse): Promise<Warehouse> => {
    const response = await axios.put(`${BASE_URL}/${warehouse.id}`, warehouse);
    return response.data;
  },

  deleteWarehouse: async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
