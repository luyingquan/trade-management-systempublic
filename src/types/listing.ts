export interface ListingItem {
  id: number;
  ginfoNumber: string;
  ginfoDate: string;
  systemDate: string;
  mainPriceDemo: string;
  pnName: string;
  goodsMateri: string;
  goodsSpec: string;
  hangWeight: number;
  jicha: number;
  type: '公开交易' | '定向交易' | '指定交易';
  typeName: string;
  rightType: '现货交收' | '期货交收';
  priceLow: number;
  priceUp: number;
  marginLevel: number;
  unitNumber: number;
  remark: string;
  status: '已发布' | '已下架';
  priceState: '点价中' | '点价完成' | '点价失败' | '部分完成';
  rightDateNum: number;
  rightDate: string;
  rightWareHouse: number;
  rightWarehouseName: string;
  hits: number;
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
