import React, { Component } from 'react'
import { Layout , Row , Col } from 'antd'
import { Ibox } from '../../../components/Ui'

import NestedTable from './List'

class Order extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <Ibox>
                <Ibox.IboxTitle>
                    <NestedTable />
                </Ibox.IboxTitle>
                <Ibox.IboxContent>
                </Ibox.IboxContent>
            </Ibox>
        )
    }
    
}

export default Order