import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ListingItem } from '../../../types/listing';
import { DelistingRecord } from '../../../types/delisting';
import axios from 'axios';

interface DelistingFormData {
  ginfoNumber: string;
  weight: number;
  price: number;
  warehouse: string;
}

const PricingTrade: React.FC = () => {
  const [listings, setListings] = useState<ListingItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedListing, setSelectedListing] = useState<ListingItem | null>(null);
  const [delistingRecords, setDelistingRecords] = useState<DelistingRecord[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [form] = Form.useForm();

  // 加载挂牌数据
  const fetchListings = async (page = 1, pageSize = 10) => {
    try {
      setLoading(true);
      const response = await axios.get('/api/listings', {
        params: {
          pageNum: page,
          pageSize: pageSize,
          sortField: 'createdAt',
          sortOrder: 'desc',
          type: '公开',
          priceState: '待点价'
        }
      });
      console.log('Fetched listings:', response.data);
      const { items: content, total: totalElements } = response.data;
      setListings(Array.isArray(content) ? content : []);
      setPagination({
        ...pagination,
        current: page,
        total: totalElements
      });
    } catch (error) {
      console.error('加载数据失败:', error);
      message.error('加载数据失败');
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  // 加载摘牌记录
  const fetchDelistingRecords = async (ginfoNumber: string) => {
    try {
      const response = await axios.get(`/api/delisting-records/listing/${ginfoNumber}`);
      setDelistingRecords(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('加载摘牌记录失败:', error);
      message.error('加载摘牌记录失败');
      setDelistingRecords([]);
    }
  };

  useEffect(() => {
    fetchListings(pagination.current, pagination.pageSize);
  }, []);

  // 处理表格分页变化
  const handleTableChange = (newPagination: any) => {
    fetchListings(newPagination.current, newPagination.pageSize);
  };

  // 处理摘牌提交
  const handleDelist = async (values: DelistingFormData) => {
    try {
      await axios.post('/api/delisting-records', {
        ...values,
        status: 'PENDING'
      });
      message.success('摘牌申请提交成功');
      setModalVisible(false);
      form.resetFields();
      // 刷新列表
      fetchListings(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error('提交失败:', error);
      message.error('提交失败');
    }
  };

  // 摘牌记录的表格列定义
  const delistingColumns: ColumnsType<DelistingRecord> = [
    {
      title: '摘牌编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '点价重量',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: '点价价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '交收仓库',
      dataIndex: 'warehouse',
      key: 'warehouse',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap = {
          'PENDING': { color: 'gold', text: '待确认' },
          'CONFIRMED': { color: 'green', text: '已确认' },
          'CANCELLED': { color: 'red', text: '已取消' }
        };
        const { color, text } = statusMap[status as keyof typeof statusMap] || { color: 'default', text: status };
        return <Tag color={color}>{text}</Tag>;
      }
    }
  ];

  const columns: ColumnsType<ListingItem> = [
    {
      title: '挂牌编号',
      dataIndex: 'ginfoNumber',
      key: 'ginfoNumber',
    },
    {
      title: '品名',
      dataIndex: 'pnName',
      key: 'pnName',
    },
    {
      title: '规格',
      dataIndex: 'goodsSpec',
      key: 'goodsSpec',
    },
    {
      title: '挂牌数量',
      dataIndex: 'hangWeight',
      key: 'hangWeight',
      render: (weight: number) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
          {weight} 吨
        </span>
      ),
    },
    {
      title: '最低报价',
      dataIndex: 'priceLow',
      key: 'priceLow',
    },
    {
      title: '最高报价',
      dataIndex: 'priceUp',
      key: 'priceUp',
    },
    {
      title: '基差',
      dataIndex: 'jicha',
      key: 'jicha',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            onClick={() => {
              setSelectedListing(record);
              setModalVisible(true);
            }}
          >
            摘牌
          </Button>
          <Button
            onClick={() => {
              setSelectedListing(record);
              fetchDelistingRecords(record.ginfoNumber);
              setDetailModalVisible(true);
            }}
          >
            摘牌详情
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Table 
        columns={columns} 
        dataSource={listings}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />

      {/* 摘牌表单弹窗 */}
      <Modal
        title="摘牌申请"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={handleDelist}
          layout="vertical"
          initialValues={{
            ginfoNumber: selectedListing?.ginfoNumber,
            warehouse: selectedListing?.rightWarehouseName,
          }}
        >
          <Form.Item
            name="ginfoNumber"
            label="挂牌编号"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="weight"
            label="点价重量"
            rules={[
              { required: true, message: '请输入点价重量' },
              { type: 'number', min: 0, message: '重量必须大于0' }
            ]}
          >
            <InputNumber 
              style={{ width: '100%' }} 
              min={0}
              max={selectedListing?.hangWeight}
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="点价价格"
            rules={[
              { required: true, message: '请输入点价价格' },
              { type: 'number', min: 0, message: '价格必须大于0' }
            ]}
          >
            <InputNumber 
              style={{ width: '100%' }} 
              min={selectedListing?.priceLow}
              max={selectedListing?.priceUp}
            />
          </Form.Item>

          <Form.Item
            name="warehouse"
            label="交收仓库"
            rules={[{ required: true, message: '请选择交收仓库' }]}
          >
            <Select>
              <Select.Option value={selectedListing?.rightWarehouseName}>
                {selectedListing?.rightWarehouseName}
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 摘牌详情弹窗 */}
      <Modal
        title={`摘牌详情 - ${selectedListing?.ginfoNumber}`}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={800}
      >
        <Table
          columns={delistingColumns}
          dataSource={delistingRecords}
          rowKey="id"
          pagination={false}
        />
      </Modal>
    </div>
  );
};

export default PricingTrade;
