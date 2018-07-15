import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Affix } from 'antd'
import Menus from '../Menu'
import { project as config } from '../../../constants'
import { doChangeTheme } from '../../../actions/control'

import layStyles from '../Layout.less'
import styles from './index.less'
import menuStyles from '../Menu/index.less'

class Siders extends Component {
  handelChangeTheme = () => {
    this.props.doChangeTheme(!this.props.darkTheme)
  }

  handleChangeAffix = (affixed) => {
  }

  renderTopSider = () => {
    const { affixContent, fullScreen, history } = this.props
    if (affixContent) {
      return (
        <div className={classnames(styles.topSider, layStyles.topSider, {[layStyles.fixsider]: affixContent}, {[layStyles['topSider-resize']]: !fullScreen})}>
          <Menus history={history} />
        </div>
      )
    }

    return (
      <div className="navbar navbar-default" style={{height: 108}}>
        <Affix onChange={this.handleChangeAffix}>
          <div className={classnames(styles.topSider, layStyles.topSider, {[layStyles['topSider-resize']]: !fullScreen})}>
            <Menus history={history} />
          </div>
        </Affix>
      </div>
    )
  }

  render() {
    const { gridState, popoverMenu, pageLayout } = this.props

    if (pageLayout !== 2 || popoverMenu || gridState === "xs") {
      return null
    }

    return this.renderTopSider()
  }
}

Siders.propTypes = {
  affixContent: PropTypes.bool,
  popoverMenu: PropTypes.bool,
  gridState: PropTypes.string,
}

function mapDispatchToProps(dispatch) {
  return {
    doChangeTheme: bindActionCreators(doChangeTheme, dispatch),
  }
}

function mapStateToProps(state) {
  const {control: {
    affixContent,
    gridState,
    popoverMenu,
    pageLayout,
    fullScreen,
  }} = state
  return { affixContent, gridState, popoverMenu, pageLayout, fullScreen }
}

export default connect(mapStateToProps, mapDispatchToProps)(Siders)