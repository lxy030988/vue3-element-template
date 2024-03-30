<template>
  <div class="plan">
    <div class="plan">plan</div>
    <div class="plan2">plan</div>
    <div class="plan3">plan</div>
    <div>color--{{ color }}</div>
    <div>size--{{ size }}</div>
    <el-button type="primary" @click="test">测试</el-button>
    <!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->
    <test-setup ref="ref1" msg="xxx" :more="{ name: 'l', age: 11 }" @change="testSetupChange" />
    <el-button type="primary" @click="testSetupBtn">test-setup-btn</el-button>

    <my-count :init-value="1" />
  </div>
</template>

<script lang="ts">
//setup
// import { defineAsyncComponent } from 'vue'
// const TestSetup = defineAsyncComponent(() => import('@/components/testSetup.vue'))
import TestSetup from '@/components/testSetup.vue'
import { bus } from '@/utils/eventBus'

import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import myCount from './count'
export default defineComponent({
  name: 'Plan',
  components: {
    myCount,
    TestSetup
  },
  setup() {
    console.log('setup plan')
    // const name = inject('name', 'lxy0')
    const color = ref('red')
    const font = reactive({ size: '30px' })

    bus.on('bus-test', () => {
      console.log('bus-test plan')
    })

    function test() {
      console.log('test')
      // color.value = 'green'
      // font.size = '18px'

      bus.emit('bus-test')
    }
    // watch

    // watchEffect 和 watch的不同
    /**
     *1.不需要手动传入依赖
     2.不是lazy初始化执行分析依赖
     3.无法获取原始值
     4.一些异步操作放里面更加的合适
     5.wacth第三个参数处理副作用的第一个参数
     */
    // const eff = watchEffect(
    //   cb => {
    //     // (name as  Ref<string>).value
    //     console.log('watchEffect', (name as unknown as Ref<string>).value)
    //     cb(() => {
    //       //清除副作用
    //       console.log('cb')
    //     })
    //   },
    //   {
    //     onTrigger() {
    //       console.log('onTrigger')
    //     }
    //   }
    // )
    // eff()//停止副作用

    const ref1 = ref(null)
    onMounted(() => {
      console.log('onMounted')
      console.log('ref1', ref1.value)
      // ref1.value!.test()
      // ;(ref1.value as any).test()
    })

    function testSetupChange(v: any) {
      console.log('testSetupChange', v)
    }

    function testSetupBtn() {
      ;(ref1.value as any).test()
    }
    return { color, font, test, ...toRefs(font), ref1, testSetupChange, testSetupBtn }
  }
})
</script>

<style lang="scss" scoped>
.plan {
  color: var(--color);
}

.plan2 {
  color: var(--color);
}

.plan3 {
  color: v-bind(color);
  font-size: v-bind('font.size');
}
</style>
