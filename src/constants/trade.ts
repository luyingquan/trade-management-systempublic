// 交易时间配置
export const TRADING_HOURS = {
  MORNING: { start: '09:00', end: '11:30' },
  AFTERNOON: { start: '13:30', end: '15:00' },
  NIGHT: { start: '21:00', end: '23:00' }
};

// 保证金配置
export const MARGIN_SETTINGS = {
  HOT_ROLLED_COIL: { name: '热卷', margin: 100 },  // 元/吨
  ULTRA_THIN_STRIP: { name: '超薄带', margin: 150 },
  REBAR: { name: '螺纹钢', margin: 100 }
};

// 最小交易单位
export const MIN_TRADE_UNITS = {
  HOT_ROLLED_COIL: [90, 150, 300],  // 热卷板交易单位
  REBAR: [100, 150, 300],           // 螺纹钢交易单位
  ULTRA_THIN_STRIP: [50, 100]       // 超薄带交易单位
};

// 交收方式
export const DELIVERY_METHODS = [
  { label: '现货交收', value: 'SPOT' },
  { label: '仓单交收', value: 'WAREHOUSE' },
];

// 客户类型
export const CLIENT_TYPES = [
  { label: '公开客户', value: 'PUBLIC' },
  { label: '定向客户', value: 'GROUP' },
  { label: '专属客户', value: 'PRIVATE' },
];

// 运输方式
export const TRANSPORT_METHODS = [
  { label: '自提', value: 'SELF_PICKUP' },
  { label: '送货', value: 'DELIVERY' },
  { label: '第三方物流', value: 'THIRD_PARTY' },
];

// 车辆类型
export const VEHICLE_TYPES = [
  { label: '普通货车', value: 'TRUCK' },
  { label: '集装箱车', value: 'CONTAINER' },
  { label: '专用运输车', value: 'SPECIAL' },
];

// 交易状态
export const TRADE_STATUS = {
  PENDING: '待确认',
  CONFIRMED: '已确认',
  CANCELLED: '已取消',
  COMPLETED: '已完成',
};

// 合同状态
export const CONTRACT_STATUS = {
  PENDING: '待生效',
  EFFECTIVE: '已生效',
  IN_DELIVERY: '交收中',
  COMPLETED: '已完成',
  CANCELLED: '已取消',
};

// 交收状态
export const DELIVERY_STATUS = {
  PENDING: '待交收',
  IN_PROGRESS: '交收中',
  COMPLETED: '已完成',
  CANCELLED: '已取消',
};

// 支付方式
export const PAYMENT_METHODS = [
  { label: '银行转账', value: 'BANK' },
  { label: '第三方支付', value: 'THIRD_PARTY' },
];

// 仓库列表
export const WAREHOUSES = [
  { label: '玖隆库', value: 'JIULONG' },
  { label: '无锡库', value: 'WUXI' },
  { label: '上海库', value: 'SHANGHAI' },
];

// 品种列表
export const PRODUCT_TYPES = [
  { label: '热轧卷板', value: 'HOT_ROLLED' },
  { label: '冷轧卷板', value: 'COLD_ROLLED' },
  { label: '镀锌卷板', value: 'GALVANIZED' },
];

// 参考合约
export const REFERENCE_CONTRACTS = [
  { label: 'HC2401', value: 'HC2401' },
  { label: 'HC2402', value: 'HC2402' },
  { label: 'HC2403', value: 'HC2403' },
];

// 业务规则
export const BUSINESS_RULES = {
  MIN_TRADE_UNIT: 100,         // 最小交易单位（吨）
  MAX_TRADE_UNIT: 10000,       // 最大交易单位（吨）
  MARGIN_RATIO: 0.15,          // 保证金比例
  MIN_PRICE_DIFF: -1000,       // 最小价差（元/吨）
  MAX_PRICE_DIFF: 1000,        // 最大价差（元/吨）
  MAX_DELIVERY_DAYS: 90,       // 最大交货期（天）
  MIN_DELIVERY_DAYS: 7,        // 最小交货期（天）
  MAX_EARLY_DELIVERY_DAYS: 7,  // 最大提前交货天数
  MAX_DELAY_DELIVERY_DAYS: 7,  // 最大延期交货天数
};
