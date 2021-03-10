import React, { Component } from 'react';
import { Row, Col, Input, Icon, Card, Button, Avatar, message, Pagination, Modal } from 'antd'
import { api, err } from '../../../utils'
import Img from '../ImgUtil'

const defaultAvg = require('../../../public/imgs/1920-1080-1.jpg')

const { Meta } = Card

class VideoInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [], // 视频数据
      pageData: [], // 每页数据
      keyWord: '', // 搜索关键字
      current: 1, // 当前页
      totalCount: 0, // 总条数
      pageSize: 24, // 每页数量
      visible: false, // 图片模态框
      modalIMg: '', // 模态框图片链接
    }
  }
  componentDidMount() {
    const { current, pageSize, keyWord } = this.state
    this.fetch(current, pageSize, keyWord)
  }
  // 分页
  onChange = (page) => {
    const { keyWord, pageSize } = this.state
    this.fetch(page, pageSize, keyWord)
    this.setState({
      current: page,
      // pageData: data.slice((page - 1) * pageSize, page * pageSize),
    })
  }
  fetch = (currPage, length, keyWord) => {
    window.scrollTo(0, 0)
    api.get("hiVideo/getPageAll", { start: currPage, length, keyWord })
      .then((value) => {
        console.log('fetch', value)
        this.setState({
          // current: value.totalPage,
          totalCount: value.data.total,
          pageData: value.data.rows
         })
      })
      .catch(err)
  }

  // 查看图片
  handleLook = (src) => {
    this.setState({
      visible: true,
      modalIMg: src,
    })
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  // 播放
  play = (id) => {
    api.get("/video/play", { id })
      .then((value) => {
        // console.log(value)
      })
      .catch(err)
  }
  // 生成图片
  addImg = (id) => {
    if (!id) {
      message.warn("未获取到信息")
      return
    }
    api.post("/video/addimg", { id })
    .then((value) => {
      message.info('后台正在生成。。。请勿平凡操作');
    })
    .catch(err)
  }
  // 视频详情
  videoInfo = (id) => {
    const { history } = this.props
    history.push(`/module/video/detail/${id}`)
  }

  handleSearchChange = (e) => {
    this.setState({ keyWord: e.target.value })
  }

  handleSearch = () => {
    const { keyWord } = this.state
    this.fetch(1, keyWord)
  }


  render() {
    const { keyWord, current, totalCount, pageData, pageSize } = this.state

    return (
      <div>
        {/* <Modal
          title="图片预览"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="1000px"
        >
          <Img alt={`${modalIMg}`} src={modalIMg} width="100%" />
          <Button.Group>
            <Button type="primary">
              <Icon type="left" />
            </Button>
            <Button type="primary">
              <Icon type="right" />
            </Button>
          </Button.Group>
        </Modal> */}
        <Card>
          <Row>
            <Col xs={24} sm={10} md={10} lg={10} xl={10} style={{ marginTop: 16 }} >
              <Input
                onChange={this.handleSearchChange}
                value={keyWord}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="作品名称" size="large"
                onPressEnter={this.handleSearch}
              />
            </Col>
            <Col xs={24} sm={8} md={8} lg={8} xl={6} style={{ marginTop: 16, marginBottom: 16 }} >
              <Button
                type="primary"
                size="large"
                onClick={this.handleSearch}
                style={{ marginLeft: 16 }}
              >
                搜索
              </Button>
              <Button
                type="primary"
                size="large"
                style={{ marginLeft: 16, background: "#71B84F", borderColor: "#71B84F" }}
                onClick={this.handleClear}
              >
                还原
              </Button>
            </Col>
          </Row>
          <Row gutter={16}>
              {pageData.map((v, k) => {
                return (
                <Col xs={24} sm={12} md={8} lg={6} xl={6} key={k} style={{ marginTop: 12 }}>
                  <Card
                    hoverable
                    // style={{ width: 300 }}
                    cover={
                      <Img
                        alt="example"
                        // src={v.imgPath}
                        src = {`${require("../../../public/imgs/1920-1080-" + Math.floor((Math.random() * 1) + 1) +".jpg")}`}
                        // height="168.5px"
                        width="100%"
                        // defaultSrc={`${require("../../../public/imgs/1920-1080-" + Math.floor((Math.random() * 2) + 1) +".jpg")}`}
                        defaultSrc={`${require("../../../public/imgs/1920-1080-" + Math.floor((Math.random() * 1) + 1) +".jpg")}`}
                        onClick={() => this.videoInfo(v.id)}
                      />
                          }
                    actions={[<Icon type="play-circle" onClick={() => this.play(v.id)} />,
                    <Icon type="picture" onClick={() => this.addImg(v.id)} />,
                    <Icon type="ellipsis" onClick={() => this.videoInfo(v.id)} />,
                  ]}
                  >
                    <Meta
                      avatar={
                        <Img src={v.imgPath || defaultAvg} height="45px" width="45px" borderRadius="50%" />
                        // <Avatar src={v.imgPath || defaultAvg} size="large" />
                      }
                      title={
                        <div>
                          <p>
                            <span style={{ color: "#20B648", fontWeight: 400}}>{v.score || 0}分</span>
                            <span style={{ color: "#1890FF", fontWeight: 400, marginLeft: 24 }}>{v.sizeMb}mb</span>
                          </p>
                        </div>
                      }
                      description={
                        <div style={{overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          <span>{v.fileName}</span>
                        </div>
                      }
                    />
                  </Card>
                </Col>
                )
              })}
          </Row>
          <div style={{ marginTop: 24, float: "right" }} >
            <Pagination showQuickJumper total={totalCount} onChange={this.onChange} current={current} pageSize={pageSize} />
          </div>
        </Card>
      </div>
    );
  }
}

export default VideoInfo;