import React, { useState } from 'react';
import { Card, Descriptions, Button, Modal, Form, InputNumber, message, Timeline, Row, Col, Statistic } from 'antd';
import { Contract } from '../../../types/trade';
import { calculateMargin, calculateTotalAmount } from '../../../utils/trade';
import { contractApi } from '../../../services/api';

interface ContractDetailProps {
  contract: Contract;
  onUpdate: (contract: Contract) => void;
}

const ContractDetail: React.FC<ContractDetailProps> = ({ contract, onUpdate }) => {
  const [earlyDeliveryVisible, setEarlyDeliveryVisible] = useState(false);
  const [delayDeliveryVisible, setDelayDeliveryVisible] = useState(false);
  const [form] = Form.useForm();

  const handleEarlyDelivery = async (values: any) => {
    try {
      await contractApi.requestEarlyDelivery(contract.id, values.days);
      message.success('提前交货申请已提交');
      setEarlyDeliveryVisible(false);
      onUpdate(contract);
    } catch (error) {
      message.error('申请失败');
    }
  };

  const handleDelayDelivery = async (values: any) => {
    try {
      await contractApi.requestDelayedDelivery(contract.id, values.days);
      message.success('延期交货申请已提交');
      setDelayDeliveryVisible(false);
      onUpdate(contract);
    } catch (error) {
      message.error('申请失败');
    }
  };

  const renderPaymentStatus = () => {
    const margin = calculateMargin(contract);
    const total = calculateTotalAmount(contract);
    const remainder = total - margin;

    return (
      <Row gutter={16}>
        <Col span={8}>
          <Statistic
            title="合同总额"
            value={total}
            precision={2}
            suffix="元"
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="保证金"
            value={margin}
            precision={2}
            suffix="元"
            valueStyle={{ color: contract.paidAmount >= margin ? '#3f8600' : '#cf1322' }}
          />
        </Col>
        <Col span={8}>
          <Statistic
            title="待付尾款"
            value={remainder}
            precision={2}
            suffix="元"
            valueStyle={{ color: contract.paidAmount >= total ? '#3f8600' : '#cf1322' }}
          />
        </Col>
      </Row>
    );
  };

  const renderTimeline = () => (
    <Timeline
      items={[
        {
          color: 'green',
          children: `合同生成 - ${contract.contractDate}`,
        },
        {
          color: contract.paidAmount >= calculateMargin(contract) ? 'green' : 'gray',
          children: '支付保证金',
        },
        {
          color: contract.paidAmount >= calculateTotalAmount(contract) ? 'green' : 'gray',
          children: '支付尾款',
        },
        {
          color: contract.status === '完全定价' ? 'green' : 'gray',
          children: '完成交收',
        },
      ]}
    />
  );

  return (
    <Card title="合同详情">
      <Descriptions bordered column={2}>
        <Descriptions.Item label="合同编号">{contract.contractNo}</Descriptions.Item>
        <Descriptions.Item label="合同日期">{contract.contractDate}</Descriptions.Item>
        <Descriptions.Item label="品种">{contract.productType}</Descriptions.Item>
        <Descriptions.Item label="参考合约">{contract.referenceContract}</Descriptions.Item>
        <Descriptions.Item label="交货期">{contract.deliveryPeriod}</Descriptions.Item>
        <Descriptions.Item label="交收方式">{contract.deliveryMethod}</Descriptions.Item>
        <Descriptions.Item label="数量">{contract.quantity}吨</Descriptions.Item>
        <Descriptions.Item label="价格">{contract.price}元/吨</Descriptions.Item>
        <Descriptions.Item label="交收仓库">{contract.warehouse}</Descriptions.Item>
        <Descriptions.Item label="点价状态">{contract.status}</Descriptions.Item>
      </Descriptions>

      <Card title="付款状态" style={{ marginTop: 16 }}>
        {renderPaymentStatus()}
      </Card>

      <Card title="合同进度" style={{ marginTop: 16 }}>
        {renderTimeline()}
      </Card>

      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <Button type="primary" onClick={() => setEarlyDeliveryVisible(true)} style={{ marginRight: 8 }}>
          申请提前交货
        </Button>
        <Button onClick={() => setDelayDeliveryVisible(true)}>
          申请延期交货
        </Button>
      </div>

      <Modal
        title="申请提前交货"
        open={earlyDeliveryVisible}
        onOk={() => form.submit()}
        onCancel={() => setEarlyDeliveryVisible(false)}
      >
        <Form form={form} onFinish={handleEarlyDelivery}>
          <Form.Item
            name="days"
            label="提前天数"
            rules={[{ required: true, message: '请输入提前天数' }]}
          >
            <InputNumber min={1} max={7} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="申请延期交货"
        open={delayDeliveryVisible}
        onOk={() => form.submit()}
        onCancel={() => setDelayDeliveryVisible(false)}
      >
        <Form form={form} onFinish={handleDelayDelivery}>
          <Form.Item
            name="days"
            label="延期天数"
            rules={[{ required: true, message: '请输入延期天数' }]}
          >
            <InputNumber min={1} max={7} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ContractDetail;
