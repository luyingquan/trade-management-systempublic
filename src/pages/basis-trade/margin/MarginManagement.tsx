import React, { useState } from 'react';
import { Table, Card, Button, Modal, Form, InputNumber, message, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Contract } from '../../../types/trade';
import { checkMarginCall } from '../../../utils/trade';
import { contractApi } from '../../../services/api';
import { BUSINESS_RULES } from '../../../constants/trade';

interface MarginRecord extends Contract {
  requiredMargin: number;
  paidMargin: number;
  marginStatus: string;
  needAdditionalMargin: boolean;
  additionalMarginAmount: number;
}

const MarginManagement: React.FC = () => {
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [selectedContract, setSelectedContract] = useState<MarginRecord | null>(null);
  const [form] = Form.useForm();

  // 模拟数据生成
  const generateMockData = (): MarginRecord[] => {
    const mockContracts = [] as MarginRecord[];
    const statuses = ['未支付', '部分支付', '已支付', '需追加'];

    for (let i = 0; i < 10; i++) {
      const quantity = Math.floor(Math.random() * 2000) + 1000;
      const price = Math.floor(Math.random() * 1000) + 3000;
      const totalAmount = quantity * price;
      const requiredMargin = totalAmount * BUSINESS_RULES.MARGIN_RATIO;
      const paidMargin = Math.floor(Math.random() * requiredMargin);

      const mockContract: Contract = {
        id: `${Math.floor(Math.random() * 90000000) + 10000000}`,
        orderId: `O${Math.floor(Math.random() * 90000000) + 10000000}`,
        contractNo: `C${Math.floor(Math.random() * 90000000) + 10000000}`,
        contractDate: '2024-11-26',
        productType: '热卷板',
        referenceContract: 'HC2501',
        deliveryPeriod: '2025年5月',
        deliveryMethod: '现货交收',
        quantity,
        price,
        warehouse: ['玖隆库', '无锡库', '上海库'][Math.floor(Math.random() * 3)],
        status: ['正在定价', '部分定价', '完全定价'][Math.floor(Math.random() * 3)],
        marginAmount: paidMargin,
        totalAmount,
        paidAmount: paidMargin,
      };

      const marginCall = checkMarginCall(mockContract, price * 1.06); // 模拟现价上涨6%

      mockContracts.push({
        ...mockContract,
        requiredMargin,
        paidMargin,
        marginStatus: statuses[Math.floor(Math.random() * statuses.length)],
        needAdditionalMargin: marginCall.required,
        additionalMarginAmount: marginCall.amount,
      });
    }
    return mockContracts;
  };

  const handlePayment = async (values: { amount: number }) => {
    if (!selectedContract) return;

    try {
      await contractApi.payMargin(selectedContract.id, values.amount);
      message.success('保证金支付成功');
      setPaymentVisible(false);
      form.resetFields();
      // 刷新数据
    } catch (error) {
      message.error('支付失败');
    }
  };

  const columns: ColumnsType<MarginRecord> = [
    { title: '合同编号', dataIndex: 'contractNo', key: 'contractNo', align: 'center' },
    { title: '合同日期', dataIndex: 'contractDate', key: 'contractDate', align: 'center' },
    { title: '品种', dataIndex: 'productType', key: 'productType', align: 'center' },
    { title: '参考合约', dataIndex: 'referenceContract', key: 'referenceContract', align: 'center' },
    { 
      title: '应付保证金',
      dataIndex: 'requiredMargin',
      key: 'requiredMargin',
      align: 'center',
      render: (value: number) => `${value.toFixed(2)}元`,
    },
    { 
      title: '已付保证金',
      dataIndex: 'paidMargin',
      key: 'paidMargin',
      align: 'center',
      render: (value: number) => `${value.toFixed(2)}元`,
    },
    {
      title: '保证金状态',
      dataIndex: 'marginStatus',
      key: 'marginStatus',
      align: 'center',
      render: (status: string) => {
        const color = status === '已支付' ? 'success' :
                     status === '部分支付' ? 'warning' :
                     status === '需追加' ? 'error' : 'default';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '追加保证金',
      key: 'additionalMargin',
      align: 'center',
      render: (_, record) => {
        if (record.needAdditionalMargin) {
          return (
            <Tag color="error">
              需追加 {record.additionalMarginAmount.toFixed(2)}元
            </Tag>
          );
        }
        return <Tag color="success">无需追加</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setSelectedContract(record);
              setPaymentVisible(true);
            }}
          >
            支付保证金
          </Button>
          <Button type="link">查看明细</Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="保证金管理">
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
        title="支付保证金"
        open={paymentVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          setPaymentVisible(false);
          form.resetFields();
        }}
      >
        <Form form={form} onFinish={handlePayment}>
          <Form.Item
            name="amount"
            label="支付金额"
            rules={[{ required: true, message: '请输入支付金额' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={selectedContract?.requiredMargin}
              precision={2}
              formatter={(value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value ? parseFloat(value.replace(/￥\s?|(,*)/g, '')) : 0}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default MarginManagement;
