import React, { Component } from 'react'
import { Ibox } from '../../../components/Ui'
import { Spin, Row, Col, Form, Card, List,Switch  } from 'antd'
import {api, err as apierr} from '../../../utils'
import styles from './Filter.less'


class TicketOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
        	loading:false,
        	list:[]
        }
        this.onFrach()
    }

	onRefresh = (loading)=>{
    	this.setState({loading: loading})
	}
	onChange = (id,checked) =>{
		api.put("/tn/setting/"+id+"/"+(checked?1:0))
        .then((result) => {
	        if(result){
	        	this.setState({list:result})
	        }else{
	        	message.info("操作失败!", 2)
	        }
        })
        .catch((err) => {
	        api.err(err)
        })
	}
	onFrach=()=>{
    	api.get("/tn/setting")
        .then((result) => {
	        if(result){
	        	this.setState({list:result})
	        }else{
	        	 message.info("未查询数据!", 2)
	        }
        })
        .catch((err) => {
	        api.err(err)
        })
	}
	
    render() {
        let { loading,list } = this.state
        
        return (
        		<Spin spinning={loading}>
		            <Ibox>
		            	<Ibox.IboxTitle style={{fontSize:"24px",background:"transparent",color:"#FFFFFF"}}>
		            	设置中心
		                </Ibox.IboxTitle>
		                <Ibox.IboxContent className={styles.contentAnimation}>
							<List
					          rowKey="id"
					          style={{ marginTop: 24 }}
					          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
					          loading={loading}
					          dataSource={list}
					          renderItem={item => (
					            <List.Item key={item.id}>
					              <Card
					                hoverable
					                bodyStyle={{ paddingBottom: 20 }}
					              >
					                <div className={styles.cardItemContent}>
					                	{item.title}
					                	<Switch style={{float:"right"}} checked={item.is_on==1} checkedChildren="是" unCheckedChildren="否" onChange={this.onChange.bind(this,item.id)} />
					                </div>
					              </Card>
					            </List.Item>
					          )}
					        />
						</Ibox.IboxContent>
		            </Ibox>
	            </Spin>
        )
    }
}

export default TicketOrder