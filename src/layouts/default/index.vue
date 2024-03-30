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
  box-sizing: border-box;
  flex-direction: column;
  overflow: hidden;

  .content-box {
    display: flex;
    box-sizing: border-box;
    flex: 1;
    flex-direction: column;
    height: 0;
    padding: $tp-default-dis;
    background: $tp-bg-color;

    .content {
      box-sizing: border-box;
      flex: 1;
      overflow: hidden auto;

      // background: $tp-color-white;
      // padding: $tp-default-dis;
    }
  }
}

.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}

.fade-slide-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
