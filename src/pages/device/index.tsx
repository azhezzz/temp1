import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, DeviceModelState, Loading } from 'umi';
import { Table } from 'antd';
import { buildColConfigs } from './colConfig';

import { ChangeIdModal } from './components/ChangeIdModal';
import { DetailInfoModal } from './components/DetailInfoModal';
import { UpdateFirmware } from './components/UpdateFirmware';

export default () => {
  const dispatch = useDispatch();
  const [changeIdModalVisible, setChangeIdModalVisible] = useState(false);
  const [detailInfoModalVisible, setDetailInfoModalVisible] = useState(false);
  const [updateFirmwareModalVisible, setUpdateFirmwareModalVisible] = useState(
    false,
  );

  const [id, setId] = useState('');
  const { dataSource, type, changeIdLoading } = useSelector(
    ({ device, loading }: { device: DeviceModelState; loading: Loading }) => ({
      dataSource: device.dataSrouce[device.type],
      type: device.type,
      changeIdLoading: loading.effects['device/changeId'],
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

  const openDetailInfoModal = (id: string) => () => {
    setDetailInfoModalVisible(true);
  };
  const closeDetailInfoModal = () => {
    setDetailInfoModalVisible(false);
  };

  const openUpdateFirmwareModal = (id: string) => () => {
    setUpdateFirmwareModalVisible(true);
  };
  const closeUpdateFirmwareModal = () => {
    setUpdateFirmwareModalVisible(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Table
        dataSource={dataSource}
        columns={buildColConfigs(
          type,
          openChangeIdModal,
          openDetailInfoModal,
          openUpdateFirmwareModal,
        )}
        rowKey="key"
      />
      <ChangeIdModal
        visible={changeIdModalVisible}
        onCancel={closeChangeIdModal}
        loading={changeIdLoading}
        id={id}
      />
      <DetailInfoModal
        visible={detailInfoModalVisible}
        onCancel={closeDetailInfoModal}
      />
      <UpdateFirmware
        visible={updateFirmwareModalVisible}
        onCancel={closeUpdateFirmwareModal}
      />
    </div>
  );
};
