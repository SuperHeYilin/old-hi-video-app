import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout, BackTop } from 'antd'
import TransitionSwitch from 'react-router-transition-switch'
import Fader from 'react-fader'
import { doCollapseControlPanel, doCollapse, doGridResize } from '../../../actions/control'
import { classnames } from '../../../utils'

import layStyles from '../Layout.less'

const { Content } = Layout

class Contents extends Component {
  constructor(props) {
    super(props)
    this.handleDoCollapse = this.handleDoCollapse.bind(this)
    this.handleDoControlCollapse = this.handleDoControlCollapse.bind(this)
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

  renderBackTop = () => {
    const { backTop } = this.props

    const backUp = (
      <div>
        <BackTop visibilityHeight={100} target={() => document.getElementsByClassName(layStyles.main)[0]}><div className={layStyles['ant-back-top-inner']}>UP</div></BackTop>
        <BackTop visibilityHeight={100} target={() => document.getElementsByClassName(layStyles.layout)[0]}><div className={layStyles['ant-back-top-inner']}>UP</div></BackTop>
      </div>
    )

    return backTop ? backUp : null
  }

  render() {
    const { affixContent, children, pageAnimation, pageLayout, fullScreen } = this.props
    const affixClass = ["", layStyles['affix-head'], layStyles['affix-head-nav']][pageLayout]
    const minHeight = ["", layStyles['min-height-head'], layStyles['min-height-head-nav']][pageLayout]
    return (
      <Content className={classnames(layStyles.main, minHeight, {[affixClass]: affixContent}, {[layStyles['main-resize']]: !fullScreen})}>
        {this.renderBackTop()}
        <div className={layStyles.container}>
          <div className={layStyles.content}>
            {pageAnimation ?
            <TransitionSwitch component={Fader} render={({children, ...rest}) => (
              <Fader
              {...rest}
              animateHeight={false}
              fadeInTransitionDuration={200}
              fadeOutTransitionDuration={200}
              heightTransitionDuration={300}
              >
              {children}
              </Fader>
            )}
            >
            {children}
            </TransitionSwitch>
            :
            children
            }
          </div>
        </div>
      </Content>
    )
  }
}

function mapStateToProps(state) {
  const {
    control: {
      affixContent,
      backTop,
      pageAnimation,
      pageLayout,
      fullScreen,
    },
  } = state
  return { affixContent, backTop, pageAnimation, pageLayout, fullScreen }
}

function mapDispatchToProps(dispatch) {
  return {
    doCollapse: bindActionCreators(doCollapse, dispatch),
    doCollapseControlPanel: bindActionCreators(doCollapseControlPanel, dispatch),
    doGridResize: bindActionCreators(doGridResize, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contents)