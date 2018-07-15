import React, { Component } from 'react'
import { Table } from '../../../../components/Ui'

class ProductTable extends Component {
  render() {
    // const { data, onSelected } = this.props;
    const fetchProps = {
      // fetch: {
      //     url: '/tn/users/users',
      //     data,
      // },
      // selection: {
      //     isOpen: true,
      //     onSelected,
      // },
      columns: [
        { title: '用户名', dataIndex: 'nickname'},
        { title: '年龄', dataIndex: 'age', sorter: true},
        { title: '性别', dataIndex: 'sex'},
        { title: '手机号', dataIndex: 'phonenum'},
        { title: '邮箱', dataIndex: 'email' },
        { title: '姓名', dataIndex: 'realname'},
        { title: '公司', dataIndex: 'company' },
        { title: '教育', dataIndex: 'education' },
        { title: '住址', dataIndex: 'city' },
        { title: '创建时间', dataIndex: 'create_time', sorter: true },
        { title: '更新时间', dataIndex: 'last_time', sorter: true },
      ],
    }
    return (
      <Table
          {...fetchProps}
      />
    )
  }
}

ProductTable.defaultProps = {
    data: {},
}

export default ProductTable