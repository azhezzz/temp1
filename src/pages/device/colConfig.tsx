import React from 'react';
import { DeviceInfoType } from './constant';
import { ColumnProps } from 'antd/lib/table';
import { Space } from 'antd';

export const colConfigs: {
  [keyof in DeviceInfoType]: ColumnProps<any>[];
} = {
  [DeviceInfoType.PANEL]: [{ title: '名字', dataIndex: 'name' }],
  [DeviceInfoType.DOOR]: [],
  [DeviceInfoType.METER]: [],
  [DeviceInfoType.READER]: [],
};

export const buildColConfigs = (
  type: DeviceInfoType,
  openChangeIdModal: (id: string) => () => void,
) => {
  if (type === DeviceInfoType.PANEL) {
    return colConfigs[type].concat([
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Space size="middle" style={{ color: 'blue' }}>
            <span
              style={{ cursor: 'pointer' }}
              onClick={openChangeIdModal(record.name)}
            >
              change {record.name}
            </span>
            <span>Delete</span>
          </Space>
        ),
      },
    ]);
  }
  return colConfigs[type];
};
