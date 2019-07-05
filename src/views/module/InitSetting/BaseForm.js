import React from 'react'
import { Form, Input, Radio, InputNumber } from 'antd'

const FormItem = Form.Item

const BaseForm = Form.create()(
  (props) => {
    const { form, item = {} } = props
    const { getFieldDecorator } = form
    return (
      <Form layout="vertical">
        {getFieldDecorator('id', {
          initialValue: item.id,
        })(
          <Input type="hidden" />
        )}
        <FormItem label="配置名称">
          {getFieldDecorator('settingName', {
            initialValue: item.settingName,
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="配置code">
          {getFieldDecorator('settingCode', {
            initialValue: item.settingCode,
          })(
            <Input />
          )}
        </FormItem>
        <FormItem label="参数">
          {getFieldDecorator('settingValue',{
            initialValue: item.settingValue,
          })(<Input />)}
        </FormItem>
      </Form>
    )
  }
)

export default BaseForm