import React, { useState } from 'react';
import { Table, Tag, Space, Button, Input, Modal, Descriptions, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ContractItem } from '../../../types/contract';
import { mockMyContracts } from '../../../mock/contractData';

interface MyContractItem extends ContractItem {
  role: '买方' | '卖方';
}

const MyContractList: React.FC = () => {
  const [data, setData] = useState<MyContractItem[]>(mockMyContracts as MyContractItem[]);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<MyContractItem | null>(null);

  const handleView = (record: MyContractItem) => {
    setCurrentItem(record);
    setViewModalVisible(true);
  };

  const columns: ColumnsType<MyContractItem> = [
    {
      title: '合同编号',
      dataIndex: 'contractNo',
      key: 'contractNo',
      fixed: 'left',
      width: 120,
    },
    {
      title: '我的角色',
      dataIndex: 'role',
      key: 'role',
      width: 100,
      render: (role: string) => (
        <Tag color={role === '买方' ? 'blue' : 'green'}>{role}</Tag>
      ),
    },
    {
      title: '合同类型',
      dataIndex: 'contractType',
      key: 'contractType',
      width: 100,
    },
    {
      title: '合同状态',
      dataIndex: 'contractStatus',
      key: 'contractStatus',
      width: 100,
      render: (status: string) => {
        const colorMap: { [key: string]: string } = {
          '执行中': 'processing',
          '待审核': 'warning',
          '已完成': 'success',
          '已终止': 'error',
        };
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
      },
    },
    {
      title: '签订日期',
      dataIndex: 'signDate',
      key: 'signDate',
      width: 120,
    },
    {
      title: '对方单位',
      key: 'counterparty',
      width: 200,
      render: (_, record) => record.role === '买方' ? record.partyA : record.partyB,
    },
    {
      title: '合同总金额',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 120,
      render: (amount: number) => `¥${amount.toLocaleString()}`,
    },
    {
      title: '已支付金额',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
      width: 120,
      render: (amount: number) => `¥${amount.toLocaleString()}`,
    },
    {
      title: '剩余金额',
      dataIndex: 'remainingAmount',
      key: 'remainingAmount',
      width: 120,
      render: (amount: number) => `¥${amount.toLocaleString()}`,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleView(record)}>查看</Button>
          {record.contractStatus === '执行中' && (
            <>
              <Button type="link">付款</Button>
              <Button type="link">确认收货</Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Space wrap>
          <Input placeholder="合同编号" style={{ width: 150 }} />
          <Input placeholder="对方单位" style={{ width: 150 }} />
          <DatePicker.RangePicker style={{ width: 300 }} />
          <Button type="primary">查询</Button>
          <Button>重置</Button>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        scroll={{ x: 1500 }}
        pagination={{
          total: data.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />

      <Modal
        title="合同详情"
        open={viewModalVisible}
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={800}
      >
        {currentItem && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="合同编号">{currentItem.contractNo}</Descriptions.Item>
            <Descriptions.Item label="我的角色">
              <Tag color={currentItem.role === '买方' ? 'blue' : 'green'}>
                {currentItem.role}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="合同类型">{currentItem.contractType}</Descriptions.Item>
            <Descriptions.Item label="合同状态">
              <Tag color={
                currentItem.contractStatus === '执行中' ? 'processing' :
                currentItem.contractStatus === '待审核' ? 'warning' :
                currentItem.contractStatus === '已完成' ? 'success' : 'error'
              }>
                {currentItem.contractStatus}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="签订日期">{currentItem.signDate}</Descriptions.Item>
            <Descriptions.Item label="生效日期">{currentItem.effectiveDate}</Descriptions.Item>
            <Descriptions.Item label="到期日期">{currentItem.expiryDate}</Descriptions.Item>
            <Descriptions.Item label="对方单位">
              {currentItem.role === '买方' ? currentItem.partyA : currentItem.partyB}
            </Descriptions.Item>
            <Descriptions.Item label="合同总金额">¥{currentItem.totalAmount.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="已支付金额">¥{currentItem.paidAmount.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="剩余金额">¥{currentItem.remainingAmount.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="支付条款" span={2}>{currentItem.paymentTerms}</Descriptions.Item>
            <Descriptions.Item label="交付条款" span={2}>{currentItem.deliveryTerms}</Descriptions.Item>
            <Descriptions.Item label="产品明细" span={2}>
              <Table
                dataSource={currentItem.productDetails}
                columns={[
                  { title: '产品名称', dataIndex: 'productName' },
                  { title: '规格', dataIndex: 'specification' },
                  { title: '数量', dataIndex: 'quantity' },
                  { title: '单价', dataIndex: 'unitPrice', render: (price: number) => `¥${price}` },
                ]}
                pagination={false}
                size="small"
              />
            </Descriptions.Item>
            <Descriptions.Item label="备注" span={2}>{currentItem.remarks}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default MyContractList;
