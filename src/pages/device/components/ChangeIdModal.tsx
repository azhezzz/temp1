import React, { useState, memo } from 'react';

import { useDispatch } from 'umi';
import { Modal, Alert, Form, Input, Button } from 'antd';
import dayjs from 'dayjs';

interface IProps {
  visible: boolean;
  onCancel?: () => void;
  id: string;
  loading?: boolean;
}

export const ChangeIdModal = memo(
  ({ visible, onCancel, id, loading }: IProps) => {
    const dispatch = useDispatch();
    const [alertConfig, setAlertConfig] = useState<any>({});
    const onFinish = (values: any) => {
      dispatch({
        type: 'device/changeId',
        payload: {
          old_id: id,
          new_id: values.new_id,
          onSuccess: (oldId: string, newId: string) =>
            setAlertConfig({
              ...alertConfig,
              [id]: {
                type: 'success',
                message: `修改成功 ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
                description: `id: ${oldId} 修改为 ${newId}`,
              },
            }),
          onFail: (errMsg: any) =>
            setAlertConfig({
              ...alertConfig,
              [id]: {
                type: 'error',
                message: `修改失败 ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
                description: `${errMsg || '未知错误'}`,
              },
            }),
        },
      });
    };

    return (
      <Modal
        title={`修改设备id: ${id}`}
        visible={visible}
        onCancel={onCancel}
        footer={null}
        closable={!loading}
        keyboard={!loading}
        maskClosable={!loading}
        destroyOnClose
      >
        <Alert
          showIcon
          message="请输入新id进行修改"
          {...alertConfig[id]}
          style={{ marginBottom: 20 }}
        />
        <Form
          name="change_id"
          onFinish={onFinish}
          preserve={false}
          colon={false}
        >
          <Form.Item
            name="new_id"
            rules={[
              { required: true, message: '请输入新id' },
              {
                validator: (rule, value) => {
                  if (String(value) === String(id)) {
                    return Promise.reject('与原ID一样');
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="新id" />
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
  },
);
