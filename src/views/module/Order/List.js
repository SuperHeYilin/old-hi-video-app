import React, { Component } from 'react'
import { Table, Badge, Menu, Dropdown, Icon, } from 'antd'

const menu = (
  <Menu>
    <Menu.Item>
      删除
    </Menu.Item>
    <Menu.Item>
      更新
    </Menu.Item>
  </Menu>
)

function NestedTable() {
  const expandedRowRender = () => {
    const columns = [
      { title: '日期', dataIndex: 'date', key: 'date' },
      { title: '景区', dataIndex: 'name', key: 'name' },
      { title: '状态', key: 'state', render: () => <span><Badge status="success" />以下架</span> },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span className="table-operation">
            <a href="#">Pause</a>
            <a href="#">Stop</a>
            <Dropdown overlay={menu}>
              <a href="#">
                More <Icon type="down" />
              </a>
            </Dropdown>
          </span>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: '金佛山',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '分销商', dataIndex: 'platform', key: 'platform' },
    { title: '购票方式', dataIndex: 'version', key: 'version' },
    { title: '价格', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: '票务类型', dataIndex: 'creator', key: 'creator' },
    { title: '购票时间', dataIndex: 'createdAt', key: 'createdAt' },
    { title: '操作', key: 'operation', render: () => <a href="#">查看</a> },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: '张三',
      platform: '携程',
      version: '线下',
      upgradeNum: '99.8￥',
      creator: '成人',
      createdAt: '2014-12-24 23:12:00',
    });
  }

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandedRowRender={expandedRowRender}
      dataSource={data}
    />
  );
}

export default NestedTable