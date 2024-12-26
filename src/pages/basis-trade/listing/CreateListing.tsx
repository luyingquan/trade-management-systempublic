import React from 'react';
import { Form, Input, Select, InputNumber, DatePicker, Button, Card, Space } from 'antd';
import { ListingItem } from '../../../types/trade';
import { CLIENT_TYPES, DELIVERY_METHODS, MIN_TRADE_UNITS, PRODUCT_TYPES } from '../../../constants/trade';

const { Option } = Select;

const CreateListing: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: Partial<ListingItem>) => {
    console.log('Success:', values);
  };

  return (
    <Card title="发布挂牌">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          marginRatio: 15,
          priceRange: { min: -50, max: 50 },
          clientType: 'PUBLIC',
          deliveryMethod: 'SPOT',
        }}
      >
        <Form.Item name="productType" label="品种" required>
          <Select placeholder="请选择品种">
            {PRODUCT_TYPES.map(type => (
              <Option key={type.value} value={type.value}>
                {type.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="referenceContract" label="参考合约" required>
          <Select>
            <Option value="HC2501">HC2501</Option>
            <Option value="HC2505">HC2505</Option>
            <Option value="RB2501">RB2501</Option>
          </Select>
        </Form.Item>

        <Form.Item name="basis" label="基差" required>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="quantity" label="数量（吨）" required>
          <InputNumber style={{ width: '100%' }} min={0} />
        </Form.Item>

        <Form.Item name="deliveryMethod" label="交收方式" required>
          <Select placeholder="请选择交收方式">
            {DELIVERY_METHODS.map(method => (
              <Option key={method.value} value={method.value}>
                {method.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="clientType" label="客户类型" required>
          <Select placeholder="请选择客户类型">
            {CLIENT_TYPES.map(type => (
              <Option key={type.value} value={type.value}>
                {type.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="contractEffectiveDays" label="合同生效日（工作日）" required>
          <InputNumber style={{ width: '100%' }} min={1} />
        </Form.Item>

        <Form.Item name="deliveryPeriod" label="交货期" required>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="marginRatio" label="合同保证金比例（%）" required>
          <InputNumber style={{ width: '100%' }} min={0} max={100} />
        </Form.Item>

        <Form.Item label="点价区间">
          <Space>
            <Form.Item name={['priceRange', 'min']} noStyle>
              <InputNumber placeholder="最低价" />
            </Form.Item>
            <span>至</span>
            <Form.Item name={['priceRange', 'max']} noStyle>
              <InputNumber placeholder="最高价" />
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item name="minTradeUnit" label="最小交易单位">
          <Select>
            {MIN_TRADE_UNITS.HOT_ROLLED_COIL.map(unit => (
              <Option key={unit} value={unit}>{unit}吨</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="additionalInfo" label="附加说明">
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
  );
};

export default CreateListing;
