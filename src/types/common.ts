export interface PageRequest {
  pageNum: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: string;
  type?: string;
  priceState?: string;
}

export interface PageResponse<T> {
  items: T[];
  pageNum: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
