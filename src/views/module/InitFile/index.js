import React, { Component } from 'react'
import { Card, Row, Col, Select, Button, Icon, Modal, Input, Table, message, List, Tree } from 'antd'
import { api, err } from '../../../utils'

const Option = Select.Option
const TreeNode = Tree.TreeNode;

/**
 * 添加视频文件信息到数据库
 * 
 * @class CreateFile
 * @extends {Component}
 */
class CreateFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disk: '', // 选取磁盘路径
      diskNames: [], // 移动硬盘名称集合
      diskName: 'default', // 选取别名
      visible: false,
      newDisk: '', // 新建盘符名称
      pathInfo: ['无最新信息'], // 扫描完的路径信息
      directory: [],
    };
  }
  componentDidMount() {
    this.fetch()
  }
  fetch = () => {
    api.get("/file")
      .then((value) => {
        console.log(value)
        const {directory, diskInfo, videoInfo} = value
        this.setState({
          diskNames: diskInfo,
          directory,
          // pathInfo: videoInfo,
        })
      })
      .catch(err)
  }
  // 选择盘符
  handleChange = (value) => {
    this.setState({ diskName: value })
  }
  // 模态框
  handleShow = () => {
    this.setState({ visible: true })
  }
  // 选取磁盘
  handleChoose = (e) => {
    this.setState({ disk: e.target.value })
  }
  // 扫描注入
  handleInit = (e) => {
    const { disk, diskName } = this.state
    if (diskName === "default") {
      message.warn("文件夹别名不能为空")
      return
    }
    api.post("/disk/init", { path: disk, diskName })
      .then((value) => {
        message.info("操作成功")
        // console.log(value)
        // this.setState({ pathInfo: value })
        // this.fetch()
      })
      .catch(err)
  }
  // 更新缓存
  handleUpdate = () => {
    const { disk } = this.state
    if (!disk) {
      message.error("请输入绝对路径!")
      return
    }
    api.post("/disk/update", { path: disk })
      .then((value) => {
        message.info("操作成功")
        // console.log(value)
        // this.setState({ pathInfo: value })
        // this.fetch()
      })
      .catch(err)
  }

  // 创建文件夹别名
  handleOk = () => {
    const { newDisk } = this.state
    this.setState({
      visible: false,
      newDisk: '',
    });
    api.post("/disk", { diskName: newDisk })
      .then((value) => {
        console.log(value)
        this.fetch()
      })
      .catch(err)
  }
  handleCancel = () => {
    this.setState({
      newDisk: '',
      visible: false,
    });
  }
  // 新建盘符
  handleCreate = (e) => {
    this.setState({ newDisk: e.target.value })
  }

  render() {
    const { disk, diskNames, diskName, visible, newDisk, pathInfo } = this.state

    const loop = data => data.map((item) => {
      if (item.child && item.child.length) {
        return <TreeNode key={item.id} title={item.name}>{loop(item.child)}</TreeNode>;
      }
      return <TreeNode key={item.id} title={item.name} />;
    });
    const columns = [{
      title: 'id',
      dataIndex: 'id',
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
    }];
    return (
      <div>
        <Tree>
          {loop(this.state.directory)}
        </Tree>
        <Modal title="创建文件夹别名"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input value={newDisk} placeholder="别名" onChange={this.handleCreate} />
        </Modal>
        <Card
          title="扫描文件"
        >
          <Row>
            <Col>
              <Input value={disk} placeholder="文件夹路径" onChange={this.handleChoose} style={{ width: 220, marginRight: 24 }} size="large" />
              <Select value={diskName} style={{ width: 220 }} onChange={this.handleChange} size="large" >
                {diskNames.map((v, k) => {
                  return (
                    <Option value={v.disk_name} key={v.id}>{v.disk_name}</Option>
                  )
                })}
                <Option value="default">选择文件夹</Option>
              </Select>
              <Button type="primary" shape="circle" icon="plus" size="large" style={{ marginLeft: 24, marginRight: 24 }} onClick={this.handleShow} />
              <Button type="primary" size="large" onClick={this.handleInit} >初始化</Button>
              <Button type="primary" size="large" onClick={this.handleUpdate} style={{ marginLeft: 24 }}>更新缓存</Button>
            </Col>
          </Row>
          <Row style={{ marginTop: 24 }}>
            <Col>
              {/* <Table columns={columns} dataSource={pathInfo} /> */}
              <div>
                <h3 style={{ marginBottom: 16 }}>详情</h3>
                <List
                  header={<div style={{ textAlign: "right" }}>{pathInfo.length} 条数据</div>}
                  footer={<div>结束</div>}
                  bordered
                  dataSource={pathInfo}
                  renderItem={item => (<List.Item>{item}</List.Item>)}
                />
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}

export default CreateFile