import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, InputNumber, Select, Row, Col } from 'antd';
import { ListingItem } from '../../../types/listing';
import dayjs from 'dayjs';

interface EditListingModalProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: ListingItem) => void;
  initialValues?: ListingItem;
}

const EditListingModal: React.FC<EditListingModalProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        ginfoDate: initialValues.ginfoDate ? dayjs(initialValues.ginfoDate) : null,
        rightDate: initialValues.rightDate ? dayjs(initialValues.rightDate) : null,
      });
    }
  }, [visible, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // 转换日期格式
      const formattedValues = {
        ...values,
        ginfoDate: values.ginfoDate?.format('YYYY-MM-DDTHH:mm:ss.SSS'),
        rightDate: values.rightDate?.format('YYYY-MM-DDTHH:mm:ss.SSS'),
        systemDate: dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS'),
        // 确保数字字段是数字类型
        hangWeight: Number(values.hangWeight || 0),
        jicha: Number(values.jicha || 0),
        rightDateNum: Number(values.rightDateNum || 0),
        priceLow: Number(values.priceLow || 0),
        priceUp: Number(values.priceUp || 0),
        marginLevel: Number(values.marginLevel || 0),
        unitNumber: Number(values.unitNumber || 0),
        rightWareHouse: Number(values.rightWareHouse || 0),
        // 设置默认值
        status: values.status || 'ACTIVE',
        priceState: values.priceState || 'PRICING',
        type: values.type || 'PUBLIC',
        rightType: values.rightType || 'SPOT',
        hits: Number(values.hits || 0)
      };
      onOk(formattedValues);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={initialValues ? "编辑挂牌" : "新增挂牌"}
      open={visible}
      onCancel={onCancel}
      onOk={handleOk}
      width={900}
      bodyStyle={{ 
        padding: '12px 24px',
        maxHeight: 'calc(100vh - 200px)',
        overflowY: 'auto'
      }}
    >
      <Form
        form={form}
        layout="vertical"
        labelCol={{ style: { marginBottom: '4px' } }}
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="ginfoNumber"
              label="挂牌编号"
              rules={[{ required: true, message: '请输入挂牌编号' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ginfoDate"
              label="挂牌日期"
              rules={[{ required: true, message: '请选择挂牌日期' }]}
            >
              <DatePicker showTime style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="mainPriceDemo"
              label="期货参考合约"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="typeName"
              label="品种"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="pnName"
              label="品名"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="goodsMateri"
              label="钢种"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="goodsSpec"
              label="规格"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="hangWeight"
              label="挂牌数量"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="jicha"
              label="期现货价差"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="status"
              label="数据状态"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="ACTIVE">可交易</Select.Option>
                <Select.Option value="CANCELLED">已撤单</Select.Option>
                <Select.Option value="COMPLETED">已完成</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="priceState"
              label="点价状态"
            >
              <Select>
                <Select.Option value="PRICING">正在点价</Select.Option>
                <Select.Option value="FAILED">点价失败</Select.Option>
                <Select.Option value="PARTIAL">部分成交</Select.Option>
                <Select.Option value="COMPLETED">全部成交</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="rightDateNum"
              label="合同生效日"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="rightDate"
              label="交货日期"
              rules={[{ required: true }]}
            >
              <DatePicker showTime style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              label="交易类型"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="PUBLIC">公开</Select.Option>
                <Select.Option value="PRIVATE">私密</Select.Option>
                <Select.Option value="DIRECTED">定向</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="rightType"
              label="交收方式"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="SPOT">现货交收</Select.Option>
                <Select.Option value="FUTURES">期货交收</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="priceLow"
              label="最低报价"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="priceUp"
              label="最高报价"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="marginLevel"
              label="合同保证金比例"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: '100%' }} min={0} max={1} step={0.1} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="unitNumber"
              label="最小交易量(吨)"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: '100%' }} min={1} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="rightWareHouse"
              label="交收仓库"
              rules={[{ required: true }]}
            >
              <Select onChange={(value, option: any) => {
                form.setFieldsValue({
                  rightWarehouseName: option?.children
                });
              }}>
                <Select.Option value={1}>仓库1</Select.Option>
                <Select.Option value={2}>仓库2</Select.Option>
                <Select.Option value={3}>仓库3</Select.Option>
                <Select.Option value={4}>仓库4</Select.Option>
                <Select.Option value={5}>仓库5</Select.Option>
                <Select.Option value={6}>仓库6</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="remark"
              label="备注"
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="rightWarehouseName"
          hidden
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditListingModal;
