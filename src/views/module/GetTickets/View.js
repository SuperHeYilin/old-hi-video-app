import React, {Component} from 'react'
import { Col,Row,Card, Badge, Table, Divider,message } from 'antd';
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
	
	
	componentDidMount() {
		
  }
	componentDidUpdate(){
	
	}
	onRefund=()=>{
		alert();
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
	    let { data } = this.props
	    if(!data)return null
	    return (
	        <Card bordered={false}>
	          <DescriptionList size="large" title="订单状态" style={{ marginBottom: 32 }}>
	            <Description term="产品名称">{data.order_name}</Description>
	            <Description term="订单号">{data.order_number}</Description>
	            <Description term="订单状态"><b style={{color:"#33CC66"}}>已支付</b></Description>
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
	          <div className={styles.title}></div>
	           <Row>
            	<Col xs={24} style={{textAlign:"center"}} >
                    <Button onClick={()=>this.onOkTicket()} type="primary" size="large" style={{width:"25%",backgroundColor:"#52AB56",borderColor:"#52AB56"}}>确认取票</Button>
            	</Col>
            </Row>
	        </Card>
	    );
  }
}
export default TicketOrderView