import React, { Component } from 'react'
import { Card, Icon, Avatar, Table, Row, Col, Tooltip, Switch, Button, Modal, message } from 'antd'
import { api, err } from '../../../utils'

const { Meta } = Card

/**
 * 文件重复对比 删除
 */
export default class VideoRepeat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allRepeat: [], // 所有重复数据
      firstRepeat: [], // 首个重复数据
      deleteIds: [], // 删除的文件id集合
      deleteItem: [], // 删除名称集合
      visible: false,
      pagination: {},
    }
  }
  componentDidMount = () => {
    this.fetch()
  }
  // 字符串超长截取
  handleChangeString = (value) => {
    if (value) {
      if (value.length > 19) {
        let str = value.slice(0, 16)
        str += "..."
        return str
      } else {
        return value
      }
    }
  }
  // 打开所有文件
  handleOpenAll = () => {
    const { firstRepeat } = this.state
    // 路径数组
    const ids = []
    firstRepeat.forEach((v, k) => {
      ids.push(v.id)
    })
    api.get("/hiVideo/openVideoById/" + ids.join(","))
  }
  // 打开单个文件
  handleOpen = (id) => {
    api.get("/file/open", { ids: id})
      .catch(err)
  }
  // 删除切换
  handleChooseDelete = (boolean, id) => {
    const { deleteIds } = this.state
    const tempIds = deleteIds
    // true 删除选定
    if (boolean) {
      tempIds.push(id)
    } else {
      const index = tempIds.indexOf(id)
      if (index > -1) {
        tempIds.splice(index, 1)
      }
    }
    this.setState({
      deleteIds: tempIds,
     })
  }
  // 模态框
  showModal = () => {
    const { deleteIds, firstRepeat } = this.state
    const deleteItem = []
    // console.log("删除id集合：", deleteIds)
    firstRepeat.forEach((v, k) => {
      if (deleteIds.indexOf(v.id) > -1) {
        deleteItem.push(v.fileName)
      }
    })
    this.setState({
      visible: true,
      deleteItem,
    });
  }
  // 确认删除
  handleOk = (e) => {
    const { deleteIds } = this.state
    api.post("/hiVideo/logicDeleteVideos/" + deleteIds.join(","))
      .then((value) => {
        if (value) {
          message.info("删除成功!")
        }
        this.fetch(1)
        const pagination = { ...this.state.pagination }
        pagination.current = 1
        this.setState({
          pagination,
          visible: false,
          deleteIds: [], // 清空id
        });
      })
      .catch(err)
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch(pager.current)
  };
  fetch = (current) => {
    const { pageSize = 10 } = this.state.pagination
    api.get("/hiVideo/getRepeat", {start: current, length: pageSize})
      .then((value) => {
        const pagination = { ...this.state.pagination };
        pagination.total = value.data.total;
        this.setState({
            allRepeat: value.data.rows,
            pagination,
        })
      })
      api.get("/hiVideo/getFirstRepeat")
      .then((value) => {
        this.setState({
            firstRepeat: value.data,
        })
      })
  }
  render() {
    const { allRepeat, firstRepeat, visible, deleteItem, pagination } = this.state
    const columns = [{
      title: '文件名',
      dataIndex: 'fileName',
      key: 'fileName',
      render: text => <a>{text}</a>,
    }, {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
    }, {
      title: '文件大小',
      width: 120,
      dataIndex: 'sizeMb',
      key: 'sizeMb',
      render: text => <span>{text.toFixed()} MB</span>,
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a className="ant-dropdown-link">
            More actions <Icon type="down" />
          </a>
        </span>
      ),
    }]
    return (
      <div>
        <Modal
          title="删除列表"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {
            deleteItem.map((v, k) => {
              return (
                <p key={k}>{v}</p>
              )
            })
          }
        </Modal>
        <Card
          title="重复验证"
          extra={
            <div>
              <Button type="primary" onClick={this.handleOpenAll} >打开全部</Button>
              <Button style={{ marginLeft: 12 }} onClick={this.showModal} >删除指定</Button>
            </div>}
        >
          <Row gutter={36}>
            {
              firstRepeat.map((v, k) => {
                return (
                  <Col xs={{ span: 8 }} style={{ marginTop: 24 }} key={v.id}>
                    <Card
                      // style={{ width: 300 }}
                      cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                      actions={[<Icon type="play-circle" onClick={() => this.handleOpen(v.id)} />,
                      <Icon type="edit" />,
                      <Icon type="ellipsis" />,
                      <Switch defaultChecked={false} checkedChildren="删除" unCheckedChildren="保留" onChange={(boolean) => this.handleChooseDelete(boolean, v.id)} />]}
                      // <MySwitch handleChooseDelete={this.handleChooseDelete} id={v.id} />]}
                    >
                      <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={
                          <Tooltip placement="topLeft" title={
                            <div>
                              <p>{v.file_name}</p>
                              <p>{v.path}</p>
                            </div>}
                          >
                            <p>{this.handleChangeString(v.file_name)}</p>
                            <p>{this.handleChangeString(v.path)}</p>
                          </Tooltip>
                        }
                        description={v.size_b}
                      />
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
        </Card>
        <Table columns={columns} dataSource={allRepeat} rowKey={record => record.id} pagination={pagination} onChange={this.handleTableChange} />
      </div>
    )
  }
}
