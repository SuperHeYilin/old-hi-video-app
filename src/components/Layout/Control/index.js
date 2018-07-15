import React,{ Component } from 'react'
import { Layout , Icon , Card , Switch , Menu , Tabs , Row , Col , Radio , Button } from 'antd'
import { Drawer } from 'material-ui'
import { removeStoreCache } from '../../../store/store.config'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { doCollapseControlPanel, doCollapse, doAffixContent, doBackTop, doChangeTheme, doPageAnimation, doPageLayout, doFullScreen } from '../../../actions/control'
import { classnames } from '.././../../utils'

import styles from './index.less'

const { Header } = Layout
const TabPane = Tabs.TabPane
const RadioGroup = Radio.Group

class ControlPanel extends Component {

  handleCollapseControlPanel = () => {
    const { doCollapseControlPanel, controlCollapsed } = this.props
    doCollapseControlPanel(!controlCollapsed)
  }

  handleSiderCollapse = () => {
    const { doCollapse, siderCollapsed } = this.props
    doCollapse(!siderCollapsed)
  }

  handleAffixContent = () => {
    const { doAffixContent, affixContent } = this.props
    doAffixContent(!affixContent)
  }

  handelBackTop = () => {
    const { doBackTop, backTop } = this.props
    doBackTop(!backTop)
  }

  handelChangeTheme = () => {
    const { doChangeTheme, darkTheme } = this.props
    doChangeTheme(!darkTheme)
  }

  handelShowAnimation = () => {
    const { doPageAnimation, pageAnimation } = this.props
    doPageAnimation(!pageAnimation)
  }

  handelPageLayout = (e) => {
    const { doPageLayout } = this.props
    doPageLayout(e.target.value)
  }

  handelFullScreen = () => {
    const { doFullScreen, fullScreen } = this.props
    doFullScreen(!fullScreen)
  }

  handleClearCache = () => {
    removeStoreCache("root")
  }

  render() {
    const { siderCollapsed, controlCollapsed, affixContent, backTop, darkTheme, pageAnimation, pageLayout, fullScreen } = this.props

    return (
      <Drawer
      className={styles['right-sidebar']}
      overlayClassName={styles['overlay']}
      type="right"
      docked={false}
      openSecondary={true}
      open={controlCollapsed}
      width={280}
      onRequestChange={(open) => this.handleCollapseControlPanel()}
      >
        <Header className={styles.header}>
          <div className={styles['rpanel-title']}>控制面板<span className={styles.button} onClick={this.handleCollapseControlPanel}><Icon type="close" /></span></div>
        </Header>
        <div className={styles['rpanel-body']}>
          <Tabs defaultActiveKey="1" className={styles['rpanel-tab']}>
            <TabPane tab={<span>界面</span>} key="1">
              <Card bordered={false} title="布局设置">
                <div className={styles.switchtheme}>
                  <span>{fullScreen ? <Icon type="shrink" /> : <Icon type="arrows-alt" />}始终铺满</span>
                  <Switch onChange={this.handelFullScreen} defaultChecked={true} checked={fullScreen} checkedChildren="开" unCheckedChildren="关" />
                </div>
                <div className={styles.switchtheme}>
                  <span><Icon type="lock" />固定内容</span>
                  <Switch onChange={this.handleAffixContent} defaultChecked={true} checked={affixContent} checkedChildren="开" unCheckedChildren="关" />
                </div>
              </Card>
              <Card bordered={false} title="常用设置">
                <div className={styles.switchtheme}>
                  <span><Icon type="arrow-up" />返回顶部</span>
                  <Switch onChange={this.handelBackTop} defaultChecked={true} checked={backTop} checkedChildren="开" unCheckedChildren="关" />
                </div>
                <div className={styles.switchtheme}>
                  <span><Icon type="bulb" />切换主题</span>
                  <Switch onChange={this.handelChangeTheme} defaultChecked={false} checked={darkTheme} checkedChildren="黑" unCheckedChildren="白" />
                </div>
                <div className={styles.switchtheme}>
                  <span><Icon type="retweet" />启用动画</span>
                  <Switch onChange={this.handelShowAnimation} defaultChecked={false} checked={pageAnimation} checkedChildren="开" unCheckedChildren="关" />
                </div>
              </Card>
            </TabPane>
          </Tabs>
        </div>
      </Drawer>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    doCollapseControlPanel: bindActionCreators(doCollapseControlPanel, dispatch),
    doCollapse: bindActionCreators(doCollapse, dispatch),
    doAffixContent: bindActionCreators(doAffixContent, dispatch),
    doBackTop: bindActionCreators(doBackTop, dispatch),
    doChangeTheme: bindActionCreators(doChangeTheme, dispatch),
    doPageAnimation: bindActionCreators(doPageAnimation, dispatch),
    doPageLayout: bindActionCreators(doPageLayout, dispatch),
    doFullScreen: bindActionCreators(doFullScreen, dispatch),
  }
}

function mapStateToProps(state) {
  const {
    control: {
      controlCollapsed,
      siderCollapsed,
      affixContent,
      backTop,
      darkTheme,
      pageAnimation,
      popoverMenu,
      pageLayout,
      fullScreen,
    },
  } = state
  return { siderCollapsed, controlCollapsed, affixContent, backTop, darkTheme, pageAnimation, popoverMenu, pageLayout, fullScreen }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)