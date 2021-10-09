<template>
  <a-modal :visible="visible" width="600px" title="个人信息" :footer="null" @cancel="handleCancel">
    <a-form ref="formRef" :model="formState">
      <a-form-item label="头像">
        <img src="@/assets/images/avator@2x.png" />
      </a-form-item>
      <a-form-item label="账号">
        <span>{{ formState?.account }}</span>
      </a-form-item>
      <a-form-item label="姓名">
        <span>{{ formState?.userName }}</span>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useMyStore } from '@/hooks'
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      require: true
    }
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const { state } = useMyStore()
    let formState = computed(() => state.user.user)
    const handleCancel = () => {
      emit('update:visible', false)
      console.log(emit)
    }

    return {
      formState,
      handleCancel
    }
  }
})
</script>

<style lang="scss">
.ant-modal-body {
  margin-left: 40px;
  label {
    color: $jc-color-info;
  }
}
</style>
