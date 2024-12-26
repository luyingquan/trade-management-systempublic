import { ListingItem, TradeOrder, Contract } from '../types/trade';
import { BUSINESS_RULES } from '../constants/trade';

// 检查当前是否在交易时间内
export const isWithinTradingHours = (): boolean => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const currentTime = hour * 100 + minute;

  // 交易时间：9:00-11:30, 13:30-15:00
  return (
    (currentTime >= 900 && currentTime <= 1130) ||
    (currentTime >= 1330 && currentTime <= 1500)
  );
};

// 检查保证金追加
export interface MarginCallResult {
  required: boolean;
  amount: number;
}

export const checkMarginCall = (contract: Contract, currentPrice: number): MarginCallResult => {
  const totalValue = contract.quantity * currentPrice;
  const marginRequired = totalValue * BUSINESS_RULES.MARGIN_RATIO;
  const currentMargin = contract.marginAmount || 0;
  
  return {
    required: currentMargin < marginRequired,
    amount: marginRequired - currentMargin
  };
};

// 计算合同保证金
export const calculateMargin = (contract: Contract): number => {
  return contract.quantity * contract.price * BUSINESS_RULES.MARGIN_RATIO;
};

// 计算合同总金额
export const calculateTotalAmount = (contract: Contract): number => {
  return contract.quantity * contract.price;
};

// 验证点价是否在允许范围内
export const validatePriceQuote = (
  listing: ListingItem,
  order: Partial<TradeOrder>
): { valid: boolean; message?: string } => {
  if (!order.price || !order.quantity) {
    return { valid: false, message: '价格和数量不能为空' };
  }

  // 检查价格范围
  if (order.price < listing.priceRange.min || order.price > listing.priceRange.max) {
    return {
      valid: false,
      message: `价格必须在 ${listing.priceRange.min} 到 ${listing.priceRange.max} 之间`,
    };
  }

  // 检查数量是否是最小交易单位的整数倍
  if (order.quantity % listing.minTradeUnit !== 0) {
    return {
      valid: false,
      message: `数量必须是 ${listing.minTradeUnit} 的整数倍`,
    };
  }

  // 检查数量是否超过挂牌数量
  if (order.quantity > listing.quantity) {
    return {
      valid: false,
      message: `数量不能超过挂牌数量 ${listing.quantity}`,
    };
  }

  return { valid: true };
};

// 生成合同编号
export const generateContractNo = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `C${year}${month}${day}${random}`;
};

// 计算交货日期
export const calculateDeliveryDate = (
  contractDate: Date,
  effectiveDays: number,
  deliveryDays: number
): Date => {
  const deliveryDate = new Date(contractDate);
  deliveryDate.setDate(deliveryDate.getDate() + effectiveDays + deliveryDays);
  return deliveryDate;
};
