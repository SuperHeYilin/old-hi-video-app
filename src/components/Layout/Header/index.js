import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Popover, Modal } from 'antd'
import { RipplePanel } from '../../Ui'
import { doCollapseControlPanel, doCollapse, doGridResize } from '../../../actions/control'
import { getGridState, auth, api, classnames } from '../../../utils'

import styles from './index.less'
import layStyles from '../../Layout/Layout.less'
import menusStyles from '../Menu/index.less'

const { Header } = Layout

class Headers extends Component {
  constructor(props) {
    super(props)
    this.handleDoCollapse = this.handleDoCollapse.bind(this)
    this.handleDoControlCollapse = this.handleDoControlCollapse.bind(this)
    this.handleMenuSelect = this.handleMenuSelect.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize = () => {
    const { doGridResize, gridState} = this.props
    const newGridState = getGridState()

    if (newGridState !== gridState) {
      doGridResize(newGridState)
    }
  }

  handleDoCollapse(e) {
    e.preventDefault()
    const { doCollapse, siderCollapsed } = this.props

    doCollapse(!siderCollapsed)
  }

  handleDoControlCollapse(e) {
    const { doCollapseControlPanel, controlCollapsed } = this.props

    doCollapseControlPanel(!controlCollapsed)
  }

  handleMenuSelect(e) {
    const { history } = this.props
    const { key } = e

    if (key === "logout") {
      Modal.confirm({
        content: '确定退出吗?',
        onOk() {
          api
          .put('/sessions', {token: auth.getAuthToken()})
          .then(() => {
            auth.logout()
            history.push('/auth/login')
          })
          .catch((err) => {
            auth.logout()
            history.push('/auth/login')
            api.err(err)
          })
        },
        onCancel() {
        },
      })
    }
  }

  renderSiderBar = () => {
    const { gridState, popoverMenu, history } = this.props

    let siderBar = null

    if (gridState === "sm") {
      // siderBar = <div />
    } else {
      /* siderBar = (<div className={styles.button} onClick={this.handleDoCollapse}>
              <RipplePanel><Icon type={siderCollapsed ? 'menu-unfold' : 'menu-fold'} /></RipplePanel>
            </div>) */
      siderBar = (
        <div >
          <img alt="logo" src={require('../../../public/imgs/logo/logow.png')} />
          {/* {!siderCollapsed ? <img alt={'logoTxt'} src={config.logoTxt} /> : ""} */}
        </div>
      )
    }

    return siderBar
  }
  render() {
    const { affixContent, pageLayout, fullScreen, history } = this.props
    // const userInfo = auth.getUserInfo()
    // alert(JSON.stringify(userInfo))
    return (
      <Header className={classnames(styles.header, {[layStyles['header-resize']]: !fullScreen}, "navbar-header", {[layStyles.fixheader]: affixContent})}>
        <div className={styles.leftWarpper}>
          {this.renderSiderBar()}
        </div>
        <div className={styles.rightWarpper} >
          <Popover
          content={
            <Menu
            selectedKeys={[]}
            className={styles['user-menu']}
            onSelect={this.handleMenuSelect}
            >
              <Menu.Item key="logout"><Icon type="poweroff" />退出</Menu.Item>
            </Menu>
          }
          trigger="click"
          placement="bottom"
          >
            <div className={styles.button}>
              <RipplePanel>
                <Icon type="user" />
              </RipplePanel>
            </div>
          </Popover>
          <div className={styles.button} onClick={this.handleDoControlCollapse}>
            <RipplePanel><Icon type="appstore" /></RipplePanel>
          </div>
        </div>
      </Header>
    );
  }
}

function mapStateToProps(state) {
  const {control: { controlCollapsed, siderCollapsed, gridState, popoverMenu, affixContent, pageLayout, fullScreen }} = state
  return { siderCollapsed, controlCollapsed, gridState, popoverMenu, affixContent, pageLayout, fullScreen }
}

function mapDispatchToProps(dispatch) {
  return {
    doCollapse: bindActionCreators(doCollapse, dispatch),
    doCollapseControlPanel: bindActionCreators(doCollapseControlPanel, dispatch),
    doGridResize: bindActionCreators(doGridResize, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Headers)