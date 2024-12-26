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