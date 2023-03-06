import router from '@/router'
import { progressClose, progressStart } from '@/hooks/use-permission'

router.beforeEach(async (to) => {
  progressStart()
  document.title = to.meta?.title
  return
})
//路由进入后拦截
router.afterEach(() => {
  progressClose()
})
