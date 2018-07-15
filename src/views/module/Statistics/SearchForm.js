import React, { Component, Fragment } from 'react'
import { Row,
    Col,
    Input,
    Form,
    Icon,
    Select,
    InputNumber,
    DatePicker,
    Divider
} from 'antd'
import {api, err as apierr} from '../../../utils'
import { Button } from '../../../components/Ui'
import styles from './Filter.less'
const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker

class SearchForm extends Component {
	
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    
    render() {
    	const {getFieldDecorator} = this.props.form;
    	return (<Form className={styles.tableListForm} onSubmit={this.handleSearch} layout="inline">
                <Row
                    gutter={{
                    md: 8,
                    lg: 24,
                    xl: 48
                }}>
                    <Col md={8} sm={24}>
                        <FormItem label="订单编号">
                            {getFieldDecorator('order_number')(<Input placeholder="请输入订单编号"/>)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="门票票码">
                            {getFieldDecorator('ver_code')(<Input placeholder="请输入门票票码"/>)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="电话号码">
                            {getFieldDecorator('phone_number')(<InputNumber
                                style={{
                                width: '100%'
                            }}  placeholder= "请输入电话号码" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="身份证号">
                            {getFieldDecorator('user_code')(<Input placeholder="请输入身份证号"/>)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="支付方式">
                            {getFieldDecorator('pay_type')(
                                <Select placeholder="请选择" >
                                    <Option value="0">支付宝支付</Option>
                                    <Option value="1">微信支付</Option>
                                    <Option value="2">现金支付</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="订单状态">
                            {getFieldDecorator('state')(
                                <Select placeholder="请选择" >
                                    <Option value="0">未支付</Option>
                                    <Option value="1">已支付</Option>
                                    <Option value="2">退款</Option>
                                    <Option value="3">未验证</Option>
                                    <Option value="4">已验证</Option>
                                    <Option value="5">已过期</Option>
                                    <Option value="6">已完结</Option>
                                    <Option value="7">已取消</Option>
                                    <Option value="8">现场支付</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row
                    gutter={{
                    md: 8,
                    lg: 24,
                    xl: 48,
                    }}
                >
                    <Col md={8} sm={24}>
                        <FormItem label="下单时间">
                            {getFieldDecorator('create_time')(<RangePicker
                                style={{
                                width: '100%'
                            }} />)}
                        </FormItem> 
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="使用时间">
                            {getFieldDecorator('take_time')(<RangePicker
                                style={{
                                width: '100%'
                            }} />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="订单来源">
                            {getFieldDecorator('order_source')(
                                <Select placeholder="请选择订单来源" >
                                    <Option value="0">携程网</Option>
                                    <Option value="1">去哪儿旅行</Option>
                                    <Option value="2">阿里去旅行</Option>
                                    <Option value="3">驴妈妈</Option>
                                    <Option value="4">散客</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <div style={{
                    overflow: 'hidden',
                    textAlign:'center',
                    marginBottom: 24
                }}>
                    <span>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button
                            style={{
                            marginLeft: 8
                        }}
                            onClick={this.handleFormReset}>重置</Button>
                    </span>
                </div>
            </Form>)
    }
}
const SearchForm1 = Form.create()(SearchForm)
export default SearchForm1