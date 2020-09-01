import React from 'react';
import { useModel, useDispatch } from 'umi';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './styles.less';
import logo from '@/asserts/logo.png';

// @ts-ignore
const appName = APP_NAME;

export default () => {
  const { refresh } = useModel('@@initialState');
  const dispatch = useDispatch();
  const onFinish = (values: any): void => {
    dispatch({ type: `user/login`, payload: { values, refresh } });
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Form
        name="normal_login"
        className={styles['login-form']}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <div className={styles.title}>
          <img src={logo} alt="" width={50} />
          <span>{appName}</span>
        </div>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input
            prefix={<UserOutlined className={styles['site-form-item-icon']} />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            prefix={<LockOutlined className={styles['site-form-item-icon']} />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住我</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles['login-form-button']}
          >
            登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
