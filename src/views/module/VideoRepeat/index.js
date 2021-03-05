import React, { Component } from 'react'
import { Card, Icon, Avatar, Table, Row, Col, Tooltip, Switch, Button, Modal, message, Select, Radio } from 'antd'
import { api, err } from '../../../utils'

import styles from './index.less'

const { Meta } = Card

const { Option } = Select

const firstRepeatDemo = [
  {
    id: 1,
    size_b: '1204.23',
    fileName: "天堂电影院.mp4",
    path: "d://demo/test/这是一个路径描述/天堂电影院.mp4"
  },
  {
    id: 2,
    size_b: '1204.23',
    fileName: "天堂电影院2.mp4",
    path: "d://demo/test/这是一个路径描述/天堂电影院.mp4"
  },
  {
    id: 3,
    size_b: '1204.23',
    fileName: "天堂电影院3.mp4",
    path: "d://demo/test/这是一个路径描述/天堂电影院.mp4"
  },
  {
    id: 4,
    size_b: '1204.23',
    fileName: "天堂电影院4.mp4",
    path: "d://demo/test/这是一个路径描述/天堂电影院.mp4"
  }
]


function RepeatImp(props) {
  const data = props.data
  return (
    <div className={styles.video}>
      {
        data.map((item, index) => {
          return (
            <div key={item.id} className={styles.card} >
              <div className={styles.left}>
                {/* <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" /> */}
                <img alt="example" src={require(`../../../public/imgs/1920-1080.jpg`)} />
              </div>
              <div className={styles.left}>
                <h3>{item.fileName}</h3>
                <h5>{item.path}</h5>
                <h5>{item.size_b}mb</h5>
                <p>dfjdklfjsdlfdslkfjsdlfjlsdfkj;ldskjfsdlkfjasd;lfkjas;ldfasdfkljdsfjdsf;lakjdfa;lsdkfj</p>
                <div style={{ marginTop: 38 }}>
                  <Button type="primary">播放</Button>
                  <Button style={{ marginLeft: 24 }}>打开文件位置</Button>
                  <Button style={{ marginLeft: 24 }} type="danger">删除</Button>
                  <Switch style={{ marginLeft: 24 }} defaultChecked={false} checkedChildren="删除" unCheckedChildren="保留" onChange={(boolean) => props.handleChooseDelete(boolean, item.id)} />
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

/**
 * 文件重复对比 删除
 */
export default class VideoRepeat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allRepeat: [], // 所有重复数据
      firstRepeat: firstRepeatDemo, // 首个重复数据
      deleteIds: [], // 删除的文件id集合
      deleteItem: [], // 删除名称集合
      visible: false,
      pagination: {},
      sort: 'esc', // 排序规则
    }
  }
  componentDidMount = () => {
    // this.fetch()
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
    api.get("/file/open", { ids: id })
      .catch(err)
  }
  test() {
    console.log('1')
  }
  // 删除切换
  handleChooseDelete = (boolean, id) => {
    console.log(117, boolean, id)
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
    firstRepeat.forEach((v, k) => {
      if (deleteIds.indexOf(v.id) > -1) {
        // deleteItem.push(v.fileName + v.path)
        deleteItem.push(v.path)
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

  // 切换排序规则
  handleSortChange = e => {
    this.setState({ sort: e.target.value });
  };


  fetch = (current) => {
    const { pageSize = 10 } = this.state.pagination
    api.get("/hiVideo/getRepeat", { start: current, length: pageSize })
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
    const { allRepeat, firstRepeat, visible, deleteItem, pagination, sort } = this.state
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
              <Radio.Group value={sort} onChange={this.handleSortChange}>
                <Radio.Button value="esc">顺序</Radio.Button>
                <Radio.Button value="desc">倒序</Radio.Button>
                <Radio.Button value="rand">随机</Radio.Button>
              </Radio.Group>
              <Button style={{ marginLeft: 24 }} type="primary" onClick={this.handleOpenAll} >打开全部</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.showModal} >删除指定</Button>
            </div>}
        >
          {

            <RepeatImp data={firstRepeat} handleChooseDelete={(boolean, id) => this.handleChooseDelete(boolean, id)} />

            // firstRepeat.map((v, k) => {
            // return (
            // <Col xs={{ span: 8 }} style={{ marginTop: 24 }} key={v.id}>
            //   <Card
            //     // style={{ width: 300 }}
            //     cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            //     actions={[<Icon type="play-circle" onClick={() => this.handleOpen(v.id)} />,
            //     <Icon type="edit" />,
            //     <Icon type="ellipsis" />,
            //     <Switch defaultChecked={false} checkedChildren="删除" unCheckedChildren="保留" onChange={(boolean) => this.handleChooseDelete(boolean, v.id)} />]}
            //     // <MySwitch handleChooseDelete={this.handleChooseDelete} id={v.id} />]}
            //   >
            //     <Meta
            //       avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            //       title={
            //         <Tooltip placement="topLeft" title={
            //           <div>
            //             <p>{v.fileName}</p>
            //             <p>{v.path}</p>
            //           </div>}
            //         >
            //           <p>{this.handleChangeString(v.fileName)}</p>
            //           <p>{this.handleChangeString(v.path)}</p>
            //         </Tooltip>
            //       }
            //       description={v.size_b}
            //     />
            //   </Card>
            // </Col>
            // <div>
            //   <RepeatImp props = {v}>

            //   </RepeatImp>
            // </div>
            // )
          }
        </Card>
        <Table columns={columns} dataSource={allRepeat} rowKey={record => record.id} pagination={pagination} onChange={this.handleTableChange} />
      </div>
    )
  }
}
