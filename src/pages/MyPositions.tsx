import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Position {
  id: number;
  productName: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  profitLoss: number;
  status: string;
}

const MyPositions: React.FC = () => {
  const [data, setData] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);

  // 模拟持仓数据
  const mockPositions: Position[] = [
    {
      id: 1,
      productName: '热轧卷板',
      quantity: 100,
      averagePrice: 4500,
      currentPrice: 4650,
      profitLoss: 15000,
      status: '持仓中'
    },
    {
      id: 2,
      productName: '冷轧卷板',
      quantity: 50,
      averagePrice: 5200,
      currentPrice: 5150,
      profitLoss: -2500,
      status: '持仓中'
    },
    {
      id: 3,
      productName: '镀锌板',
      quantity: 75,
      averagePrice: 6000,
      currentPrice: 6100,
      profitLoss: 7500,
      status: '已平仓'
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    try {
      setData(mockPositions);
    } catch (error) {
      console.error('加载持仓数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (record: Position) => {
    const newData = data.map(item => {
      if (item.id === record.id) {
        return { ...item, status: '已平仓' };
      }
      return item;
    });
    setData(newData);
  };

  const columns: ColumnsType<Position> = [
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '持仓数量',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => `${quantity} 吨`,
    },
    {
      title: '持仓均价',
      dataIndex: 'averagePrice',
      key: 'averagePrice',
      render: (price: number) => `¥${price.toLocaleString()}`,
    },
    {
      title: '当前价格',
      dataIndex: 'currentPrice',
      key: 'currentPrice',
      render: (price: number) => `¥${price.toLocaleString()}`,
    },
    {
      title: '盈亏',
      dataIndex: 'profitLoss',
      key: 'profitLoss',
      render: (value: number) => (
        <span style={{ color: value >= 0 ? '#52c41a' : '#f5222d' }}>
          {value >= 0 ? '+' : ''}{value.toLocaleString()}
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '持仓中' ? 'blue' : 'default'}>
          {status}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === '持仓中' && (
            <Button type="link" onClick={() => handleClose(record)}>
              平仓
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={fetchData}>
          刷新
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default MyPositions;
