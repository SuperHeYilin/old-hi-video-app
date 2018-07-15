import React, { Component } from 'react'
import { Button, Popconfirm, message } from 'antd';
import { Table } from '../../../components/Ui'
import { api, err as apierr } from '../../../utils'

class TicketOrderList extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleTabChange = (key) => {
        this.setState({state: key })
    }
    handleViewOrder=(item) => {
        let { history } = this.props
        console.info(item.ver_code)
        history.push({pathname: "/module/get/ticket",state: { "code": item.ver_code }});
    }
    render() {
        let { data, onSelected } = this.props
        let newData = Object.assign({}, data)

        let fetchProps = {
            fetch: {
                url: '/ticket/order',
                data: newData,
            },
            selection: {
                onSelected,
            },
            columns: [
                { title: '订单编号', dataIndex: 'order_number'},
                { title: '产品名称', dataIndex: 'order_name'},
                { title: '票码', dataIndex: 'ver_code'},
                { title: '售价', dataIndex: 'price'},
                { title: '用户姓名/电话', dataIndex: 'user',render:(c,r)=>{
                	return c.nickname +"/"+ c.phonenum
                }},
                { title: '下单时间', dataIndex: 'create_time',algin:"right"},
                { title: '收款方式', dataIndex: 'pay_type',render:(v,r)=>{
                	const vl = ["未知","支付宝","微信","现金支付"]
                	return vl[v]
                }},
                { title: '状态', dataIndex: 'state',render:(v)=>{
                    const states = ['未支付','已支付','退款','未验证','已验证','已过期','已完结','已取消','现场支付']
                    return <a>{v?states[v]:'状态错误'}</a>
                }},
                { title: '操作',
                    dataIndex: 'state1',
                    render: (v, item) => {
                        return (<div><a onClick={() => this.handleViewOrder(item)}>查看详情</a></div>
                        )
                    },
                }
                
            ],
        }
        return (
            <div>
                <Table
                    {...fetchProps}
                />
            </div>
        )
    }
}

TicketOrderList.defaultProps = {
    data: {},
}

export default TicketOrderList