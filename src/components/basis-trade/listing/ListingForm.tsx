import React from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Radio } from 'antd';
import {
  DELIVERY_METHODS,
  CLIENT_TYPES,
  WAREHOUSES,
  PRODUCT_TYPES,
  REFERENCE_CONTRACTS,
  BUSINESS_RULES,
} from '../../../constants/trade';

const { Option } = Select;

const ListingForm: React.FC = () => {
  return (
    <>
      <Form.Item
        name="productType"
        label="品种"
        rules={[{ required: true, message: '请选择品种' }]}
      >
        <Select placeholder="请选择品种">
          {PRODUCT_TYPES.map(type => (
            <Option key={type.value} value={type.value}>
              {type.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="referenceContract"
        label="参考合约"
        rules={[{ required: true, message: '请选择参考合约' }]}
      >
        <Select placeholder="请选择参考合约">
          {REFERENCE_CONTRACTS.map(contract => (
            <Option key={contract.value} value={contract.value}>
              {contract.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="quantity"
        label="数量（吨）"
        rules={[
          { required: true, message: '请输入数量' },
          {
            validator: (_, value) => {
              if (value < BUSINESS_RULES.MIN_TRADE_UNIT) {
                return Promise.reject(`最小交易数量为${BUSINESS_RULES.MIN_TRADE_UNIT}吨`);
              }
              if (value > BUSINESS_RULES.MAX_TRADE_UNIT) {
                return Promise.reject(`最大交易数量为${BUSINESS_RULES.MAX_TRADE_UNIT}吨`);
              }
              if (value % BUSINESS_RULES.MIN_TRADE_UNIT !== 0) {
                return Promise.reject(`交易数量必须是${BUSINESS_RULES.MIN_TRADE_UNIT}的整数倍`);
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={BUSINESS_RULES.MIN_TRADE_UNIT}
          max={BUSINESS_RULES.MAX_TRADE_UNIT}
          step={BUSINESS_RULES.MIN_TRADE_UNIT}
          placeholder={`最小交易单位：${BUSINESS_RULES.MIN_TRADE_UNIT}吨`}
        />
      </Form.Item>

      <Form.Item
        name="basis"
        label="基差（元/吨）"
        rules={[
          { required: true, message: '请输入基差' },
          {
            validator: (_, value) => {
              if (value < BUSINESS_RULES.MIN_PRICE_DIFF || value > BUSINESS_RULES.MAX_PRICE_DIFF) {
                return Promise.reject(
                  `基差必须在${BUSINESS_RULES.MIN_PRICE_DIFF}至${BUSINESS_RULES.MAX_PRICE_DIFF}元/吨之间`
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          placeholder="请输入基差"
        />
      </Form.Item>

      <Form.Item
        name="deliveryPeriod"
        label="交货期"
        rules={[{ required: true, message: '请选择交货期' }]}
      >
        <DatePicker
          style={{ width: '100%' }}
          disabledDate={current => {
            const minDate = new Date();
            minDate.setDate(minDate.getDate() + BUSINESS_RULES.MIN_DELIVERY_DAYS);
            const maxDate = new Date();
            maxDate.setDate(maxDate.getDate() + BUSINESS_RULES.MAX_DELIVERY_DAYS);
            return current && (current.valueOf() < minDate.valueOf() || current.valueOf() > maxDate.valueOf());
          }}
        />
      </Form.Item>

      <Form.Item
        name="deliveryMethod"
        label="交收方式"
        rules={[{ required: true, message: '请选择交收方式' }]}
      >
        <Select placeholder="请选择交收方式">
          {DELIVERY_METHODS.map(method => (
            <Option key={method.value} value={method.value}>
              {method.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="warehouse"
        label="交收仓库"
        rules={[{ required: true, message: '请选择交收仓库' }]}
      >
        <Select placeholder="请选择交收仓库">
          {WAREHOUSES.map(warehouse => (
            <Option key={warehouse.value} value={warehouse.value}>
              {warehouse.label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="clientType"
        label="客户类型"
        rules={[{ required: true, message: '请选择客户类型' }]}
      >
        <Radio.Group>
          {CLIENT_TYPES.map(type => (
            <Radio key={type.value} value={type.value}>
              {type.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item name="remarks" label="备注">
        <Input.TextArea rows={4} placeholder="请输入备注信息" />
      </Form.Item>
    </>
  );
};

export default ListingForm;
