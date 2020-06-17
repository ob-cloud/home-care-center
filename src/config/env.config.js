const LOCAL_BASE_API = 'http://localhost:3001/api'
const DEV_BASE_API = './api'
const TEST_BASE_API = './nurse'
const PRO_BASE_API = './nurse'
const envConfig = {
  local: {
    baseApi: LOCAL_BASE_API
  },
  dev: {
    baseApi: DEV_BASE_API
  },
  test: {
    baseApi: TEST_BASE_API
  },
  prod: {
    baseApi: PRO_BASE_API
  }
}

export const SERVER_PORT = 8206

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
  let reqUrl = envConfig.local.baseApi
  reqUrl = isProEnv() && envConfig.prod.baseApi
  reqUrl = isTestEnv() && envConfig.test.baseApi
  reqUrl = isDevelopEnv() && envConfig.dev.baseApi
  return reqUrl
}

export default envConfig
