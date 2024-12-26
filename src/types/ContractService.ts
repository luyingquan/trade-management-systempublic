import { Contract } from './contract';
import { PageRequest } from './PageRequest';
import { PageResponse } from './PageResponse';

export interface ContractService {
  getContracts: (pageRequest: PageRequest) => Promise<PageResponse<Contract>>;
  getContract: (id: number) => Promise<Contract>;
  createContract: (contract: Partial<Contract>) => Promise<Contract>;
  updateContract: (id: number, contract: Partial<Contract>) => Promise<Contract>;
  requestEarlyDelivery: (id: number) => Promise<void>;
  requestDelayedDelivery: (id: number) => Promise<void>;
  payMargin: (id: number, amount: number) => Promise<void>;
  submitDeliveryRequest?: (id: number, request: any) => Promise<void>;
  submitMarginPayment?: (id: number, payment: any) => Promise<void>;
}