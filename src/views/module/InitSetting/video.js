import React, { Component } from 'react'
import { Layout, Card, Row, Col, Select, Button, Icon, Modal, Input, Table, message, List, Tree } from 'antd'
import { Ibox } from '../../../components/Ui'
import { api, err } from '../../../utils'

const { Header, Footer, Sider, Content } = Layout;
const Option = Select.Option

export default class video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPath: "",
      disk: [],
      diskCode: "default",
    }
  }
  componentDidMount() {
    this.fetch()
  }
  fetch = () => {
    api
      .get("/fileDisk/findAll")
      .then((data) => {
        this.setState({ disk: data.data })
      })
  }
  // 选择盘符
  handleChange = (value) => {
    this.setState({ diskCode: value })
  }
  handleInit = () => {
    const { diskCode, videoPath } = this.state
    api.post("/hiVideo/init", { path: videoPath, code: diskCode })
      .then((result) => {
        if (result.rel) {
          message.success("添加成功")
          this.fetch()
      } else {
          message.error(result.msg)
      }
      })
  }
    // 选取磁盘
    handleChoose = (e) => {
      this.setState({ videoPath: e.target.value })
    }
  render() {
    const { videoPath, disk, diskCode } = this.state
    return (
      <div>
        <Layout>
        <Content>
        <Ibox>
          <Ibox.IboxTitle>
            ssss
          </Ibox.IboxTitle>
          <Ibox.IboxContent>
            <Row>
              <Col>
                <Input value={videoPath} placeholder="文件夹路径" onChange={this.handleChoose} style={{ width: 220, marginRight: 24 }} size="large" />
                <Select value={diskCode} style={{ width: 220 }} onChange={this.handleChange} size="large" >
                  {disk.map((v, k) => {
                    return (
                      <Option value={v.code} key={v.id}>{v.name}</Option>
                    )
                  })}
                  <Option value="default">选择盘符</Option>
                </Select>
                <Button type="primary" size="large" onClick={this.handleInit} style={{ marginLeft: 24 }}>初始化</Button>
                <Button type="primary" size="large" onClick={this.handleUpdate} style={{ marginLeft: 24 }}>更新缓存</Button>
              </Col>
            </Row>
          </Ibox.IboxContent>
        </Ibox>
        </Content>
        </Layout>
      </div>
    )
  }
}
