<template>
  <div :class="$style.a">
    <span :class="$style.b">aaaaa</span>
    <span class="deep-test">
      deep-test
      <span class="c1">c1</span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import classes from './index.module.scss' //加载模块化scss

export default defineComponent({
  name: 'Message',
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped module>
//$style.a
.a {
  display: flex;
  box-shadow: 0px 0px 3px #121212 inset;
  background: rebeccapurple;
  .b {
    font-size: 28px;
  }
}
::placeholder {
  color: gray;
}
</style>
