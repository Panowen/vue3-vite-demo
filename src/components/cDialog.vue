<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="dialogTitle"
    :draggable="draggable"
    :width="dialogWidth"
    @close="dialogClose"
    @open="dialogOpen"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="Cancel">取消</el-button>
        <el-button type="primary" @click="Confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup >
// import { ref, computed } from 'vue';
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  dialogTitle: {
    type: String,
    default: '',
  },
  dialogWidth: {
    type: String,
    default: '50%',
  },
});
const emit = defineEmits(['update:modelValue', 'cancel', 'confirm', 'close', 'open']);

const dialogFormVisible = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
const dialogClose = () => {
  emit('close');
};
const dialogOpen = () => {
  emit('open');
};
const Cancel = () => {
  emit('cancel');
};
const Confirm = () => {
  emit('confirm');
};
</script>

<style lang='scss' scoped>
</style>