import React, { Component } from 'react';

const num = Math.floor((Math.random() * 3) + 1);
const defaultS = require('../../../public/imgs/1920-1080-0.jpg')
// const defaultS = require("../../../public/imgs/default" + num +".jpg")

// 图片组件
class Img extends Component {
  render() {
    const { src, alt, height, width, borderRadius = "", defaultSrc = defaultS } = this.props
    return (
      <div>
        <img src={src ? "http://localhost:8888/img/" + src : defaultSrc}
          ref={img => this.img = img}
          alt={alt}
          style={{ height, width, borderRadius }}
          onError={() => this.img.src = defaultSrc}
        />
      </div>
    );
  }
}
export default Img;
