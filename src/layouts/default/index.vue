<template>
  <div class="wrapper">
    <v-head />
    <!-- <div class="wrapper-con">

    </div> -->
    <div class="content-box">
      <bread-crumb />
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in" appear>
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import VHead from './Header/index.vue'
import BreadCrumb from './BreadCrumb.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    VHead,
    BreadCrumb
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
  .content-box {
    flex: 1;
    background: $jc-bg-color;
    padding: $jc-default-dis;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 0;
    .content {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
      box-sizing: border-box;
      // background: $jc-color-white;
      // padding: $jc-default-dis;
    }
  }
}

.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  opacity: 0%;
  transform: translateX(-30px);
}

.fade-slide-leave-to {
  opacity: 0%;
  transform: translateX(30px);
}
</style>
