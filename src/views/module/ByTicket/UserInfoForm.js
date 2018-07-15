import React from 'react'
import { Form, Input} from 'antd';

const FormItem = Form.Item
const { TextArea } = Input
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
}

class UserInfoTableForm extends React.Component {
  handleSubmit = (e) => {
    console.log(123232323)
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }
  render() {
    const { form, item = {} } = this.props;
    const { getFieldDecorator } = form;
    return (
        <Form layout="inline">
          {getFieldDecorator('id', {
            // initialValue: item.id,
          })(
            <Input type="hidden" />
          )}
          <FormItem label="姓名">
            {getFieldDecorator('name', {
              initialValue: item.nickname,
              // rules: [{
              //   required: true, message: '请填写姓名',
              // },
                // {
                //   pattern: /^[a-zA-Z0-9_]{4,16}$/, message: "请输入4-16位字母(区分大小写)、数字、下划线",
                // },
              // ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="手机">
            {getFieldDecorator('mobile_no', {
              // initialValue: item.realname,
              rules: [
                { required: true, message: '请填写手机号' },
                {
                  pattern: /^1[3|5|8|7]\d{9}$/, message: '请输入正确的手机格式',
                },
              ],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="身份证">
            {getFieldDecorator('card_no', {
              // initialValue: item.phonenum,
              // rules: [{
              //   required: true, message: '请填写身份证',
              // },
                // {
                //   pattern: /^1[3|5|8|7]\d{9}$/, message: '请输入正确的手机格式',
                // },
              // ],
            })(<Input />)}
          </FormItem>
          {/* <FormItem
            label="备注"
          >
            {getFieldDecorator('info', {
              // initialValue: item.email,
            //   rules: [{
            //     required: true, message: '请填写邮件',
            //   },
            // ],
            })(<TextArea placeholder="请填写相关备注" autosize={{ minRows: 4, maxRows: 8 }} style={{ width: "400px" }} />)}
          </FormItem> */}
        </Form>
      );
    }
  }

const UserInfoForm = Form.create()(UserInfoTableForm)
export default UserInfoForm
