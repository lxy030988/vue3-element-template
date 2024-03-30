<template>
  <div class="tp-flex tp-flex--column tp-full tp-default-container">
    <my-filter @filter="goFilter" />

    <div class="tp-flex-con tp-card tp-flex tp-flex--column tp-full" v-loading="loading">
      <div class="tp-card-header">
        <div class="tp-card-header__title">列表内容</div>
        <el-button type="primary" @click="manage()">新增</el-button>
        <el-button>导出</el-button>
      </div>

      <div class="tp-flex-con tp-ph tp-mb">
        <el-table class="tp-table tp-table--flex" :data="list">
          <el-table-column type="index" :index="tableIndex" label="序号" width="50" />
          <el-table-column prop="menuType" label="菜单类型" />
          <el-table-column prop="name" label="菜单名称" />
          <el-table-column prop="menuPath" label="链接" />
          <el-table-column prop="parentId" label="上级菜单" />
          <el-table-column prop="icon" label="图标" />
          <el-table-column prop="permission" label="菜单标识" />
          <el-table-column label="操作" width="100">
            <template #default="scope">
              <div class="tp-operate-button-box">
                <span class="tp-operate-button-item" title="详情" @click="show(scope.row)">
                  <svg-icon name="common-see" />
                </span>
                <span class="tp-operate-button-item" title="编辑" @click="manage()">
                  <svg-icon name="common-edit" />
                </span>
                <span class="tp-operate-button-item" title="删除" @click="manage()">
                  <svg-icon name="common-remove" />
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <tp-pagination :pages="pages" @current-change="currentChange" @size-change="sizeChange" />
    </div>

    <tp-dialog v-model="detailVisible" title="详情">
      <detail :detailId="detailId" />
    </tp-dialog>

    <tp-dialog v-model="manageVisible" title="新增">
      <manage :manageId="manageId" @close="closeManageDialog" />
    </tp-dialog>
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
