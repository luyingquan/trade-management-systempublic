export interface ListingItem {
  id: number;
  ginfoNumber: string;      // 挂牌编号
  ginfoDate: string;        // 挂牌日期
  systemDate: string;       // 数据生成日期
  mainPriceDemo: string;    // 期货参考合约
  typeName: string;         // 品种（钢铁行业大类）
  pnName: string;          // 品名（详细商品名称）
  goodsMateri: string;     // 钢种（如Q235B）
  goodsSpec: string;       // 规格
  hangWeight: number;      // 挂牌数量
  jicha: number;           // 期现货价差
  type: '公开交易' | '定向交易' | '指定交易';  // 交易类型
  rightType: '现货交收' | '期货交收';            // 交收方式
  priceLow: number;        // 最低价格
  priceUp: number;         // 最高价格
  marginLevel: number;     // 保证金比例
  unitNumber: number;      // 最小交易量
  remark: string;         // 备注
  rightDateNum: number;    // 合同生效日
  rightDate: string;       // 交货日期
  rightWareHouse: number;  // 交收仓库ID
  rightWarehouseName: string; // 交收仓库名称
  hits: number;            // 点击量
  state: '已发布' | '已下架';  // 数据状态
  priceState: '点价中' | '点价完成';  // 点价状态
  createdAt?: string;
  updatedAt?: string;
}

export interface Contract {
  id: number;
  orderId: string;
  contractNo: string;
  contractDate: string;
  productType: string;
  referenceContract: string;
  deliveryPeriod: string;
  deliveryMethod: string;
  warehouse: string;
  paidAmount: number;
  marginRate: number;
  marginAmount: number;
  quantity: number;
  price: number;
  totalAmount: number;
  status?: string;
}

export interface TradeOrder {
  id: number;
  contractId: number;
  type: string;
  price: number;
  quantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface MarginPayment {
  id: number;
  contractId: number;
  amount: number;
  type: string;
  status: string;
  createdAt: string;
}

export interface DeliveryRequest {
  contractId: number;
  requestedDate: string;
  location: string;
  notes?: string;
}

export interface ContractItem {
  id: number;
  contractNumber: string;
  contractDate: string;
  mainPriceDemo: string;
  pnName: string;
  goodsMateri: string;
  goodsSpec: string;
  weight: number;
  jicha: number;
  type: '公开交易' | '定向交易' | '指定交易';
  rightType: '现货交收' | '期货交收';
  price: number;
  depositRate: number;
  state: '已生效' | '已终止';
  dataState: '已确认' | '待确认';
  priceState: '已完成' | '待点价';
  remark: string;
  createTime: string;
  updateTime: string;
}
