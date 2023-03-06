//复制文本
import useClipboard from 'vue-clipboard3'
import { ElMessage } from 'element-plus'

export const sleepTimeout = (time) => {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(null)
    }, time)
  })
}

//深拷贝
export function cloneDeep(value) {
  return JSON.parse(JSON.stringify(value))
}

//copyValueToClipboard
const { toClipboard } = useClipboard()
export const copyValueToClipboard = (value) => {
  toClipboard(JSON.stringify(value))
  ElMessage.success('复制成功')
}
