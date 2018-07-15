import React, {Component} from 'react'
import { Col,Row,Card, Badge, Table, Divider,message,Spin } from 'antd';
import { Button,DescriptionList} from '../../../components/Ui'
import {api, err as apierr} from '../../../utils'
import styles from './View.less'
const { Description } = DescriptionList;
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  if (index === basicGoods.length) {
    obj.props.colSpan = 0;
  }
  return obj;
};
class TicketOrderView extends Component {
	constructor(props) {
        super(props)
        this.state={
        	data:{},
        	loading:true
        }
        this.loadData(this.props.datacode)
  }
	loadData=(vcode)=>{
		 api.get("/ticket/order/info/view/"+vcode)
        .then((result) => {
	       setTimeout(()=>{
	       	this.setState({data:result,loading:false})
	       },500)
        })
        .catch((err) => {
	        api.err(err)
        })
	}
	
	onOkTicket=()=>{
		 let { data,onFilter,clearInput } = this.props
		 api.put("/ticket/order/state",{id:data.id,state:3})
        .then((result) => {
	        if(result){
	        		message.success("操作成功!", 1,()=>{
	        			clearInput()
	        			onFilter()
	        		})
	        }else{
	        	 message.info("未查询到订单!", 2)
	        }
        })
        .catch((err) => {
	        api.err(err)
        })
		 
	}
	
	render() {
		const goodsColumns = [
	      {
		    title: '门票名称',
		    dataIndex: 'name',
		    key: 'name',
		    render: (text, row, index) => {
		      return <a href="javascript:;">{text}</a>;   
		    },
		  },
		  {
		    title: '门票单价',
		    dataIndex: 'price',
		    align: 'right',
		    key: 'price',
		  },
		  {
		    title: '数量',
		    dataIndex: 'number',
		    align: 'right',
		    key: 'number',
		  },
		  {
		    title: '状态',
		    dataIndex: 'state',
		    key: 'state',
		    align: 'right',
		    render: (text, row, index) => {
		      let stateName = ["未验证","已验证"] 
		      return <a href="javascript:;">{stateName[parseInt(text)-1]}</a>;   
		    },
		  },
		];
	    let { data={},loading} = this.state
	    if(!data)return null
	    const states = ['未支付','已支付','退款','未验证','已验证','已过期','已完结','已取消','现场支付']
	    const colors = ['#C0C0C0','#33CC66','#FF6633','#9999CC','#9966FF','#CC0000','#33FF66','#003333','#66CCFF']
	    return (
	    	<Spin spinning={loading}>
	        <Card bordered={false} style={{marginBottom:"30px"}}>
	          <DescriptionList size="large" title="订单状态" style={{ marginBottom: 32 }}>
	            <Description term="产品名称">{data.order_name}</Description>
	            <Description term="订单号">{data.order_number}</Description>
	            <Description term="订单状态"><b style={{color:colors[data.state]}}>{states[data.state]}</b></Description>
	            <Description term="订单来源">{data.order_source}</Description>
	            <Description term="支付方式">{data.pay_type==1?"支付宝支付":(data.pay_type==2?"微信支付":"现金支付")}</Description>
	            <Description term="下单时间">{data.create_time}</Description>
	            <Description term="订单总金额">{data.price}</Description>
	            <Description term="实收">{data.price}</Description>
	            <Description term="实际支付">{data.pay_price}</Description>
	            <Description term="总票数">1</Description>
	            <Description term="可使用">1</Description>
	            <Description term="已使用">0</Description>
	          </DescriptionList>
	          <Divider style={{ marginBottom: 32 }} />
	          <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
	            <Description term="用户姓名">付小小</Description>
	            <Description term="联系电话">18100000000</Description>
	            <Description term="身份证">5011121211111111</Description>
	            <Description term="性别">女</Description>
	            <Description term="生日">无</Description>
	            <Description term="地址">浙江省杭州市西湖区万塘路18号</Description>
	          </DescriptionList>
	          <Divider style={{ marginBottom: 32 }} />
	          <div className={styles.title}>门票列表</div>
	          <Table
	            style={{ marginBottom: 24 }}
	            dataSource={data.tklist}
	            pagination={false}
	            columns={goodsColumns}
	            rowKey="id"
	          />
	        </Card>
	        </Spin>
	    );
  }
}
export default TicketOrderView