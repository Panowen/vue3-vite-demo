<template>
  <div class="mt-20px">
    <el-form ref="refSearchForm" class="mb-20px" :inline="true" :model="searchForm">
      <el-form-item prop="log" label="ID">
        <el-input v-model="searchForm.log" class="w-150px" placeholder="ID" />
      </el-form-item>
      <el-form-item prop="pageUrl" label="名称">
        <el-input v-model="searchForm.pageUrl" class="w-200px" placeholder="name" />
      </el-form-item>
      <el-form-item prop="startEndArr">
        <el-date-picker
          v-model="searchForm.startEndArr"
          type="daterange"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD HH:mm:ss"
          class="w-250px"
          range-separator="-"
          start-placeholder="startDate"
          end-placeholder="endDate"
          @change="dateRangePacking"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetPageReq">搜索</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="addProject">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      id="resetElementDialog"
      ref="refuserTable"
      border
      :data="tableListData"
      :expand-row-keys="expandData"
      row-key="id"
      @selection-change="handleSelectionChange"
      @expand-change="(row, expandedRows) => handleExpandChange(row, expandedRows, 'single')"
    >
      <el-table-column show-overflow-tooltip align="center" prop="id" label="项目ID" min-width="120" />
      <el-table-column show-overflow-tooltip align="center" prop="logo" label="项目Logo" min-width="120" />
      <el-table-column show-overflow-tooltip align="center" prop="projectName" label="项目名称" min-width="120" />
      <el-table-column show-overflow-tooltip align="center" prop="desc" label="项目描述" min-width="120" />
      <el-table-column show-overflow-tooltip align="center" prop="projectName" label="实验模式" min-width="120" />
      <el-table-column fixed="right" align="center" label="状态" width="120">
        <template #default="{ row }">
          <el-switch v-model="row.status" inline-prompt active-text="是" inactive-text="否" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="120">
        <template #default="{ row }">
          <div class="table-operation-btn">
            <span @click="tableEdit(row)">编辑</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="totalPage >= 10" class="rowCC mt-20px">
      <el-pagination
        :current-page="pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
  <cDialog v-model="dialogFormVisible" @close="dialogClose" @cancel="Cancel" @confirm="Confirm">
    <el-form ref="formRefs" :model="editForm">
      <el-form-item prop="projectName" label="项目名称" :label-width="formLabelWidth">
        <el-input v-model="editForm.projectName" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="logo" label="项目Logo" :label-width="formLabelWidth">
        <cUpload :file-url="editForm.logo" @on-success="imgChange"></cUpload>
      </el-form-item>
      <el-form-item prop="desc" label="项目描述" :label-width="formLabelWidth">
        <el-input v-model="editForm.desc" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="modes" label="项目实验" :label-width="formLabelWidth">
        <el-checkbox-group v-model="editForm.modes">
          <el-checkbox label="1">编程实验</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </cDialog>
</template>
<script setup>
// import { onMounted, reactive, ref, toRefs, nextTick } from 'vue';
import cmsapi from '@/api/cms.js';
import { useTable } from '@/hooks/use-table';
import cUpload from '@/components/cUpload.vue';
import cDialog from '@/components/cDialog.vue';
import { copyData } from '@/utils/assist.js';
const formLabelWidth = 100;
const refSearchForm = ref();

const searchForm = reactive({
  log: '',
  pageUrl: '',
  startEndArr: '',
});
const selectPageReq = async () => {
  const tableData = [
    {
      id: 1,
      desc: '2016-05-1',
      projectName: 'Tom',
      status: '001',
      logo: '001',
    },
    {
      id: 2,
      desc: '2016-05-2',
      projectName: 'Tom',
      status: '001',
      logo: '002',
    },
    {
      id: 3,
      desc: '2016-05-3',
      projectName: 'Tom',
      status: '001',
      logo: '003',
    },
    {
      id: 4,
      desc: '2016-05-4',
      projectName: 'Tom',
      status: '001',
      logo: 'cms/33e961e64c43442eac7f1cec9a6a8b68',
    },
  ];
  tableListData.value = tableData;
  totalPage.value = tableData.length;
  try {
    await cmsapi.img({ url: 1 }, { headers: { aaa: 1 } });
  } catch (error) {
    console.log(error);
  }
};
// 重置
const resetForm = () => {
  refSearchForm.value.resetFields();
  dateRangePacking(['', '']);
  resetPageReq();
};
// 新增项目按钮
const addProject = () => {
  dataMap.dialogFormVisible = true;
};

/**
 * 弹窗表单
 */
const defaultFrom = () => ({
  projectName: '',
  logo: '',
  desc: '',
  modes: [],
});
let dataMap = reactive({
  editForm: defaultFrom(),
  dialogFormVisible: false,
});
const { editForm, dialogFormVisible } = toRefs(dataMap);
// 编辑
const tableEdit = (row) => {
  dataMap.dialogFormVisible = true;
  dataMap.editForm = Object.assign({}, row);
};
// 弹窗关闭事件
const dialogClose = () => {
  dataMap.editForm = defaultFrom();
};
// 弹窗取消事件
const Cancel = () => {
  dataMap.dialogFormVisible = false;
};
// 弹窗确定事件
const Confirm = () => {
  console.log(dataMap.editForm);
};

// 弹窗图片改变事件
const imgChange = (url) => {
  dataMap.editForm.logo = url;
};
onMounted(() => {
  selectPageReq();
});

let {
  pageNum,
  pageSize,
  totalPage,
  tableListData,
  dateRangePacking,
  handleSelectionChange,
  handleCurrentChange,
  handleSizeChange,
  resetPageReq,
  handleExpandChange,
  expandData,
} = useTable(searchForm, selectPageReq);
</script>

<style scoped lang="scss"></style>
