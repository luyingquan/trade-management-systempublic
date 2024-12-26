import React from 'react';
import { Form, InputNumber, Descriptions } from 'antd';
import { ListingItem } from '../../../types/trade';

interface PriceQuoteFormProps {
  listing: ListingItem;
}

const PriceQuoteForm: React.FC<PriceQuoteFormProps> = ({ listing }) => {
  return (
    <>
      <Descriptions title="挂牌信息" bordered column={2}>
        <Descriptions.Item label="品种">{listing.productType}</Descriptions.Item>
        <Descriptions.Item label="参考合约">{listing.referenceContract}</Descriptions.Item>
        <Descriptions.Item label="可用数量">{listing.quantity}吨</Descriptions.Item>
        <Descriptions.Item label="基差">{listing.basis}元/吨</Descriptions.Item>
        <Descriptions.Item label="交货期">{listing.deliveryPeriod}</Descriptions.Item>
        <Descriptions.Item label="交收方式">{listing.deliveryMethod}</Descriptions.Item>
        <Descriptions.Item label="交收仓库">{listing.warehouse}</Descriptions.Item>
      </Descriptions>

      <div style={{ height: 24 }} />

      <Form.Item
        name="quantity"
        label="点价数量（吨）"
        rules={[
          { required: true, message: '请输入点价数量' },
          {
            validator: (_, value) => {
              if (value > listing.quantity) {
                return Promise.reject('点价数量不能超过可用数量');
              }
              if (value % listing.minTradeUnit !== 0) {
                return Promise.reject(`点价数量必须是${listing.minTradeUnit}的整数倍`);
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={listing.minTradeUnit}
          max={listing.quantity}
          step={listing.minTradeUnit}
          placeholder={`最小交易单位：${listing.minTradeUnit}吨`}
        />
      </Form.Item>

      <Form.Item
        name="price"
        label="点价价格（元/吨）"
        rules={[
          { required: true, message: '请输入点价价格' },
          {
            validator: (_, value) => {
              if (value < listing.priceRange.min || value > listing.priceRange.max) {
                return Promise.reject(
                  `点价价格必须在${listing.priceRange.min}至${listing.priceRange.max}元/吨之间`
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={listing.priceRange.min}
          max={listing.priceRange.max}
          precision={2}
          placeholder={`价格区间：${listing.priceRange.min}-${listing.priceRange.max}元/吨`}
        />
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.quantity !== currentValues.quantity ||
          prevValues.price !== currentValues.price
        }
      >
        {({ getFieldsValue }) => {
          const { quantity, price } = getFieldsValue();
          const total = quantity && price ? quantity * price : 0;
          return (
            <Descriptions column={1}>
              <Descriptions.Item label="预计总金额">
                {total.toFixed(2)}元
              </Descriptions.Item>
            </Descriptions>
          );
        }}
      </Form.Item>
    </>
  );
};

export default PriceQuoteForm;
