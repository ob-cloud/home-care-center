const BASE_PREFIX = './nurse'
const LOCAL_BASE_API = './nurse'
const DEV_BASE_API = BASE_PREFIX
const TEST_BASE_API = BASE_PREFIX
const PRO_BASE_API = BASE_PREFIX

const envConfig = {
  local: LOCAL_BASE_API,
  dev: DEV_BASE_API,
  test: TEST_BASE_API,
  prod: PRO_BASE_API
}


export const SERVER_PORT = 8206
export const REQUEST_TIMEOUT = 1600

// export const WEBSOCKET_URL = 'https://aliiot.on-bright.com/pro/websocket/{topic}'
export const WEBSOCKET_URL = 'http://10.10.92.161:8082/nurse/websocket/{topic}'

export function isProEnv() {
  return process.env.NODE_ENV === 'production'
}

export function isTestEnv() {
  return process.env.NODE_ENV === 'test'
}

export function isDevelopEnv() {
  return process.env.NODE_ENV === 'development'
}

// 接口请求基路径
export function getReqBaseUrl() {
  let reqUrl
  reqUrl = isProEnv() && envConfig.prod
  reqUrl = isTestEnv() && envConfig.test
  reqUrl = isDevelopEnv() && envConfig.dev
  reqUrl = reqUrl || envConfig.local
  return reqUrl
}

export default envConfig
