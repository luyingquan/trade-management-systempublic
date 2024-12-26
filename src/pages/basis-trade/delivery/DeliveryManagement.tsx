import React from 'react';
import { Table, Card, Space, Button, Tag, Steps, Modal, Form, Input, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Contract } from '../../../types/trade';

const { Step } = Steps;

const DeliveryManagement: React.FC = () => {
  const [deliveryModalVisible, setDeliveryModalVisible] = React.useState(false);
  const [form] = Form.useForm();

  // 模拟数据生成
  const generateMockData = (): (Contract & { deliveryStatus: string })[] => {
    const baseData = generateMockContractData();
    return baseData.map(contract => ({
      ...contract,
      deliveryStatus: ['待支付保证金', '待支付尾款', '待收货', '已完成'][Math.floor(Math.random() * 4)],
    }));
  };

  const generateMockContractData = (): Contract[] => {
    return [{
      id: 1,
      orderId: 'O202401001', 
      contractNo: 'C202401001',
      contractDate: '2024-01-01',
      productType: 'HOT_ROLLED',
      referenceContract: 'HC2401', 
      quantity: 1000,
      price: 4000,
      marginRate: 0.15,  
      marginAmount: 60000,
      totalAmount: 4000000,
      paidAmount: 0,
      status: '待交收',
      deliveryMethod: 'SPOT',
      warehouse: 'JIULONG',
      deliveryPeriod: '2024-02',
    }];
  };

  const handleDeliveryRequest = async () => {
    try {
      const values = await form.validateFields();
      console.log('交收申请:', values);
      setDeliveryModalVisible(false);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const getDeliveryStep = (status: string) => {
    switch (status) {
      case '待支付保证金':
        return 0;
      case '待支付尾款':
        return 1;
      case '待收货':
        return 2;
      case '已完成':
        return 3;
      default:
        return 0;
    }
  };

  const columns: ColumnsType<Contract & { deliveryStatus: string }> = [
    { title: '合同编号', dataIndex: 'contractNo', key: 'contractNo' },
    { title: '合同日期', dataIndex: 'contractDate', key: 'contractDate' },
    { title: '品种', dataIndex: 'productType', key: 'productType' },
    { title: '数量（吨）', dataIndex: 'quantity', key: 'quantity' },
    { title: '交收仓库', dataIndex: 'warehouse', key: 'warehouse' },
    {
      title: '交收状态',
      dataIndex: 'deliveryStatus',
      key: 'deliveryStatus',
      render: (status: string) => {
        const color = status === '已完成' ? 'success' : 
                     status === '待收货' ? 'processing' : 
                     status === '待支付尾款' ? 'warning' : 'default';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '交收进度',
      key: 'deliveryProgress',
      render: (_, record) => (
        <Steps
          size="small"
          current={getDeliveryStep(record.deliveryStatus)}
          items={[
            { title: '支付保证金' },
            { title: '支付尾款' },
            { title: '交收' },
            { title: '完成' },
          ]}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            onClick={() => {
              setDeliveryModalVisible(true);
            }}
          >
            申请交收
          </Button>
          <Button type="link">查看详情</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="交收管理">
      <Table
        columns={columns}
        dataSource={generateMockData()}
        rowKey="id"
        pagination={{
          total: 100,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <Modal
        title="交收申请"
        open={deliveryModalVisible}
        onOk={handleDeliveryRequest}
        onCancel={() => setDeliveryModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="deliveryDate"
            label="预计交收日期"
            rules={[{ required: true, message: '请选择交收日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="contactPerson"
            label="联系人"
            rules={[{ required: true, message: '请输入联系人' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="contactPhone"
            label="联系电话"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="remarks"
            label="备注"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default DeliveryManagement;
