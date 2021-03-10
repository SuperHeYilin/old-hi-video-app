import React, { Component } from 'react';
import { Card, Button, Row, Col, Icon, message, Tag, Input, Modal } from 'antd'
import { api, err } from '../../../utils'
import Img from '../ImgUtil'

import styles from './index.less'

const { Meta } = Card
const dataImg = [1,2,3,4,5,6]
const CheckableTag = Tag.CheckableTag
const Search = Input.Search
const defaultImg = require('../../../public/imgs/video.jpg')

class VideoDetail extends Component {
  constructor(props) {
    super(props)
    const { match } = this.props
    // const { id = 0 } = match.params
    const id = 1431
    this.state = {
      id,
      data: {}, // 视频简介
      imgData: [], // 视频图片信息
      videoKey: ['.'], // 视频名称关键字建议
      selectedTags: [], // 选中关键字
      inputValue: "", // 提交关键字
      visible: false, // 模态框
      modalIMg: "", // 模态框图片地址
      videoImgs: [], // 视频图片
      imgIndex: 0, // 图片下标 放大查看保证顺序
    }
  }
  componentDidMount = () => {
    this.fetch()
  }

  // 添加图片
  handleAddImg = (imgType) => {
    const { id } = this.state
    api.post("/hiVideo/generateImg", { id, count: 2, imgType })
      .then((result) => {
        // message.success("正在获取，请赖心等待！")
        this.fetch()
      })
      .catch(err)
  }

  // 删除图片
  handleDeleteIMg = (id) => {
    console.log('删除图片', id)
    api.post("/hiVideoImg/delete", { id })
      .then((result) => {
        this.fetch()
      })
      .catch(err)
  }
  

  // 输入框事件
  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value})
  }
  // 更改文件名
  handleChangeName = (value) => {
    api.get("/video", { value })
      .then((result) => {
        console.log(result)
        this.fetch()
      })
      .catch(err)
  }

  // 查看图片
  handleLook = (src, key) => {
    this.setState({
      visible: true,
      modalIMg: src,
      imgIndex: key,
    })
  }

  changeImg = (type) => {
    let { imgIndex, videoImgs } = this.state
    
    if (type == 'up') {
      if (imgIndex - 1 < 0) {
        imgIndex = videoImgs.length - 1
      } else {
        imgIndex = imgIndex - 1
      }
    } else {
      if (imgIndex + 1 >= videoImgs.length) {
        imgIndex = 0
      } else {
        imgIndex = imgIndex + 1
      }
    }

    console.log(imgIndex, videoImgs)

    this.setState({
      imgIndex,
      modalIMg: videoImgs[imgIndex].videoSizeB + "/" + videoImgs[imgIndex].imgPath
    })

  }
  

  fetch = () => {
    const { id } = this.state
    api.get("/hiVideo/get", { id })
      .then((result) => {
        console.log(result)
        this.setState({
          data: result.data,
          videoKey: [...result.data.adviseWorlds, '.'],
          videoImgs: result.data.videoImgs,
        })
      })
      .catch(err)
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
  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags, inputValue: [...nextSelectedTags] });
  }

  render() {
    const { data, videoImgs, videoKey, selectedTags, inputValue, modalIMg } = this.state
    return (
      <div className={styles.video}>
        <div className={styles.titleName}>{data.fileName}</div>
        <div className={styles.content}>
          <div className={styles.left}>
            <Img alt={`${data.fileName}`} src={data.imgPath} width="100%" />
          </div>
          <div className={styles.right}>
            <p>
              <span className={styles.weight}>识别码:</span>
              <span style={{ color: "#CC0000"}}>{data.id}</span>
            </p>
            <p>
              <span className={styles.weight}>等级分:</span>
              <span>{data.score}</span>
            </p>
            <p>
              <span className={styles.weight}>文件大小:</span>
              <span>{data.sizeMb} MB</span>
            </p>
            <p>
              <span className={styles.weight}>文件大小b:</span>
              <span>{data.sizeB} B</span>
            </p>
            <p className={styles.weight}>
              路径:
            </p>
            <p>
              {data.path}
            </p>
            <p className={styles.weight}>
              类别:
            </p>
            <div>
              {data.videoType}
            </div>
          </div>
        </div>
        <Modal
          title="图片预览"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="1000px"
        > 
          <div style={{ width: '10%', height: '100%', hover: 'background black' }}>123</div>
          <Img alt={`${modalIMg}`} src={modalIMg} width="100%" />
          {/* <Button.Group> */}
            <div style={{ marginTop: 24 }}>
            <Button type="primary" onClick={() => this.changeImg('up')} style={{ width: '48%', height: 40 }}> 
              <Icon type="left" />
            </Button>
            <Button type="primary" onClick={() => this.changeImg('down')} style={{ marginLeft: '4%', width: '48%', height: 40 }}>
              <Icon type="right" />
            </Button>
            </div>
          {/* </Button.Group> */}
        </Modal>
        <Card>
          <div>
            <div style={{ float: "right" }}>
              <Button type="primary" size="large">播放</Button>
              <Button size="large" style={{ marginLeft: 12 }}>评比</Button>
              <Button type="danger" size="large" style={{ marginLeft: 12 }}>删除</Button>
            </div>
          </div>
        </Card>

        <Card>
          <div>
            <div style={{ float: "left", marginBottom:24,}}>
              <h4 style={{ marginRight: 8,  display: 'inline' }}>名称建议:</h4>
              {videoKey.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={selectedTags.indexOf(tag) > -1}
                  onChange={checked => this.handleChange(tag, checked)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </div>
            {/* <div style={{ marginLeft: 24, float: "left"}}> */}
            <div style={{ marginTop: 24 }}>
              <Search value={inputValue} onChange={this.handleInputChange} enterButton="确认更改" onSearch={this.handleChangeName} />
            </div>
          </div>
        </Card>
        <Card
          title="样品图片"
          extra={
            <div>
              <Button type="primary" shape="circle" icon="picture" onClick={() => this.handleAddImg('jpeg')} />
              <Button type="primary" shape="circle" icon="youtube" onClick={() => this.handleAddImg('gif')} style={{ marginLeft: 8 }} />
            </div>
            
          }
        >
          <Row gutter={12} >
            <div style={{ marginTop: 36 }}>
                {
                  videoImgs.map((value, key) => {
                    let imgPath
                    if (value) {
                      imgPath = value.videoSizeB + "/" + value.imgPath
                    } else {
                      imgPath = ""
                    }
                    return (
                      <Col xs={12} sm={8} md={6} lg={6} xl={6} key={key}>
                        <Card
                          hoverable
                          // style={{ width: 240 }}
                          cover={
                            <div style={{ textAlign: "center" }} onClick={() => this.handleLook(imgPath, key)}>
                              <Img alt="t" src={imgPath} defaultSrc={defaultImg} width="100%" />
                            </div>
                          }
                        >
                          <div style={{ textAlign: "center", margin: -10 }}>
                            <Button.Group>
                              <Button type="primary" >
                                <Icon type="upload" />
                              </Button>
                              <Button type="primary"  onClick={() => this.handleLook(imgPath, key)} >
                                <Icon type="eye" />
                              </Button>
                              <Button type="primary" onClick={() => this.handleDeleteIMg(value.id)}>
                                <Icon type="close" />
                              </Button>
                            </Button.Group>
                          </div>
                        </Card>
                      </Col>
                    )
                  })
                }
            </div>
          </Row>
        </Card>
      </div>
    );
  }
}

export default VideoDetail;

