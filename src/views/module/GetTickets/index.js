import React, { Component } from 'react'
import { Ibox,Button } from '../../../components/Ui'
import { Spin } from 'antd'
import TicketOrderList from './List'
import TicketOrderFilter from './Filter'
import TicketOrderView from './View'
import ViewCode from './ViewCode'
import styles from './Filter.less'
class TicketOrder extends Component {
    constructor(props) {
        super(props)
        let {state} = this.props.location
        let sjson = {}
        if(state){
        	sjson.vcode = state.code
        }
        sjson.loading = false
        this.state = sjson
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
	onResetState=()=>{
		this.setState({data: null})
	}
	
	clearInput=()=>{
		this.child.onChange()
	}
	
    render() {
        let { data, keys, rows ,loading,vcode} = this.state
        let onFilter = this.onFilter
        let clearInput = this.clearInput
        let onRefresh = this.onRefresh
        if(vcode){
        	return (<ViewCode datacode={vcode}/>)
        }else{
        	let CtEL = !data?null:( <Ibox.IboxContent className={styles.contentAnimation}>
								<TicketOrderView data={data} onRefresh={onRefresh} onFilter={onFilter} clearInput={clearInput}/>
								</Ibox.IboxContent>)
        	let FilterEL = data?
        					(<Ibox.IboxTitle style={{background:"transparent",textAlign:"center"}}>
			                    <Button onClick={()=>this.onResetState()} type="primary"  style={{width:"10%",backgroundColor:"#ec407a",borderColor:"#ec407a"}}>返回</Button>
			                </Ibox.IboxTitle>)
        					:
        					(<Ibox.IboxTitle style={{background:"transparent"}}>
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
}

export default TicketOrder