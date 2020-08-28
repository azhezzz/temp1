import React, { useCallback, useMemo, useState, memo } from 'react';
import { Avatar, Menu, Dropdown, Modal, Form, Input, Button } from 'antd';
import { useModel, history, useDispatch, useSelector, Loading } from 'umi';
import { errorBoundary } from '@/components/ErrorBoundaries';

export default () => <RightRender />;

const RightRender = () => {
  const [visible, setVisible] = useState(false);

  const loading = useSelector(
    ({ loading }: { loading: Loading }) =>
      loading.effects['user/changePassword'],
  );

  const logout = useCallback(async () => {
    globalThis?.localStorage?.clear();
    globalThis?.sessionStorage?.clear();
    history.push('/login');
  }, []);

  const openModal = () => setVisible(true);
  const closeModal = useCallback(() => setVisible(false), []);

  const menu = useMemo(
    () => (
      <Menu>
        <Menu.Item onClick={openModal}>修改密码</Menu.Item>
        <Menu.Item onClick={logout}>退出登陆</Menu.Item>
      </Menu>
    ),
    [],
  );
  return (
    <>
      <Dropdown overlay={menu} placement="bottomLeft" arrow>
        <Avatar
          style={{
            marginRight: 10,
            cursor: 'pointer',
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          }}
          size="large"
        >
          我
        </Avatar>
      </Dropdown>
      <ChangePasswordModal
        visible={visible}
        onCancel={closeModal}
        loading={loading}
      />
    </>
  );
};

const ChangePasswordModal = errorBoundary(
  memo(
    ({
      visible,
      onCancel,
      loading,
    }: {
      visible: boolean;
      loading?: boolean;
      onCancel: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    }) => {
      const dispatch = useDispatch();
      const onFinish = (values: any): void => {
        dispatch({ type: `user/changePassword`, payload: values });
      };
      return (
        <Modal
          title="修改密码"
          visible={visible}
          onCancel={onCancel}
          footer={null}
          closable={!loading}
          keyboard={!loading}
          maskClosable={!loading}
        >
          <Form
            name="change_password"
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: 350, margin: '0 auto' }}
          >
            <Form.Item
              name="user_name"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="old_password"
              label="原密码"
              rules={[{ required: true, message: '请输入原密码' }]}
            >
              <Input.Password placeholder="原密码" />
            </Form.Item>
            <Form.Item
              name="new_password"
              label="新密码"
              rules={[{ required: true, message: '请输入新密码' }]}
            >
              <Input.Password placeholder="新密码" />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="确认新密码"
              dependencies={['new_password']}
              rules={[
                { required: true, message: '请确认密码' },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次密码不一致');
                  },
                }),
              ]}
            >
              <Input.Password placeholder="确认新密码" />
            </Form.Item>
          </Form>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            style={{ margin: '0 auto', display: 'inherit' }}
            form="change_password"
          >
            确定
          </Button>
        </Modal>
      );
    },
  ),
);
