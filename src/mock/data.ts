import type { TradeOrder } from '../types/trade';
import type { Warehouse } from '../types/Warehouse';
import type { ListingItem, Contract } from '../types/listing';
import dayjs from 'dayjs';

// 订单数据
export const mockOrders: TradeOrder[] = [
  {
    id: 1,
    contractId: 101,
    type: 'BUY',
    quantity: 1000,
    price: 4050,
    status: 'COMPLETED',
    createdAt: '2024-01-02 10:15:30',
    updatedAt: '2024-01-02 10:15:30'
  },
  {
    id: 2,
    contractId: 102,
    type: 'BUY',
    quantity: 500,
    price: 4200,
    status: 'COMPLETED',
    createdAt: '2024-01-03 14:20:45',
    updatedAt: '2024-01-03 16:30:00'
  },
  {
    id: 3,
    contractId: 103,
    type: 'BUY',
    quantity: 2000,
    price: 3980,
    status: 'PENDING',
    createdAt: '2024-01-05 09:05:15',
    updatedAt: '2024-01-05 09:05:15'
  }
];

// 挂牌数据
export const mockListings: ListingItem[] = Array.from({ length: 30 }, (_, index) => {
  const id = index + 1;
  const date = dayjs().add(Math.floor(index / 3), 'days').format('YYYY-MM-DD');
  const types = ['公开交易', '定向交易', '指定交易'] as const;
  const rightTypes = ['现货交收', '期货交收'] as const;
  const mainPriceDemos = ['HC2401', 'RB2401', 'WR2401'];
  const pnNames = ['热轧卷板', '螺纹钢', '线材'];
  const goodsMateris = ['Q235B', 'SPHC', 'HRB400E', 'HPB300'];
  const specs = ['5.75*1500*C', '3.0*1250*C', 'Φ16-25mm', 'Φ6.5mm'];
  const statuses = ['已发布', '已下架'] as const;
  const priceStates = ['点价中', '点价完成', '点价失败', '部分完成'] as const;
  const warehouses = ['上海仓库', '天津仓库', '广州仓库', '武汉仓库'];

  return {
    id,
    ginfoNumber: `GP202401${String(id).padStart(3, '0')}`,
    ginfoDate: date,
    systemDate: date,
    mainPriceDemo: mainPriceDemos[index % mainPriceDemos.length],
    pnName: pnNames[index % pnNames.length],
    goodsMateri: goodsMateris[index % goodsMateris.length],
    goodsSpec: specs[index % specs.length],
    hangWeight: 1000 + (index * 100),
    jicha: 50 + (index * 2),
    type: types[index % types.length],
    typeName: types[index % types.length],
    rightType: rightTypes[index % rightTypes.length],
    priceLow: 4000 + (index * 50),
    priceUp: 4500 + (index * 50),
    marginLevel: 10 + (index % 3) * 5,
    unitNumber: 100,
    remark: '备注信息',
    status: statuses[index % statuses.length],
    priceState: priceStates[index % priceStates.length],
    rightDateNum: 30,
    rightDate: dayjs().add(30, 'days').format('YYYY-MM-DD'),
    rightWareHouse: index % warehouses.length,
    rightWarehouseName: warehouses[index % warehouses.length],
    hits: Math.floor(Math.random() * 1000),
    createdAt: `${date} ${String(Math.floor(index / 2) + 8).padStart(2, '0')}:00:00`,
    updatedAt: `${date} ${String(Math.floor(index / 2) + 8).padStart(2, '0')}:00:00`
  };
});

// 合同数据
export const mockContracts: Contract[] = Array.from({ length: 20 }, (_, index) => {
  const id = index + 1;
  const date = dayjs().add(Math.floor(index / 2), 'days').format('YYYY-MM-DD');
  const types = ['公开交易', '定向交易', '指定交易'] as const;
  const rightTypes = ['现货交收', '期货交收'] as const;
  const mainPriceDemos = ['HC2401', 'RB2401', 'WR2401'];
  const pnNames = ['热轧卷板', '螺纹钢', '线材'];
  const goodsMateris = ['Q235B', 'SPHC', 'HRB400E', 'HPB300'];
  const specs = ['5.75*1500*C', '3.0*1250*C', 'Φ16-25mm', 'Φ6.5mm'];
  const states = ['已生效', '已终止'] as const;
  const dataStates = ['已确认', '待确认'] as const;
  const priceStates = ['已完成', '待点价'] as const;
  const remarks = ['华东地区现货资源', '江浙沪优质资源', '山东地区现货'];

  return {
    id,
    contractNo: `HT202401${String(id).padStart(3, '0')}`,
    contractDate: date,
    mainPriceDemo: mainPriceDemos[index % mainPriceDemos.length],
    pnName: pnNames[index % pnNames.length],
    goodsMateri: goodsMateris[index % goodsMateris.length],
    goodsSpec: specs[index % specs.length],
    weight: 1000 + (index * 100),
    jicha: 50 + (index * 2),
    type: types[index % types.length],
    rightType: rightTypes[index % rightTypes.length],
    price: 4000 + (index * 50),
    depositRate: 10 + (index % 3) * 5,
    state: states[index % states.length],
    dataState: dataStates[index % dataStates.length],
    priceState: priceStates[index % priceStates.length],
    remark: remarks[index % remarks.length],
    createTime: `${date} ${String(Math.floor(index / 2) + 8).padStart(2, '0')}:00:00`,
    updateTime: `${date} ${String(Math.floor(index / 2) + 8).padStart(2, '0')}:00:00`
  };
});

// 摘牌列表数据
export const mockDelistings = mockListings.map(listing => ({
  ...listing,
  delistReason: '价格不合理',
  delistTime: '2024-01-05 14:00:00',
  operator: '张三',
  approver: '李四',
  approveTime: '2024-01-05 15:00:00',
  approveStatus: '已审核'
}));

// 合同审核数据
export const mockContractReviews = mockContracts.map(contract => ({
  ...contract,
  reviewStatus: Math.random() > 0.5 ? '已审核' : '待审核',
  reviewer: '王五',
  reviewTime: '2024-01-05 16:00:00',
  reviewComments: '合同条款符合要求',
  version: '1.0'
}));

// 仓库数据
export const mockWarehouses: Warehouse[] = [
  {
    id: 1,
    code: 'WH001',
    name: '仓库A',
    location: '上海',
    capacity: 10000,
    currentStock: 5000,
    status: 'ACTIVE',
    type: 'STANDARD'
  },
  {
    id: 2,
    code: 'WH002',
    name: '仓库B',
    location: '北京',
    capacity: 15000,
    currentStock: 7500,
    status: 'ACTIVE',
    type: 'STANDARD'
  }
];
