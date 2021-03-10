import React from 'react'
import classnames from 'classnames'
import { Menu, Icon, Affix } from 'antd'
import styles from './index.less'

const MenuItem = Menu.Item

const data = [
  {"key": 1, "title": "Home", "icon": "home", "color": "green", "background": "#66bb6a", "link": "/module/video/info"},
  {"key": 2, "title": "Sort", "icon": "ordered-list", "color": "pink", "background": "#ec407a", "link": "/module/video/pk"},
  {"key": 3, "title": "Actor", "icon": "team", "color": "blue", "background": "#26c6da", "link": "/module/return/ticket"},
  {"key": 4, "title": "Type", "icon": "tags", "color": "yellow", "background": "#ec407a", "link": "/module/video/type"},
  {"key": 5, "title": "Repeat", "icon": "swap", "color": "pink2", "background": "#fb8c00", "link": "/module/video/repeat"},
  {"key": 6, "title": "Import", "icon": "download", "color": "purple", "background": "#9963E5", "link": "/module/file/init"},
  {"key": 7, "title": "BaseSetting", "icon": "setting", "color": "pink", "background": "#ec407a", "link": "/module/initSetting"},
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
      <div>
      <Menu
        onClick={this.handleChangeActive}
        // className={styles.menus}
        style={{ textAlign: 'center',  marginLeft: '20%', background: '#2F4554',  }}
        selectedKeys={[activeCard]}
        theme='dark'
        mode="horizontal"
      >
        {data.map((v) => {
          return (
            // <MenuItem key={v.key}>
            //   <div className={`${activeCard === v.key ? styles.cardActive : styles.card}`}>
            //     <div className={styles.head}>
            //       <div className={classnames(styles.icon, styles[`${v.color}`])}>
            //         <Icon type={v.icon} />
            //       </div>
            //       <div className={`${activeCard === v.key ? styles.fontColorActive : styles.fontColor}`}>
            //         {v.title}
            //       </div>
            //     </div>
            //   </div>
            // </MenuItem>
            <MenuItem key={v.key}>
              <Icon type={v.icon} />{v.title}
            </MenuItem>
          )
        })}
      </Menu>
      </div>
    )
  }
}

MeunFigureCard.propTypes = {}

export default MeunFigureCard
