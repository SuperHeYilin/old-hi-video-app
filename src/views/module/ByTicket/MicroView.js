import React, { Component } from 'react';
import { Alert, Input, Spin, Icon } from "antd"

import styles from './ticketImg.less'

const ticketImg = require("../../../public/imgs/ticket.png")
// 支付状态 正在支付
const antIcon3 = <Icon type="loading" style={{ fontSize: 45 }} spin />
const antIcon1 = <Icon type="check-circle" style={{ fontSize: 45, color: "#71B84F" }} />
const antIcon2 = <Icon type="close-circle" style={{ fontSize: 45, color: "red" }} />

class MicroView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // spinLoading: false, // 支付状态
    }
  }
  componentDidMount() {
    this.textInput.focus();
  }
  render() {
    const { money, pay, selectedRows, spinLoading, value, handleChange } = this.props

    return (
      <div >
        <Spin spinning={spinLoading === 3} indicator={antIcon3} tip={<div style={{ color: "black", fontWeight: "bold", marginTop: 24, marginLeft: 18 }}>正在支付</div>}>
        <Spin spinning={spinLoading === 1} indicator={antIcon1} tip={<div style={{ color: "black", fontWeight: "bold", marginTop: 24, marginLeft: 18 }}>支付成功</div>}>
        <Spin spinning={spinLoading === 2} indicator={antIcon2} tip={<div style={{ color: "black", fontWeight: "bold", marginTop: 24, marginLeft: 1 }}>支付失败,请重新支付</div>}>
        <Alert message="请确认金额，扫描客户支付码!" type="info" showIcon />
        {selectedRows.map((v, k) => {
          return (
            <div style={{ background: `url(${ticketImg})`, padding: 8, marginTop: 12, marginBottom: 12, height: 83, width: 478 }} key={k}>
              <div style={{ float: "left" }}>
                <h4 style={{ display: "block", width: 310, marginLeft: 12, overflow: "hidden" }}>{v.product_name}</h4>
                <span style={{ color: '#999999', marginLeft: 12 }}>{v.num || 0} 张</span>
                <span style={{ color: '#999999', marginLeft: 12 }}>x</span>
                <span style={{ color: '#999999', marginLeft: 12 }} >{v.price || 0} 元</span>
              </div>
              <div style={{ float: "left", width: 130, padding: 10, color: "white", overflow: "hidden" }}>
                <span style={{ fontSize: 14 }}>总计 : </span><span style={{fontSize: 8}}>￥</span><span style={{ fontSize: 20 }}>{v.total || 0}</span>
              </div>
            </div>
          )
        })}
        <p>总金额： <span style={{ color: '#F27845', fontSize: 20 }}>{money} 元</span></p>
        <Input value={value} ref={(input) => this.textInput = input} onPressEnter={(e) => {pay(value)}} onChange={handleChange} />
        </Spin>
        </Spin>
        </Spin>
      </div>
    )
  }
}

export default MicroView;