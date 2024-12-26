import React, { useState } from 'react';
import { Table, Tag, Space, Button, Input, Modal, Descriptions, message, Form, Select, InputNumber, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { PresetColorType } from 'antd/es/_util/colors';
import { ListingItem } from '../../../types/listing';
import { mockListings } from '../../../mock/data';
import dayjs from 'dayjs';
import { SearchOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;

const ListingList: React.FC = () => {
  const [data, setData] = useState<ListingItem[]>(mockListings);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<ListingItem | undefined>();
  const [publishModalVisible, setPublishModalVisible] = useState(false);
  const [searchForm] = Form.useForm();
  const [form] = Form.useForm();

  const handleView = (record: ListingItem) => {
    setCurrentItem(record);
    setViewModalVisible(true);
  };

  const handleEdit = (record: ListingItem) => {
    setCurrentItem(record);
    form.setFieldsValue({
      mainPriceDemo: record.mainPriceDemo,
      pnName: record.pnName,
      goodsMateri: record.goodsMateri,
      goodsSpec: record.goodsSpec,
      hangWeight: record.hangWeight,
      jicha: record.jicha,
      type: record.type,
      rightType: record.rightType,
      minPrice: record.priceLow,
      maxPrice: record.priceUp,
      depositRate: record.marginLevel,
      minTradeWeight: record.unitNumber,
      remark: record.remark,
      rightWarehouseName: record.rightWarehouseName,
    });
    setEditModalVisible(true);
  };

  const handleDelete = (record: ListingItem) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除该挂牌信息吗？挂牌编号：${record.ginfoNumber}`,
      onOk() {
        const newData = data.filter(item => item.id !== record.id);
        setData(newData);
        message.success('删除成功');
      },
    });
  };

  const handlePublish = () => {
    setPublishModalVisible(true);
  };

  const handlePublishSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // 生成新的挂牌编号
      const date = dayjs().format('YYYYMM');
      const newId = data.length + 1;
      const ginfoNumber = `GP${date}${String(newId).padStart(3, '0')}`;

      const newListing: ListingItem = {
        id: newId,
        ginfoNumber,
        ginfoDate: dayjs().format('YYYY-MM-DD'),
        systemDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        mainPriceDemo: values.mainPriceDemo,
        typeName: values.typeName,
        pnName: values.pnName,
        goodsMateri: values.goodsMateri,
        goodsSpec: values.goodsSpec,
        hangWeight: values.hangWeight,
        jicha: values.jicha,
        status: '已发布',
        priceState: '点价中',
        rightDateNum: values.rightDateNum,
        rightDate: values.rightDate.format('YYYY-MM-DD'),
        type: values.type,
        rightType: values.rightType,
        priceLow: values.priceLow,
        priceUp: values.priceUp,
        marginLevel: values.marginLevel,
        unitNumber: values.unitNumber,
        remark: values.remark,
        rightWareHouse: values.rightWareHouse,
        rightWarehouseName: values.rightWarehouseName,
        hits: 0,
        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      };

      setData([newListing, ...data]);
      message.success('发布成功');
      setPublishModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      const newData = data.map(item => {
        if (item.id === currentItem?.id) {
          return {
            ...item,
            mainPriceDemo: values.mainPriceDemo,
            pnName: values.pnName,
            goodsMateri: values.goodsMateri,
            goodsSpec: values.goodsSpec,
            hangWeight: values.hangWeight,
            jicha: values.jicha,
            type: values.type,
            rightType: values.rightType,
            priceLow: values.minPrice,
            priceUp: values.maxPrice,
            marginLevel: values.depositRate,
            unitNumber: values.minTradeWeight,
            remark: values.remark,
            rightWarehouseName: values.rightWarehouseName,
            updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          };
        }
        return item;
      });
      setData(newData);
      message.success('修改成功');
      setEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleSearch = () => {
    const values = searchForm.getFieldsValue();
    let filteredData = [...mockListings];

    if (values.ginfoNumber) {
      filteredData = filteredData.filter(item => 
        item.ginfoNumber.toLowerCase().includes(values.ginfoNumber.toLowerCase())
      );
    }

    if (values.pnName) {
      filteredData = filteredData.filter(item => 
        item.pnName.includes(values.pnName)
      );
    }

    if (values.goodsMateri) {
      filteredData = filteredData.filter(item => 
        item.goodsMateri.includes(values.goodsMateri)
      );
    }

    if (values.type) {
      filteredData = filteredData.filter(item => 
        item.type === values.type
      );
    }

    setData(filteredData);
  };

  const handleReset = () => {
    searchForm.resetFields();
    setData(mockListings);
  };

  const getPriceStateTag = (state: ListingItem['priceState']) => {
    const colorMap: Record<ListingItem['priceState'], string> = {
      '点价中': 'blue',
      '点价完成': 'green',
      '点价失败': 'red',
      '部分完成': 'gold'
    };
    const textMap: Record<ListingItem['priceState'], string> = {
      '点价中': '点价中',
      '点价完成': '点价完成',
      '点价失败': '点价失败',
      '部分完成': '部分完成'
    };
    return <Tag color={colorMap[state]}>{textMap[state]}</Tag>;
  };

  const getStatusTag = (status: ListingItem['status']) => {
    const colorMap: Record<ListingItem['status'], string> = {
      '已发布': 'green',
      '已下架': 'gray'
    };
    const textMap: Record<ListingItem['status'], string> = {
      '已发布': '已发布',
      '已下架': '已下架'
    };
    return <Tag color={colorMap[status]}>{textMap[status]}</Tag>;
  };

  const getTypeTag = (type: ListingItem['type']) => {
    const colorMap: Record<ListingItem['type'], string> = {
      '公开交易': 'blue',
      '定向交易': 'green',
      '指定交易': 'orange'
    };
    const textMap: Record<ListingItem['type'], string> = {
      '公开交易': '公开交易',
      '定向交易': '定向交易',
      '指定交易': '指定交易'
    };
    return <Tag color={colorMap[type]}>{textMap[type]}</Tag>;
  };

  const getRightTypeTag = (rightType: ListingItem['rightType']) => {
    const colorMap: Record<ListingItem['rightType'], string> = {
      '现货交收': 'purple',
      '期货交收': 'cyan'
    };
    const textMap: Record<ListingItem['rightType'], string> = {
      '现货交收': '现货交收',
      '期货交收': '期货交收'
    };
    return <Tag color={colorMap[rightType]}>{textMap[rightType]}</Tag>;
  };

  const columns: ColumnsType<ListingItem> = [
    {
      title: '挂牌编号',
      dataIndex: 'ginfoNumber',
      key: 'ginfoNumber',
      fixed: 'left',
      width: 120,
    },
    {
      title: '期货参考合约',
      dataIndex: 'mainPriceDemo',
      key: 'mainPriceDemo',
      width: 120,
    },
    {
      title: '品名',
      dataIndex: 'pnName',
      key: 'pnName',
      width: 120,
    },
    {
      title: '钢种',
      dataIndex: 'goodsMateri',
      key: 'goodsMateri',
      width: 100,
    },
    {
      title: '规格',
      dataIndex: 'goodsSpec',
      key: 'goodsSpec',
      width: 120,
    },
    {
      title: '挂牌数量',
      dataIndex: 'hangWeight',
      key: 'hangWeight',
      width: 100,
      render: (weight: number) => `${weight}吨`,
    },
    {
      title: '期现货价差',
      dataIndex: 'jicha',
      key: 'jicha',
      width: 100,
      render: (jicha: number) => `¥${jicha}`,
    },
    {
      title: '交易类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: getTypeTag,
    },
    {
      title: '交收方式',
      dataIndex: 'rightType',
      key: 'rightType',
      width: 100,
      render: getRightTypeTag,
    },
    {
      title: '最低价格',
      dataIndex: 'priceLow',
      key: 'priceLow',
      width: 100,
      render: (price: number) => `¥${price}`,
    },
    {
      title: '最高价格',
      dataIndex: 'priceUp',
      key: 'priceUp',
      width: 100,
      render: (price: number) => `¥${price}`,
    },
    {
      title: '保证金比例',
      dataIndex: 'marginLevel',
      key: 'marginLevel',
      width: 100,
      render: (level: number) => `${level * 100}%`,
    },
    {
      title: '最小交易量',
      dataIndex: 'unitNumber',
      key: 'unitNumber',
      width: 100,
      render: (unit: number) => `${unit}吨`,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 150,
    },
    {
      title: '交收仓库',
      dataIndex: 'rightWarehouseName',
      key: 'rightWarehouseName',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleView(record)}>查看详情</a>
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a style={{ color: '#ff4d4f' }} onClick={() => handleDelete(record)}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <style>
        {`
          .publish-btn:hover {
            background-color: #73d13d !important;
            border-color: #73d13d !important;
          }
        `}
      </style>
      <div style={{ marginBottom: '16px', background: '#fff', padding: '16px', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Form
            form={searchForm}
            layout="inline"
            onFinish={handleSearch}
            style={{ flex: 1 }}
          >
            <Form.Item name="ginfoNumber">
              <Input
                placeholder="挂牌编号"
                style={{ width: 150 }}
                allowClear
              />
            </Form.Item>

            <Form.Item name="pnName">
              <Input
                placeholder="品名"
                style={{ width: 150 }}
                allowClear
              />
            </Form.Item>

            <Form.Item name="goodsMateri">
              <Input
                placeholder="钢种"
                style={{ width: 150 }}
                allowClear
              />
            </Form.Item>

            <Form.Item name="type">
              <Select
                placeholder="交易类型"
                style={{ width: 150 }}
                allowClear
              >
                <Option value="公开交易">公开交易</Option>
                <Option value="定向交易">定向交易</Option>
                <Option value="指定交易">指定交易</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                  查询
                </Button>
                <Button onClick={handleReset} icon={<ReloadOutlined />}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
          
          <Button 
            type="primary" 
            onClick={handlePublish} 
            icon={<PlusOutlined />}
            className="publish-btn"
            style={{ 
              marginLeft: '24px',
              background: '#52c41a',
              borderColor: '#52c41a'
            }}
          >
            发布点价
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500 }}
        rowKey="id"
        pagination={{
          total: data.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          pageSizeOptions: ['10', '20', '30']
        }}
      />

      <Modal
        title="查看详情"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={null}
        width={800}
      >
        {currentItem && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="挂牌编号">{currentItem.ginfoNumber}</Descriptions.Item>
            <Descriptions.Item label="挂牌日期">{currentItem.ginfoDate}</Descriptions.Item>
            <Descriptions.Item label="期货参考合约">{currentItem.mainPriceDemo}</Descriptions.Item>
            <Descriptions.Item label="品名">{currentItem.pnName}</Descriptions.Item>
            <Descriptions.Item label="钢种">{currentItem.goodsMateri}</Descriptions.Item>
            <Descriptions.Item label="规格">{currentItem.goodsSpec}</Descriptions.Item>
            <Descriptions.Item label="挂牌数量">{currentItem.hangWeight}吨</Descriptions.Item>
            <Descriptions.Item label="期现货价差">¥{currentItem.jicha}</Descriptions.Item>
            <Descriptions.Item label="交易类型">
              {getTypeTag(currentItem.type)}
            </Descriptions.Item>
            <Descriptions.Item label="交收方式">
              {getRightTypeTag(currentItem.rightType)}
            </Descriptions.Item>
            <Descriptions.Item label="备注" span={2}>{currentItem.remark}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      <Modal
        title="发布点价"
        open={publishModalVisible}
        onOk={handlePublishSubmit}
        onCancel={() => {
          setPublishModalVisible(false);
          form.resetFields();
        }}
        width={800}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxHeight: '60vh', overflowY: 'auto', padding: '12px 0' }}
          layout="horizontal"
          size="middle"
          initialValues={{
            status: '已发布',
            priceState: '点价中',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '24px', rowGap: '8px' }}>
            <Form.Item
              name="mainPriceDemo"
              label="期货参考合约"
              rules={[{ required: true, message: '请输入期货参考合约' }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>

            <Form.Item
              name="pnName"
              label="品名"
              rules={[{ required: true, message: '请输入品名' }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>

            <Form.Item
              name="goodsMateri"
              label="钢种"
              rules={[{ required: true, message: '请输入钢种' }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>

            <Form.Item
              name="goodsSpec"
              label="规格"
              rules={[{ required: true, message: '请输入规格' }]}
            >
              <Input placeholder="请输入" />
            </Form.Item>

            <Form.Item
              name="hangWeight"
              label="挂牌数量"
              rules={[{ required: true, message: '请输入挂牌数量' }]}
            >
              <InputNumber 
                style={{ width: '100%' }} 
                placeholder="请输入数量（吨）"
                min={0}
              />
            </Form.Item>

            <Form.Item
              name="jicha"
              label="期现货价差"
              rules={[{ required: true, message: '请输入期现货价差' }]}
            >
              <InputNumber 
                style={{ width: '100%' }} 
                placeholder="请输入价差（元）"
                min={0}
              />
            </Form.Item>

            <Form.Item
              name="type"
              label="交易类型"
              rules={[{ required: true, message: '请选择交易类型' }]}
            >
              <Select placeholder="请选择">
                <Option value="公开交易">公开交易</Option>
                <Option value="定向交易">定向交易</Option>
                <Option value="指定交易">指定交易</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="rightType"
              label="交收方式"
              rules={[{ required: true, message: '请选择交收方式' }]}
            >
              <Select placeholder="请选择">
                <Option value="现货交收">现货交收</Option>
                <Option value="期货交收">期货交收</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="minPrice"
              label="最低价格"
              rules={[{ required: true, message: '请输入最低价格' }]}
            >
              <InputNumber 
                style={{ width: '100%' }} 
                placeholder="请输入价格（元）"
                min={0}
              />
            </Form.Item>

            <Form.Item
              name="maxPrice"
              label="最高价格"
              rules={[{ required: true, message: '请输入最高价格' }]}
            >
              <InputNumber 
                style={{ width: '100%' }} 
                placeholder="请输入价格（元）"
                min={0}
              />
            </Form.Item>

            <Form.Item
              name="marginLevel"
              label="保证金比例"
              rules={[{ required: true, message: '请输入保证金比例' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value): 0 | 100 => {
                  const parsed = value ? Number(value.replace('%', '')) : 0;
                  return parsed > 100 ? 100 : (parsed < 0 ? 0 : parsed as 0 | 100);
                }}
                placeholder="请输入保证金比例"
              />
            </Form.Item>

            <Form.Item
              name="minTradeWeight"
              label="最小交易量"
              rules={[{ required: true, message: '请输入最小交易量' }]}
            >
              <InputNumber 
                style={{ width: '100%' }} 
                placeholder="请输入数量（吨）"
                min={0}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="remark"
            label="备注"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
          >
            <Input.TextArea 
              placeholder="请输入备注信息"
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="编辑挂牌"
        open={editModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => {
          setEditModalVisible(false);
          form.resetFields();
        }}
        width={800}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxHeight: '60vh', overflowY: 'auto' }}
        >
          <Form.Item
            name="mainPriceDemo"
            label="期货参考合约"
            rules={[{ required: true, message: '请输入期货参考合约' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            name="pnName"
            label="品名"
            rules={[{ required: true, message: '请输入品名' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            name="goodsMateri"
            label="钢种"
            rules={[{ required: true, message: '请输入钢种' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            name="goodsSpec"
            label="规格"
            rules={[{ required: true, message: '请输入规格' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            name="hangWeight"
            label="挂牌数量"
            rules={[{ required: true, message: '请输入挂牌数量' }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              placeholder="请输入"
              addonAfter="吨"
            />
          </Form.Item>

          <Form.Item
            name="jicha"
            label="期现货价差"
            rules={[{ required: true, message: '请输入期现货价差' }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              placeholder="请输入"
              addonBefore="¥"
            />
          </Form.Item>

          <Form.Item
            name="type"
            label="交易类型"
            rules={[{ required: true, message: '请选择交易类型' }]}
          >
            <Select placeholder="请选择">
              <Option value="公开交易">公开交易</Option>
              <Option value="定向交易">定向交易</Option>
              <Option value="指定交易">指定交易</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="rightType"
            label="交收方式"
            rules={[{ required: true, message: '请选择交收方式' }]}
          >
            <Select placeholder="请选择">
              <Option value="现货交收">现货交收</Option>
              <Option value="期货交收">期货交收</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="minPrice"
            label="最低价格"
            rules={[{ required: true, message: '请输入最低价格' }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              placeholder="请输入"
              addonBefore="¥"
            />
          </Form.Item>

          <Form.Item
            name="maxPrice"
            label="最高价格"
            rules={[{ required: true, message: '请输入最高价格' }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              placeholder="请输入"
              addonBefore="¥"
            />
          </Form.Item>

          <Form.Item
            name="depositRate"
            label="保证金比例"
            rules={[{ required: true, message: '请输入保证金比例' }]}
          >
            <InputNumber
              min={0}
              max={1}
              step={0.1}
              precision={1}
              formatter={(value) => `${Number(value) * 100}%`}
              parser={(value): 0 | 1 => {
                const parsed = value ? Number(value.replace('%', '')) / 100 : 0;
                return parsed > 1 ? 1 : (parsed < 0 ? 0 : parsed as 0 | 1);
              }}
            />
          </Form.Item>

          <Form.Item
            name="minTradeWeight"
            label="最小交易量"
            rules={[{ required: true, message: '请输入最小交易量' }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
              placeholder="请输入"
              addonAfter="吨"
            />
          </Form.Item>

          <Form.Item
            name="remark"
            label="备注"
          >
            <Input.TextArea rows={4} placeholder="请输入" />
          </Form.Item>

          <Form.Item
            name="rightWarehouseName"
            label="交收仓库"
            rules={[{ required: true, message: '请输入交收仓库' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListingList;
