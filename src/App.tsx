import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  ShopOutlined,
  FileTextOutlined,
  BankOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  UserOutlined
} from '@ant-design/icons';
import ListingList from './pages/basis-trade/listing/ListingList';
import WarehouseList from './pages/basis-trade/warehouse/WarehouseList';
import ContractList from './pages/basis-trade/contract/ContractList';
import OrderList from './pages/basis-trade/order/OrderList';
import PricingList from './pages/basis-trade/pricing/PricingList';
import MyContractList from './pages/basis-trade/my-contract/MyContractList';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('基础交易', 'basis-trade', <AppstoreOutlined />, [
    getItem(<Link to="/listing">挂牌管理</Link>, 'listing'),
    getItem(<Link to="/warehouse">仓库管理</Link>, 'warehouse'),
    getItem(<Link to="/contract">合同管理</Link>, 'contract'),
  ]),
  getItem('客户模块', 'customer', <UserOutlined />, [
    getItem(<Link to="/customer/pricing">点价交易</Link>, 'pricing'),
    getItem(<Link to="/customer/delisting">摘牌记录</Link>, 'delisting'),
    getItem(<Link to="/customer/contracts">我的合同</Link>, 'my-contracts'),
  ]),
];

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // 根据当前路径获取选中的菜单项
  const getSelectedKeys = () => {
    if (currentPath.includes('/customer/pricing')) return ['pricing'];
    if (currentPath.includes('/customer/delisting')) return ['delisting'];
    if (currentPath.includes('/customer/contracts')) return ['my-contracts'];
    if (currentPath.includes('/listing')) return ['listing'];
    if (currentPath.includes('/warehouse')) return ['warehouse'];
    if (currentPath.includes('/contract')) return ['contract'];
    return ['listing'];
  };

  // 根据当前路径获取展开的子菜单
  const getOpenKeys = () => {
    if (currentPath.includes('/customer')) return ['customer'];
    if (currentPath.includes('/basis-trade')) return ['basis-trade'];
    return ['basis-trade'];
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        padding: 0, 
        display: 'flex', 
        alignItems: 'center',
        position: 'fixed',
        width: '100%',
        zIndex: 1,
      }}>
        <div style={{ 
          width: collapsed ? 80 : 200, 
          transition: 'width 0.3s',
          textAlign: 'center',
        }}>
          <h1 className="logo-text" style={{ 
            margin: 0,
            fontSize: collapsed ? '14px' : '18px',
            lineHeight: '64px',
            fontWeight: 600
          }}>
            {collapsed ? <ThunderboltOutlined /> : '交易管理系统'}
          </h1>
        </div>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
          style: { 
            padding: '0 24px',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#fff'
          }
        })}
      </Header>
      <Layout style={{ marginTop: 64 }}>
        <Sider 
          width={200} 
          collapsed={collapsed}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 64,
            bottom: 0,
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={getSelectedKeys()}
            defaultOpenKeys={getOpenKeys()}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
          />
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.3s' }}>
          <Content 
            style={{ 
              margin: '24px 16px', 
              padding: 24, 
              minHeight: 280,
              overflow: 'auto',  
              height: 'calc(100vh - 112px)'  
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
          colorBgContainer: '#ffffff',
          colorBgLayout: '#f0f2f5',
          colorText: 'rgba(0, 0, 0, 0.85)',
          colorTextSecondary: 'rgba(0, 0, 0, 0.45)',
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/listing" />} />
            <Route path="listing" element={<ListingList />} />
            <Route path="warehouse" element={<WarehouseList />} />
            <Route path="contract" element={<ContractList />} />
            <Route path="customer">
              <Route path="pricing" element={<PricingList />} />
              <Route path="delisting" element={<OrderList />} />
              <Route path="contracts" element={<MyContractList />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
