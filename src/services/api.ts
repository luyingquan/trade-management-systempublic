import { Contract, TradeOrder, MarginPayment, DeliveryRequest } from '../types/trade';
import { ListingItem } from '../types/listing';
import { PageRequest, PageResponse } from '../types/common';
import { message } from 'antd';

const BASE_URL = 'http://localhost:8080/api';

// 通用的错误处理函数
const handleError = (error: any) => {
  console.error('API Error:', error);
  message.error('操作失败，请稍后重试');
  throw error;
};

// 将 Ant Design 的排序方式转换为后端接受的格式
const convertSortOrder = (order?: string) => {
  if (!order) return 'desc';
  return order === 'descend' ? 'desc' : 'asc';
};

// 挂牌相关 API
export const listingApi = {
  getListings: async (pageRequest: PageRequest): Promise<PageResponse<ListingItem>> => {
    try {
      const params = new URLSearchParams({
        pageNum: pageRequest.pageNum.toString(),
        pageSize: pageRequest.pageSize.toString(),
        sortField: pageRequest.sortField || '',
        sortOrder: convertSortOrder(pageRequest.sortOrder),
      });

      // 添加可选参数
      if (pageRequest.type) {
        params.append('type', pageRequest.type);
      }
      if (pageRequest.priceState) {
        params.append('priceState', pageRequest.priceState);
      }

      const response = await fetch(`${BASE_URL}/listings?${params}`);
      if (!response.ok) throw new Error('获取挂牌列表失败');
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },

  getListing: async (id: number): Promise<ListingItem> => {
    try {
      const response = await fetch(`${BASE_URL}/listings/${id}`);
      if (!response.ok) throw new Error('获取挂牌详情失败');
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },

  createListing: async (listing: Partial<ListingItem>): Promise<ListingItem> => {
    try {
      const response = await fetch(`${BASE_URL}/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listing),
      });
      if (!response.ok) throw new Error('创建挂牌失败');
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },

  updateListing: async (id: number, listing: Partial<ListingItem>): Promise<ListingItem> => {
    try {
      console.log('Updating listing:', id, listing); // 添加日志
      const response = await fetch(`${BASE_URL}/listings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listing),
      });
      if (!response.ok) {
        console.error('Update failed:', response.status, response.statusText);
        throw new Error('更新挂牌失败');
      }
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },

  deleteListing: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/listings/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('删除挂牌失败');
    } catch (error) {
      return handleError(error);
    }
  },
};

// 合同相关 API
export const contractApi = {
  getContracts: async (pageRequest: PageRequest): Promise<PageResponse<Contract>> => {
    try {
      const response = await fetch(`${BASE_URL}/contracts?` + new URLSearchParams({
        pageNum: pageRequest.pageNum.toString(),
        pageSize: pageRequest.pageSize.toString(),
        sortField: pageRequest.sortField || '',
        sortOrder: convertSortOrder(pageRequest.sortOrder),
      }));
      if (!response.ok) throw new Error('获取合同列表失败');
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },

  getContract: async (id: number): Promise<Contract> => {
    try {
      const response = await fetch(`${BASE_URL}/contracts/${id}`);
      if (!response.ok) throw new Error('获取合同详情失败');
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },

  createContract: async (contract: Partial<Contract>): Promise<Contract> => {
    try {
      const response = await fetch(`${BASE_URL}/contracts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contract),
      });
      if (!response.ok) throw new Error('创建合同失败');
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },

  updateContract: async (id: number, contract: Partial<Contract>): Promise<Contract> => {
    try {
      const response = await fetch(`${BASE_URL}/contracts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contract),
      });
      if (!response.ok) throw new Error('更新合同失败');
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },
};

// 交易相关 API
export const tradeApi = {
  createOrder: async (order: Partial<TradeOrder>): Promise<TradeOrder> => {
    try {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (!response.ok) throw new Error('创建订单失败');
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },

  updateOrder: async (id: number, order: Partial<TradeOrder>): Promise<TradeOrder> => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      if (!response.ok) throw new Error('更新订单失败');
      return await response.json();
    } catch (error) {
      return handleError(error);
    }
  },
};

// 交割相关 API
export const deliveryApi = {
  requestDelivery: async (request: DeliveryRequest): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/delivery/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      if (!response.ok) throw new Error('请求交割失败');
    } catch (error) {
      return handleError(error);
    }
  },

  confirmDelivery: async (contractId: number): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/delivery/confirm/${contractId}`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('确认交割失败');
    } catch (error) {
      return handleError(error);
    }
  },
};
