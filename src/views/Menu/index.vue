<template>
  <div class="menu">
    <my-filter @filter="goFilter" />

    <el-card class="jc-table-card">
      <template #header>
        <div class="jc-card-title jc-fl">菜单列表</div>
        <div class="jc-fr">
          <el-button type="primary" @click="manage">新增</el-button>
        </div>
      </template>
      <el-table class="mt" :data="list">
        <el-table-column type="index" :index="tableIndex" label="序号" />
        <el-table-column prop="menuType" label="菜单类型" />
        <el-table-column prop="name" label="菜单名称" />
        <el-table-column prop="menuPath" label="链接" />
        <el-table-column prop="parentId" label="上级菜单" />
        <el-table-column prop="icon" label="图标" />
        <el-table-column prop="permission" label="菜单标识" />
        <el-table-column prop="menuSort" label="排序">
          <template #default="scope">
            <el-button type="text" size="mini" icon="el-icon-top" @click="sortRow(scope.row, -1)" />
            <el-button type="text" size="mini" icon="el-icon-bottom" @click="sortRow(scope.row, 1)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template #default="scope">
            <el-button type="text" size="mini" @click="show(scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="editRow(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <jc-pagination :pages="pages" @current-change="currentChange" @size-change="sizeChange" />
    </el-card>

    <el-dialog v-model="detailVisible" title="详情" width="600px">
      <detail :detailId="detailId" />
    </el-dialog>

    <el-dialog v-model="manageVisible" title="新增" width="600px">
      <manage :manageId="manageId" @close="closeManageDialog" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { bus } from '@/utils/eventBus'
import { defineAsyncComponent, defineComponent } from 'vue'
import { useTableData, useTableOperate } from './hooks/index'
export default defineComponent({
  name: 'MenuIndex',
  components: {
    MyFilter: defineAsyncComponent(() => import('./modules/Filter/index.vue')),
    Manage: defineAsyncComponent(() => import('./modules/Manage/index.vue')),
    Detail: defineAsyncComponent(() => import('./modules/Detail/index.vue'))
  },
  setup() {
    const { initData } = useTableData
    initData()
    bus.on('init-data-menu', () => {
      console.log('init-data-menu setup')
    })
    return { ...useTableData, ...useTableOperate }
  }
})
</script>

<style lang="scss" scoped></style>
