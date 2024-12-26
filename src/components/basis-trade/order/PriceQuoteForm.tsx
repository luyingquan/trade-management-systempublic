import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import { ListingItem } from '../../../types/listing';

interface PriceQuoteFormProps {
  listing: ListingItem;
  onSubmit: (values: any) => void;
}

const PriceQuoteForm: React.FC<PriceQuoteFormProps> = ({ listing, onSubmit }) => {
  const [form] = Form.useForm();

  const initialValues = {
    pnName: listing.pnName,
    goodsSpec: listing.goodsSpec,
    unitNumber: listing.unitNumber,
    jicha: listing.jicha,
    rightDate: listing.rightDate,
    rightWarehouseName: listing.rightWarehouseName
  };

  const validateQuantity = (_: any, value: number) => {
    if (!value) {
      return Promise.reject('请输入数量');
    }
    if (value < 1) {
      return Promise.reject('数量必须大于0');
    }
    if (value > listing.unitNumber) {
      return Promise.reject(`数量不能超过${listing.unitNumber}`);
    }
    return Promise.resolve();
  };

  const validatePrice = (_: any, value: number) => {
    if (!value) {
      return Promise.reject('请输入价格');
    }
    if (value < listing.priceLow || value > listing.priceUp) {
      return Promise.reject(`价格必须在${listing.priceLow}和${listing.priceUp}之间`);
    }
    return Promise.resolve();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item
        label="产品名称"
        name="pnName"
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="规格"
        name="goodsSpec"
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="数量"
        name="quantity"
        rules={[{ validator: validateQuantity }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="价格"
        name="price"
        rules={[{ validator: validatePrice }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="基差"
        name="jicha"
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="交割仓库"
        name="rightWarehouseName"
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="交割日期"
        name="rightDate"
      >
        <Input disabled />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交报价
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PriceQuoteForm;
