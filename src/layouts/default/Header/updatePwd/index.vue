<template>
  <a-modal :visible="visible" width="800px" title="修改密码" @ok="handleOk" @cancel="handleCancel">
    <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
      <a-form-item label="旧密码" name="oldPassword">
        <a-input v-model:value="formState.oldPassword" placeholder="请输入旧密码" />
      </a-form-item>
      <a-form-item label="新密码" name="newPassword">
        <a-input v-model:value="formState.newPassword" placeholder="请输入新密码" />
      </a-form-item>
      <a-form-item label="新密码" name="repeatPassword" required>
        <a-input v-model:value="formState.repeatPassword" placeholder="请重新输入新密码" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { reactive, toRaw, defineComponent, ref } from 'vue'
import { NOT_NULL } from '@/utils/rule/index'
import { updatePwd } from '@/api/user/index'
import { Md5 } from 'ts-md5'
import { FormRefType } from '@/hooks/useForm'
import { useRouter } from 'vue-router'
import { useMyStore } from '@/hooks'
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:visible', 'success'],
  setup(props, { emit }) {
    const formState = reactive({
      newPassword: '',
      oldPassword: '',
      repeatPassword: ''
    })
    const validateRepeatPwd = (rule: any, value: string) => {
      console.log(formState)
      return new Promise((resolve, reject) => {
        if (value === formState.newPassword) {
          resolve('')
        } else {
          reject('两次密码不一致')
        }
      })
    }
    const rules = {
      newPassword: NOT_NULL,
      oldPassword: NOT_NULL,
      repeatPassword: [{ validator: validateRepeatPwd }, NOT_NULL]
    }
    //表单确认提交
    const formRef = ref<FormRefType>()
    const handleOk = () => {
      formRef
        .value!.validate()
        .then(() => {
          validated()
        })
        .catch((error: any) => {
          console.log('validate error', error)
        })
    }
    let loading = ref(false)
    const router = useRouter()
    const { commit } = useMyStore()
    const validated = async () => {
      try {
        loading.value = true
        const { newPassword, oldPassword, repeatPassword } = toRaw(formState)
        await updatePwd({
          newPassword: Md5.hashStr(newPassword),
          oldPassword: Md5.hashStr(oldPassword),
          repeatPassword: Md5.hashStr(repeatPassword)
        })
        commit('user/SET_USER', null)
        router.push({ path: '/login' })
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    const handleCancel = () => {
      emit('update:visible', false)
    }
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      rules,
      formRef,
      validateRepeatPwd,
      handleOk,
      handleCancel
    }
  }
})
</script>

<style></style>
