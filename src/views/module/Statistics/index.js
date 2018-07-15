import React, { Component, Fragment } from 'react'
import { Ibox } from '../../../components/Ui'
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';

import {api, err as apierr} from '../../../utils'
import Trend from './Trend';
import ChartCard from './ChartCard';
import Field from './Field'; 
import NumberCard from './NumberCard';
import numeral from 'numeral';
import styles from './Analysis.less';
import TicketOrderList from './List';
import SearchForm from './SearchForm';

import { getTimeDistance } from './utils/utils';
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const yuan = val => `&yen; ${numeral(val).format('0,0')}`;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}	
class Statistics extends Component {
    constructor(props) {
        super(props)
        let time = getTimeDistance('year')
        this.state = {
        	loading:false,
        	salesType: 'all',
    			currentTabKey: '',
        	rangePickerValue: time,
        	countData:{},
        	searchTime:{stime:time[0].format('YYYY-MM-DD 00:00:00'),etime:time[1].format('YYYY-MM-DD 23:59:59')},
        }
        this.initView()
    }
    
    initView=()=>{
    	 api.get("/ticket/order/statis")
        .then((result) => {
	         this.setState({countData:result})
        })
        .catch((err) => {
	        api.err(err)
        })
    }
    
		isActive(type) {
	    const { rangePickerValue } = this.state;
	    const value = getTimeDistance(type);
	    if (!rangePickerValue[0] || !rangePickerValue[1]) {
	      return;
	    }
	    if (
	      rangePickerValue[0].isSame(value[0], 'day') &&
	      rangePickerValue[1].isSame(value[1], 'day')
	    ) {
	      return styles.currentDate;
	    }
	  }
		handleRangePickerChange = rangePickerValue => {
	    this.setState({
	      rangePickerValue,
	      searchTime:{stime:rangePickerValue[0].format('YYYY-MM-DD 00:00:00'),etime:rangePickerValue[1].format('YYYY-MM-DD 23:59:59')},
	    });
	  };
	
	  selectDate = type => {
	  	let time = getTimeDistance(type)
	    this.setState({
	      rangePickerValue: time,
	      searchTime:{stime:time[0].format('YYYY-MM-DD 00:00:00'),etime:time[1].format('YYYY-MM-DD 23:59:59')},
	    });
	    
	  };
    render() {
    	const { rangePickerValue, salesType, currentTabKey,loading,searchTime=[] } = this.state;
    	const { history } = this.props
    		const topColResponsiveProps = {
		      xs: 24,
		      sm: 12,
		      md: 12,
		      lg: 12,
		      xl: 6,
		    };
        const salesExtra = (
		      <div className={styles.salesExtraWrap}>
		        <div className={styles.salesExtra}>
		          <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
		            今日
		          </a>
		          <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
		            本周
		          </a>
		          <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
		            本月
		          </a>
		          <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
		            全年
		          </a>
		        </div>
		        <RangePicker
		          value={rangePickerValue}
		          onChange={this.handleRangePickerChange}
		          style={{ width: 256 }}
		        />
		      </div>
		    );
		    const { countData } = this.state
        return (
        		<div style={{marginBottom:"30px"}}>
			        <Row gutter={24}>
			          <Col {...topColResponsiveProps}>
			             <NumberCard decimals={2} icon="pay-circle-o" color="#8fc9fb" title="今日销售额" number={countData.dayprice} />
			          </Col>
			          <Col {...topColResponsiveProps}>
			             <NumberCard icon="shopping-cart" color="#64ea91" title="今日订单总数" number={countData.daycount} />
			          </Col>
			          <Col {...topColResponsiveProps}>
			             <NumberCard icon="like" color="#f69899" title="今日使用票" number={countData.tkcount} />
			          </Col>
			          <Col {...topColResponsiveProps}>
			             <NumberCard icon="minus-circle-o" color="#d897eb" title="今日退款票" number={countData.rfcount} />
			          </Col>
		          </Row>
		          
		          <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
			          <div className={styles.salesCard}>
			            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
			              <TabPane tab="订单列表" key="sales">
			                <Row>
			                  <TicketOrderList data={searchTime} history={history}/>
			                </Row>
			              </TabPane>
			              <TabPane tab="高级搜索" key="views">
			                <Row>
			                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
			                    <div>
			                      <SearchForm />
			                    </div>
			                  </Col>
			                </Row>
			              </TabPane>
			            </Tabs>
			          </div>
			        </Card>
	          </div>
        )
    }
}

export default Statistics