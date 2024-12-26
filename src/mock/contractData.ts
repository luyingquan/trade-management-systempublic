import { ContractItem } from '../types/contract';

export const mockContracts: ContractItem[] = [
  {
    id: '1',
    contractNo: 'HT202401001',
    contractType: '现货合同',
    contractStatus: '执行中',
    signDate: '2024-01-01',
    effectiveDate: '2024-01-02',
    expiryDate: '2024-12-31',
    partyA: '上海钢铁贸易有限公司',
    partyB: '江苏制造集团有限公司',
    totalAmount: 1000000,
    paidAmount: 300000,
    remainingAmount: 700000,
    paymentTerms: '分期付款：30%预付款，40%交货款，30%质保金',
    deliveryTerms: '分批交货，每月15日前完成当月交货',
    productDetails: [
      {
        productName: '热轧卷板',
        specification: 'Q235B 5.5*1500*C',
        quantity: 500,
        unitPrice: 1200
      },
      {
        productName: '冷轧卷板',
        specification: 'SPCC 2.0*1250*C',
        quantity: 300,
        unitPrice: 1500
      }
    ],
    remarks: '含13%增值税'
  },
  {
    id: '2',
    contractNo: 'HT202401002',
    contractType: '期货合同',
    contractStatus: '待审核',
    signDate: '2024-01-05',
    effectiveDate: '2024-01-10',
    expiryDate: '2024-06-30',
    partyA: '北京钢铁贸易有限公司',
    partyB: '山东制造有限公司',
    totalAmount: 800000,
    paidAmount: 240000,
    remainingAmount: 560000,
    paymentTerms: '30%预付款，70%提货款',
    deliveryTerms: '2024年6月30日前一次性交货',
    productDetails: [
      {
        productName: '镀锌板',
        specification: 'DX51D+Z 1.2*1250*C',
        quantity: 400,
        unitPrice: 2000
      }
    ],
    remarks: '含13%增值税，含运费'
  },
  {
    id: '3',
    contractNo: 'HT202401003',
    contractType: '现货合同',
    contractStatus: '已完成',
    signDate: '2024-01-10',
    effectiveDate: '2024-01-15',
    expiryDate: '2024-03-31',
    partyA: '广州钢铁贸易有限公司',
    partyB: '浙江制造股份有限公司',
    totalAmount: 1500000,
    paidAmount: 1500000,
    remainingAmount: 0,
    paymentTerms: '100%预付款',
    deliveryTerms: '2024年3月31日前分三批交货',
    productDetails: [
      {
        productName: '中厚板',
        specification: 'Q345B 20*2200*12000',
        quantity: 200,
        unitPrice: 4500
      },
      {
        productName: '中厚板',
        specification: 'Q345B 25*2200*12000',
        quantity: 150,
        unitPrice: 4800
      }
    ],
    remarks: '含13%增值税，不含运费'
  }
];

// 我的合同数据
export const mockMyContracts = mockContracts.map(contract => ({
  ...contract,
  role: Math.random() > 0.5 ? '买方' : '卖方'
}));
