import React,{ Component } from 'react'
import { Row, Col , Card , Input , message , Modal , Affix,
    Select, DatePicker, Form, Button, Radio, Tag,
} from 'antd'
import moment from 'moment'
import { api, err as apierr } from '../../../../utils'
import styles from './style.less'


const FormItem = Form.Item
const Search = Input.Search
const Option = Select.Option
const ButtonGroup = Button.Group
const confirm = Modal.confirm
const SelectOption = Select.Option
const { RangePicker } = DatePicker
const dateFormat = 'YYYY/MM/DD'
const InputGroup = Input.Group
const RadioGroup = Radio.Group
const { CheckableTag } = Tag
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
//tag标签
class MyTag extends Component {
    state = { checked: false }

    handleChange = (checked) => {
        this.setState({ checked })
    }

    render() {
        let { checked } = this.state
        return <CheckableTag style={{ color: checked ? 'white' : "#f50",backgroundColor: checked ? '#f50' : 'white' }} {...this.props} checked={this.state.checked} onChange={this.handleChange} />;
  }
}

class ReservationFilterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            isFilter : false,
            checked: true,
        }
    }
    
    
    //标签
    handleTagChange = (checked) => {
        this.setState({ checked })
    }
    //地区
    handleCityChange = () => {

    }
    render(){
         const {
                handleProductNameSearch,
                handleSearch,
                handleClear, 
                productName,
                } = this.props
        // let {selected : { keys }} = this.props;
        // let { isFilter } = this.state;
        // if(!keys) keys = []
        return (
            <div className={styles.reservation}>
                <Row gutter={8}>
                    <Col sm={{span: 3 ,offset : 1}} xs={24}>
                        <span className={styles['labelText']}>
                            产品名称：
                        </span>
                    </Col>
                    <Col sm={10} xs={24}>
                        <Input
                            size="large"
                            placeholder="请输入产品名称"
                            value={productName}
                            onChange={handleProductNameSearch}
                        />
                    </Col>
                </Row>
                <Row gutter={8} style={{ marginTop: 16 }}>
                    <Col sm={{span: 3 ,offset : 1}} xs={24}>
                        <span className={styles['labelText']}>
                            产品类型：
                        </span>
                    </Col>
                    <Col sm={10} xs={24}>
                        <MyTag >全部</MyTag>
                        <MyTag>景点门票</MyTag>
                        <MyTag>旅游线路</MyTag>
                        <MyTag>酒店客房</MyTag>
                        <MyTag>套票产品</MyTag>
                        <MyTag>剧场演出</MyTag>
                        <MyTag>年卡产品</MyTag>
                    </Col>
                </Row>
                <Row gutter={8} style={{ marginTop: 16 }}>
                    <Col sm={{span: 3 ,offset : 1}} xs={24}>
                        <span className={styles['labelText']}>
                            所在地区：
                        </span>
                    </Col>
                    <Col sm={4} xs={24}>
                        <Select defaultValue="cq" onChange={this.handleCityChange} style={{ width: 150 }}>
                            <Option value="bj">北京</Option>
                            <Option value="sh">上海</Option>
                            <Option value="tw" disabled>台湾</Option>
                            <Option value="cq">重庆</Option>
                            <Option value="cd">成都</Option>
                        </Select>
                    </Col>
                    <Col sm={10} xs={24}>
                        <Select defaultValue="jfs" onChange={this.handleCityChange} style={{ width: 150 }}>
                            <Option value="jfs">金佛山</Option>
                            <Option value="xns">仙女山</Option>
                            <Option value="wds" disabled>武当山</Option>
                            <Option value="cszh">茶山竹海</Option>
                            <Option value="sms">四面山</Option>
                        </Select>
                    </Col>
                </Row>
                <Row gutter={8} style={{ marginTop: 16 }}>
                    <Col sm={{span: 3 ,offset : 1}} xs={24}>
                        <span className={styles['labelText']}>
                            旅游主题：
                        </span>
                    </Col>
                    <Col sm={10} xs={24}>
                        <MyTag >全部</MyTag>
                        <MyTag>城市观光</MyTag>
                        <MyTag>主题乐园</MyTag>
                        <MyTag>游乐山水</MyTag>
                        <MyTag>逐海踏浪</MyTag>
                        <MyTag>爱上古迹</MyTag>
                        <MyTag>冰雪世界</MyTag>
                        <MyTag>度假山庄</MyTag>
                        <MyTag>激情漂流</MyTag>
                    </Col>
                </Row>
                <Row gutter={8} style={{ marginTop: 16 }}>
                    <Col sm={{span: 3 ,offset : 1}} xs={24}>
                    </Col>
                    <Col sm={4} xs={24}>
                        <Button type="primary" size="large" onClick={handleSearch}>搜索</Button>
                    </Col>
                    <Col sm={4} xs={24}>
                        <Button
                            style={{ backgroundColor: '#f50', border: '0' }} 
                            type="primary" 
                            size="large" 
                            icon="retweet"
                            onClick={handleClear}
                        >
                        还原
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ReservationFilterForm