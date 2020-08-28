import React, { memo } from 'react';
import { ColumnProps } from 'antd/lib/table';

import { Modal, Descriptions, Badge } from 'antd';

interface IProps {
  visible: boolean;
  onCancel: () => void;
  details: { record: any; config: ColumnProps<any>[] };
}

export const DetailInfoModal = memo(
  ({ visible, onCancel, details }: IProps) => {
    const { record = {}, config = [] } = details;
    return (
      <Modal
        title="设备详情"
        visible={visible}
        onCancel={onCancel}
        footer={null}
        width="90%"
        centered
      >
        <Descriptions
          bordered
          column={{ xxl: 5, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          {config.map((item, index) => (
            <Descriptions.Item label={item.title} key={item.key}>
              {item.render
                ? item.render(record[item.dataIndex as string], record, index)
                : record[item.dataIndex as string]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Modal>
    );
  },
);
