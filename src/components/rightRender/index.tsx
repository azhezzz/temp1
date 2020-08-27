import React, { useCallback, useMemo, useState } from 'react';
import { Avatar, Menu, Dropdown, Modal, Form, Input, Button } from 'antd';
import { useModel, history, useDispatch } from 'umi';

export default () => <RightRender />;

const RightRender = () => {
  const { initialState, refresh } = useModel('@@initialState');
  const [visible, setVisible] = useState(false);
  const { name } = initialState;

  const logout = useCallback(async () => {
    globalThis?.localStorage?.clear();
    globalThis?.sessionStorage?.clear();
    await refresh();
    history.push('/login');
  }, []);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

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
        <Avatar style={{ marginRight: 10, cursor: 'pointer' }} size="large">
          {name}
        </Avatar>
      </Dropdown>
      <ChangePasswordModal visible={visible} onCancel={closeModal} />
    </>
  );
};

const ChangePasswordModal = ({
  visible,
  onCancel,
}: {
  visible: boolean;
  onCancel: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  const dispatch = useDispatch();
  const onFinish = (values: any): void => {
    console.log(values);
    onCancel();
    // dispatch({ type: `user/login`, payload: { values } });
  };

  return (
    <Modal title="修改密码" visible={visible} onCancel={onCancel} footer={null}>
      <Form
        name="change_password"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 350, margin: '0 auto' }}
      >
        <Form.Item
          name="password"
          label="新密码"
          rules={[{ required: true, message: '请输入新密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="确认新密码"
          dependencies={['password']}
          rules={[
            { required: true, message: '请输入新密码' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次密码不一致');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
      <Button
        type="primary"
        htmlType="submit"
        style={{ margin: '0 auto', display: 'inherit' }}
        form="change_password"
      >
        确定
      </Button>
    </Modal>
  );
};
