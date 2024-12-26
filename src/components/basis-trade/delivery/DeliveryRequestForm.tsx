import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, Upload, Button, Descriptions, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Contract } from '../../../types/trade';
import { tradeApi } from '../../../services/api';
import dayjs from 'dayjs';

const { Option } = Select;

interface DeliveryRequestFormProps {
  contract: Contract;
  onSuccess?: () => void;
}

const DeliveryRequestForm: React.FC<DeliveryRequestFormProps> = ({ contract, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const formData = {
        ...values,
        contractNo: contract.contractNo,
        id: Date.now().toString(),
        deliveryDate: values.deliveryDate.format('YYYY-MM-DD'),
      };
      
      await tradeApi.submitDeliveryRequest(formData);
      message.success('交割申请提交成功');
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error('提交失败，请重试');
      console.error('提交交割申请失败:', error);
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
        <Descriptions.Item label="数量">{contract.quantity}吨</Descriptions.Item>
        <Descriptions.Item label="交收方式">{contract.deliveryMethod}</Descriptions.Item>
        <Descriptions.Item label="交收仓库">{contract.warehouse}</Descriptions.Item>
      </Descriptions>

      <div style={{ height: 24 }} />

      <Form.Item
        name="deliveryDate"
        label="预计交收日期"
        rules={[{ required: true, message: '请选择交收日期' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="quantity"
        label="交收数量（吨）"
        rules={[
          { required: true, message: '请输入交收数量' },
          { type: 'number', min: 1, message: '数量必须大于0' }
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        name="warehouse"
        label="交收仓库"
        rules={[{ required: true, message: '请选择交收仓库' }]}
      >
        <Select>
          <Option value="warehouse1">仓库一</Option>
          <Option value="warehouse2">仓库二</Option>
          <Option value="warehouse3">仓库三</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="documents"
        label="相关单据"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) return e;
          return e?.fileList;
        }}
      >
        <Upload name="file" action="/upload" listType="text">
          <Button icon={<UploadOutlined />}>上传文件</Button>
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

export default DeliveryRequestForm;
