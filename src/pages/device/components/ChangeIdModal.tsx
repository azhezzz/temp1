import React, { useState } from 'react';

import { useDispatch } from 'umi';
import { Modal, Alert, Form, Input, Button } from 'antd';

interface IProps {
  visible: boolean;
  onCancel: () => void;
  id: string;
  loading?: boolean;
}

export const ChangeIdModal = ({ visible, onCancel, id, loading }: IProps) => {
  const dispatch = useDispatch();
  const [alertConfig, setAlertConfig] = useState<any>({});
  const onFinish = () => {
    dispatch({
      type: 'device/changeId',
      payload: {
        id,
        onSuccess: () =>
          setAlertConfig({
            ...alertConfig,
            [id]: {
              type: 'success',
              description:
                'Error Description Error Description Error Description Error Description Error Description Error Description',
            },
          }),
        onFail: () =>
          setAlertConfig({
            ...alertConfig,
            [id]: {
              type: 'error',
              description:
                'Error Description Error Description Error Description Error Description Error Description Error Description',
            },
          }),
      },
    });
  };

  return (
    <Modal
      title="修改ID"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      closable={!loading}
      keyboard={!loading}
      maskClosable={!loading}
      destroyOnClose
    >
      <Alert
        message={`准备修改ID:${id}`}
        {...alertConfig[id]}
        style={{ marginBottom: 20, transition: 'height 0.5s' }}
      />
      <Form name="change_id" onFinish={onFinish} preserve={false}>
        <Form.Item
          name="id"
          rules={[{ required: true, message: '请输入新ID' }]}
        >
          <Input placeholder="输入新ID" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: '0 auto', display: 'inherit' }}
          form="change_id"
          loading={loading}
        >
          确定
        </Button>
      </Form>
    </Modal>
  );
};
