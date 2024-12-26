export interface Contract {
  id: number;
  title: string;
  status: string;
  deliveryStatus: string;
  marginStatus: string;
  amount: number;
  price: number;
  quantity: number;
  deliveryDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContractService {
  getContracts: (pageRequest: PageRequest) => Promise<PageResponse<Contract>>;
  getContract: (id: number) => Promise<Contract>;
  createContract: (contract: Partial<Contract>) => Promise<Contract>;
  updateContract: (id: number, contract: Partial<Contract>) => Promise<Contract>;
  requestEarlyDelivery: (id: number) => Promise<void>;
  requestDelayedDelivery: (id: number) => Promise<void>;
  payMargin: (id: number, amount: number) => Promise<void>;
}

export interface PageRequest {
  page: number;
  size: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ContractItem {
  id: string;
  contractNo: string;          // 合同编号
  contractType: string;        // 合同类型
  contractStatus: string;      // 合同状态
  signDate: string;           // 签订日期
  effectiveDate: string;      // 生效日期
  expiryDate: string;         // 到期日期
  partyA: string;             // 甲方
  partyB: string;             // 乙方
  totalAmount: number;        // 合同总金额
  paidAmount: number;         // 已支付金额
  remainingAmount: number;    // 剩余金额
  paymentTerms: string;       // 支付条款
  deliveryTerms: string;      // 交付条款
  productDetails: {           // 产品明细
    productName: string;      // 产品名称
    specification: string;    // 规格
    quantity: number;         // 数量
    unitPrice: number;        // 单价
  }[];
  remarks: string;            // 备注
}