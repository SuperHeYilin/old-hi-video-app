import React from 'react'
import Particles from 'react-particles-js'
import { biaozhun , mobile , zhihu } from './ParticlesConfig'
import { getGridState } from '../../utils'

import styles from './index.less'

class Background extends React.Component {

    render() {
        let gridState = "sm"//getGridState()

        let particlesParams = biaozhun//gridState === "xs" ? mobile : Math.floor(Math.random()*2) ? zhihu : biaozhun
		console.info(particlesParams)
        return (
            <div className={styles.background}> 
                <Particles style={{minHeight:900,minWidth:800,maxHeight:1080,maxWidth:1920}} params={particlesParams} />
            </div>
        )
    }
}

export default Background