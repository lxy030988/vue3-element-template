<template>
  <div class="header">
    <div class="logo">
      <!-- <img src="@/assets/images/logo.png" /> -->
      综合智慧指挥平台
    </div>
    <jc-menu />
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { DropdownEnum } from '../model'
import { useRouter } from 'vue-router'
import { useMyStore } from '@/hooks'

import JcMenu from './Menu.vue'
export default defineComponent({
  name: 'Header',
  components: { JcMenu },
  setup() {
    const router = useRouter()
    const { state, commit } = useMyStore()

    const username = computed(() => state.user.user?.userName || 'admin')
    const handleCommand = (key: string) => {
      console.log('handleCommand', key)
      if (key === DropdownEnum.LOGOUT) {
        try {
          commit('user/SET_USER', null)
          router.push({ path: '/login' })
        } catch (error) {
          console.error(error)
        }
      }
    }

    return {
      username,
      handleCommand,
      DropdownEnum
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  background-color: $jc-header-bg-color;
  color: $jc-color-white;
  position: relative;
  box-sizing: border-box;
  height: $jc-header-height;
  line-height: $jc-header-height;
  font-size: $jc-font-size-extra-large;
  font-weight: $jc-font-weight-primary;

  .logo {
    float: left;
    padding: 0 $jc-default-dis;
    position: relative;
    &::after {
      content: '';
      width: 1px;
      height: 24px;
      background-color: rgba($color: #fff, $alpha: 0.2);
      position: absolute;
      top: 20px;
      right: 0;
    }
  }

  .el-menu {
    flex: 1;
    padding: ($jc-header-height - 60) * 0.5 $jc-default-dis;
  }

  .header-right {
    float: right;
    padding-right: $jc-default-dis * 2;

    .header-user-con {
      display: flex;
      height: $jc-header-height;
      font-size: $jc-font-size-medium;
      align-items: center;
    }

    .el-dropdown {
      color: $jc-color-white;

      .el-dropdown-link {
        cursor: pointer;

        img {
          width: 40px;
          height: 40px;
          margin-right: $jc-default-dis * 0.4;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
