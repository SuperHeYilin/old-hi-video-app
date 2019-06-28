import React, { Component } from 'react'
import { Form, Card, Row, Col, message } from 'antd'
import { Button, Input } from '../../components/Ui'
import Background from './Background'
import { api, auth, getParam } from '../../utils'

import styles from './Login.less'

const FormItem = Form.Item

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginLoading: false,
    }
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress)
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
    const {form: { validateFields }, history } = this.props

    validateFields((error, values) => {
      if (error) {
        return
      }
      this.setState({loginLoading: true})

      api.post("/sessions", values)
      .then((result) => {
        message.success("登陆成功!", 1, () => {
          auth.login(result.token.token, result.userId)// resp.token,resp.userId

          let refer = getParam("ret")
          refer = refer || '/'

          history.push(refer)
        })
      })
      .catch((err) => {
        this.setState({loginLoading: false})
        api.err(err)
      })
    })
  }

  render() {
    const { form } = this.props
    const { loginLoading } = this.state
    const { getFieldDecorator } = form

    return (
      <div className={styles.login_page}>
        <Background />
        <div className={styles['wrapper-panel']}>
          <Card bordered={false} 	>
            {/* <img alt="logo" src={require('../../public/imgs/logo/logo.png')} /> */}
            <Form>
              <Row gutter={24}>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <FormItem >
                    {getFieldDecorator('username', {
                    rules: [
                      { required: true, message: '请填写用户名称' },
                    ],
                    })(
                    <Input
                    hintText="请输入用户名称"
                    floatingLabelText="用户名"
                    fullWidth={true}
                    required
                    maxLength={12}
                    />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col lg={24} md={24} sm={24} xs={24}>
                  <FormItem >
                    {getFieldDecorator('password', {
                    rules: [
                      { required: true, message: '请填写登陆密码' },
                    ],
                    })(
                    <Input
                    hintText="请输入密码"
                    floatingLabelText="密码"
                    type="password"
                    fullWidth={true}
                    required
                    maxLength={20}
                    />
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={24} className={styles.recover}>
                  <a>修改密码</a>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{textAlign: 'center'}}>
                  <Button type="primary" loading={loginLoading} size="large" onClick={this.handleSubmit} >登陆</Button>
                </Col>
              </Row>
              <Row gutter={24} style={{fontSize: 15, marginTop: 20, fontWeight: 500 }}>
                <Col span={24} style={{textAlign: 'center'}}>
                  <span>版本beta0.1</span>
                </Col>
              </Row>
            </Form>
          </Card>
          {/* <Card bordered={false} className={styles.other_card} bodyStyle={{padding:0}}>
              <Button type="danger" size="large" onClick={()=>{}}>其他登陆方式</Button>
          </Card> */}
        </div>
      </div>
    )
  }
}

const Login = Form.create()(LoginForm)

export default Login