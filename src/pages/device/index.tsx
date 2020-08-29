import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector, DeviceModelState, Loading } from 'umi';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { buildColConfigs } from './colConfig';

import { ChangeIdModal } from './components/ChangeIdModal';
import { DetailInfoModal } from './components/DetailInfoModal';
import { UpdateFirmware } from './components/UpdateFirmware';
import { ErrorBoundary } from '@/components/ErrorBoundaries';

export default () => {
  const dispatch = useDispatch();
  // 模态框
  const [changeIdModalVisible, setChangeIdModalVisible] = useState(false);
  const [detailInfoModalVisible, setDetailInfoModalVisible] = useState(false);
  const [updateFirmwareModalVisible, setUpdateFirmwareModalVisible] = useState(
    false,
  );
  // 修改id
  const [id, setId] = useState('');
  // 详细信息
  const [details, setDetails] = useState<{
    record: any;
    config: ColumnProps<any>[];
  }>({
    record: {},
    config: [],
  });
  // 列表数据
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
  const closeChangeIdModal = useCallback(() => {
    setChangeIdModalVisible(false);
  }, []);

  const openDetailInfoModal = (
    record: any,
    config: ColumnProps<any>[],
  ) => () => {
    setDetails({ record, config });
    setDetailInfoModalVisible(true);
  };

  const closeDetailInfoModal = useCallback(() => {
    setDetailInfoModalVisible(false);
  }, []);

  const openUpdateFirmwareModal = (id: string) => () => {
    setUpdateFirmwareModalVisible(true);
  };
  const closeUpdateFirmwareModal = () => {
    setUpdateFirmwareModalVisible(false);
  };

  return (
    <ErrorBoundary>
      <div style={{ padding: 20 }}>
        <ErrorBoundary>
          <Table
            dataSource={dataSource}
            columns={buildColConfigs(
              type,
              openChangeIdModal,
              openDetailInfoModal,
              openUpdateFirmwareModal,
            )}
            scroll={{ x: true }}
            rowKey="id"
          />
        </ErrorBoundary>
        <ChangeIdModal
          visible={changeIdModalVisible}
          onCancel={closeChangeIdModal}
          loading={changeIdLoading}
          id={id}
        />
        <DetailInfoModal
          details={details}
          visible={detailInfoModalVisible}
          onCancel={closeDetailInfoModal}
        />
        <UpdateFirmware
          visible={updateFirmwareModalVisible}
          onCancel={closeUpdateFirmwareModal}
        />
      </div>
    </ErrorBoundary>
  );
};

const a = () => 1;
