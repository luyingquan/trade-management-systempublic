import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Space, Modal, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Order {
  id: number;
  orderNumber: string;
  productName: string;
  quantity: number;
  price: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

const MyOrders: React.FC = () => {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // 模拟订单数据
  const mockOrders: Order[] = [
    {
      id: 1,
      orderNumber: 'DD202401001',
      productName: '热轧卷板',
      quantity: 100,
      price: 4500,
      totalAmount: 450000,
      status: '待确认',
      createdAt: '2024-01-02 10:15:30'
    },
    {
      id: 2,
      orderNumber: 'DD202401002',
      productName: '冷轧卷板',
      quantity: 50,
      price: 5200,
      totalAmount: 260000,
      status: '已确认',
      createdAt: '2024-01-03 14:20:45'
    },
    {
      id: 3,
      orderNumber: 'DD202401003',
      productName: '镀锌板',
      quantity: 75,
      price: 6000,
      totalAmount: 450000,
      status: '已完成',
      createdAt: '2024-01-05 09:05:15'
    }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    try {
      setData(mockOrders);
    } catch (error) {
      console.error('加载订单数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = (record: Order) => {
    Modal.confirm({
      title: '确认订单',
      content: '确定要确认这个订单吗？',
      onOk: () => {
        const newData = data.map(item => {
          if (item.id === record.id) {
            return { ...item, status: '已确认' };
          }
          return item;
        });
        setData(newData);
        message.success('订单已确认');
      }
    });
  };

  const handleCancel = (record: Order) => {
    Modal.confirm({
      title: '取消订单',
      content: '确定要取消这个订单吗？',
      onOk: () => {
        const newData = data.map(item => {
          if (item.id === record.id) {
            return { ...item, status: '已取消' };
          }
          return item;
        });
        setData(newData);
        message.success('订单已取消');
      }
    });
  };

  const columns: ColumnsType<Order> = [
    {
      title: '订单编号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number) => `${quantity} 吨`,
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `¥${price.toLocaleString()}`,
    },
    {
      title: '总金额',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `¥${amount.toLocaleString()}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: { [key: string]: string } = {
          '待确认': 'processing',
          '已确认': 'success',
          '已完成': 'default',
          '已取消': 'error'
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status === '待确认' && (
            <>
              <Button type="link" onClick={() => handleConfirm(record)}>
                确认
              </Button>
              <Button type="link" danger onClick={() => handleCancel(record)}>
                取消
              </Button>
            </>
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

export default MyOrders;
