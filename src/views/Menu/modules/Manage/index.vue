<!-- <template>
  <el-form class="tp-form" :model="formState">
    <el-form-item label="菜单名称">
      <el-input v-model="formState.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="上级菜单">
      <el-input v-model="formState.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="菜单链接">
      <el-input v-model="formState.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="菜单标识">
      <el-input v-model="formState.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="菜单图标">
      <el-input v-model="formState.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="上级菜单">
      <el-input v-model="formState.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="菜单链接">
      <el-input v-model="formState.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="菜单标识">
      <el-input v-model="formState.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="菜单图标">
      <el-input v-model="formState.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="formState.enable" />
    </el-form-item>
    <el-form-item class="tp-form-footer">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="resetForm">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { TMenuListItem } from '@/api/menu/model'
import { defineComponent, reactive, toRaw, watch, PropType, ref } from 'vue'
import { bus } from '@/utils/eventBus'

export default defineComponent({
  name: 'MenuManage',
  props: {
    manageId: {
      type: String,
      default: null
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    console.log('setup MenuManage')
    const formState = reactive({
      name: '',
      enable: false
    })
    const title = ref('新增')

    const onSubmit = () => {
      // toRaw(formState)
      emit('close')
      bus.emit('init-data-menu')
    }
    const resetForm = () => {
      emit('close')
    }

    return {
      title,
      formState,
      onSubmit,
      resetForm
    }
  }
})
</script>

<style scoped lang="scss"></style> -->
<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="Activity name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%" />
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker v-model="form.date2" placeholder="Pick a time" style="width: 100%" />
      </el-col>
    </el-form-item>
    <el-form-item label="Instant delivery">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="Online activities" name="type" />
        <el-checkbox label="Promotion activities" name="type" />
        <el-checkbox label="Offline activities" name="type" />
        <el-checkbox label="Simple brand exposure" name="type" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Resources">
      <el-radio-group v-model="form.resource">
        <el-radio label="Sponsor" />
        <el-radio label="Venue" />
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
