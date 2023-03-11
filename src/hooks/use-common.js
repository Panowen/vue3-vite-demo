import useClipboard from 'vue-clipboard3';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es';

//深拷贝
export function _cloneDeep(value) {
  return cloneDeep(value);
}
//复制文本
const { toClipboard } = useClipboard();
export const copyValueToClipboard = (value) => {
  toClipboard(JSON.stringify(value));
  ElMessage.success('复制成功');
};
