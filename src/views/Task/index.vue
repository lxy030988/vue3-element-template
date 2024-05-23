<template>
  <div class="tp-flex tp-flex--column tp-full tp-default-container">
    <my-filter @filter="goFilter" />

    <div class="tp-flex-con tp-card tp-flex tp-flex--column tp-full" v-loading="loading">
      <div class="tp-card-header">
        <div class="tp-card-header__title">列表内容</div>
        <!-- <el-button type="primary" @click="manage()">新增</el-button> -->
        <el-button @click="exportList">导出</el-button>
      </div>

      <div class="tp-flex-con tp-ph tp-mb">
        <el-table class="tp-table tp-table--flex" :data="list">
          <el-table-column type="index" :index="tableIndex" label="序号" width="50" />
          <el-table-column prop="unit" label="单位" />
          <el-table-column prop="planNumber" label="日计划编号" />
          <el-table-column prop="jobName" label="作业名称" />
          <el-table-column prop="inspectionTime" label="稽查时间" :formatter="formatTableTime" width="160" />
          <el-table-column prop="jobUnit" label="作业单位" />
          <el-table-column prop="jobUnitNature" label="作业单位性质" />
          <el-table-column prop="violationNature" label="违章性质" />
          <el-table-column prop="violationType" label="违章类型" />
          <el-table-column prop="violationDesc" label="违章问题描述" />
          <el-table-column label="佐证材料" width="300">
            <template #default="scope">
              <el-image
                :src="scope.row.evidenceUrl"
                :preview-src-list="[scope.row.evidenceUrl]"
                :initial-index="1"
                preview-teleported
              />
              <!-- <img width="300" :src="scope.row.evidenceUrl" alt="" /> -->
              <!-- <div class="tp-operate-button-box">
                <span class="tp-operate-button-item" title="详情" @click="show(scope.row)">
                  <svg-icon name="common-see" />
                </span>
                <span class="tp-operate-button-item" title="编辑" @click="manage()">
                  <svg-icon name="common-edit" />
                </span>
                <span class="tp-operate-button-item" title="删除" @click="manage()">
                  <svg-icon name="common-remove" />
                </span>
              </div> -->
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
import { defineAsyncComponent, defineComponent } from 'vue'
import { useTableData, useTableOperate } from './hooks/index'
import { formatTableTime } from '@/utils/util'

export default defineComponent({
  name: 'TaskIndex',
  components: {
    MyFilter: defineAsyncComponent(() => import('./modules/Filter/index.vue')),
    Manage: defineAsyncComponent(() => import('./modules/Manage/index.vue')),
    Detail: defineAsyncComponent(() => import('./modules/Detail/index.vue'))
  },
  setup() {
    // const { initData } = useTableData
    // initData()
    // bus.on('init-data-menu', () => {
    //   console.log('init-data-menu setup')
    // })

    return { ...useTableData, ...useTableOperate, formatTableTime }
  }
})
</script>

<style lang="scss" scoped></style>
