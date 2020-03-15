import React from 'react'
import Table from 'antd/es/table';
import Action from './action'
import Modal from 'antd/lib/modal'
import { ColumnProps } from 'antd/lib/table';
import { observer, inject } from 'mobx-react';
import ShipmentStore from './store'
import Filter from './filter'
import ShowInfo from './showInfo'
import { PAGE_SIZE } from '../../constants/constant'
import { OrderType } from '../../config/enum'
import EditCell from '../../componenets/Table/editCell'
import { toJS } from 'mobx';

interface ShipmentListProps {
  shipmentStore?: ShipmentStore;
}

class ShipmentTable extends Table<Shipment>{ }

@inject("shipmentStore")
@observer
class ShipmentList extends React.Component<ShipmentListProps>  {
  columns: ColumnProps<Shipment>[];
  dataSource: Shipment[];
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        sorter: true,
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        render: (text, record) => <EditCell record={record} text={text}  />
      },
      {
        title: 'Mode',
        dataIndex: 'mode',
        key: 'mode',
        sorter: true,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        sorter: true,
      },
      {
        title: 'Destination',
        dataIndex: 'destination',
        key: 'destination',
        sorter: true,
      },
      {
        title: 'Origin',
        dataIndex: 'origin',
        key: 'origin',
        sorter: true,
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        sorter: true,
      },

      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: true,
      },

      {
        title: 'UserId',
        dataIndex: 'userId',
        key: 'userId',
        sorter: true,
      },
      {
        title: 'Action',
        key: 'action',
        render: (record, text) => <Action onShowClick={() => this.handleShowClick(record.id)} onEditClick={() => this.handleEditClick(record.id)} />,
        width: '150px'
      },
    ];;
  }

  handleEditClick = (recordId) => this.props.shipmentStore.setEditingRowId(recordId)

  handleShowClick = (recordId) => this.props.shipmentStore.showInfo(recordId)

  componentDidMount = () => this.props.shipmentStore.init()

  handleOnChange = (pagination, filters, sorter) => {
    const { shipmentStore } = this.props;
    const search: searchParam = { pageIndex: pagination.current, sortField: sorter.field, sortOrder: sorter.order === 'ascend' ? OrderType.asc : 'descend' ? OrderType.desc : '' }
    shipmentStore.sortTable(search)
  }
  
 

  render() {
    const { requestData, pageIndex, loading, modalVisible, total } = this.props.shipmentStore;

    return <div className="table" >
      <Filter  />
      <ShipmentTable
        rowKey={record => record.id}
        dataSource={toJS(requestData)}
        bordered
        loading={loading}
        columns={this.columns}
        onChange={this.handleOnChange}
        pagination={{
          pageSize: PAGE_SIZE,
          current: pageIndex,
          total: total,
          position: 'top'
        }}
      />
      <Modal
        title="Ship Detail"
        visible={modalVisible}
        onOk={() => this.props.shipmentStore.setModalVisibility(false)}
        onCancel={() => this.props.shipmentStore.setModalVisibility(false)}
      >
        <ShowInfo />
      </Modal>
    </div>

  }
}
export default ShipmentList;
