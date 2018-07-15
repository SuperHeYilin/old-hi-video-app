/**
 * 项目信息
 */
export const project = {
  name: 'Admin',
  prefix: 'YFLD-ADMIN',
  footerText: 'YFLD-ADMIN 版权所有 © 2017 由 DIFFPI 支持',
  iconFontUrl: '',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:8080'],
}

/**
 * api请求信息
 */
const devHost = "http://localhost:8080/hi-video"
const prodHost = "http://localhost:8081"
const devBaseURL = devHost + '/api/b/v1.0/'
const prodBaseURL = prodHost + "/api/b/v1.0/"
export const api = {
  devBaseURL,
  prodBaseURL,
  devHost,
  prodHost,
}

/**
 * 图片地址
 */
export const imgURL = "http://localhost:8080/tenant/upload/"