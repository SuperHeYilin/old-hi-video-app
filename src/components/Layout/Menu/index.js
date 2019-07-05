import React from 'react'
import classnames from 'classnames'
import { Menu, Icon } from 'antd'
import styles from './index.less'

const MenuItem = Menu.Item

const data = [
  {"key": 1, "title": "首页", "icon": "pay-circle", "color": "green", "background": "#66bb6a", "link": "/module/video/info"},
  {"key": 2, "title": "排名", "icon": "download", "color": "pink", "background": "#ec407a", "link": "/module/get/ticket"},
  {"key": 3, "title": "人物", "icon": "reload", "color": "blue", "background": "#26c6da", "link": "/module/return/ticket"},
  {"key": 4, "title": "类别", "icon": "line-chart", "color": "yellow", "background": "#ec407a", "link": "/module/video/type"},
  {"key": 5, "title": "重复验证", "icon": "setting", "color": "pink2", "background": "#fb8c00", "link": "/module/video/repeat"},
  {"key": 6, "title": "导入数据", "icon": "download", "color": "purple", "background": "#9963E5", "link": "/module/file/init"},
  {"key": 7, "title": "基础配置", "icon": "setting", "color": "pink", "background": "#ec407a", "link": "/module/initSetting"},
]

class MeunFigureCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: "1", // 默认激活窗口
    }
  }
  handleChangeActive = ({key}) => {
    this.setState({ activeCard: key })
    this.props.history.push(data[key - 1].link)
  }
  render() {
    const { activeCard } = this.state
    return (
      <Menu
        onClick={this.handleChangeActive}
        className={styles.menus}
        selectedKeys={[activeCard]}
        mode="horizontal"
      >
        {data.map((v) => {
          return (
            <MenuItem key={v.key}>
              <div className={`${activeCard === v.key ? styles.cardActive : styles.card}`}>
                <div className={styles.head}>
                  <div className={classnames(styles.icon, styles[`${v.color}`])}>
                    <Icon type={v.icon} />
                  </div>
                  <div className={`${activeCard === v.key ? styles.fontColorActive : styles.fontColor}`}>
                    {v.title}
                  </div>
                </div>
              </div>
            </MenuItem>
          )
        })}
      </Menu>
    )
  }
}

MeunFigureCard.propTypes = {}

export default MeunFigureCard
