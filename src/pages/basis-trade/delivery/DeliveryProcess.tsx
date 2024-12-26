import React, { useState } from 'react';
import { Card, Steps, Button, Form, Input, DatePicker, message, Modal, Timeline, Descriptions, Row, Col } from 'antd';
import { Contract } from '../../../types/trade';
import { deliveryApi } from '../../../services/api';

interface DeliveryProcessProps {
  contract: Contract;
  onUpdate: (contract: Contract) => void;
}

const DeliveryProcess: React.FC<DeliveryProcessProps> = ({ contract, onUpdate }) => {
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 获取当前交收阶段
  const getCurrentStep = () => {
    if (contract.paidAmount === 0) return 0; // 未支付保证金
    if (contract.paidAmount < contract.totalAmount) return 1; // 未支付尾款
    if (contract.status !== '完全定价') return 2; // 未完成交收
    return 3; // 已完成
  };

  const handleDeliveryRequest = async (values: any) => {
    try {
      await deliveryApi.requestDelivery(contract.id, values);
      message.success('交收申请已提交');
      setDeliveryModalVisible(false);
      onUpdate(contract);
    } catch (error) {
      message.error('申请失败');
    }
  };

  const handleConfirmDelivery = async () => {
    try {
      await deliveryApi.confirmDelivery(contract.id);
      message.success('交收确认成功');
      onUpdate(contract);
    } catch (error) {
      message.error('确认失败');
    }
  };

  const renderDeliveryTimeline = () => (
    <Timeline
      items={[
        {
          color: 'green',
          children: '合同生成',
        },
        {
          color: contract.paidAmount > 0 ? 'green' : 'gray',
          children: `支付保证金 - ${contract.paidAmount > 0 ? '已完成' : '待支付'}`,
        },
        {
          color: contract.paidAmount >= contract.totalAmount ? 'green' : 'gray',
          children: `支付尾款 - ${contract.paidAmount >= contract.totalAmount ? '已完成' : '待支付'}`,
        },
        {
          color: contract.status === '完全定价' ? 'green' : 'gray',
          children: `交收确认 - ${contract.status === '完全定价' ? '已完成' : '进行中'}`,
        },
      ]}
    />
  );

  return (
    <Card title="交收流程">
      <Row gutter={24}>
        <Col span={16}>
          <Steps
            current={getCurrentStep()}
            items={[
              {
                title: '支付保证金',
                description: '合同生效日前支付',
              },
              {
                title: '支付尾款',
                description: '交货期前支付',
              },
              {
                title: '货物交收',
                description: '双方确认交收',
              },
              {
                title: '完成',
                description: '交易完成',
              },
            ]}
          />

          <Card style={{ marginTop: 24 }}>
            <Descriptions title="交收信息" bordered column={2}>
              <Descriptions.Item label="合同编号">{contract.contractNo}</Descriptions.Item>
              <Descriptions.Item label="交货期">{contract.deliveryPeriod}</Descriptions.Item>
              <Descriptions.Item label="交收方式">{contract.deliveryMethod}</Descriptions.Item>
              <Descriptions.Item label="交收仓库">{contract.warehouse}</Descriptions.Item>
              <Descriptions.Item label="数量">{contract.quantity}吨</Descriptions.Item>
              <Descriptions.Item label="单价">{contract.price}元/吨</Descriptions.Item>
            </Descriptions>
          </Card>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            {getCurrentStep() === 2 && (
              <>
                <Button
                  type="primary"
                  onClick={() => setDeliveryModalVisible(true)}
                  style={{ marginRight: 8 }}
                >
                  申请交收
                </Button>
                <Button onClick={handleConfirmDelivery}>确认交收</Button>
              </>
            )}
          </div>
        </Col>
        <Col span={8}>
          <Card title="交收进度">
            {renderDeliveryTimeline()}
          </Card>
        </Col>
      </Row>

      <Modal
        title="交收申请"
        open={deliveryModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setDeliveryModalVisible(false)}
      >
        <Form form={form} onFinish={handleDeliveryRequest} layout="vertical">
          <Form.Item
            name="deliveryDate"
            label="预计交收日期"
            rules={[{ required: true, message: '请选择交收日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="contactPerson"
            label="联系人"
            rules={[{ required: true, message: '请输入联系人' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="contactPhone"
            label="联系电话"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="deliveryAddress"
            label="交收地址"
            rules={[{ required: true, message: '请输入交收地址' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="remarks" label="备注说明">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default DeliveryProcess;
