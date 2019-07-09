import React, { Component } from 'react'
import { Menu, Icon, Button } from 'antd'
import { Route, Switch } from 'react-router-dom';
import Disk from './disk'
import Search from './search'
import Video from './video'
import BaseSetting from './baseSetting'
import DirSetting from './dirSetting'

const { SubMenu } = Menu;

export default class InitSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  handleClick = e => {
    const { history } = this.props;
    history.push("/module/initSetting/" + e.key)
  };
  render() {
    return (
      <div>
        <div style={{ width: 256, float: "left" }}>
          <Menu
            defaultSelectedKeys={['disk']}
            defaultOpenKeys={['disk']}
            mode="inline"
            theme="light"
            onClick={this.handleClick}
          >
            <Menu.Item key="disk">
              <Icon type="pie-chart" />
              <span>磁盘管理</span>
            </Menu.Item>
            <Menu.Item key="video">
              <Icon type="desktop" />
              <span>视频初始化</span>
            </Menu.Item>
            <Menu.Item key="baseSetting">
              <Icon type="inbox" />
              <span>基础配置</span>
            </Menu.Item>
            <Menu.Item key="dirSetting">
              <Icon type="inbox" />
              <span>目录配置</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail" />
                  <span>Navigation One</span>
                </span>
              }
            >
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="appstore" />
                  <span>Navigation Two</span>
                </span>
              }
            >
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>

        <div style={{ marginLeft: 24, float: "left" }}>
          <Switch>
            <Route path="/module/initSetting/disk" component={Disk} />
            <Route path="/module/initSetting/search" component={Search} />
            <Route path="/module/initSetting/video" component={Video} />
            <Route path="/module/initSetting/baseSetting" component={BaseSetting} />
            <Route path="/module/initSetting/dirSetting" component={DirSetting} />
          </Switch>
        </div>
      </div>
    )
  }
}
