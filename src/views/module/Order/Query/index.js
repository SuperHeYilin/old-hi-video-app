import React, { Component } from 'react'
import { Layout , Row , Col, Card, Button } from 'antd'
import { Ibox } from '../../../../components/Ui'

import styles from './style.less'

import NestedTable from './List'
import OrderFilter from './Filter'


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
        orderId: `1000${i*Math.floor(Math.random() * (100)) + 1}`,
        ticket_info: nameRandom(sceneryName,day),
        name: nameRandom(nameFirst,nameLase),
        distributor: `${i % 2 ===0 ? '携程' : '去哪'}`,
        status: '下架',
        time: `201${i}-0${i}-0${i + 1}`,
      })
    }
    return dataDemo
}
//头部标题样式
const Title = () => {
    return (
        <div className={styles.reservation}>
            <a className={styles['title']}>订单查询</a>
        </div>
    )
}

class OrderQuery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFilter: false,
            data: getData(),
            orderSerachText: '',
        }
    }
    //隐藏显示
    handleShowFilter = () =>{
        let isFilter = !this.state.isFilter;
        this.setState({ isFilter });
    }
    //订单信息输入框
    onOrderInputChange = (e) => {
        this.setState({ orderSerachText: e.target.value })
    }
    //查询
    onSearch = ()=> {
        const { data, orderSerachText } = this.state
        if (!orderSerachText) {
            this.setState({ data: getData() })
            return
        }
        console.log(JSON.stringify(data.filter((record) => record.orderId === orderSerachText)))
        this.setState({
            data: data.filter((record) => record.orderId === orderSerachText)
        })
    }
    //清空
    onClear = () => {
        this.setState({
            data: getData(),
            orderSerachText: '',
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
        let { isFilter, data, orderSerachText } = this.state
        return (
            <Ibox>
                <Ibox.IboxTitle>
                    <Card
                     title={ <Title /> } 
                    >
                        <OrderFilter
                            showFilter={isFilter}
                            handleSearch={this.onSearch} 
                            handleOrderInputChange={this.onOrderInputChange} 
                            handleClear={this.onClear} 
                            orderSerachText={orderSerachText} 
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

export default OrderQuery