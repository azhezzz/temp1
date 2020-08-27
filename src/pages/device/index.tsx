import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, DeviceModelState } from 'umi';
import { Table, Input, Form, Button, Modal, Alert } from 'antd';
import { buildColConfigs } from './colConfig';

export default () => {
  const dispatch = useDispatch();
  const [changeIdModalVisible, setChangeIdModalVisible] = useState(false);
  const [id, setId] = useState('');
  const { dataSource, type } = useSelector(
    ({ device }: { device: DeviceModelState }) => ({
      dataSource: device.dataSrouce[device.type],
      type: device.type,
    }),
  );

  useEffect(() => {
    dispatch({ type: 'device/getList' });
  }, []);

  const openChangeIdModal = (id: string) => () => {
    setId(id);
    setChangeIdModalVisible(true);
  };
  const closeChangeIdModal = () => {
    setChangeIdModalVisible(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Table
        dataSource={dataSource}
        columns={buildColConfigs(type, openChangeIdModal)}
        rowKey="key"
      />
      <ChangeIdModal
        visible={changeIdModalVisible}
        onCancel={closeChangeIdModal}
        id={id}
      />
    </div>
  );
};

const ChangeIdModal = ({
  visible,
  onCancel,
  id,
}: {
  visible: boolean;
  onCancel: () => void;
  id: string;
}) => {
  const [alertConfig, setAlertConfig] = useState<any>({});
  const onFinish = () => {
    setAlertConfig({
      ...alertConfig,
      [id]: {
        type: 'success',
        description:
          'Error Description Error Description Error Description Error Description Error Description Error Description',
      },
    });
  };

  return (
    <Modal
      title="修改ID"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      keyboard={false}
      maskClosable={false}
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
        >
          确定
        </Button>
      </Form>
    </Modal>
  );
};
