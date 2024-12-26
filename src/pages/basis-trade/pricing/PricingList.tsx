import React, { useState } from 'react';
import { Table, Tag, Space, Button, Input, Modal, Descriptions, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ListingItem } from '../../../types/trade';
import { mockListings } from '../../../mock/data';

const PricingList: React.FC = () => {
  const [data, setData] = useState<ListingItem[]>(mockListings);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<ListingItem | null>(null);

  const handleView = (record: ListingItem) => {
    setCurrentItem(record);
    setViewModalVisible(true);
  };

  const handleDelist = (record: ListingItem) => {
    Modal.confirm({
      title: '确认摘牌',
      content: `确定要摘牌该商品吗？挂牌编号：${record.ginfoNumber}`,
      onOk() {
        const newData = data.filter(item => item.id !== record.id);
        setData(newData);
        message.success('摘牌成功');
      },
    });
  };

  const columns: ColumnsType<ListingItem> = [
    {
      title: '挂牌编号',
      dataIndex: 'ginfoNumber',
      key: 'ginfoNumber',
      fixed: 'left',
      width: 120,
    },
    {
      title: '期货参考合约',
      dataIndex: 'mainPriceDemo',
      key: 'mainPriceDemo',
      width: 120,
    },
    {
      title: '品种',
      dataIndex: 'typeName',
      key: 'typeName',
      width: 100,
    },
    {
      title: '品名',
      dataIndex: 'pnName',
      key: 'pnName',
      width: 120,
    },
    {
      title: '钢种',
      dataIndex: 'goodsMateri',
      key: 'goodsMateri',
      width: 100,
    },
    {
      title: '规格',
      dataIndex: 'goodsSpec',
      key: 'goodsSpec',
      width: 120,
    },
    {
      title: '挂牌数量',
      dataIndex: 'hangWeight',
      key: 'hangWeight',
      width: 100,
      render: (weight: number) => `${weight}吨`,
    },
    {
      title: '期现货价差',
      dataIndex: 'jicha',
      key: 'jicha',
      width: 100,
      render: (jicha: number) => `¥${jicha}`,
    },
    {
      title: '数据状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: string) => {
        const colorMap: { [key: string]: string } = {
          'ACTIVE': 'green',
          'INACTIVE': 'red',
          'CANCELLED': 'gray',
        };
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
      },
    },
    {
      title: '点价状态',
      dataIndex: 'priceState',
      key: 'priceState',
      width: 120,
      render: (state: string) => {
        const colorMap: { [key: string]: string } = {
          '待点价': 'blue',
          '正在点价': 'processing',
          '部分成交': 'warning',
          '全部成交': 'success',
          '点价失败': 'error',
        };
        return <Tag color={colorMap[state] || 'default'}>{state}</Tag>;
      },
    },
    {
      title: '交易类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => {
        const typeMap: { [key: string]: string } = {
          'PUBLIC': '公开',
          'PRIVATE': '私密',
          'TARGETED': '定向',
        };
        return typeMap[type] || type;
      },
    },
    {
      title: '交收方式',
      dataIndex: 'rightType',
      key: 'rightType',
      width: 100,
      render: (type: string) => {
        const typeMap: { [key: string]: string } = {
          'SPOT': '现货交收',
          'FUTURES': '期货交收',
        };
        return typeMap[type] || type;
      },
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price: number) => `¥${price}`,
    },
    {
      title: '最低价格',
      dataIndex: 'priceLow',
      key: 'priceLow',
      width: 100,
      render: (price: number) => `¥${price}`,
    },
    {
      title: '最高价格',
      dataIndex: 'priceUp',
      key: 'priceUp',
      width: 100,
      render: (price: number) => `¥${price}`,
    },
    {
      title: '保证金比例',
      dataIndex: 'marginLevel',
      key: 'marginLevel',
      width: 100,
      render: (level: number) => `${level * 100}%`,
    },
    {
      title: '最小交易量',
      dataIndex: 'unitNumber',
      key: 'unitNumber',
      width: 100,
      render: (unit: number) => `${unit}吨`,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 150,
    },
    {
      title: '交收仓库',
      dataIndex: 'rightWareHouse',
      key: 'rightWareHouse',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleView(record)}>查看</Button>
          <Button type="link" onClick={() => handleDelist(record)}>摘牌</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space wrap>
          <Input placeholder="挂牌编号" style={{ width: 150 }} />
          <Input placeholder="品种" style={{ width: 150 }} />
          <Input placeholder="品名" style={{ width: 150 }} />
          <Button type="primary">查询</Button>
          <Button>重置</Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        scroll={{ x: 2500 }}
        pagination={{
          total: data.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />

      <Modal
        title="点价交易详情"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={800}
      >
        {currentItem && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="挂牌编号">{currentItem.ginfoNumber}</Descriptions.Item>
            <Descriptions.Item label="期货参考合约">{currentItem.mainPriceDemo}</Descriptions.Item>
            <Descriptions.Item label="品种">{currentItem.typeName}</Descriptions.Item>
            <Descriptions.Item label="品名">{currentItem.pnName}</Descriptions.Item>
            <Descriptions.Item label="钢种">{currentItem.goodsMateri}</Descriptions.Item>
            <Descriptions.Item label="规格">{currentItem.goodsSpec}</Descriptions.Item>
            <Descriptions.Item label="挂牌数量">{currentItem.hangWeight}吨</Descriptions.Item>
            <Descriptions.Item label="期现货价差">¥{currentItem.jicha}</Descriptions.Item>
            <Descriptions.Item label="价格">¥{currentItem.price}</Descriptions.Item>
            <Descriptions.Item label="价格区间">¥{currentItem.priceLow} - ¥{currentItem.priceUp}</Descriptions.Item>
            <Descriptions.Item label="保证金比例">{currentItem.marginLevel * 100}%</Descriptions.Item>
            <Descriptions.Item label="最小交易量">{currentItem.unitNumber}吨</Descriptions.Item>
            <Descriptions.Item label="交易类型">
              {currentItem.type === 'PUBLIC' ? '公开' : currentItem.type === 'PRIVATE' ? '私密' : '定向'}
            </Descriptions.Item>
            <Descriptions.Item label="交收方式">
              {currentItem.rightType === 'SPOT' ? '现货交收' : '期货交收'}
            </Descriptions.Item>
            <Descriptions.Item label="数据状态">
              <Tag color={currentItem.status === 'ACTIVE' ? 'green' : 'red'}>
                {currentItem.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="点价状态">
              <Tag color={
                currentItem.priceState === '待点价' ? 'blue' :
                currentItem.priceState === '正在点价' ? 'processing' :
                currentItem.priceState === '部分成交' ? 'warning' :
                currentItem.priceState === '全部成交' ? 'success' : 'error'
              }>
                {currentItem.priceState}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="备注" span={2}>{currentItem.remark}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default PricingList;
