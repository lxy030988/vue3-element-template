<template>
  <div class="header">
    <div class="logo">
      <!-- <img src="@/assets/images/logo.png" /> -->
      vue3-element-template
    </div>
    <div class="menu">menu</div>
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
export default defineComponent({
  name: 'Header',
  setup() {
    const router = useRouter()
    const { state, commit } = useMyStore()
    const visible = ref(false)
    const userVisible = ref(false)
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
  display: flex;
  background-color: $jc-color-primary;
  color: $jc-color-white;
  position: relative;
  box-sizing: border-box;
  height: $jc-header-height;
  line-height: $jc-header-height;
  font-size: $jc-font-size-extra-large;

  .logo {
    float: left;
    padding-left: $jc-default-dis;
  }

  .menu {
    flex: 1;
    padding: 0 $jc-default-dis;
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
