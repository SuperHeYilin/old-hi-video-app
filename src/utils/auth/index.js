import WebStorageCache from 'web-storage-cache'

const store = new WebStorageCache()

const USER_AUTH_INFO = "authInfo"

class Auth {
  constructor() {
    this.authInfoName = USER_AUTH_INFO
  }

  /**
   *登录
    * @param {stirng} token
    * @param {object} userInfo
    */
  login = (token, userInfo) => {
    let authInfo = store.get(USER_AUTH_INFO)
    if (authInfo) {
      authInfo = {...authInfo, token, userInfo}
    } else {
      authInfo = {token, userInfo}
    }
    store.set(USER_AUTH_INFO, authInfo)
  }

  /**
   * 退出登录
   */
  logout = () => {
    store.delete(USER_AUTH_INFO)
  }

  wechatAuth = (openId) => {
    let authInfo = store.get(USER_AUTH_INFO)
    if (authInfo) {
      authInfo = {...authInfo, openId}
    } else {
      authInfo = {openId}
    }

    store.set(USER_AUTH_INFO, authInfo)
  }

  wechatLogin = () => {

  }

  aliPayLogin = () => {

  }

  taobaoLogin = () => {

  }

  getUserInfo = () => {
    const authInfo = store.get(USER_AUTH_INFO)
    if (authInfo) {
      return authInfo.userInfo
    }

    return null
  }

  getAuthToken = () => {
    const authInfo = store.get(USER_AUTH_INFO)
    if (!authInfo) {
      return null
    }

    return authInfo.token
  }

  getWxAuthOpenId = () => {
    const authInfo = store.get(USER_AUTH_INFO)
    if (authInfo) {
      return authInfo.openId
    }

    return null
  }

  /**
   * 验证权限
   */
  isAuthenticated() {
    if (this.getAuthToken()) {
      return true
    }
    return false
  }

  /**
   * 验证是否微信授权
   */
  isWxAuth() {
    if (this.getWxAuthOpenId()) {
      return true
    }
    return false
  }
}

const auth = new Auth()

export default auth
