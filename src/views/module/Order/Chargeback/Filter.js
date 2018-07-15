import React,{ Component } from 'react'

import { Row, Col , Card , Input , message , Modal,
    Select, DatePicker, Form, Button, Radio,
} from 'antd'
import moment from 'moment'
import { api, err as apierr } from '../../../../utils'
import styles from './style.less'


const FormItem = Form.Item
const Search = Input.Search
const Option = Select.Option
const ButtonGroup = Button.Group
const SelectOption = Select.Option
const { RangePicker } = DatePicker
const dateFormat = 'YYYY/MM/DD'
const InputGroup = Input.Group
const RadioGroup = Radio.Group


class ReservationFilterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            isFilter : false,
            checked: true,
        }
    }
    handleShowFilter = () =>{
        let isFilter = !this.state.isFilter;
        this.setState({isFilter});
    }
    handleChange = () => {

    }
    //标签
    handleTagChange = (checked) => {
        this.setState({ checked })
    }
    render(){
        const { handleSearch, handleOrderInputChange, handleClear, orderSearchId } = this.props
        // let {selected : { keys }} = this.props;
        // let { isFilter } = this.state;
        // if(!keys) keys = []
        return (
            <div className={styles.reservation}>
                <Row gutter={16}>
                    <Col sm={{ span: 2 ,offset : 1 }} xs={24}>
                        <span className={styles['labelText']}>
                            订单号：
                        </span>
                    </Col>
                    <Col sm={4} xs={24}>
                        <Input 
                            size="large" 
                            placeholder="请输入订单号" 
                            style={{ width: '100%' }}
                            value={orderSearchId}
                            onChange={handleOrderInputChange} 
                        />
                    </Col>
                    <Col sm={2} xs={24}>
                        <span className={styles['labelText']}>
                            订单状态：
                        </span>
                    </Col>
                    <Col sm={4} xs={24}>
                        <Select size="large" defaultValue="cq" onChange={this.handleCityChange} style={{ width: '100%' }}>
                            <Option value="bj">未审核</Option>
                            <Option value="sh">同意</Option>
                            <Option value="cq">拒绝</Option>
                            <Option value="tw" disabled>等待低三方平台审核通过</Option>
                        </Select>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: 24 }}>
                    <Col sm={{ span: 2 ,offset : 1 }} xs={24}>
                        <span className={styles['labelText']}>
                            申请时间：
                        </span>
                    </Col>
                    <Col sm={4} xs={24}>
                        <DatePicker size="large" defaultValue={moment('2017/01/01', dateFormat)} format={dateFormat} style={{ width: '100%' }} />
                    </Col>
                    <Col sm={2} xs={24}>
                        <span className={styles['labelText']}>
                            审核时间：
                        </span>
                    </Col>
                    <Col sm={4} xs={24}>
                        <DatePicker size="large" defaultValue={moment('2017/10/01', dateFormat)} format={dateFormat} style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row gutter={8} style={{ marginTop: 24 }}>
                    <Col sm={{span: 2 ,offset : 1}} xs={24}>
                        <span className={styles['labelText']}>
                            变更类型:
                        </span>
                    </Col>
                    <Col sm={10} xs={24}>
                        <InputGroup compact>
                            <Select size="large" defaultValue="a" style={{ width: '20%'}}>
                                <Option value="a">撤改</Option>
                                <Option value="b">撤销</Option>
                                <Option value="c">修改</Option>
                                <Option value="d">取消</Option>
                            </Select>
                            <Input size="large" style={{ width: '80%' }} placeholder="景区名称" />
                        </InputGroup>
                    </Col>
                    <Col sm={{ span: 2 }} xs={24}>
                    <Button type="primary" size="large" onClick={handleSearch}>搜索</Button>
                    </Col>
                    <Col sm={{ span: 3 }} xs={24}>
                    <Button type="dashed" size="large" onClick={handleClear}>清空</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default ReservationFilterForm