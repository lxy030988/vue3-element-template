<template>
  <div class="menu">
    <el-card>
      <template #header>
        <div class="card-header">菜单列表</div>
      </template>
      <my-filter @filter="goFilter">
        <template #right>
          <el-button class="add-button" type="primary" @click="manage">新增</el-button>
        </template>
      </my-filter>
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
            <el-button type="primary" size="mini" @click="editRow(scope.row)">编辑</el-button>
            <el-button type="primary" plain size="mini" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :pages="pages" @current-change="currentChange" @size-change="sizeChange" />
    </el-card>
    <manage v-model:visible="manageVisible" :info="info" />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import { useTableData, useTableOperate } from './hooks/index'
export default defineComponent({
  name: 'MenuIndex',
  components: {
    MyFilter: defineAsyncComponent(() => import('./modules/Filter/index.vue')),

    Manage: defineAsyncComponent(() => import('./modules/Manage/index.vue'))
  },
  setup() {
    const { initData } = useTableData
    initData()
    return { ...useTableData, ...useTableOperate }
  }
})
</script>

<style lang="scss" scoped></style>
