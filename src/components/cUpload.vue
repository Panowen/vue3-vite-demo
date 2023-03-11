<template>
  <div v-show="fileUrl">
    <el-image
      style="width: 148px; height: 148px; vertical-align: bottom"
      :src="getImageUrl(fileUrl)"
      @click="handlePictureCardPreview"
    />
  </div>
  <el-upload
    :action="action"
    :show-file-list="false"
    list-type="picture-card"
    accept="image/png,image/jpeg,image/bmp"
    :on-success="uploadSuccess"
    :on-error="uploadError"
    :limit="1"
  >
    <el-icon>
      <Plus />
    </el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="fileUrl" />
  </el-dialog>
</template>
<script setup>
// import { ref, watch, reactive, toRefs } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { getImageUrl, getWholeImageUrl } from '@/utils/image';
const props = defineProps({
  action: {
    type: String,
    default: `${BASEURL.CMS}/config/image`,
  },
  fileUrl: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['on-success', 'on-error']);
const dataMap = reactive({
  dialogVisible: false,
});
const { dialogVisible } = toRefs(dataMap);

const handlePictureCardPreview = () => {
  dataMap.dialogVisible.value = true;
};
const uploadSuccess = (res) => {
  emit('on-success', res);
};
const uploadError = () => {
  emit('on-error');
};
</script>

<style lang="scss" scoped></style>
