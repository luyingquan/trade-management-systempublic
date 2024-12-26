export interface ListingItem {
    id: number;
    productType: string;
    referenceContract: string;
    basis: number;
    deliveryPeriod: string;
    deliveryMethod: string;
    warehouse: string;
    minTradeUnit: number;
    priceRange: {
      min: number;
      max: number;
    };
    status?: string;
  }