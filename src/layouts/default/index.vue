<template>
  <div class="wrapper">
    <v-head />
    <div class="wrapper-con">
      <div class="left">
        <v-sidebar />
      </div>
      <div class="right">
        <div class="content-box">
          <router-view v-slot="{ Component }">
            <transition>
              <div class="content">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </div>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import VSidebar from './Sidebar/index.vue'
import VHead from './Header/Header.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    VSidebar,
    VHead
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
  flex-direction: column;
  .wrapper-con {
    flex: 1;
    display: flex;
    height: 0;
  }
}
.left {
  width: $jc-menu-width;
  background: $jc-slider-bgColor;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.right {
  width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  .content-box {
    flex: 1;
    background: $jc-bg-color;
    padding: $jc-default-dis;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .content {
      box-sizing: border-box;
    }
  }
}
</style>
