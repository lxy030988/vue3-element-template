<template>
  <div class="home">
    <div>
      <div>element 图标</div>
      <el-input v-model="input" placeholder="Please input" />
    </div>
    <img alt="Vue logo" src="@/assets/logo.png" />
    <img alt="Vue logo" src="../../assets/logo.png" />
    <img src="@/assets/icons/menu/home.svg" alt="" style="width: 20px" />
    <div>
      <el-button type="primary" @click="testVuex"> 测试Vuex </el-button>
    </div>

    <div class="tp-svg-icon assd s s s s">
      <div>图标测试</div>
      <svg-icon name="home" />
      <svg-icon name="setting" />
      <div class="echarts">
        <vue-echarts :options="options" />
      </div>
      <div>
        <el-button type="primary" @click="test"> 测试 </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const name = import.meta.env.VITE_NAME

import { computed, defineComponent, ref } from 'vue'

// import { GlobleState } from '@/store'
// import { useStore } from 'vuex'
import { useMyStore } from '@/hooks'

import VueEcharts, { OptionType } from '@/components/echarts'

import { bus } from '@/utils/eventBus'
export default defineComponent({
  name: 'Home',
  components: {
    VueEcharts
  },
  setup() {
    console.log('setup name', name)
    bus.on('bus-test', () => {
      console.log('bus-test home')
    })
    // const store = useStore<GlobleState>()
    // console.log(store.state.home.name)
    const { state, getters } = useMyStore()
    console.log('vuex state', state.user)
    console.log('getters', getters['user/isLogin'])
    const installData = ref([120, 200, 150, 80, 70, 110, 130])
    const options = computed(
      (): OptionType => ({
        // tooltip: {},
        color: ['red', '#006cff'],
        // legend: {},
        title: {
          text: '柱状图',
          borderWidth: 1,
          borderType: 'solid'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: installData.value,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      })
    )
    function test() {
      console.log('test')
      installData.value = [80, 70, 110, 130, 120, 200, 150]
      bus.emit('bus-test')
    }
    function testVuex() {
      console.log('testVuex')

      const docEle = document.documentElement
      docEle.style.setProperty('--color', 'green')

      // commit('user/GET_DATA', false)
      // dispatch('user/GET_DATA', false)
      // console.log('vuex state', state.user.loading)
      // setTimeout(() => {
      //   console.log('vuex state', state.user.loading)
      // }, 3000)
    }
    return { options, test, testVuex, input: ref('') }
  }
})
</script>
<style lang="scss" scoped>
.tp-svg-icon {
  color: red;
}

.echarts {
  width: 800px;
  height: 600px;
}

::v-deep(.deep-test) {
  color: red;

  .c1 {
    color: wheat;
  }
}
</style>
