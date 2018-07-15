import React, { Component } from 'react'
import { Ibox,Button } from '../../../components/Ui'
import { Spin } from 'antd'
import TicketOrderList from './List'
import TicketOrderFilter from './Filter'
import TicketOrderView from './View'
import styles from './Filter.less'
class TicketOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
        	loading:false
        }
    }

	onRefresh = (loading)=>{
    	this.setState({loading: loading})
	}
    onFilter = (filterData,loading) => {
        this.setState({data: filterData})
    }
    // 获取列表选中项
    onSelected = (keys, rows) => {
        this.setState({keys, rows})
    }
	
	onRef=(ref)=>{
		this.child = ref
	}
	
	clearInput=()=>{
		this.child.onChange()
	}
	
	onSearch=()=>{
		this.child.onSearch()
	}
	onResetState=()=>{
		this.setState({data: null})
	}
	
    render() {
        let { data, keys, rows ,loading} = this.state
        let onFilter = this.onFilter
        let clearInput = this.clearInput
        let onRefresh = this.onRefresh
        let onSearch = this.onSearch
        let CtEL = !data?null:( <Ibox.IboxContent className={styles.contentAnimation}>
								<TicketOrderView data={data} onSearch={onSearch} onRefresh={onRefresh} onFilter={onFilter} clearInput={clearInput}/>
								</Ibox.IboxContent>)
        
        let FilterEL = data?( <Ibox.IboxTitle style={{background:"transparent",textAlign:"center"}}>
								<Button onClick={()=>this.onResetState()} type="primary"  style={{width:"10%",backgroundColor:"#ec407a",borderColor:"#ec407a"}}>返回</Button>
								</Ibox.IboxTitle>)
        						:
        						( <Ibox.IboxTitle style={{background:"transparent"}}>
				                    <TicketOrderFilter onRef={this.onRef} onRefresh={this.onRefresh} onFilter={this.onFilter} selected={{keys, rows}} />
				                </Ibox.IboxTitle>)
        return (
        		<Spin spinning={loading}>
		            <Ibox>
		                {FilterEL}
		                {CtEL}
		            </Ibox>
	            </Spin>
        )
    }
}

export default TicketOrder