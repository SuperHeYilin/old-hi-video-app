import React, {Component} from 'react'
import {
    Row,
    Col,
    Input,
    Form,
    Icon,
    Select,
    InputNumber,
    DatePicker,
    Divider,
    message
} from 'antd'
import { Button } from '../../../components/Ui'
import {api, err as apierr} from '../../../utils'
import styles from './Filter.less'

const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker
const Search = Input.Search;

class TicketOrderFilter extends Component {
    constructor(props) {
        super(props)
        this.props.onRef(this)
        this.state = {
            isFilter: false,
            SValue:''
        }
    }
    onChange = (e) =>{
    	this.setState({SValue:(e?e.target.value:"")});
    }
    
    onSearch = (value)=>{
    	let { onFilter,onRefresh } = this.props
    	if(!value){
    		 value = this.state.SValue
    		 if(!value){
    		 	message.error("请输入验证码!", 1)
    		 	return
    		 }
    	}
    	onRefresh(true)
    	api.get("/ticket/order/info/"+value)
        .then((result) => {
	        if(result){
	        	onFilter(result)
	        	console.info(result)
	        	setTimeout(()=>{
	        		onRefresh(false)
	        	},500)
	        }else{
	        	 onRefresh(false)
	        	 message.info("未查询到订单,或未支付！", 2)
	        }
        })
        .catch((err) => {
	        this.setState({loginLoading: false})
	        api.err(err)
        })
    	
    }
    render() {
        let { onFilter } = this.props
        console.info(this.state.SValue)
        return (
            <div>
                <Row>
                <Col xs={24} sm={16} md={16} lg={16} xl={18} style={{ width:"50%",marginLeft:"25%",marginTop:"3%"}} >
                  <Search value={this.state.SValue} onChange={this.onChange} className={styles['search_input']} placeholder="请输入门票验证码" size="large" onSearch={(value)=>this.onSearch(value)}/>
                </Col>
                </Row>
                <Row>
                	<Col xs={24} sm={16} md={16} lg={16} xl={18} style={{ width:"50%",marginLeft:"25%",marginTop:"3%",textAlign:"center"}} >
	                    <Button onClick={()=>this.onSearch("")} type="primary" size="large" style={{width:"50%",backgroundColor:"#ec407a",borderColor:"#ec407a"}}>查询</Button>
                	</Col>
                </Row>
            </div>
        )
    }
}

export default TicketOrderFilter