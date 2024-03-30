<template>
  <div class="wrapper tp-flex tp-flex--column tp-full">
    <v-head />

    <div class="content-box tp-flex-con tp-flex tp-flex--column">
      <bread-crumb />
      <div class="content tp-flex-con tp-auto--x">
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
  background-color: $tp-bg-color;

  .content {
    margin: 0 $tp-default-dis * 0.5 $tp-default-dis * 0.5;
    transform: translateZ(0);
  }
}

.fade-slide-leave-active,
.fade-slide-enter-active {
  transition: all 0.3s;
}

.fade-slide-enter-from {
  transform: translateY(30px);
  opacity: 0;
}

.fade-slide-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
