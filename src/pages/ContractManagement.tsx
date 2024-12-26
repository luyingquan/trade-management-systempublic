import React from 'react';
import { Table, Button, DatePicker, Input, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface ContractType {
  key: string;
  contractNumber: string;
  contractDate: string;
  productType: string;
  referenceContract: string;
  deliveryPeriod: string;
  deliveryMethod: string;
  transactionVolume: number;
  transactionPrice: number;
  deliveryWarehouse: string;
  status: string;
}

const generateRandomContracts = (): ContractType[] => {
  const data: ContractType[] = [];
  const warehouses = ['玖隆库', '无锡库', '上海库'];
  const statuses = ['正在定价', '部分定价', '完全定价'];

  for (let i = 0; i < 6; i++) {
    data.push({
      key: i.toString(),
      contractNumber: `${Math.floor(Math.random() * 90000000) + 10000000}`,
      contractDate: '2024/11/26',
      productType: '热卷板',
      referenceContract: 'HC2501',
      deliveryPeriod: '2025/05/30',
      deliveryMethod: '现货交收',
      transactionVolume: 500,
      transactionPrice: 3600,
      deliveryWarehouse: warehouses[Math.floor(Math.random() * warehouses.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return data;
};

const ContractManagement: React.FC = () => {
  const columns: ColumnsType<ContractType> = [
    { title: '序号', dataIndex: 'key', key: 'key', render: (text) => Number(text) + 1 },
    { title: '合同编号', dataIndex: 'contractNumber', key: 'contractNumber' },
    { title: '合同日期', dataIndex: 'contractDate', key: 'contractDate' },
    { title: '品种', dataIndex: 'productType', key: 'productType' },
    { title: '参考合约', dataIndex: 'referenceContract', key: 'referenceContract' },
    { title: '交货期', dataIndex: 'deliveryPeriod', key: 'deliveryPeriod' },
    { title: '交收方式', dataIndex: 'deliveryMethod', key: 'deliveryMethod' },
    { title: '成交量', dataIndex: 'transactionVolume', key: 'transactionVolume' },
    { title: '成交价格', dataIndex: 'transactionPrice', key: 'transactionPrice' },
    { title: '交收仓库', dataIndex: 'deliveryWarehouse', key: 'deliveryWarehouse' },
    {
      title: '点价状态',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => {
        const color = status === '完全定价' ? 'green' : status === '部分定价' ? 'orange' : 'blue';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'operation',
      render: () => <Button type="link">查看合同详情</Button>,
    },
  ];

  return (
    <div>
      <h2>合同管理</h2>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Input placeholder="品种" style={{ width: 150 }} />
          <Input placeholder="参考合约" style={{ width: 150 }} />
          <DatePicker placeholder="合同日期" style={{ width: 150 }} />
          <Button type="primary">查询</Button>
        </Space>
      </div>
      <Table columns={columns} dataSource={generateRandomContracts()} />
    </div>
  );
};

export default ContractManagement;
