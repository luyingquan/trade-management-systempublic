import React from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  AppstoreOutlined, 
  ShoppingCartOutlined, 
  BankOutlined,
  UserOutlined,
  TransactionOutlined,
  HistoryOutlined,
  FileTextOutlined
} from '@ant-design/icons';

const SideMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: 'basis-trade',
      icon: <AppstoreOutlined />,
      label: '基础交易',
      children: [
        {
          key: 'listing',
          label: '挂牌管理',
          onClick: () => navigate('/listing'),
        },
        {
          key: 'warehouse',
          label: '仓库管理',
          onClick: () => navigate('/warehouse'),
        },
        {
          key: 'contract',
          label: '合同管理',
          onClick: () => navigate('/contract'),
        },
      ],
    },
    {
      key: 'customer',
      icon: <UserOutlined />,
      label: '客户模块',
      children: [
        {
          key: 'pricing',
          icon: <TransactionOutlined />,
          label: '点价交易',
          onClick: () => navigate('/customer/pricing'),
        },
        {
          key: 'delisting',
          icon: <HistoryOutlined />,
          label: '摘牌记录',
          onClick: () => navigate('/customer/delisting'),
        },
        {
          key: 'my-contracts',
          icon: <FileTextOutlined />,
          label: '我的合同',
          onClick: () => navigate('/customer/contracts'),
        },
      ],
    },
  ];

  // 获取当前选中的菜单项
  const getSelectedKeys = () => {
    const pathname = location.pathname;
    if (pathname.startsWith('/listing')) return ['listing'];
    if (pathname.startsWith('/warehouse')) return ['warehouse'];
    if (pathname.startsWith('/contract')) return ['contract'];
    if (pathname.startsWith('/customer/pricing')) return ['pricing'];
    if (pathname.startsWith('/customer/delisting')) return ['delisting'];
    if (pathname.startsWith('/customer/contracts')) return ['my-contracts'];
    return [];
  };

  // 获取默认展开的菜单
  const getDefaultOpenKeys = () => {
    const pathname = location.pathname;
    if (pathname.startsWith('/customer/')) return ['customer'];
    return ['basis-trade'];
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={getSelectedKeys()}
      defaultOpenKeys={getDefaultOpenKeys()}
      items={menuItems}
    />
  );
};

export default SideMenu;
