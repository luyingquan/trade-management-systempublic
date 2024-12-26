import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, Modal, message, Form, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Warehouse } from '../../../types/Warehouse';
import { mockWarehouses } from '../../../mock/data';

const WarehouseList: React.FC = () => {
  const [data, setData] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    try {
      setData(mockWarehouses);
    } catch (error) {
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingWarehouse(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: Warehouse) => {
    setEditingWarehouse(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (record: Warehouse) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个仓库吗？',
      onOk: () => {
        const newData = data.filter(item => item.id !== record.id);
        setData(newData);
        message.success('删除成功');
      }
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingWarehouse) {
        // 编辑现有仓库
        const newData = data.map(item => {
          if (item.id === editingWarehouse.id) {
            return { ...item, ...values };
          }
          return item;
        });
        setData(newData);
        message.success('更新成功');
      } else {
        // 添加新仓库
        const newWarehouse = {
          id: Date.now(),
          ...values,
          status: '正常'
        };
        setData([...data, newWarehouse]);
        message.success('添加成功');
      }
      setModalVisible(false);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const columns: ColumnsType<Warehouse> = [
    {
      title: '仓库名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '容量',
      dataIndex: 'capacity',
      key: 'capacity',
      render: (capacity: number) => `${capacity.toLocaleString()} 吨`,
    },
    {
      title: '当前库存',
      dataIndex: 'currentStock',
      key: 'currentStock',
      render: (stock: number) => `${stock.toLocaleString()} 吨`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '正常' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary" onClick={handleAdd}>
            添加仓库
          </Button>
          <Button onClick={fetchData}>
            刷新
          </Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingWarehouse ? '编辑仓库' : '添加仓库'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="仓库名称"
            rules={[{ required: true, message: '请输入仓库名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="位置"
            rules={[{ required: true, message: '请输入仓库位置' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="capacity"
            label="容量（吨）"
            rules={[{ required: true, message: '请输入仓库容量' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="currentStock"
            label="当前库存（吨）"
            rules={[{ required: true, message: '请输入当前库存' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WarehouseList;
