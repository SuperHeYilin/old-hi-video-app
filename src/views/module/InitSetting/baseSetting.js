import React, { Component } from 'react'
import { Ibox } from '../../../components/Ui'
import { Layout, Card, Row, Col, Select, Button, Icon, Modal, Input, Table, message, List, Tree } from 'antd'
import { Layer } from '../../../components/Ui'
import { api, err } from '../../../utils'

import BaseForm from './BaseForm'

const { Header, Footer, Sider, Content } = Layout;

export default class BaseSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settingDate: [],
        }
    }
    componentDidMount() {
        this.fetch()
    }
    handleView = (record) => {
        let refForm;
        Layer.open({
            title: "基础配置",
            width: 500,
            content: <BaseForm item={record} ref={(form) => { refForm = form }} />,
            onOk: (e) => {
                refForm.validateFields((error, values) => {
                    if (error) {
                        return;
                    }
                    api
                        .put("/baseSetting/update", { ...values })
                        .then((result) => {
                            message.success("更新成功!")
                            this.fetch()
                            Layer.close()
                        })
                })
            },
        })
    }
    handleAdd = () => {
        let refForm;
        Layer.open({
            title: "新增",
            width: 500,
            content: <BaseForm ref={(form) => { refForm = form }} />,
            onOk: (e) => {
                refForm.validateFields((error, values) => {
                    if (error) {
                        return;
                    }
                    api
                        .post("/baseSetting/add", { ...values })
                        .then((result) => {
                            message.success("添加成功!")
                            this.fetch()
                            Layer.close()
                        })
                })
            },
        })
    }
    handleDelete = (record) => {
        api
            .delete("/baseSetting/delete/" + record.id)
            .then((data) => {
                this.fetch()
            })
    }
    fetch = () => {
        api
            .get("/baseSetting/getAll")
            .then((data) => {
                this.setState({ settingDate: data.data })
            })
    }
    render() {
        const { settingDate } = this.state
        const columns = [
            {
                title: '配置名称',
                dataIndex: 'settingName',
                key: 'name',
                render: text => <a href="#">{text}</a>,
            },
            {
                title: '配置code',
                dataIndex: 'settingCode',
                key: 'code',
            },
            {
                title: '参数',
                dataIndex: 'settingValue',
                key: 'settingValue',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Button size="small" onClick={() => this.handleView(record)}>更新</Button>
                        <Button size="small" onClick={() => this.handleDelete(record)}>删除</Button>
                    </span>
                ),
            },
        ];
        return (
            <div>
                <Layout>
                    <Content>
                        <Ibox>
                            <Ibox.IboxTitle>
                                <Row gutter={24} style={{ marginTop: 24 }}>
                                    <Col lg={10} md={10} sm={10} xs={10}>
                                        <Button type="primary" icon="plus" onClick={this.handleAdd}>
                                            添加
                                        </Button>
                                    </Col>
                                </Row>
                            </Ibox.IboxTitle>
                            <Ibox.IboxContent>
                                <Table columns={columns} dataSource={settingDate} rowKey={record => record.id} />
                            </Ibox.IboxContent>
                        </Ibox>
                    </Content>
                </Layout>
            </div>
        )
    }
}
