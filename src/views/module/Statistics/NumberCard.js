import React from 'react'
// import PropTypes from 'prop-types'
import { Icon, Card } from 'antd'
import CountUp from 'react-countup'
import nstyle from './Analysis.less'

function NumberCard ({ icon, color, title, number, countUp,decimals}) {
  return (
    <Card className={nstyle.numberCard} bordered={false} bodyStyle={{ padding: 0 }}>
      <Icon className={nstyle.iconWarp} style={{ color }} type={icon} />
      <div className={nstyle.content}>
        <p className={nstyle.title}>{title || 'No Title'}</p>
        <p className={nstyle.number}>
          <CountUp
            start={0}
            end={number}
            decimals={decimals}
            duration={2.75}
            useEasing
            useGrouping
            separator=","
            {...countUp || {}}
          />
        </p>
      </div>
    </Card>
  )
}

// NumberCard.propTypes = {
//   icon: PropTypes.string,
//   color: PropTypes.string,
//   title: PropTypes.string,
//   number: PropTypes.number,
//   countUp: PropTypes.object,
// }

export default NumberCard
