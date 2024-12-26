import React from 'react';
import { Form, Input, Button, Select, DatePicker, Card, InputNumber, Space } from 'antd';

const { Option } = Select;

const PlaceOrder: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <h2>我要摘牌</h2>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            margin: 15,
            quantity: 3000,
            basis: -50,
          }}
        >
          <Form.Item
            name="productType"
            label="品种"
            required
          >
            <Input value="热卷板" disabled style={{ width: 200 }} />
          </Form.Item>

          <Form.Item
            name="referenceContract"
            label="参考合约"
            required
          >
            <Select style={{ width: 200 }}>
              <Option value="HC2501">HC2501</Option>
              <Option value="HC2505">HC2505</Option>
              <Option value="HC2507">HC2507</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="basis"
            label="基差"
            required
          >
            <InputNumber style={{ width: 200 }} />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="数量"
            required
          >
            <InputNumber style={{ width: 200 }} addonAfter="吨" />
          </Form.Item>

          <Form.Item
            name="contractDays"
            label="合同生效日"
            required
          >
            <InputNumber style={{ width: 200 }} addonAfter="工作日" />
          </Form.Item>

          <Form.Item
            name="deliveryDate"
            label="交货期"
            required
          >
            <DatePicker style={{ width: 200 }} />
          </Form.Item>

          <Form.Item
            name="client"
            label="客户"
            required
          >
            <Select style={{ width: 200 }}>
              <Option value="public">公开</Option>
              <Option value="private">定向</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="deliveryWarehouse"
            label="交收仓库名称"
            required
          >
            <Select style={{ width: 200 }}>
              <Option value="warehouse1">玖隆库</Option>
              <Option value="warehouse2">无锡库</Option>
              <Option value="warehouse3">上海库</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="margin"
            label="合同保证金比例"
            required
          >
            <InputNumber
              style={{ width: 200 }}
              addonAfter="%"
              min={0}
              max={100}
            />
          </Form.Item>

          <Form.Item
            name="minQuantity"
            label="最小交易单位"
          >
            <Input disabled style={{ width: 200 }} />
          </Form.Item>

          <Form.Item
            name="description"
            label="附加说明"
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">发布</Button>
              <Button>返回</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default PlaceOrder;
