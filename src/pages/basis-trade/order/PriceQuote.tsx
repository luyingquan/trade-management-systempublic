import React from 'react';
import { Form, InputNumber, Select, Button, Modal, message } from 'antd';
import { ListingItem, TradeOrder } from '../../../types/trade';

interface PriceQuoteProps {
  visible: boolean;
  onClose: () => void;
  listing: ListingItem;
  onSubmit: (order: Partial<TradeOrder>) => void;
}

const { Option } = Select;

const PriceQuote: React.FC<PriceQuoteProps> = ({
  visible,
  onClose,
  listing,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const totalAmount = values.price * values.quantity;
      
      // 验证点价区间
      if (values.price < listing.priceRange.min || values.price > listing.priceRange.max) {
        message.error('点价价格超出允许范围！');
        return;
      }

      // 验证最小交易单位
      if (values.quantity % listing.minTradeUnit !== 0) {
        message.error(`交易数量必须是${listing.minTradeUnit}的整数倍！`);
        return;
      }

      const newOrder: Partial<TradeOrder> = {
        listingId: values.listingId,
        price: values.price,
        quantity: values.quantity,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
        status: '正在点价',
      };

      onSubmit(newOrder);
      
      onClose();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <Modal
      title="点价摘牌"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>取消</Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>确认点价</Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          quantity: listing?.minTradeUnit,
          price: (listing?.priceRange.max + listing?.priceRange.min) / 2,
        }}
      >
        <Form.Item
          name="quantity"
          label="点价数量（吨）"
          rules={[{ required: true, message: '请输入点价数量' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={listing?.minTradeUnit}
            max={listing?.quantity}
            step={listing?.minTradeUnit}
          />
        </Form.Item>

        <Form.Item
          name="price"
          label="点价价格"
          rules={[{ required: true, message: '请输入点价价格' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={listing?.priceRange.min}
            max={listing?.priceRange.max}
          />
        </Form.Item>

        <Form.Item
          name="warehouse"
          label="交收仓库"
          rules={[{ required: true, message: '请选择交收仓库' }]}
        >
          <Select>
            <Option value="warehouse1">玖隆库</Option>
            <Option value="warehouse2">无锡库</Option>
            <Option value="warehouse3">上海库</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PriceQuote;
