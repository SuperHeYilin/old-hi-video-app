import React, { Component } from 'react'
import moment from 'moment'
import { Card, Row, Col, Input, Icon, Button, Table, InputNumber, Tag, DatePicker, Modal, message,  } from 'antd'
import { Table as MyTable, Layer } from '../../../components/Ui'
// 扫码支付窗口
import MicroView from './MicroView'
import UserInfoForm from './UserInfoForm'
import { api, err as apierr } from '../../../utils'

// 产品数量编辑
const EditableCell = ({ value, onChange }) => (
  <div>
    <InputNumber min={1} max={10} value={value} onChange={value => onChange(value)} />
  </div>
)
// 支付状态
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

class ByTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // 产品选择key
      selectedRows: [], // 产品选择
      data: { keyWord: ''}, // 搜索关键字
      isShowOrder: false, // 是否显示订单 默认否
      loading: false, // 确认添加按钮状态
      totalPrice: 0, // 总价
      totalNum: 0, // 总数
      gathering: 0, // 实际收款
      dateNow: new Date(), // 当前时间
      playDate: moment(new Date(), 'YYYY-MM-DD').format("YYYY-MM-DD"), // 游玩时间
      order: [], // 最近订单数据
      spinLoading: 0, // 支付状态 0未支付 1支付成功 2 支付失败 3 正在支付
      visible: false, // 模态框
      value: "", // 扫码框
      userData: [], // 用户数据
    }
  }
  componentDidMount() {
    this.fetch()
  }
  // // 扫码支付
  // onMicroPay = (ticketOrder, orderList) => {
  //   const { totalPrice, selectedRows, spinLoading } = this.state
  //   Layer.open({
  //     title: "刷卡支付",
  //     okText: "确定",
  //     onOk: () => {
  //       Layer.close()
  //     },
  //     onCancel: () => {
  //       Layer.close()
  //     },
  //     content:
  //       <MicroView money={totalPrice} selectedRows={selectedRows} spinLoading={spinLoading} pay={(authCode) => {
  //         if (authCode) {
  //           // 解构数据
  //           const firstCode = authCode.substr(0, 1)
  //           console.log("改变")
  //           this.setState({ spinLoading: true })
  //           // if (firstCode === "1") {
  //           //   this.onWxMicroPay(authCode, ticketOrder, orderList)
  //           // } else {
  //           //   this.onAliMicroPay(authCode, ticketOrder, orderList)
  //           // }
  //         }
  //       }}
  //       />,
  //   })
  // }
  // 微信支付
  onWxMicroPay = (phonenum, authCode, ticketOrder, orderList) => {
    api
    .post("ticket/product", {phonenum, ticketOrder, orderList, payType: 2})
    .then(result => {
      if (result === "") {
        message.warn("创建订单失败!")
        return false
      }
      api
      .post("/rop/paybill/wxpay/micropay/84", {tradeNo: result, authCode})
      .then(result => {
        if (result) {
          this.fetch()
          this.handleChangePay(result)
        } else {
          this.handleChangePay(result)
        }
      })
      .catch(err => {
        // api.err(err)
        this.handleChangePay(false)
      })
    })
    .catch(err => {
      // api.err(err)
      this.handleChangePay(false)
    })
  }
  // 支付宝支付
  onAliMicroPay = (phonenum, authCode, ticketOrder, orderList) => {
    api
    .post("ticket/product", {phonenum, ticketOrder, orderList, payType: 1})
    .then(result => {
      if (result === "") {
        message.warn("创建订单失败!")
        return
      }
      api
      .post("/rop/paybill/alipay/ftfpay/2", {tradeNo: result, authCode})
      .then(result => {
        if (result) {
          this.fetch()
          this.handleChangePay(result)
        } else {
          this.handleChangePay(result)
        }
      })
      .catch(err => {
        // api.err(err)
        this.handleChangePay(false)
      })
    })
    .catch(err => {
      // api.err(err)
      this.handleChangePay(false)
    })
  }
  // 产品选择
  onSelectChange = (selectedRowKeys, selectedRows) => {
    // 添加属性 num 购买数量, total 单个产品价格总价
    const cacheSelectedRow = selectedRows.map(item => ({num: 1, total: item.price, ...item}))
    let tempTotalPrice = 0;
    let tempTotalNum = 0;
    cacheSelectedRow.forEach(element => {
      return (
        tempTotalPrice += element.total,
        tempTotalNum += element.num
      )
    })
    // console.log('selectedRowKeys changed: ', selectedRowKeys, 'row: ', selectedRows, 'cache: ', cacheSelectedRow);
    this.setState({ selectedRowKeys, selectedRows: cacheSelectedRow, totalPrice: tempTotalPrice, totalNum: tempTotalNum });
  }
  // 产品搜索
  handleSearch = (e) => {
    // this.setState({ filterText: e.target.value, isShowOrder: false })
    this.setState({ data: { keyWord: e.target.value}, isShowOrder: false })
  }
  // 还原操作
  handleClear = () => {
    this.refForm.resetFields()
    this.setState({
      selectedRowKeys: [],
      selectedRows: [],
      data: { keyWord: '', refresh: Date.now() },
      isShowOrder: false,
      gathering: 0,
      dateNow: new Date(),
      playDate: moment(new Date(), 'YYYY-MM-DD').format("YYYY-MM-DD"),
    })
  }
  // 显示订单表格
  handleChangeShowOrder = () => {
    this.setState({ isShowOrder: true })
  }
  // 改变订单数量
  handleNumberChange = (value, id) => {
    const newData = [...this.state.selectedRows]
    const target = newData.filter(item => id === item.id)[0]
    if (target) {
      target['num'] = value
      target['total'] = value * target.price
      // 计算总价格
      let tempTotalPrice = 0;
      let tempTotalNum = 0;
      newData.forEach(element => {
        return (
          tempTotalPrice += element.total,
          tempTotalNum += element.num
        )
      })
      this.setState({ selectedRows: newData, totalPrice: tempTotalPrice, totalNum: tempTotalNum })
    }
  }
  // 时间选择事件
  handleDateChange = (date, dateString) => {
    // console.log('date', date, 'dataString', dateString)
    this.setState({ playDate: dateString || this.state.playDate, dateNow: date || new Date() })
  }
  // 现金收款输入事件
  handleGatheringChange = (value) => {
    this.setState({ gathering: value})
  }
  // 解构成后端数据结构
  handleDeconstruction = () => {
    const { totalPrice, playDate, selectedRows, totalNum } = this.state
    // 解构成ticketOrderList
    const orderList = selectedRows.map(item => ({
      name: item.product_name,
      price: item.price,
      tk_id: item.id,
      number: item.num,
      state: 0,
    }))
    // 解构订单数据
    const ticketOrder = {
      price: totalPrice, // 总价
      number: totalNum, // 总数量
      // state: 1, // 已支付
      user_type: 1, // 商户下单类型
      // print_state: 1, // 已打印
      // pay_type: 3, // 现金支付
      pay_price: totalPrice,
      take_time: playDate,
    }
    return {orderList, ticketOrder}
  }
  // 支付操作
  handlePay = (payType) => {
    const { gathering, playDate } = this.state
    // 如果为扫码支付 就不验证手动收款输入框
    const temp = payType === 1 ? false : gathering === 0
    // 判断收款信息是否完善
    if (temp || playDate === '') {
      Modal.error({
        title: '信息不完整！',
        content: `请填写${gathering === 0 ? ` 收款信息 ` : ``}${playDate === '' ? ` 游玩时间 ` : ``} 信息`,
      });
      return
    }
    // 判断身份信息是否完善
    this.refForm.validateFields((error, values) => {
      if (error) {
          return
      }
      // 用户数据 身份证 姓名 手机号
      this.setState({ userData: values })
      // 解构数据
      const {ticketOrder, orderList} = this.handleDeconstruction()
      // 扫码支付
      if (payType === 1 || payType === 2) {
        // this.onMicroPay(ticketOrder, orderList)
        this.showModal()
      }
      // 现金支付
      if (payType === 3) {
        api
          .post("/ticket/product", {phonenum: values.mobile_no, ticketOrder, orderList, payType})
          .then((result) => {
              if (result) {
                message.success("交易成功!")
                this.fetch()
              }
          })
          .catch(apierr)
          this.handleClear()
      }
    })
  }
  // 改变支付状态
  handleChangePay = (temp) => {
    // true 支付成功
    if (temp) {
      this.setState({ spinLoading: 1, value: "" })
      setTimeout(() => {
        this.setState({ spinLoading: 0, visible: false })
        this.handleClear()
      }, 2000)
    } else {
      this.setState({ spinLoading: 2, value: "" })
      setTimeout(() => {
        this.setState({ spinLoading: 0 })
      }, 2000)
    }
  }
  // 订单信息
  fetch = () => {
    api
      .get("/ticket/product/orders")
      // .post("/sms/send", {orderNumber: 152344137529746})
      .then((result) => {
          if (result) {
            this.setState({ order: result })
          }
      })
      .catch(apierr)
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }
  // 渲染编辑输入框
  renderInputNumColumns(text, record) {
    return (
      <EditableCell
        value={text}
        onChange={value => this.handleNumberChange(value, record.id)}
      />
    );
  }
  render() {
    const { isShowOrder, loading, selectedRowKeys, selectedRows, totalPrice, gathering, data, dateNow, order, spinLoading, visible, value, userData } = this.state
    const onSelectChange = this.onSelectChange
    const phonenum = userData.mobile_no
    // 解构数据
    const {ticketOrder, orderList} = this.handleDeconstruction()
    // 选中数量
    const hasSelected = selectedRowKeys.length > 0
    const fetchProps = {
      fetch: {
        url: '/ticket/product',
        data,
      },
      size: "default",
      selection: {
        isOpen: true,
        onSelected: onSelectChange,
      },
      columns: [{
        title: '产品名称',
        dataIndex: 'product_name',
        render: text => <Tag color="#f50"><span style={{}}>{text}</span></Tag>,
      }, {
        title: '产品价格',
        dataIndex: 'price',
        render: text => <span style={{ color: '#71B84F'}}>￥{text}</span>,
      }, {
        title: '剩余票数',
        dataIndex: 'total_stock_surplus',
      }, {
        title: '有效时间',
        dataIndex: 'use_end_time',
      }],
    }
    const columns = [{
      title: '产品名称',
      dataIndex: 'product_name',
      // width: '25%',
      // render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '零售价',
      dataIndex: 'price',
      // width: '15%',
      render: text => <span style={{ color: '#71B84F'}}>￥{text}</span>,
    }, {
      title: '购买数量',
      dataIndex: 'num',
      // width: '40%',
      render: (text, record) => this.renderInputNumColumns(text, record),
    }, {
      title: '金额',
      dataIndex: 'total',
      // width: '40%',
      render: text => <span style={{ color: '#F07845'}}>￥{text}</span>,
    }];
    const columnsOrder = [{
      title: '订单名称',
      dataIndex: 'order_name',
      // width: '25%',
      // render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '订单总价',
      dataIndex: 'price',
      // width: '15%',
      render: text => <span style={{ color: '#71B84F'}}>￥{text}</span>,
    }, {
      title: '购买数量',
      dataIndex: 'number',
      // width: '40%',
      // render: (text, record) => this.renderInputNumColumns(text, record),
    }, {
      title: '下单时间',
      dataIndex: 'create_time',
      // width: '40%',
    }];
    return (
      <div>
        <Modal
          title="扫码支付"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <MicroView money={totalPrice} selectedRows={selectedRows} spinLoading={spinLoading} value={value} handleChange={this.handleChange} pay={(authCode) => {
            if (authCode) {
              // 解构数据
              const firstCode = authCode.substr(0, 1)
              this.setState({ spinLoading: 3 })
              if (firstCode === "1") {
                this.onWxMicroPay(phonenum, authCode, ticketOrder, orderList)
              } else {
                this.onAliMicroPay(phonenum, authCode, ticketOrder, orderList)
              }
            }
          }}
          />
        </Modal>
        <Card
          style={{ background: "#38A6A3"}}
          bordered={false}
        >
          <Row gutter={32}>
            <Col xs={24} sm={24} md={14} lg={14} xl={18}>
              <Row>
                <Col xs={24} sm={16} md={16} lg={16} xl={18} style={{ marginTop: 16 }} >
                  <Input
                    onChange={this.handleSearch}
                    value={data.keyWord}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="产品名称" size="large"
                  />
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={6} style={{ marginTop: 16, marginBottom: 16 }} >
                  <Button
                    type="primary"
                    size="large"
                    onClick={this.handleSearch}
                    style={{ marginLeft: 16 }}
                  >
                    搜索
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    style={{ marginLeft: 16, background: "#71B84F", borderColor: "#71B84F" }}
                    onClick={this.handleClear}
                  >
                    还原
                  </Button>
                </Col>
              </Row>
              <Row>
                <div style={{ display: `${isShowOrder ? `none` : `block`}` }}>
                  <Card
                    title="产品列表"
                    extra={
                      <div>
                        <span style={{ marginRight: 16 }}>
                          {hasSelected ? `添加产品 ${selectedRowKeys.length} 种` : ''}
                        </span>
                        <Button
                        type="primary"
                        onClick={this.handleChangeShowOrder}
                        disabled={!hasSelected}
                        loading={loading}
                        >
                          确认添加
                        </Button>
                      </div>
                      }
                  >
                    <MyTable {...fetchProps} />
                  </Card>
                </div>
                <div style={{ display: `${isShowOrder ? `block` : `none`}` }}>
                  <Card>
                    <Table
                      columns={columns}
                      dataSource={selectedRows}
                      footer={
                        () => <span style={{ fontSize: 18, float: "right", color: '#F07845', marginTop: -12 }}>总价: ￥{totalPrice || 0}</span>
                      }
                      pagination={false}
                    />
                    <div style={{ margin: 8 }}>
                      <span style={{ color: "#1890FF" }} >《取票人信息  (请填写准确的用户信息)</span>
                    </div>
                    <div>
                      <UserInfoForm ref={(form) => {this.refForm = form}} />
                    </div>
                  </Card>
                </div>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={10} lg={10} xl={6}>
              <div style={{padding: 12, border: "0.5px solid #38A6A3", borderRadius: 6, background: "#134C4E"}}>
                {/* <PriceForm /> */}
                <Row style={{ marginTop: 20}} >
                  <div style={{ fontSize: 16, overflow: "hidden" }} >
                    <Col xs={24} sm={8} md={8} lg={8} xl={6}>
                      <span style={{ color: "white", fontSize: 20 }} >
                        时间:
                      </span>
                    </Col>
                    <Col xs={24} sm={16} md={16} lg={16} xl={15}>
                      <div >
                        <DatePicker value={moment(dateNow, 'YYYY-MM-DD')} onChange={this.handleDateChange} />
                      </div>
                    </Col>
                  </div>
                </Row>
                <Row style={{ marginTop: 20}} >
                  <div style={{ fontSize: 16 }} >
                    <Col xs={24} sm={8} md={8} lg={8} xl={6}>
                      <span style={{ color: "white", fontSize: 20 }}>
                        收款:
                      </span>
                    </Col>
                    <Col xs={24} sm={16} md={16} lg={16} xl={15}>
                      <div>
                      <InputNumber
                        value={gathering}
                        formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/￥\s?|(,*)/g, '')}
                        onChange={this.handleGatheringChange}
                        style={{ width: "100%" }}
                      />
                      </div>
                    </Col>
                  </div>
                </Row>
                <Row style={{ marginTop: 20}} >
                  <div style={{ fontSize: 16 }} >
                    <Col xs={24} sm={8} md={8} lg={8} xl={6}>
                      <span style={{ color: "white", fontSize: 20 }}>
                        找零:
                      </span>
                    </Col>
                    <Col xs={24} sm={16} md={16} lg={16} xl={18}>
                      <div style={{ color: "#FFA12F", fontSize: 20 }}>
                        ￥ {gathering - totalPrice || 0}
                      </div>
                    </Col>
                  </div>
                </Row>
                <Row style={{ marginTop: 30 }}>
                  <Col >
                    <Button
                      type="primary"
                      size="large"
                      icon="pay-circle"
                      onClick={() => this.handlePay(3)}
                      disabled={!hasSelected}
                      style={{ marginLeft: 16, width: "85%", background: "#71B84F", borderColor: "#71B84F" }}
                    >
                      现金支付
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      icon="barcode"
                      onClick={() => this.handlePay(1)}
                      disabled={!hasSelected}
                      style={{ marginLeft: 16, marginTop: 24, width: "85%" }}
                    >
                      扫码支付
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: 24 }}>
            <Card
              title="最近订单"
            >
              <Table columns={columnsOrder} dataSource={order} rowKey="id" />
            </Card>
          </Row>
        </Card>
      </div>
    );
  }
}

export default ByTicket;