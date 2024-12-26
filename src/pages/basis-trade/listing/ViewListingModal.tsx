import React from 'react';
import { Modal, Descriptions, Tag, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { ListingItem } from '../../../types/listing';

interface ViewListingModalProps {
  open: boolean;
  listing: ListingItem | null;
  onClose: () => void;
  onEdit?: () => void;
}

const ViewListingModal: React.FC<ViewListingModalProps> = ({ open, listing, onClose, onEdit }) => {
  if (!listing) return null;

  return (
    <Modal
      title="挂牌详情"
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="edit" type="primary" icon={<EditOutlined />} onClick={onEdit}>
          编辑
        </Button>,
        <Button key="close" onClick={onClose}>
          关闭
        </Button>
      ]}
      width={800}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="挂牌编号" span={2}>{listing.ginfoNumber}</Descriptions.Item>
        <Descriptions.Item label="挂牌日期">{new Date(listing.ginfoDate).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label="期货参考合约">{listing.mainPriceDemo}</Descriptions.Item>
        <Descriptions.Item label="品种">{listing.typeName}</Descriptions.Item>
        <Descriptions.Item label="品名">{listing.pnName}</Descriptions.Item>
        <Descriptions.Item label="钢种">{listing.goodsMateri}</Descriptions.Item>
        <Descriptions.Item label="规格">{listing.goodsSpec}</Descriptions.Item>
        <Descriptions.Item label="仓库">{listing.rightWarehouseName}</Descriptions.Item>
        <Descriptions.Item label="基差">{listing.jicha}</Descriptions.Item>
        <Descriptions.Item label="升贴水">{listing.priceUp}</Descriptions.Item>
        <Descriptions.Item label="挂牌量">{listing.hangWeight} 吨</Descriptions.Item>
        <Descriptions.Item label="单位数量">{listing.unitNumber}</Descriptions.Item>
        <Descriptions.Item label="保证金比例">{listing.marginLevel}%</Descriptions.Item>
        <Descriptions.Item label="状态">
          <Tag color={listing.status === 'ACTIVE' ? 'green' : 'volcano'}>
            {listing.status === 'ACTIVE' ? '活跃' : '已关闭'}
          </Tag>
        </Descriptions.Item>
        {listing.createdAt && (
          <Descriptions.Item label="创建时间" span={2}>
            {new Date(listing.createdAt).toLocaleString()}
          </Descriptions.Item>
        )}
        {listing.updatedAt && (
          <Descriptions.Item label="更新时间" span={2}>
            {new Date(listing.updatedAt).toLocaleString()}
          </Descriptions.Item>
        )}
        <Descriptions.Item label="备注" span={2}>
          {listing.remark || '无'}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ViewListingModal;
