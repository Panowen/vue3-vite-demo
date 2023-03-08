import { ref } from 'vue'
import { elConfirm, elMessage } from './use-element'
import axiosReq from '@/utils/axios-req'
export const useTable = (searchForm, selectPageReq) => {
  const tableListData = ref([])
  const totalPage = ref(0)
  const pageNum = ref(1)
  const pageSize = ref(20)

  /**
   * 列表请求
   * @param {Object} config
   * @returns {Primise}
   */
  const tableListReq = (config) => {
    const data = Object.assign(
      {
        pageNum: pageNum.value,
        pageSize: pageSize.value
      },
      JSON.parse(JSON.stringify(searchForm))
    )
    const reqConfig = {
      data,
      ...config
    }
    return axiosReq(reqConfig)
  }

  /**
   * 日期范围选择处理
   * @param {Array} timeArr
   */
  const dateRangePacking = (timeArr) => {
    if (timeArr && timeArr.length === 2) {
      searchForm.startTime = timeArr[0]
      //取今天23点
      if (searchForm.endTime) {
        // searchForm.endTime = momentMini(timeArr[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      }
    } else {
      searchForm.startTime = ''
      searchForm.endTime = ''
    }
  }
  /**
   * 切换页码
   * @param {Number} val
   */
  const handleCurrentChange = (val) => {
    pageNum.value = val
    selectPageReq()
  }
  /**
   * 切换页数
   * @param {Number} val
   */
  const handleSizeChange = (val) => {
    pageSize.value = val
    selectPageReq()
  }
  /**
   * 重新请求第一页
   */
  const resetPageReq = () => {
    pageNum.value = 1
    selectPageReq()
  }
  /**
   * 批量删除
   * @param {Object} reqConfig
   *
   */
  const multiDelBtnDill = (reqConfig) => {
    if (multipleSelection.value.length === 0) {
      elMessage('表格选项不能为空', 'warning')
      return
    }
    elConfirm('删除', `已勾选 ${multipleSelection.value.length} 项，您确定要删除吗`)
      .then(() => {
        axiosReq({
          method: 'DELETE',
          bfLoading: true,
          ...reqConfig
        }).then(() => {
          elMessage('删除成功')
          resetPageReq()
        })
      })
      .catch(() => {})
  }
  /**
   *
   * @param {Object} row
   * @param {Object} reqConfig
   */
  const tableDelDill = (row, reqConfig) => {
    elConfirm('确定', '您确定要删除吗？')
      .then(() => {
        axiosReq(reqConfig).then(() => {
          resetPageReq()
          elMessage('删除成功')
        })
      })
      .catch(() => {})
  }
  /**
   * 多选模块
   */
  const multipleSelection = ref([])
  const handleSelectionChange = (val) => {
    multipleSelection.value = val
  }

  const expandData = ref([])
  /**
   * 展开模块
   * @param {Object} row
   * @param {Object} expandedRows
   * @param {String} mode
   * 当mode为single, 只存在一个展开项
   */
  const handleExpandChange = (row, expandedRows, mode) => {
    if (mode === 'single') {
      if (expandedRows.length >= 1) {
        expandData.value = []
        expandData.value.push(row.id)
      } else {
        expandData.value = []
      }
    }
  }
  return {
    pageNum,
    pageSize,
    totalPage,
    tableListData,
    tableListReq,
    dateRangePacking,
    multipleSelection,
    handleSelectionChange,
    handleCurrentChange,
    handleSizeChange,
    resetPageReq,
    multiDelBtnDill,
    tableDelDill,
    handleExpandChange,
    expandData
  }
}
