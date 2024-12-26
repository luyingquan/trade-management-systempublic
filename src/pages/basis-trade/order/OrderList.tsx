import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag } from 'antd';
import { TradeOrder } from '../../../types/trade';
import type { ColumnsType } from 'antd/es/table';
import { mockOrders } from '../../../mock/data';

const OrderList: React.FC = () => {
  const [data, setData] = useState<TradeOrder[]>([]);

  useEffect(() => {
    // 使用模拟数据
    setData(mockOrders);
  }, []);

  const columns: ColumnsType<TradeOrder> = [
    {
      title: '订单编号',
      key: 'id',
      render: (_, record) => `O${record.id.toString().padStart(6, '0')}`
    },
    {
      title: '数量（吨）',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: '价格（元/吨）',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: '总金额（元）',
      key: 'totalAmount',
      render: (_, record) => record.quantity * record.price
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: { [key: string]: string } = {
          '已成交': 'blue',
          '已完成': 'green',
          '进行中': 'gold',
          '已取消': 'red'
        };
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => window.location.href = `/order/${record.id}`}>
            查看详情
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default OrderList;
