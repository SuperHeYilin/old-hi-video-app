import React, { Component } from 'react'
import { Layout, Row, Col, Button, Table, Divider, Modal, Input, message } from 'antd'
import { Ibox } from '../../../components/Ui'
import { api, err as apierr } from '../../../utils'

const { Header, Footer, Sider, Content } = Layout;

export default class Disk extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            visible: false,
            newDiskCode: "",
            newDiskName: "",
            newDiskDesc: "",
            newRealPath: "",
            id: 0,
        }
    }
    componentDidMount() {
        this.fetch()
    }
    fetch() {
        api
            .get("/fileDisk/findAll")
            .then((data) => {
                this.setState({ data: data.data })
            })
            .catch(apierr)
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    handleCreateDisk = (e, name) => {
        if (name === "name") {
            this.setState({ newDiskName: e.target.value })
        }
        if (name === "code") {
            this.setState({ newDiskCode: e.target.value })
        }
        if (name === "desc") {
            this.setState({ newDiskDesc: e.target.value })
        }
        if (name === "realPath") {
            this.setState({ newRealPath: e.target.value })
        }
    }
    handleClear = () => {
        this.setState({
            newDiskCode: "",
            newDiskDesc: "",
            newDiskName: "",
            newRealPath: "",
            id: 0,
        })
    }

    handleOk = () => {
        const { newDiskCode, newDiskDesc, newDiskName, newRealPath, id } = this.state
        const disk = { id, code: newDiskCode, fileDescribe: newDiskDesc, name: newDiskName, realPath: newRealPath }
        if (id !== 0) {
            api
                .put("/fileDisk/update", disk)
                .then((result) => {
                    if (result.rel) {
                        message.success("更新成功")
                        this.fetch()
                    }
                })
                .catch(apierr)
        } else {
            api
                .post("/fileDisk/add", disk)
                .then((result) => {
                    if (result.rel) {
                        message.success("添加成功")
                        this.fetch()
                    } else {
                        message.error(result.msg)
                    }
                })
                .catch(apierr)
        }
        this.handleCancel()
    }
    handleShowUpdate = (record) => {
        // const { newDiskCode: code, newDiskDesc: fileDescribe, newDiskName: name, newRealPath: realPath } = record
        this.setState({
            newDiskCode: record.code,
            newDiskDesc: record.fileDescribe,
            newDiskName: record.name,
            newRealPath: record.realPath,
            id: record.id,
            visible: true,
        })
    }

    handleUpdate = (record) => {
        console.log(record)
    }
    render() {
        const { data, newDiskCode, newDiskDesc, newDiskName, newRealPath } = this.state
        const columns = [
            {
                title: '磁盘名称',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="#">{text}</a>,
            },
            {
                title: '磁盘code',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: '磁盘描述',
                dataIndex: 'fileDescribe',
                key: 'fileDescribe',
            },
            {
                title: '实际路径',
                dataIndex: 'realPath',
                key: 'realPath',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button size="small" onClick={() => this.handleShowUpdate(record)}>更新</Button>
                    </span>
                ),
            },
        ];
        return (
            <div>
                <Modal
                    title="新建盘符"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input value={newDiskName} placeholder="名称" onChange={(e) => this.handleCreateDisk(e, "name")} />
                    <Input value={newDiskCode} placeholder="code" onChange={(e) => this.handleCreateDisk(e, "code")} />
                    <Input value={newDiskDesc} placeholder="描述" onChange={(e) => this.handleCreateDisk(e, "desc")} />
                    <Input value={newRealPath} placeholder="实际路径" onChange={(e) => this.handleCreateDisk(e, "realPath")} />
                </Modal>
                <Layout>
                    <Content>
                        <Ibox>
                            <Ibox.IboxTitle>
                                <Row gutter={24} style={{ marginTop: 24 }}>
                                    <Col lg={10} md={10} sm={10} xs={10}>
                                        <Button type="primary" icon="plus" onClick={this.showModal}>
                                            添加
                                        </Button>
                                    </Col>
                                </Row>
                            </Ibox.IboxTitle>
                            <Ibox.IboxContent>
                                <Table columns={columns} dataSource={data} rowKey={record => record.id} />
                            </Ibox.IboxContent>
                        </Ibox>
                    </Content>
                </Layout>
            </div>
        )
    }
}
