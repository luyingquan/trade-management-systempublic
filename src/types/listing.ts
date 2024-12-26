export interface ListingItem {
  id: number;
  title: string;
  productType: string;
  referenceContract: string;
  quantity: number;
  basis: number;
  deliveryPeriod: string;
  deliveryMethod: string;
  warehouse: string;
  minTradeUnit: number;
  priceRange: {
    min: number;
    max: number;
  };
  state: string;
  status: string;
  price?: number;
  priceUp?: number;
  tradeType: '公开交易' | '定向交易' | '指定交易';
  deliveryType: '现货交收' | '期货交收';
  pricingStatus: '点价中' | '点价完成';
  createdAt: string;
  updatedAt: string;
}

export interface Contract {
  id: number;
  contractNo: string;
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
