import React, { Component } from 'react'
import { Table, message, Popconfirm, } from 'antd'
import { api, err as apierr , } from '../../../../utils'



const confirm = (e)=> {
  console.log(e);
  message.info("该状态不能删除")
}

const cancel = (e)=> {
  console.log(e);
}

const click = () => {
  message.success('更新成功')
}

class NestedTable extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    const { data, handleDelete, handleReflush } = this.props
    let columns = [
          { title: '订单号', dataIndex: 'orderId', key: 'orderId' },
          { title: '票务信息', dataIndex: 'ticket_info', key: 'ticket_info' },
          { title: '取票人', dataIndex: 'name', key: 'name' },
          { title: '供应商/分销商', dataIndex: 'distributor', key: 'distributor' },
          { title: '状态', dataIndex: 'status', key: 'status' },
          { title: '时间', dataIndex: 'time', key: 'time' },
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (text,record) => (
              <span>
                <Popconfirm title="确认删除本条记录?" onConfirm={() => handleDelete(record.key)} onCancel={cancel} okText="是" cancelText="否">
                  <a>删除 </a>
                </Popconfirm>
                |
                <a onClick={handleReflush}> 更新</a>
              </span>
            ),
          },
        ];
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  }
  
}

export default NestedTable