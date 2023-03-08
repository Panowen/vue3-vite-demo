import axios from 'axios'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { useBasicStore } from '@/store/basic'

const service = axios.create()
let loadingInstance = null
//请求前拦截
service.interceptors.request.use(
  (req) => {
    const { token } = useBasicStore()
    req.headers['AUTHORIZE_TOKEN'] = token
    if ('get'.includes(req.method?.toLowerCase())) req.params = req.data

    if (req.reqLoading ?? true) {
      loadingInstance = ElLoading.service({
        lock: true,
        fullscreen: true,
        // spinner: 'CircleCheck',
        text: '数据载入中...',
        background: 'rgba(0, 0, 0, 0.3)'
      })
    }

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
    if (loadingInstance) {
      loadingInstance && loadingInstance.close()
    }
    if (['application/zip', 'zip', 'blob', 'arraybuffer'].includes(res.headers['content-type'])) {
      return res
    }
    const { code, msg } = res.data
    const successCode = '0,200,20000'
    const noAuthCode = '401,403'
    if (successCode.includes(code)) {
      return res.data
    } else {
      if (noAuthCode.includes(code)) {
        ElMessageBox.confirm('请重新登录', {
          confirmButtonText: '重新登录',
          closeOnClickModal: false,
          showCancelButton: false,
          showClose: false,
          type: 'warning'
        }).then(() => {
          useBasicStore().resetStateAndToLogin()
        })
      }
      if (!res.config?.isNotTipErrorMsg) {
        ElMessage.error({
          message: msg,
          duration: 2 * 1000
        })
      }
      return Promise.reject(msg)
    }
  },
  (err) => {
    if (loadingInstance) {
      loadingInstance && loadingInstance.close()
    }
    ElMessage.error({
      message: err,
      duration: 2 * 1000
    })
    return Promise.reject(err)
  }
)
//导出service实例给页面调用 , config->页面的配置
export default function axiosReq(config) {
  return service({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    timeout: 8000,
    ...config
  })
}
