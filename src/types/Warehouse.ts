export interface Warehouse {
  id: number;
  code: string;
  name: string;
  location: string;
  capacity: number;
  currentStock: number;
  status: 'ACTIVE' | 'INACTIVE';
  type: 'STANDARD' | 'BONDED' | 'TEMPORARY';
}