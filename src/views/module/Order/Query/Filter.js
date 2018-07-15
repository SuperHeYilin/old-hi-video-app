import React,{ Component } from 'react'
import { Row, Col , Card , Input , message , Modal , Affix,
    Select, DatePicker, Form, Button, Radio,
} from 'antd'
import moment from 'moment'
import { api, err as apierr } from '../../../../utils'

import styles from './style.less'
import { homedir } from 'os';

const FormItem = Form.Item
const Search = Input.Search
const ButtonGroup = Button.Group
const confirm = Modal.confirm
const Option = Select.Option
const { RangePicker } = DatePicker
const dateFormat = 'YYYY/MM/DD'
const InputGroup = Input.Group
const RadioGroup = Radio.Group
const formItemLayout = {
            labelCol: {
                xs: { span: 24, },
                sm: { span: 2, },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 13, offset: 1 },
            },
        };

class OrderFilterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            isFilter : false,
        }
    }

    //隐藏显示
    handleShowFilter = () =>{
        let isFilter = !this.state.isFilter;
        this.setState({ isFilter });
    }

    render(){
        const { isFilter } = this.state;
        // let {selected : { keys }} = this.props;
        const { handleSearch, handleOrderInputChange, handleClear, orderSerachText } = this.props
        

        return (
            <div className={styles.reservation}>
                <div style={{ display : isFilter ? "none" : "block" }}>
                    <Row gutter={8} style={{ marginTop: 24 }}>
                        <Col sm={{span: 2}} xs={24}>
                            <span className={styles['labelText']}>
                                订单信息：
                            </span>
                        </Col>
                        <Col sm={ 6 } xs={24}>
                            <InputGroup compact>
                                <Select size="large" defaultValue="a" style={{ width: '30%'}}>
                                    <Option value="a">订单号</Option>
                                    <Option value="b">产品名称</Option>
                                    <Option value="c">取票人手机</Option>
                                    <Option value="d">取票人姓名</Option>
                                    <Option value="g">优惠券名称</Option>
                                    <Option value="h">身份证</Option>
                                    <Option value="j">第三方订单号</Option>
                                </Select> 
                                <Input 
                                    size="large"
                                    style={{ width: '70%' }} 
                                    placeholder="请填写筛选信息"
                                    value={orderSerachText}
                                    onChange={handleOrderInputChange}
                                />
                            </InputGroup>
                        </Col>
                        <Col sm={{span: 2 }} xs={24}>
                            <span className={styles['labelText']}>
                                销售渠道：
                            </span>
                        </Col>
                        <Col sm={ 6 } xs={24}>
                            <InputGroup compact>
                                <Select size="large" defaultValue="a" style={{ width: '30%'}}>
                                    <Option value="a">供应商</Option>
                                    <Option value="b">分销商</Option>
                                </Select>
                                <Input size="large" style={{ width: '70%' }} placeholder="请填写筛选信息" />
                            </InputGroup>
                        </Col>
                        <Col sm={{ span: 6, offset: 1 } } xs={24}>
                            <Button type="primary" value="large" onClick={handleSearch}>查询</Button>
                            <Button style={{ marginLeft: 8 }} value="large" onClick={handleClear}>重置</Button>
                            <Button style={{ marginLeft: 8}} icon="down" value="large" onClick={this.handleShowFilter}>展开</Button>
                        </Col>
                    </Row>
                </div>
            <div style={{ marginTop: '10px' , display : isFilter ? "block" : "none"}}>
                        <Row gutter={8} style={{ marginTop: 24 }}>
                        <Col sm={{span: 3 ,offset : 1}} xs={24}>
                            <span className={styles['labelText']}>
                                订单信息：
                            </span>
                        </Col>
                        <Col sm={ 10 } xs={24}>
                            <InputGroup compact>
                                <Select size="large" defaultValue="a" style={{ width: '20%'}}>
                                    <Option value="a">订单号</Option>
                                    <Option value="b">产品名称</Option>
                                    <Option value="c">取票人手机</Option>
                                    <Option value="d">取票人姓名</Option>
                                    <Option value="g">优惠券名称</Option>
                                    <Option value="h">身份证</Option>
                                    <Option value="j">第三方订单号</Option>
                                </Select> 
                                <Input 
                                    size="large"
                                    style={{ width: '80%' }} 
                                    placeholder="请填写筛选信息"
                                    value={orderSerachText}
                                    onChange={handleOrderInputChange}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row gutter={8} style={{ marginTop: 24 }}>
                            <Col sm={{span: 3 ,offset : 1 }} xs={24}>
                                <span className={styles['labelText']}>
                                    销售渠道：
                                </span>
                            </Col>
                            <Col sm={ 10 } xs={24}>
                            <InputGroup compact>
                                <Select size="large" defaultValue="a" style={{ width: '20%'}}>
                                    <Option value="a">供应商</Option>
                                    <Option value="b">分销商</Option>
                                </Select>
                                <Input size="large" style={{ width: '80%' }} placeholder="请填写筛选信息" />
                            </InputGroup>
                            </Col>
                    </Row>
                <Row gutter={8} style={{marginTop: 24 }}>
                        <Col sm={{span: 3 ,offset : 1}} xs={24}>
                            <span className={styles['labelText']}>
                                时间段：
                            </span>
                        </Col>
                        <Col sm={10} xs={24}>
                        <Select
                            size="large"
                            showSearch
                            style={{ width: 300 }}
                            placeholder="选择时间段"
                            >
                                <Option value="">2017-01-01以后</Option>
                                <Option value="lucy">2016-07-01~2016-12-31</Option>
                                <Option value="tom">2016-01-01~2016-06-30</Option>
                                <Option value="to">2015-07-01~2015-12-31</Option>
                        </Select>
                        </Col>
                </Row>
                <Row gutter={8} style={{ marginTop: 24 }}>
                        <Col sm={{span: 3 ,offset : 1}} xs={24}>
                            <span className={styles['labelText']}>
                                下单时间：
                            </span>
                        </Col>
                        <Col sm={10} xs={24}>
                            <RangePicker size="large" style={{ width: '100%' }} showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Col>
                </Row>
                
                <Row gutter={8} style={{ marginTop: 24 }}>
                        <Col sm={{span: 3 ,offset : 1}} xs={24}>
                            <span className={styles['labelText']}>
                                最近时间：
                            </span>
                        </Col>
                        <Col sm={10} xs={24}>
                            <Radio.Group size="large">
                                <Radio.Button value="large">清除</Radio.Button>
                                <Radio.Button value="default">昨天</Radio.Button>
                                <Radio.Button value="smal">今天</Radio.Button>
                                <Radio.Button value="sml">本周</Radio.Button>
                                <Radio.Button value="sma">上周</Radio.Button>
                                <Radio.Button value="sm">本月</Radio.Button>
                                <Radio.Button value="sall">上月</Radio.Button>
                            </Radio.Group>
                        </Col>
                </Row>
                <Row gutter={8} style={{ marginTop: 24 }}>
                        <Col sm={{span: 3 ,offset : 1}} xs={24}>
                            <span className={styles['labelText']}>
                                订单状态：
                            </span>
                        </Col>
                        <Col sm={10} xs={24}>
                            <RadioGroup>
                                <Radio value="e">全部</Radio>
                                <Radio value="r">未支付</Radio>
                                <Radio value="r">已支付</Radio>
                                <Radio value="t">未验证</Radio>
                                <Radio value="y">部分验证</Radio>
                                <Radio value="u">已验证</Radio>
                                <Radio value="i">已过期</Radio>
                                <Radio value="o">已完结</Radio>
                                <Radio value="p">已取消</Radio>
                                <Radio value="a">现场支付</Radio>
                            </RadioGroup>
                        </Col>
                </Row>
                <Row gutter={8} style={{ marginTop: 24 }}>
                        <Col sm={{span: 3 ,offset : 1}} xs={24}>
                            <span className={styles['labelText']}>
                                供销渠道：
                            </span>
                        </Col>
                        <Col sm={10} xs={24}>
                            <RadioGroup >
                                <Radio value="e">全部</Radio>
                                <Radio value="f">供应的产品</Radio>
                                <Radio value="f">分销的产品</Radio>
                            </RadioGroup>
                        </Col>
                        <Col xs={ 24 } sm={{ span:6, offset: 1 }}>
                            <Button type="primary" value="large" onClick={handleSearch}>查询</Button>
                            <Button style={{ marginLeft: 8 }} value="large" onClick={handleClear}>重置</Button>
                            <Button 
                            style={{ marginLeft: 8}} 
                            icon={isFilter ? "up" : "down" }
                            value="large" 
                            onClick={this.handleShowFilter}
                            >
                            {isFilter ? '收起' : '展开' }
                            </Button>
                        </Col>
                </Row>  
            </div>
        </div>
        )
    }
}

const OrderFilter = Form.create()(OrderFilterForm)

export default OrderFilter