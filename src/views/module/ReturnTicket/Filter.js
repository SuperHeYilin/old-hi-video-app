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
} from 'antd'
import { Button } from '../../../components/Ui'
import {api, err as apierr} from '../../../utils'
import styles from './Filter.less'

const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker
class SearchForm extends Component {
    state = {
        expand: false,
    };
    handleFormReset = () => {
        const { form } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
    }
    toggleForm = () => {
        this.setState({
          expandForm: !this.state.expandForm,
        });
    }
    handleSearch = (e) => {
        e.preventDefault();
    const { form, OnSerch } = this.props;
    form.validateFields((err, fieldsValue) => {
             if (err) return;
            const values = {
                ...fieldsValue,
                take_time: fieldsValue.take_time && (fieldsValue.take_time[0].format("YYYY-MM-DD") + "," + fieldsValue.take_time[1].format("YYYY-MM-DD")),
                create_time: fieldsValue.create_time && (fieldsValue.create_time[0].format("YYYY-MM-DD") + "," + fieldsValue.create_time[1].format("YYYY-MM-DD")),
            };
            OnSerch({...values})
            this.setState({
                formValues: values,
            });
        });
    }
    renderSimpleForm = () => {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline" >
                <Row
                    gutter={{
                    md: 8,
                    lg: 24,
                    xl: 48}}
                >
                    <Col md={6} sm={24}>
                        <FormItem label="门票编号">
                            {getFieldDecorator('ticket_num')(<Input placeholder="请输入门票编号" />)}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="手机号码">
                            {getFieldDecorator('mobile_no')(
                               <InputNumber style={{width: '100%'}} placeholder="请输入电话号码" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="验证码">
                            {getFieldDecorator('code')(
                               <InputNumber style={{width: '100%'}} placeholder="请输入验证码" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button
                                style={{
                                marginLeft: 8}}
                                onClick={this.handleFormReset}
                            >
                            重置
                            </Button>
                            <a
                                style={{
                                marginLeft: 8}}
                                onClick={this.toggleForm}
                            >
                                展开
                                <Icon type="down" />
                            </a>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }
    renderAdvancedForm = () => {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row
                    gutter={{
                    md: 8,
                    lg: 24,
                    xl: 48}}
                >
                    <Col md={8} sm={24}>
                        <FormItem label="订单编号">
                            {getFieldDecorator('only_no')(<Input placeholder="请输入订单编号" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="游玩时间">
                            {getFieldDecorator('play_date')(<RangePicker
                                style={{ width: '100%'}}
                            />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="电话号码">
                            {getFieldDecorator('mobile_num')(
                                <InputNumber style={{ width: '100%' }} placeholder="请输入电话号码" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row
                    gutter={{
                    md: 8,
                    lg: 24,
                    xl: 48}}
                >
                    <Col md={8} sm={24}>
                        <FormItem label="产品名称">
                            {getFieldDecorator('product_name')(<Input placeholder="请输入产品名称" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="购票渠道">
                            {getFieldDecorator('state')(
                                <Select placeholder="请选择" >
                                    <Option value="0">携程网</Option>
                                    <Option value="1">去哪网</Option>
                                    <Option value="2">景区官网</Option>
                                    <Option value="3">APP</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="购买时间">
                            {getFieldDecorator('pay_date')(<RangePicker
                                style={{ width: '100%'}}
                            />)}
                        </FormItem>
                    </Col>
                </Row>
                <div style={{
                    overflow: 'hidden' }}
                >
                    <span style={{ float: 'right', marginBottom: 24 }} >
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button
                            style={{
                            marginLeft: 8 }}
                            onClick={this.handleFormReset}
                        >
                        重置
                        </Button>
                        <a style={{ marginLeft: 8 }} onClick={this.toggleForm} >
                            收起 <Icon type="up" />
                        </a>
                    </span>
                </div>
            </Form>
        );
    }
    renderForm = () => {
        return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }
    render() {
        return (
            <div className={styles.tableListForm} >
                {this.renderForm()}
            </div>
        )
    }
}
const RSearchForm = Form.create()(SearchForm);
class TicketOrderFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFilter: false
        }
    }
    render() {
        let { onFilter } = this.props
        return (
            <div>
                <div className="row">
                    <h1 className="title" style={{fontSize: "22px", marginLeft: "8px"}}>退票</h1>
                </div>
                <Divider style={{margin: "-5px 0 15px 0"}} />
                <RSearchForm OnSerch={onFilter} />
            </div>
        )
    }
}

export default TicketOrderFilter