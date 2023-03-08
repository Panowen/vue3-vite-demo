import NProgress from 'nprogress'
/**
 * 路由操作
 * */
import router, { constantRoutes } from '@/router'
//进度条
import 'nprogress/nprogress.css'
import { useBasicStore } from '@/store/basic'

//重置路由
export function resetRouter() {
  //移除之前存在的路由
  const routeNameSet = new Set()
  router.getRoutes().forEach((fItem) => {
    if (fItem.name) routeNameSet.add(fItem.name)
  })
  routeNameSet.forEach((setItem) => router.removeRoute(setItem))
  //新增constantRoutes
  constantRoutes.forEach((feItem) => router.addRoute(feItem))
}
//重置登录状态
export function resetState() {
  resetRouter()
  useBasicStore().resetState()
}

//刷新路由
export function freshRouter() {
  resetRouter()
  // location.reload()
}

NProgress.configure({ showSpinner: false })
//开始进度条
export const progressStart = () => {
  NProgress.start()
}
//关闭进度条
export const progressClose = () => {
  NProgress.done()
}
