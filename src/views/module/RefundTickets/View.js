import React, {Component} from 'react'
import { Col,Row,Card, Badge, Table, Divider,message,Modal,InputNumber} from 'antd';
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
        this.state = {
            visible: false,
            btnLoading:false
        }
    }
	componentDidMount() {
		
  }
	componentDidUpdate(){
	
	}
	
	showModal = () => {
    this.setState({
      visible: true,
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
      btnLoading:false,
      numberValue:null
    });
  }
	
	onInputChange=(e)=>{
		this.setState({
      numberValue: e,
    });
		
	}
	
	onOkRefund = ()=>{
		let { data,onSearch } = this.props
		let {row,numberValue} = this.state
		if(!numberValue){
			message.error("请输入数量", 1)
			return 
		}
		this.setState({btnLoading: true});
		 api.put("/ticket/order/refund/tk",{orderId:data.id,childId:row.id,count:numberValue})
        .then((result) => {
	        if(result){
	        		message.success("操作成功!", 1,()=>{
	        			this.hideModal()
	        			onSearch()
	        		})
	        }else{
	        	 message.error("操作失败,请联系管理员！", 2)
	        	 this.setState({btnLoading: false});
	        }
        })
        .catch((err) => {
	        api.err(err)
        })
	}
	
	onRefund=(row)=>{
		this.setState({
      row: row,
    });
    this.showModal()
	}
	
	onOkTicket=()=>{
		 let { data,onFilter,clearInput } = this.props
		 api.put("/ticket/order/refund",{orderId:data.id})
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
		  },{
		    title: '操作',
		    dataIndex: 'state1',
		    key: 'state1',
		    align: 'right',
		    render: (text, row, index) => {
		       return <a href="javascript:;" onClick={()=>this.onRefund(row)}>退款</a>;
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
                    <Button onClick={()=>this.onOkTicket()} type="primary" size="large" style={{width:"25%",backgroundColor:"#52AB56",borderColor:"#52AB56"}}>全部退票</Button>
            	</Col> 
            </Row>
             <Modal
                width="200px"
			          title="请输入退票数量"
			          style={{ top: "35%" }}
			          visible={this.state.visible}
			          onOk={this.onOkRefund}
			          onCancel={this.hideModal}
			          okText="确认"
			          cancelText="取消"
			          footer={[
			            <Button style={{marginRight:"10px"}} key="back" onClick={this.hideModal}>关闭</Button>,
			            <Button key="submit" type="danger" ghost loading={this.state.btnLoading} onClick={this.onOkRefund}>
			              确认
			            </Button>,
			          ]}
			        >
			        	<InputNumber value={this.state.numberValue} style={{width:"100%"}} autoFocus={true} min={0} max={99} step={1} onChange={this.onInputChange} />
			        </Modal>
	        </Card>
	    );
  }
}
export default TicketOrderView
