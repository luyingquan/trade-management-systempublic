import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, Upload, Button, Descriptions, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Contract } from '../../../types/trade';
import { tradeApi } from '../../../services/api';
import dayjs from 'dayjs';

const { Option } = Select;

interface MarginPaymentFormProps {
  contract: Contract;
  onSuccess?: () => void;
}

const MarginPaymentForm: React.FC<MarginPaymentFormProps> = ({ contract, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const formData = {
        ...values,
        contractNo: contract.contractNo,
        id: Date.now().toString(),
        paymentDate: values.paymentDate.format('YYYY-MM-DD'),
      };
      
      await tradeApi.submitMarginPayment(formData);
      message.success('保证金支付申请提交成功');
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error('提交失败，请重试');
      console.error('提交保证金支付申请失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Descriptions title="合同信息" bordered column={2}>
        <Descriptions.Item label="合同编号">{contract.contractNo}</Descriptions.Item>
        <Descriptions.Item label="合同日期">{contract.contractDate}</Descriptions.Item>
        <Descriptions.Item label="品种">{contract.productType}</Descriptions.Item>
        <Descriptions.Item label="保证金比例">{contract.marginRate}%</Descriptions.Item>
        <Descriptions.Item label="合同金额">{contract.totalAmount}元</Descriptions.Item>
        <Descriptions.Item label="应付保证金">{contract.marginAmount}元</Descriptions.Item>
      </Descriptions>

      <div style={{ height: 24 }} />

      <Form.Item
        name="paymentDate"
        label="支付日期"
        rules={[{ required: true, message: '请选择支付日期' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="amount"
        label="支付金额（元）"
        rules={[
          { required: true, message: '请输入支付金额' },
          { type: 'number', min: 0.01, message: '金额必须大于0' }
        ]}
      >
        <Input type="number" step="0.01" />
      </Form.Item>

      <Form.Item
        name="paymentMethod"
        label="支付方式"
        rules={[{ required: true, message: '请选择支付方式' }]}
      >
        <Select>
          <Option value="bank">银行转账</Option>
          <Option value="cash">现金支付</Option>
          <Option value="other">其他方式</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="documents"
        label="支付凭证"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) return e;
          return e?.fileList;
        }}
      >
        <Upload name="file" action="/upload" listType="text">
          <Button icon={<UploadOutlined />}>上传凭证</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="remarks"
        label="备注"
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          提交申请
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MarginPaymentForm;
