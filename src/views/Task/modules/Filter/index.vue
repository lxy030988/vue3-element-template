<template>
  <div class="tp-card tp-search-warp tp-mb--half">
    <el-form :inline="true" :model="formState" ref="formRef">
      <el-form-item label="时间" prop="name">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="x"
          :clearable="false"
          @change="dateChange"
        />
      </el-form-item>

      <el-form-item class="tp-fr">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { TTaskParams } from '@/api/task/model'
import dayjs from 'dayjs'
import { defineComponent, reactive, toRaw, ref } from 'vue'

export default defineComponent({
  name: 'MenuFilter',
  emits: ['filter'],
  setup(props, { emit }) {
    const formRef = ref()

    const reset = () => {
      formRef.value.resetFields()
    }
    const onSubmit = () => {
      emit('filter', toRaw(formState))
    }

    const startTime = dayjs().startOf('months').valueOf()
    const endTime = dayjs().endOf('day').valueOf()
    const date = ref<any>([startTime, endTime])

    const formState = reactive<TTaskParams>({
      start: startTime,
      end: endTime
    })

    const dateChange = (v: number[]) => {
      if (v) {
        formState.start = v[0]
        formState.end = v[1]
      } else {
        formState.start = undefined
        formState.end = undefined
      }
    }

    onSubmit()
    return {
      dateChange,
      date,
      formRef,
      reset,
      formState,
      onSubmit
    }
  }
})
</script>

<style scoped lang="scss"></style>
