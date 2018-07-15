import React from 'react'
import { Form, Input, DatePicker, Button, Row, Col } from 'antd';
// import classnames from 'classnames'
// import styles from './index.less'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 18,
      offset: 6,
    },
  },
}

const PriceForm = (
  (props) => {
    const { type, form, item = {} } = props;
    return (
        <div>
          {/* <Form>
          {getFieldDecorator('id', {
            // initialValue: item.id,
          })(
            <Input type="hidden" />
          )}
          <FormItem {...formItemLayout} label="时间">
            {getFieldDecorator('playday', {
              // initialValue: item.nickname,
              rules: [{
                required: true, message: '请填写时间',
              },
                // {
                //   pattern: /^[a-zA-Z0-9_]{4,16}$/, message: "请输入4-16位字母(区分大小写)、数字、下划线",
                // },
              ],
            })(
              <DatePicker />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="收款">
            {getFieldDecorator('phone', {
              // initialValue: item.realname,
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="找零">
            {getFieldDecorator('idcard', {
              // initialValue: item.phonenum,
              // rules: [{
              //   required: true, message: '请填写身份证',
              // },
                // {
                //   pattern: /^1[3|5|8|7]\d{9}$/, message: '请输入正确的手机格式',
                // },
              // ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem {...tailFormItemLayout} >
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{ width: "80%", background: "#06A97A", borderColor: "#06A97A" }}
            >
              现金支付
            </Button>
          </FormItem>
          </Form> */}
        </div>
    );
  }
)

export default PriceForm
