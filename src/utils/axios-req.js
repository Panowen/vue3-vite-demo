import axios from 'axios'
import { useBasicStore } from '@/store/basic'
import { collapseItemProps } from 'element-plus'
const createAxiosByinterceptors = (group) => {
  console.log(BASEURL)
  const service = axios.create({
    baseURL: BASEURL[group],
    timeout: 8000
  })
  //请求前拦截
  service.interceptors.request.use(
    (req) => {
      console.log(req)
      const { token } = useBasicStore()
      //设置token到header
      req.headers['AUTHORIZE_TOKEN'] = 'asdasdas'
      return req
    },
    (err) => {
      //发送请求失败
      Promise.reject(err)
    }
  )
  //请求后拦截
  service.interceptors.response.use(
    (res) => {
      console.log(res)
      const { code, msg } = res.data
      const successCode = '0,200,20000'
      const noAuthCode = '401,403'
      if (successCode.includes(code)) {
        return res.data
      } else {
        if (noAuthCode.includes(code)) {
          // 登录失效
        }
        return Promise.reject(msg)
      }
    },
    //响应报错
    (err) => {
      return Promise.reject({
        data: err.response.data,
        status: err.response.status
      })
    }
  )
  return {
    post: ({ url, data, config }) => {
      return service({
        method: 'post',
        url,
        data,
        ...config
      })
    },
    get: ({ url, data, config }) => {
      return service({
        method: 'get',
        url,
        params: data,
        ...config
      })
    }
  }
}
export default createAxiosByinterceptors
