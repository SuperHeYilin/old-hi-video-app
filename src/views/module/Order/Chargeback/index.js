import React, { Component } from 'react'
import { Layout , Row , Col, Card, } from 'antd'
import { Ibox } from '../../../../components/Ui'

import styles from './style.less'

import NestedTable from './List'
import ReservationFilter from './Filter'

let nameFirst="王,李,魏,沈,张,徐,常";
let nameLase="辉,明,小小,大大,军,娟";
let sceneryName="金佛山,四面山,仙女山,龙岗,茶山竹海";
let day="三日游,国庆优惠,春节特惠,感恩回馈大放送,五日团";
function nameRandom(c,d) {
    let xinga= c.split(",");
    let minga= d.split(",");
    console.log(xinga[Math.floor(Math.random() * (xinga.length))] + minga[Math.floor(Math.random() * (minga.length))]);
    return (xinga[Math.floor(Math.random() * (xinga.length))] + minga[Math.floor(Math.random() * (minga.length))]);
}

function getData() {
    const dataDemo = [];
    for (let i = 0; i < 18; ++i) {
      dataDemo.push({
        key: i,
        order_id: `1000${i*Math.floor(Math.random() * (100)) + 1}`,
        ticket_info: nameRandom(sceneryName,day),
        name: nameRandom(nameFirst,nameLase),
        distributor: `${i % 2 ===0 ? '携程' : '去哪'}`,
        status: '下架',
        time: `201${i}-0${i}-0${i + 1}`,
      })
    }
    return dataDemo
}

const Title = () => {
    return (
        <div className={styles.reservation}>
            <a className={styles['title']}>退票审核</a>
        </div>
    )
}
class OrderChargeBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: getData(),
            orderSearchId: '',
        }
    }
    //订单号输入框
    onOrderInputChange = (e) => {
        this.setState({ orderSearchId: e.target.value })
    }
    //查询
    onSearch = ()=> {
        const { data, orderSearchId } = this.state
        if (!orderSearchId) {
            this.setState({ data: getData() })
            return
        }
        this.setState({
            data: [data.find((record) => record.order_id === orderSearchId)]
        })
    }
    //清空
    onClear = () => {
        this.setState({
            orderSearchId: '',
        })
    }
    //删除
    handleDelete = (key) => {
        const dataSource = this.state.data
        this.setState({ data: dataSource.filter(item => item.key !== key) });
    }
    //更新数据
    handleReflush = () => {
        this.setState({ data: getData() })
    }
    render() {
        let { data, orderSearchId } = this.state
        return (
            <Ibox>
                <Ibox.IboxTitle>
                    <Card title={ <Title /> }>
                        <ReservationFilter
                           handleSearch={this.onSearch} 
                           handleOrderInputChange={this.onOrderInputChange} 
                           handleClear={this.onClear} 
                           orderSearchId={orderSearchId}  
                        />
                    </Card>
                </Ibox.IboxTitle>
                <Ibox.IboxContent>
                    <NestedTable data={data} handleDelete={this.handleDelete} handleReflush={this.handleReflush} />
                </Ibox.IboxContent>
            </Ibox>
        )
    }
    
}

export default OrderChargeBack