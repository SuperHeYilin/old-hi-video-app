import React, { Component } from 'react'
import { Tree, Icon, Layout, Row, Col, Button } from 'antd';
import { Layer, Ibox } from '../../../components/Ui'
import { api, err } from '../../../utils'

const { TreeNode, DirectoryTree } = Tree;
const { Header, Footer, Sider, Content } = Layout;

export default class DirSetting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            trees: [],
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
        }
    }
    componentDidMount() {
        this.fetch()
    }
    onExpand = (expandedKeys, obj) => {
        console.log('onExpand', expandedKeys, 'obj', obj.node.props.eventKey);
        const dirId = obj.node.props.eventKey
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.

        const { trees } = this.state
        api
            .get("/fileDirectory/pId/" + dirId)
            .then((data) => {
                console.log('请求数据：', data.data)
                this.handlePushValue(dirId, data.data, trees)
                console.log('拼接玩数据', trees)
                this.setState({ trees })
            })

        // this.fetch2(dirId)
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };

    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    };
    fetch2 = (id) => {
        const { trees } = this.state
        api
            .get("/fileDirectory/pId/" + id)
            .then((data) => {
                console.log(data.data)
            })
    }
    fetch = () => {
        api
            .get("/fileDirectory/pId/" + 0)
            .then((data) => {
                console.log(data.data)
                this.setState({ trees: data.data })
            })
    }

    handlePushValue = (id, arrays, oldValue) => {
        for (let i = 0; i < oldValue.length; i++) {
            console.log('找', id, '对比', oldValue[i].id)
            if (oldValue[i].fileDirectories) {
                this.handlePushValue(id, arrays, oldValue[i].fileDirectories)
            }
            if (oldValue[i].id == id) {
                console.log('找到了', id)
                oldValue[i].fileDirectories = arrays
            } else {
                console.log('继续找', id)
                this.handlePushValue(id, arrays, oldValue[i])
            }

        }
    }

    renderTreeNodes = data =>
        data.map(item => {
            if (item.fileDirectories) {
                return (
                    <TreeNode title={item.directoryName} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.fileDirectories)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.directoryName} key={item.id} dataRef={item} />;
        });

    render() {
        const { trees, expandedKeys } = this.state
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
                                <DirectoryTree expandedKeys={expandedKeys} multiple defaultExpandAll onSelect={this.onSelect} onExpand={this.onExpand}>
                                    {this.renderTreeNodes(trees)}
                                    {/* <TreeNode title="parent 0" key="0-0">
                                        <TreeNode title="leaf 0-0" key="0-0-0" isLeaf />
                                        <TreeNode title="leaf 0-1" key="0-0-1" isLeaf />
                                    </TreeNode>
                                    <TreeNode title="parent 1" key="0-1">
                                        <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
                                        <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
                                    </TreeNode> */}
                                </DirectoryTree>
                            </Ibox.IboxContent>
                        </Ibox>
                    </Content>
                </Layout>

            </div>
        )
    }
}