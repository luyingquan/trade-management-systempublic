export interface DelistingRecord {
    id?: number;
    ginfoNumber: string;
    weight: number;
    price: number;
    warehouse: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
    createdAt?: string;
    updatedAt?: string;
}
