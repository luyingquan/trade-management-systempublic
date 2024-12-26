import React, { useState } from 'react';
import { Table, Tag, Button, Space, Modal, Form, Input, Select, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ListingItem } from '../../../types/listing';
import { mockListings } from '../../../mock/data';

const { Option } = Select;

const PricingList: React.FC = () => {
  const [data, setData] = useState<ListingItem[]>(mockListings);
  const [searchForm] = Form.useForm();
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<ListingItem | null>(null);

  const handleSearch = () => {
    const values = searchForm.getFieldsValue();
    let filteredData = [...mockListings];

    if (values.ginfoNumber) {
      filteredData = filteredData.filter(item => 
        item.ginfoNumber.toLowerCase().includes(values.ginfoNumber.toLowerCase())
      );
    }

    if (values.pnName) {
      filteredData = filteredData.filter(item => 
        item.pnName.toLowerCase().includes(values.pnName.toLowerCase())
      );
    }

    if (values.goodsMateri) {
      filteredData = filteredData.filter(item => 
        item.goodsMateri.toLowerCase().includes(values.goodsMateri.toLowerCase())
      );
    }

    setData(filteredData);
  };

  const handleReset = () => {
    searchForm.resetFields();
    setData(mockListings);
  };

  const handleView = (record: ListingItem) => {
    setCurrentItem(record);
    setViewModalVisible(true);
  };

  const columns: ColumnsType<ListingItem> = [
    {
      title: '挂牌编号',
      dataIndex: 'ginfoNumber',
      key: 'ginfoNumber',
    },
    {
      title: '挂牌日期',
      dataIndex: 'ginfoDate',
      key: 'ginfoDate',
    },
    {
      title: '产品名称',
      dataIndex: 'pnName',
      key: 'pnName',
    },
    {
      title: '材质',
      dataIndex: 'goodsMateri',
      key: 'goodsMateri',
    },
    {
      title: '规格',
      dataIndex: 'goodsSpec',
      key: 'goodsSpec',
    },
    {
      title: '挂牌重量',
      dataIndex: 'hangWeight',
      key: 'hangWeight',
    },
    {
      title: '基差',
      dataIndex: 'jicha',
      key: 'jicha',
    },
    {
      title: '状态',
      dataIndex: 'priceState',
      key: 'priceState',
      render: (state: string) => {
        const colorMap: Record<string, string> = {
          '点价中': 'blue',
          '点价完成': 'green',
          '点价失败': 'red',
          '部分完成': 'orange'
        };
        return <Tag color={colorMap[state]}>{state}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleView(record)}>
            查看
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Form
        form={searchForm}
        layout="inline"
        style={{ marginBottom: 16 }}
      >
        <Form.Item name="ginfoNumber" label="挂牌编号">
          <Input placeholder="请输入挂牌编号" />
        </Form.Item>
        <Form.Item name="pnName" label="产品名称">
          <Input placeholder="请输入产品名称" />
        </Form.Item>
        <Form.Item name="goodsMateri" label="材质">
          <Input placeholder="请输入材质" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSearch}>
            查询
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={data} rowKey="id" />

      <Modal
        title="挂牌详情"
        visible={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={800}
      >
        {currentItem && (
          <div>
            <h3>基本信息</h3>
            <p>挂牌编号：{currentItem.ginfoNumber}</p>
            <p>挂牌日期：{currentItem.ginfoDate}</p>
            <p>产品名称：{currentItem.pnName}</p>
            <p>材质：{currentItem.goodsMateri}</p>
            <p>规格：{currentItem.goodsSpec}</p>
            <p>挂牌重量：{currentItem.hangWeight}</p>
            <p>基差：{currentItem.jicha}</p>
            <p>状态：{currentItem.priceState}</p>
            <p>备注：{currentItem.remark}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PricingList;
