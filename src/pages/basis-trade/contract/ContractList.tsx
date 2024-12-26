import React, { useState } from 'react';
import { Table, Tag, Space, Button, Input, Modal, Descriptions, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Contract } from '../../../types/listing';
import { mockContracts } from '../../../mock/data';

const ContractList: React.FC = () => {
  const [data, setData] = useState<Contract[]>(mockContracts);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<Contract | null>(null);

  const handleView = (record: Contract) => {
    setCurrentItem(record);
    setViewModalVisible(true);
  };

  const columns: ColumnsType<Contract> = [
    {
      title: '合同编号',
      dataIndex: 'contractNo',
      key: 'contractNo',
      fixed: 'left',
      width: 140,
    },
    {
      title: '合同日期',
      dataIndex: 'contractDate',
      key: 'contractDate',
      width: 120,
    },
    {
      title: '期货参考合约',
      dataIndex: 'mainPriceDemo',
      key: 'mainPriceDemo',
      width: 120,
    },
    {
      title: '品名',
      dataIndex: 'pnName',
      key: 'pnName',
      width: 100,
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
      title: '重量',
      dataIndex: 'weight',
      key: 'weight',
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
      title: '交易类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => {
        const colorMap: { [key: string]: string } = {
          '公开交易': 'blue',
          '定向交易': 'green',
          '指定交易': 'orange'
        };
        return <Tag color={colorMap[type] || 'default'}>{type}</Tag>;
      },
    },
    {
      title: '交收方式',
      dataIndex: 'rightType',
      key: 'rightType',
      width: 100,
      render: (type: string) => {
        const colorMap: { [key: string]: string } = {
          '现货交收': 'purple',
          '期货交收': 'cyan'
        };
        return <Tag color={colorMap[type] || 'default'}>{type}</Tag>;
      },
    },
    {
      title: '合同状态',
      dataIndex: 'state',
      key: 'state',
      width: 100,
      render: (state: string) => {
        const colorMap: { [key: string]: string } = {
          '已生效': 'green',
          '已终止': 'red',
          '待生效': 'orange'
        };
        return <Tag color={colorMap[state] || 'default'}>{state}</Tag>;
      },
    },
    {
      title: '点价状态',
      dataIndex: 'priceState',
      key: 'priceState',
      width: 100,
      render: (state: string) => {
        const colorMap: { [key: string]: string } = {
          '已完成': 'green',
          '待点价': 'orange',
          '点价中': 'blue'
        };
        return <Tag color={colorMap[state] || 'default'}>{state}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 180,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleView(record)}>查看详情</a>
          <a>编辑</a>
          <a style={{ color: '#ff4d4f' }}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px', background: '#fff', padding: '16px', borderRadius: '8px' }}>
        <Space wrap>
          <Input placeholder="合同编号" style={{ width: 150 }} />
          <Input placeholder="品名" style={{ width: 150 }} />
          <Input placeholder="钢种" style={{ width: 150 }} />
          <DatePicker.RangePicker style={{ width: 300 }} />
          <Button type="primary">查询</Button>
          <Button>重置</Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        scroll={{ x: 1800 }}
        size="middle"
        bordered
        pagination={{
          total: data.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          pageSizeOptions: ['10', '20']
        }}
      />

      <Modal
        title="合同详情"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={800}
      >
        {currentItem && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="合同编号">{currentItem.contractNo}</Descriptions.Item>
            <Descriptions.Item label="合同日期">{currentItem.contractDate}</Descriptions.Item>
            <Descriptions.Item label="期货参考合约">{currentItem.mainPriceDemo}</Descriptions.Item>
            <Descriptions.Item label="品名">{currentItem.pnName}</Descriptions.Item>
            <Descriptions.Item label="钢种">{currentItem.goodsMateri}</Descriptions.Item>
            <Descriptions.Item label="规格">{currentItem.goodsSpec}</Descriptions.Item>
            <Descriptions.Item label="重量">{currentItem.weight}吨</Descriptions.Item>
            <Descriptions.Item label="期现货价差">¥{currentItem.jicha}</Descriptions.Item>
            <Descriptions.Item label="交易类型">{currentItem.type}</Descriptions.Item>
            <Descriptions.Item label="交收方式">{currentItem.rightType}</Descriptions.Item>
            <Descriptions.Item label="价格">¥{currentItem.price}</Descriptions.Item>
            <Descriptions.Item label="保证金比例">{currentItem.depositRate}%</Descriptions.Item>
            <Descriptions.Item label="合同状态">{currentItem.state}</Descriptions.Item>
            <Descriptions.Item label="数据状态">{currentItem.dataState}</Descriptions.Item>
            <Descriptions.Item label="点价状态">{currentItem.priceState}</Descriptions.Item>
            <Descriptions.Item label="备注">{currentItem.remark}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{currentItem.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{currentItem.updateTime}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default ContractList;
