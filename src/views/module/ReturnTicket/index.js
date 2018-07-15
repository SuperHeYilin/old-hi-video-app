import React, { Component } from 'react'
import { Ibox } from '../../../components/Ui'
import TicketOrderList from './List'
import TicketOrderFilter from './Filter'

class TicketOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onFilter = (filterData) => {
        this.setState({data: filterData})
    }
    // 获取列表选中项
    onSelected = (keys, rows) => {
        this.setState({keys, rows})
    }

    render() {
        let { data, keys, rows} = this.state;
        return (
            <Ibox>
                <Ibox.IboxTitle>
                    <TicketOrderFilter onFilter={this.onFilter} selected={{keys, rows}} />
                </Ibox.IboxTitle>
                <Ibox.IboxContent>
                    <TicketOrderList data={data} onFilter={this.onFilter} onSelected={this.onSelected} />
                </Ibox.IboxContent>
            </Ibox>
        )
    }
}

export default TicketOrder