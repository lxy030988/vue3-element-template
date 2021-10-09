<template>
  <div class="jc-login-wrap">
    <div class="jc-login-contain">
      <h1>vue3-element-template</h1>
      <div class="jc-login-info">
        <div class="jc-login-user">
          <div class="jc-user-box"></div>
          <div class="jc-user-title">用户登录</div>
          <div class="jc-user-box"></div>
        </div>
        <el-form :model="form">
          <el-form-item>
            <el-input v-model:value="form.account" placeholder="账号" @keyup.enter="onSubmit">
              <template #prefix>
                <svg-icon name="login-user" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model:value.trim="form.userPwd" type="password" placeholder="密码" @keyup.enter="onSubmit">
              <template #prefix>
                <svg-icon name="login-password" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="login-btn"> 登录 </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw } from 'vue'
import { getUserInfo } from '@/api/user'
import { Md5 } from 'ts-md5/dist/md5'
import { useMyStore } from '@/hooks'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  setup() {
    const form = reactive({
      account: '',
      userPwd: ''
    })
    const { commit } = useMyStore()
    const router = useRouter()

    const onSubmit = async () => {
      try {
        const { account, userPwd } = toRaw(form)
        console.log(toRaw(form))
        const res = await getUserInfo({
          account,
          userPwd: Md5.hashStr(userPwd)
        })
        commit('user/SET_USER', res)
        router.push({ path: '/' })
      } catch (error) {
        console.error(error)
      }
    }
    return {
      form,
      onSubmit
    }
  }
})
</script>

<style scoped lang="scss">
.jc-login-wrap {
  background-image: linear-gradient(90deg, #008dff 0%, #503afb 100%);
  height: 100%;
  .jc-login-contain {
    float: right;
    margin-right: 200px;
    margin-top: 200px;
    h1 {
      font-size: 40px;
      color: $jc-color-white;
      margin-bottom: 40px;
      text-align: center;
    }
    .jc-login-info {
      width: 530px;
      height: 500px;
      border-radius: 20px;
      background: $jc-color-white;
      .jc-login-user {
        display: flex;
        padding: 80px 0;
        width: 300px;
        height: 20px;
        justify-content: space-between;
        margin: auto;
        .jc-user-box {
          width: 60px;
          height: 8px;
          background-image: linear-gradient(90deg, #008dff 0%, #503afb 100%);
          border-radius: 5px;
        }
        .jc-user-title {
          font-size: 28px;
          color: #333333;
          line-height: 8px;
        }
      }
      .el-form {
        padding: 0 70px;
        .el-form-item {
          .el-input-affix-wrapper {
            background: #f9f9f9;
            padding: 13px 10px 13px 24px;
            border-radius: 8px;
            overflow: hidden;
            .svg-icon {
              width: 24px;
              height: 24px;
              margin-right: 20px;
            }
            ::v-deep(.el-input) {
              background: #f9f9f9;
              font-size: 20px;
            }
          }

          .login-btn {
            margin-top: 25px;
            width: 100%;
            background-image: linear-gradient(90deg, #008dff 0%, #503afb 100%);
            border-radius: 8px;
            height: 54px;
            font-size: 20px;
            color: $jc-color-white;
          }
        }
      }
    }
  }
}
</style>
