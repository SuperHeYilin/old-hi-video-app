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
    handleTakeTicket=(type, item) => {
        let { onFilter } = this.props
        api.put("/tickets/details/return/ticket", {id: item.id}).then((data) => {
            if (data) {
                message.success("操作成功!")
                onFilter({d: new Date()})
            } else {
                message.error("操作失败,请稍后重试！")
            }
        })
    }
    render() {
        let { data, onSelected } = this.props
        let newData = Object.assign({}, data)

        let fetchProps = {
            fetch: {
                url: '/tickets/details/return/ticket',
                data: newData,
            },
            selection: {
                onSelected,
            },
            columns: [
                { title: '订单编号', dataIndex: 'only_no'},
                { title: '产品名称', dataIndex: 'product_name'},
                { title: '门票编号', dataIndex: 'ticket_num'},
                { title: '手机号码', dataIndex: 'mobile_no'},
                { title: '售价', dataIndex: 'price'},
                { title: '游玩时间', dataIndex: 'play_date'},
                { title: '状态',
                    dataIndex: 'state',
                    render: (v) => {
                    const states = ['未出票', '已出票', '已检票', '已退票']
                    return <a>{v ? states[v] : '状态错误'}</a>
                }},
                { title: '操作',
                    dataIndex: 'state1',
                    render: (v, item) => {
                        let iEl = (<div>是否确认反核销此订单？<br></br>(反核销后订单将会回到未验证状态)</div>);
                        // if (item.state === "4") {
                        //     return (<Popconfirm onConfirm={() => this.handleTakeTicket(2, item)} title={iEl} okText="核销" cancelText="取消">
                        //                 <Button type="danger" size="small" style={{marginRight: "5px", fontSize: "12px"}} ghost>反核销</Button>
                        //             </Popconfirm>
                        //     )
                        // } else
                        if (item.state === "0" || item.state === "1") {
                            return (
                                <Popconfirm onConfirm={() => this.handleTakeTicket(1, item)} title="是否确认退票？" okText="退票" cancelText="取消">
                                    <Button type="primary" size="small" style={{marginRight: "5px", fontSize: "12px"}} ghost>退票</Button>
                                </Popconfirm>
                            )
                        }
                    },
                },
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
    data:{}
}

export default TicketOrderList