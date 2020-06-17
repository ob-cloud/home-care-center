import { axios } from './request'

export function httpAction (url, parameter = {}, method = '', extra = {}) {
  const methods = ['post', 'put']
  if (extra.isData) {
    methods.push(method)
    delete extra.isData
  }
  const opts = methods.includes(method.toLowerCase()) ? { data: parameter } : { params: parameter }
  return axios({
    url,
    method: method,
    ...opts,
    ...extra
  })
}

export function postAction (url, parameter = {}, extra = {}) {
  return httpAction(url, parameter, 'post', extra)
}

export function putAction (url, parameter = {}, extra = {}) {
  return httpAction(url, parameter, 'put', extra)
}

export function getAction (url, parameter = {}, extra = {}) {
  parameter.ts = Date.now()
  return httpAction(url, parameter, 'get', extra)
}

export function deleteAction (url, parameter = {}, extra = {}) {
  return httpAction(url, parameter, 'delete', extra)
}

export function deleteJsonAction (url, parameter = {}, extra = {}) {
  const headers = { headers: { 'Content-Type': 'application/json'} }
  return deleteAction(url, parameter, {isData: false, ...headers, ...extra})
}

export function downloadAction (url, parameter = {}, extra = {}) {
  return getAction(url, parameter, { responseType: 'blob', ...extra })
}
