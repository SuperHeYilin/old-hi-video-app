import { createHashHistory , createBrowserHistory } from 'history'

/**
 * 得到开发环境
 */
const getNodeEnv = () => {
  return process.env.NODE_ENV
}

/**
 * 验证开发环境
 * @param {string} nodeEnv
 */
const valiNodeEnv = (nodeEnv) => {
  return process.env.NODE_ENV === nodeEnv
}

/**
 * 根据
 */
const getHistoryByNodeEnv = () => {
  const history = process.env.NODE_ENV === 'production' ? createBrowserHistory() : createHashHistory()

  return history
}

export {
  getNodeEnv,
  getHistoryByNodeEnv,
  valiNodeEnv,
}