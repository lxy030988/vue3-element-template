<template>
  <div class="header">
    <div class="logo">
      <!-- <img src="@/assets/images/logo.png" /> -->
      vue3-element-template
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户名下拉菜单 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <!-- <img src="@/assets/images/avator.png" /> -->
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :command="DropdownEnum.USER_INFO">个人信息</el-dropdown-item>
              <el-dropdown-item :command="DropdownEnum.UPDATE_PASSWORD">修改密码</el-dropdown-item>
              <el-dropdown-item :command="DropdownEnum.LOGOUT">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- <update-pwd v-model:visible="visible" /> -->
        <!-- <user-info v-model:visible="userVisible" /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import updatePwd from './updatePwd/index.vue'
import userInfo from './userInfo/index.vue'

import { DropdownEnum } from '../enum'
import { useRouter } from 'vue-router'
import { useMyStore } from '@/hooks'
export default defineComponent({
  name: 'Header',
  components: {
    updatePwd,
    userInfo
  },
  setup() {
    const router = useRouter()
    const { state, commit } = useMyStore()
    let visible = ref(false)
    let userVisible = ref(false)
    let username = computed(() => state.user.user?.userName || 'admin')
    const handleCommand = (key: string) => {
      if (key === DropdownEnum.LOGOUT) {
        try {
          commit('user/SET_USER', null)
          router.push({ path: '/login' })
        } catch (error) {
          console.error(error)
        }
      }
      if (key === DropdownEnum.UPDATE_PASSWORD) {
        visible.value = true
      }
      if (key === DropdownEnum.USER_INFO) {
        userVisible.value = true
      }
    }

    return {
      username,
      handleCommand,
      DropdownEnum,
      visible,
      userVisible
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  background-color: $jc-color-white;
  position: relative;
  box-sizing: border-box;
  height: $jc-header-height;
  font-size: $jc-font-size-extra-large;
  border-bottom: 1px solid $jc-border-color-base;
}

.header .logo {
  float: left;
  line-height: $jc-header-height;
  padding-left: $jc-default-dis;
}

.header-right {
  float: right;
  padding-right: $jc-default-dis * 2;
}

.header-user-con {
  display: flex;
  height: $jc-header-height;
  font-size: $jc-font-size-medium;
  align-items: center;
}

.el-dropdown-link {
  cursor: pointer;

  img {
    width: 40px;
    height: 40px;
    margin-right: $jc-default-dis * 0.4;
    border-radius: 50%;
  }
}
</style>
