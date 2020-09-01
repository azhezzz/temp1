import React, { useState, FC, memo } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeFilled,
} from '@ant-design/icons';
import { NavLink, useLocation } from 'umi';
import pathToRegexp from 'path-to-regexp';

import logo from '@/asserts/logo.png';
import RightRender from './rightRender';

import './styles.less';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

// @ts-ignore
const appName = APP_NAME;

const meunList = [
  {
    to: '/device/panel',
    name: '控制面板',
  },
  {
    to: '/device/meter',
    name: '计量器',
  },
  {
    to: '/device/reader',
    name: '识别器',
  },
  {
    to: '/device/doorsensor',
    name: '门传感器',
  },
];

const Layouts1: FC = props => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const toggle = () => setCollapsed(v => !v);
  const selectedKey = String(
    meunList.findIndex(item => pathToRegexp(item.to).exec(pathname)),
  );

  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="logo">
          <img src={logo} alt="" width={50} />

          {collapsed ? null : <span>{appName}</span>}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={['device']}
        >
          <SubMenu key="device" title="设备信息" icon={<HomeFilled />}>
            {meunList.map((item, index) => (
              <Menu.Item key={String(index)}>
                <NavLink to={item.to}>{item.name}</NavLink>
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            { className: 'trigger', onClick: toggle },
          )}
          <RightRender />
        </Header>
        <Content className="site-layout-background">{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default memo(Layouts1);
