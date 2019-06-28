import React, { Component } from 'react'
import { Menu, Icon, Button } from 'antd'
import {Route, Switch} from 'react-router-dom';
import Disk from './disk'
import Search from './search'

const { SubMenu } = Menu;

export default class InitSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
          };
    }
    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
      handleClick = e => {
        console.log('click ', e);
        const { history } = this.props;
        history.push("/module/initSetting/" + e.key)
      };
    render() {
        return (
            <div>
                <div style={{ width: 256, float: "left" }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          onClick={this.handleClick}
        >
          <Menu.Item key="disk">
            <Icon type="pie-chart" />
            <span>磁盘管理</span>
          </Menu.Item>
          <Menu.Item key="search">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>Option 3</span>
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

      <div style={{ marginLeft: 24 }}>
            <Switch>
                <Route path="/module/initSetting/disk" component={Disk} />
                <Route path="/module/initSetting/search" component={Search} />
            </Switch>
      </div>
            </div>
        )
    }
}
