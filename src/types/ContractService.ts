import { ContractItem } from './contract';
import { PageRequest } from './PageRequest';
import { PageResponse } from './PageResponse';

export interface ContractService {
  getContracts: (pageRequest: PageRequest) => Promise<PageResponse<ContractItem>>;
  getContract: (id: number) => Promise<ContractItem>;
  createContract: (contract: Partial<ContractItem>) => Promise<ContractItem>;
  updateContract: (id: number, contract: Partial<ContractItem>) => Promise<ContractItem>;
  requestEarlyDelivery: (id: number) => Promise<void>;
  requestDelayedDelivery: (id: number) => Promise<void>;
  payMargin: (id: number, amount: number) => Promise<void>;
  submitDeliveryRequest?: (id: number, request: any) => Promise<ContractItem>;
  submitMarginPayment?: (id: number, payment: any) => Promise<ContractItem>;
}