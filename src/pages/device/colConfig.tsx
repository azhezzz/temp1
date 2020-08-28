import React from 'react';
import { DeviceInfoType } from './constant';
import { ColumnProps } from 'antd/lib/table';
import { Space, Tag, Button } from 'antd';
import dayjs from 'dayjs';

export const buildColConfigs = (
  type: DeviceInfoType,
  openChangeIdModal: (id: string) => () => void,
  openDetailInfoModal: (record: any, config: ColumnProps<any>[]) => () => void,
  openUpdateFirmwareModal: (id: string) => () => void,
) =>
  colBaseConfigs[type].concat([
    {
      title: '详细信息',
      key: 'action',
      render: (text, record) => (
        <Button
          onClick={openDetailInfoModal(record, colDetailConfigs[type])}
          type="link"
          style={{ paddingLeft: 0 }}
        >
          详细信息
        </Button>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle" style={{ color: '#68b6dc' }}>
          <Button onClick={openChangeIdModal(record.id)} type="primary">
            修改设备id
          </Button>
          <Button onClick={openUpdateFirmwareModal(record.name)} disabled>
            更新固件
          </Button>
        </Space>
      ),
    },
  ]);

export const colDetailConfigs: {
  [keyof in DeviceInfoType]: (ColumnProps<any> & { isBase?: boolean })[];
} = {
  [DeviceInfoType.PANEL]: [
    { title: 'id', dataIndex: 'id', key: 'id', isBase: true },
    {
      title: '状态',
      dataIndex: 'online',
      key: 'online',
      sorter: (a, b) => a.online - b.online,
      render: text =>
        text ? <Tag color="green">在线</Tag> : <Tag color="red">离线</Tag>,
      isBase: true,
    },
    {
      title: '上次在线时间',
      dataIndex: 'lonline',
      key: 'lonline',
      sorter: (a, b) => dayjs(a.lonline).unix() - dayjs(b.lonline).unix(),
      render: text => dayjs(text).format('YYYY-MM-DD HH:mm'),
      isBase: true,
    },
    {
      title: '版本',
      dataIndex: 'ver',
      key: 'ver',
      sorter: (a, b) => a.ver - b.ver,
      isBase: true,
    },
    { title: '运行状态', dataIndex: 'rstate', key: 'rstate' },
    { title: 'ack', dataIndex: 'ack', key: 'ack' },
    { title: 'uuid', dataIndex: 'uuid', key: 'uuid' },
    { title: '错误码', dataIndex: 'err', key: 'err' },
    {
      title: '工况',
      dataIndex: 'wstate',
      key: 'wstate',
      sorter: (a, b) => a.wstate - b.wstate,
      isBase: true,
    },
    {
      title: '温度',
      dataIndex: 'temp',
      key: 'temp',
      sorter: (a, b) => a.temp - b.temp,
      isBase: true,
    },
    {
      title: '总重',
      dataIndex: 'weight',
      key: 'weight',
      sorter: (a, b) => a.weight - b.weight,
      isBase: true,
    },
    { title: '电导率', dataIndex: 'cond', key: 'cond' },
    { title: '流速', dataIndex: 'velo', key: 'velo' },
    { title: '组合键', dataIndex: 'combo', key: 'combo' },
    { title: '采集时长', dataIndex: 'dur', key: 'dur' },
    { title: '上次总重', dataIndex: 'lweight', key: 'lweight' },
    { title: '上次温度', dataIndex: 'ltemp', key: 'ltemp' },
    { title: '上次采集时长', dataIndex: 'ldur', key: 'ldur' },
    { title: '按键1', dataIndex: 'k1', key: 'k1' },
    { title: '按键2', dataIndex: 'k2', key: 'k2' },
    { title: '按键3', dataIndex: 'k3', key: 'k3' },
    { title: '按键4', dataIndex: 'k4', key: 'k4' },
    { title: '按键5', dataIndex: 'k5', key: 'k5' },
    { title: '按键6', dataIndex: 'k6', key: 'k6' },
    { title: '按键7', dataIndex: 'k7', key: 'k7' },
    { title: '按键8', dataIndex: 'k8', key: 'k8' },
  ],
  [DeviceInfoType.METER]: [
    { title: 'id', dataIndex: 'id', key: 'id', isBase: true },
    {
      title: '状态',
      dataIndex: 'online',
      key: 'online',
      sorter: (a, b) => a.online - b.online,
      render: text =>
        text ? <Tag color="green">在线</Tag> : <Tag color="red">离线</Tag>,
      isBase: true,
    },
    {
      title: '上次在线时间',
      dataIndex: 'lonline',
      key: 'lonline',
      sorter: (a, b) => dayjs(a.lonline).unix() - dayjs(b.lonline).unix(),
      render: text => dayjs(text).format('YYYY-MM-DD HH:mm'),
      isBase: true,
    },
    {
      title: '版本',
      dataIndex: 'ver',
      key: 'ver',
      sorter: (a, b) => a.ver - b.ver,
      isBase: true,
    },
    { title: '运行状态', dataIndex: 'rstate', key: 'rstate' },
    { title: 'ack', dataIndex: 'ack', key: 'ack' },
    { title: 'uuid', dataIndex: 'uuid', key: 'uuid' },
    { title: '硬件版本', dataIndex: 'hwver', key: 'hwver' },
    { title: '错误码', dataIndex: 'err', key: 'err' },
    {
      title: '工况',
      dataIndex: 'wstate',
      key: 'wstate',
      sorter: (a, b) => a.wstate - b.wstate,
      isBase: true,
    },
    {
      title: '温度',
      dataIndex: 'temp',
      key: 'temp',
      sorter: (a, b) => a.temp - b.temp,
      isBase: true,
    },
    {
      title: '总重',
      dataIndex: 'weight',
      key: 'weight',
      sorter: (a, b) => a.weight - b.weight,
      isBase: true,
    },
    { title: '电导率', dataIndex: 'cond', key: 'cond' },
    { title: '流速', dataIndex: 'velo', key: 'velo' },
    { title: 'D1', dataIndex: 'D0', key: 'D0' },
    { title: 'D2', dataIndex: 'D1', key: 'D1' },
    { title: 'D3', dataIndex: 'D2', key: 'D2' },
    { title: 'D4', dataIndex: 'D3', key: 'D3' },
    { title: 'D5', dataIndex: 'D4', key: 'D4' },
    { title: 'D0st', dataIndex: 'D0st', key: 'D0st' },
    { title: 'D1st', dataIndex: 'D1st', key: 'D1st' },
    { title: 'D2st', dataIndex: 'D2st', key: 'D2st' },
    { title: 'D3st', dataIndex: 'D3st', key: 'D3st' },
    { title: 'p0系数', dataIndex: 'p0scale', key: 'p0scale' },
    { title: '温度校准', dataIndex: 'tempdelta', key: 'tempdelta' },
    { title: 'D0init', dataIndex: 'D0init', key: 'D0init' },
    { title: 'D1init', dataIndex: 'D1init', key: 'D1init' },
    { title: 'D2init', dataIndex: 'D2init', key: 'D2init' },
    { title: 'D3init', dataIndex: 'D3init', key: 'D3init' },
    { title: 'D4init', dataIndex: 'D4init', key: 'D4init' },
    { title: 'D0min', dataIndex: 'D0min', key: 'D0min' },
    { title: 'D1min', dataIndex: 'D1min', key: 'D1min' },
    { title: 'D2min', dataIndex: 'D2min', key: 'D2min' },
    { title: 'D3min', dataIndex: 'D3min', key: 'D3min' },
    { title: 'CondA', dataIndex: 'CondA', key: 'CondA' },
    { title: 'CondB', dataIndex: 'CondB', key: 'CondB' },
  ],
  [DeviceInfoType.READER]: [
    { title: 'id', dataIndex: 'id', key: 'id', isBase: true },
    {
      title: '状态',
      dataIndex: 'online',
      key: 'online',
      sorter: (a, b) => a.online - b.online,
      render: text =>
        text ? <Tag color="green">在线</Tag> : <Tag color="red">离线</Tag>,
      isBase: true,
    },
    {
      title: '上次在线时间',
      dataIndex: 'lonline',
      key: 'lonline',
      sorter: (a, b) => dayjs(a.lonline).unix() - dayjs(b.lonline).unix(),
      render: text => dayjs(text).format('YYYY-MM-DD HH:mm'),
      isBase: true,
    },
    {
      title: '版本',
      dataIndex: 'ver',
      key: 'ver',
      sorter: (a, b) => a.ver - b.ver,
      isBase: true,
    },
    { title: '运行状态', dataIndex: 'rstate', key: 'rstate' },
    { title: 'ack', dataIndex: 'ack', key: 'ack' },
    { title: 'uuid', dataIndex: 'uuid', key: 'uuid' },
    {
      title: '工况',
      dataIndex: 'wstate',
      key: 'wstate',
      sorter: (a, b) => a.wstate - b.wstate,
      isBase: true,
    },
    {
      title: '牛号',
      dataIndex: 'cowid',
      key: 'cowid',
      isBase: true,
    },
  ],
  [DeviceInfoType.DOORSENSOR]: [
    { title: 'id', dataIndex: 'id', key: 'id', isBase: true },
    {
      title: '状态',
      dataIndex: 'online',
      key: 'online',
      sorter: (a, b) => a.online - b.online,
      render: text =>
        text ? <Tag color="green">在线</Tag> : <Tag color="red">离线</Tag>,
      isBase: true,
    },
    {
      title: '上次在线时间',
      dataIndex: 'lonline',
      key: 'lonline',
      sorter: (a, b) => dayjs(a.lonline).unix() - dayjs(b.lonline).unix(),
      render: text => dayjs(text).format('YYYY-MM-DD HH:mm'),
      isBase: true,
    },
    {
      title: '版本',
      dataIndex: 'ver',
      key: 'ver',
      sorter: (a, b) => a.ver - b.ver,
      isBase: true,
    },
    { title: '运行状态', dataIndex: 'rstate', key: 'rstate' },
    { title: 'ack', dataIndex: 'ack', key: 'ack' },
    { title: 'uuid', dataIndex: 'uuid', key: 'uuid' },
    {
      title: '入门状态',
      dataIndex: 'entrance',
      key: 'entrance',
      render: text =>
        text ? <Tag color="green">关闭</Tag> : <Tag color="red">打开</Tag>,
      sorter: (a, b) => a.entrance - b.entrance,
      isBase: true,
    },
    {
      title: '出门状态',
      dataIndex: 'exit',
      key: 'exit',
      render: text =>
        text ? <Tag color="green">关闭</Tag> : <Tag color="red">打开</Tag>,
      sorter: (a, b) => a.exit - b.exit,
      isBase: true,
    },
  ],
};

export const colBaseConfigs: {
  [keyof in DeviceInfoType]: ColumnProps<any>[];
} = {
  [DeviceInfoType.PANEL]: colDetailConfigs[DeviceInfoType.PANEL].filter(
    item => item.isBase,
  ),
  [DeviceInfoType.METER]: colDetailConfigs[DeviceInfoType.METER].filter(
    item => item.isBase,
  ),
  [DeviceInfoType.READER]: colDetailConfigs[DeviceInfoType.READER].filter(
    item => item.isBase,
  ),
  [DeviceInfoType.DOORSENSOR]: colDetailConfigs[
    DeviceInfoType.DOORSENSOR
  ].filter(item => item.isBase),
};
