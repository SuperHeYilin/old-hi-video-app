import React, { Component } from 'react'
import { Tree, Icon, Layout, Row, Col, Button } from 'antd';
import { Layer, Ibox } from '../../../components/Ui'
import { api, err } from '../../../utils'


const { TreeNode, DirectoryTree } = Tree;
const { Header, Footer, Sider, Content } = Layout;

const treeData = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    { title: '0-0-0-0', key: '0-0-0-0' },
                    { title: '0-0-0-1', key: '0-0-0-1' },
                    { title: '0-0-0-2', key: '0-0-0-2' },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    { title: '0-0-1-0', key: '0-0-1-0' },
                    { title: '0-0-1-1', key: '0-0-1-1' },
                    { title: '0-0-1-2', key: '0-0-1-2' },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
];

export default class DirSetting extends Component {
    constructor(props) {
        super(props)

        this.state = {
            trees: [],
            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
        }
    }
    componentDidMount() {
        this.fetch()
    }
    onExpand = expandedKeys => {
        console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.fetch2(expandedKeys)
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
        fetch2 = (id) => {
            const { trees } = this.state
            api
                .get("/fileDirectory/pId/" + id)
                .then((data) => {
                    
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

    render() {
        const { trees } = this.state
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
                                <DirectoryTree multiple defaultExpandAll onSelect={this.onSelect} onExpand={this.onExpand}>
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