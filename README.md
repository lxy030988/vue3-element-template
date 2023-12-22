# vue3-element-template

vite + vue3 + element-plus 后台管理系统模板

```js
vue3-element-template
├─ build //打包插件
├─ mock //假数据
├─ plugins //vite插件
├─ public //静态资源
├─ src
│ ├─ api //接口
│ │ ├─ user //用户
│ │ │ ├─ index.ts //接口方法
│ │ │ └─ model.ts //接口类型
│ │ ├─ api.ts //接口地址
│ │ └─ model.ts //同用类型
│ ├─ assets //图片
│ │ ├─ icons //svg图标
│ │ │ ├─ login //登录模块相关的图标
│ │ │ │ ├─ password.svg
│ │ │ │ └─ user.svg
│ │ ├─ images //图片
│ │ │ └─ logo.png
│ ├─ components //通用组件
│ │ ├─ echarts
│ │ │ └─ index.ts
│ │ ├─ Icon
│ │ │ └─ index.vue
│ │ ├─ pagination
│ │ │ └─ index.vue
│ ├─ enums //枚举
│ │ ├─ httpEnum.ts
│ │ └─ storageEnum.ts
│ ├─ env //各个环境 定制化页面
│ │ ├─ dev // dev环境
│ │ │ ├─ dev1 //dev环境 - dev1页面
│ │ │ │ └─ index.vue
│ │ │ └─ dev2 //dev环境 - dev2页面
│ │ │ └─ index.vue
│ │ └─ index.ts //定制化页面配置
│ ├─ example //测试页面
│ │ ├─ EchartsGlMap.vue
│ │ ├─ index.ts
│ │ └─ Upload.vue
│ ├─ hooks //通用hooks
│ │ ├─ index.ts
│ │ ├─ usePage.ts
│ │ └─ useStore.ts
│ ├─ layouts //布局
│ │ ├─ default //默认布局
│ │ │ ├─ Header
│ │ │ │ └─ index.vue
│ │ │ ├─ Sidebar
│ │ │ │ ├─ index.vue
│ │ │ │ ├─ Item.tsx
│ │ │ │ └─ SidebarItem.vue
│ │ │ ├─ BreadCrumb.vue
│ │ │ ├─ index.vue
│ │ │ └─ model.ts
│ │ └─ full //全部显示
│ │ └─ index.vue
│ ├─ plugins //vue插件 注册组件
│ │ ├─ echarts.ts
│ │ ├─ element-plus.ts
│ │ ├─ index.ts
│ │ └─ svgIcon.ts
│ ├─ router //路由
│ │ ├─ envPages.ts
│ │ └─ index.ts
│ ├─ store
│ │ ├─ modules
│ │ │ ├─ user
│ │ │ │ ├─ actions.ts
│ │ │ │ ├─ constant.ts
│ │ │ │ ├─ getters.ts
│ │ │ │ ├─ index.ts
│ │ │ │ ├─ mutations.ts
│ │ │ │ └─ store.ts
│ │ ├─ index.ts
│ │ ├─ modules.ts
│ │ └─ utils.ts
│ ├─ styles
│ │ ├─ theme //主题
│ │ │ ├─ default.scss //默认主题 变量
│ │ │ └─ index.scss
│ │ ├─ index.scss // 通用样式
│ │ └─ variables.scss //通用变量
│ ├─ utils //工具累
│ │ ├─ download
│ │ │ ├─ index.ts
│ │ │ └─ model.ts
│ │ ├─ enum
│ │ │ └─ index.ts
│ │ ├─ http
│ │ │ ├─ index.ts
│ │ │ └─ model.ts
│ │ ├─ message
│ │ │ └─ index.ts
│ │ ├─ rule
│ │ │ └─ index.ts
│ │ ├─ storage
│ │ │ ├─ user
│ │ │ │ ├─ index.ts
│ │ │ │ └─ model.ts
│ │ │ └─ index.ts
│ │ └─ util
│ │ └─ index.ts
│ ├─ views
│ │ ├─ Menu
│ │ │ ├─ hooks
│ │ │ │ ├─ index.ts
│ │ │ │ ├─ useTableData.ts
│ │ │ │ └─ useTableOperate.ts
│ │ │ ├─ modules
│ │ │ │ ├─ Filter
│ │ │ │ │ └─ index.vue
│ │ │ │ └─ Manage
│ │ │ │ └─ index.vue
│ │ │ ├─ CONST.ts
│ │ │ └─ index.vue
│ ├─ App.vue
│ ├─ main.ts
│ └─ shims-vue.d.ts
├─ babel.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ README.md
├─ tsconfig.json
└─ vite.config.ts
```

## 基础

### vue3 基础

- https://v3.cn.vuejs.org/

```js
import { defineComponent, inject, provide, onMounted, PropType, reactive, Ref, ref, toRefs, watch, watchEffect } from 'vue'

setup(props,ctx) {}
```

### element-plus

- https://element-plus.gitee.io/zh-CN/

### vue3.2

- script setup + TS + Volar
- vscode 禁用 Vetur，下载 Volar
- define 编译器宏 不需要引入，直接使用 。defineProps defineEmits defineExpose
- 示例 src/components/testSetup.vue

- 需要更新这几个包

```json
"vue": "^3.2.3",
"vue-router": "^4.0.11",

"@vitejs/plugin-vue": "^1.4.0",
"@vitejs/plugin-vue-jsx": "^1.1.7",
"@vue/compiler-sfc": "^3.2.3",
```

### 文件引入

- @ = src 目录

- 相对路径 ./assets/logo.png

- 绝对路径 @/assets/logo.png

- 在 script 中引入静态文件

  ```html
  <img :src="logo" alt="" />

  <script setup lang="ts">
    import logo from '@/assets/logo.png'
  </script>
  ```

### http 数据请求

- 在 src\api\api.ts 添加请求地址
- 在 src\api\user\index.ts 添加请求函数

```js
import http from '@/utils/http'
import api from '../api'
import { TParamsLogin, TResUser } from './model'

/**
 * 用户登录
 * @param data
 * @returns
 */
export function getUserInfo(data: TParamsLogin) {
  return (
    http.request < any,
    TResUser >
      {
        url: api.user.login,
        method: 'POST',
        data
      }
  )
}
```

### mock 数据

- 在 mock 文件夹 添加 json 文件
- 在 src/api/mock 文件夹新建 ts 文件

```js
import mock from '.'

export function getNanJing() {
  return mock.get('/mock/320100.json')
}
```

### css 深度选择器

```scss
::v-deep(.deep-test) {
  color: red;
  .c1 {
    color: wheat;
  }
}
```

### css 变量

```css
:root {
  --color: rgb(0, 38, 255);
}

.plan {
  color: var(--color);
}
```

### scss 变量全局使用

- src/styles/variables.scss 在此文件里定义变量
- 如果新建文件定义变量 需要在 vite.config.ts 配置 additionalData 引入该文件

```js
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@import "@/styles/variables.scss";@import "@/styles/variables2.scss";`
    }
  }
}
```

### module.css

```html
<div :class="$style.a">
  <span :class="$style.b">aaaaa</span>
</div>
<script lang="ts">
  // import classes from './index.module.scss' //加载模块化scss
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
</style>
```

### vue3 的 vetur

- volar（vscode 插件）
- volar 和 vetur 只能开启一个

### quicktype 根据 json 生成 ts interface

- https://app.quicktype.io/

### vscode 设置

```json
//vscode Vue格式化HTML标签换行问题
"vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
        "wrap_attributes": "force-expand-multiline" //auto
    }
}
```

## 提升

### [Teleport](https://v3.cn.vuejs.org/guide/teleport.html)

- 将组件渲染到指定的 DOM 元素下

```vue
<teleport to="body">
    <div v-if="modalOpen" class="modal">
        <div>
            I'm a teleported modal! 
            (My parent is "body")
            <button @click="modalOpen = false">
                Close
            </button>
        </div>
    </div>
</teleport>
```

### 插槽 Slot 样式传递

```scss
::v-slotted(.slot-class) {
  background-color: #000;
}
```

### 组件内注册全局样式

```scss
::v-global(.my-class) {
  background-color: #000;
}
```

### 环境变量

- 客服端使用

```js
import.meta.env.VITE_BASE_URL
```

### 多环境定制化页面

- 不同环境的页面和组件都放在 src\env 文件夹下
- 在 src\env\index.ts 文件里写入 页面配置

```tsx
//dev nj 代表两个不同的环境下的页面
export const fullPageConfig: Record<string, TPageItem[]> = {
  dev: [
    {
      path: 'dev/1',
      name: 'dev1',
      title: '测试1'
    },
    {
      path: 'dev/2',
      name: 'dev2',
      title: '测试2'
    }
  ],
  nj: []
}
```

- 同一页面，引入不同环境的组件
  - 组件是允许操作环境变量的最小级别，不允许直接在页面 直接操作环境变量，来控制元素的显示隐藏 等
  - 当这个页面不需要这个组件时，可以引入空组件

```js
const name = import.meta.env.VITE_NAME

Dev: defineAsyncComponent(() => {
  if (name === 'dev') {
    // return import(`../../env/comp/${name}.vue`) //只能写相对路径
    return import('/comp/dev.vue')
  }
  return import('@/components/Empty.vue')
})
```

### typescript 版本

```json
"typescript": "^4.1.5",
```

### eslint

```json
"build": "vue-tsc --noEmit && vite build"
"vue-tsc":"https://www.npmjs.com/package/vue-tsc "
Vue 3 command line Type-Checking tool base on IDE plugin Volar
```

```json
"lint": "eslint --fix /"src/**/*([^d]|[^.]d).{ts,vue}/""
"lint": "eslint --ext .ts,.vue src/** --error-on-unmatched-pattern"   --quiet(不报警告)
"lint:fix": "eslint --ext .ts,.vue src/** --error-on-unmatched-pattern --fix"
```

_这段配置目前有点问题_

Insert `··`eslint[prettier/prettier](https://github.com/prettier/eslint-plugin-prettier#options)

```json
"@typescript-eslint/eslint-plugin": "^4.15.2",
"@typescript-eslint/parser": "^4.15.2",
"@vue/eslint-config-prettier": "^6.0.0",
"@vue/eslint-config-typescript": "^7.0.0",
"@vuedx/typescript-plugin-vue": "^0.6.3",
"eslint": "^7.20.0",
"eslint-plugin-prettier": "^3.3.1",
"eslint-plugin-vue": "^7.6.0",
"prettier": "^2.2.1",
```

```js
extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
],
```

### jest(未用)

- package.json

```json
"test:unit":"jest"

"jest":"^26.6.3"
"@types/jest":"^26.0.20"
"vue-jest":"^5.0.0-alpha.7"
"babel-jest":"^26.6.3"
"@babel/preset-env": "^7.12.17"
"@vue/test-utils": "^2.0.0-beta.9"
"@babel/preset-typescript": "^7.12.17"
"ts-jest":"^26.5.1"
```

- jest.config.js

```js
module.exports = {
  transform: {
    '^.+//.vue$': 'vue-jest',
    '^.+//js$': 'babel-jest',
    '^.+//ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/src/components$1'
  },
  testMatch: ['**/tests/unit/**/*.[jt]s?(x)']
}
```

### git commit eslint

- eslint lint -- --fix 修正分号

```json
"gitHooks": {
  "pre-commit": "lint-staged",
  "pre-push": "npm run test:unit"
},
"lint-staged": {
  "*.{js,vue}": "eslint --fix"
},
```

- 正常情况下安装 yorkie 后会自动安装提交钩子
- 如果提交钩子未生效可以手动运行 node node_modules/yorkie/bin/install.js 来安装。
- 当然，你也可以运行 node node_modules/yorkie/bin/uninstall.js 来卸载提交钩子。

### commitizen git 提交规范

- npm install -g commitizen
- commitizen init cz-conventional-changelog --save-dev --save-exact
- git commit => git cz

```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

- 参考
  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中
- vscode 扩展 - Visual Studio Code Commitizen Support

## 组件

### SVG 图标使用

```html
svg文件存放路径为 src/assets/icons svg-icon组件 name字段： 文件夹名称+文件名称（没有文件夹则省略） 用例1
src/assets/icons/test2/dynamic-avatar-2.svg
<svg-icon name="test2-dynamic-avatar-2"></svg-icon>

用例2 src/assets/icons/dynamic-avatar-2.svg
<svg-icon name="dynamic-avatar-2"></svg-icon>
```

### VueEcharts 使用

- 基础 echarts 使用

```vue
<template>
    <div class="echarts">
      <vue-echarts :options="options"></vue-echarts>
    </div>
    <div>
      <el-button type="primary" @click="changeSeriesData">改变echarts数据</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import VueEcharts, { OptionType } from '@/components/echarts'

export default defineComponent({
  name: 'useEcharts',
  components: {
    VueEcharts
  },
  setup() {
    const seriesData = ref([120, 200, 150, 80, 70, 110, 130])
    const options = computed((): OptionType => ({
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
            data: seriesData.value,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      })
    )

    function changeSeriesData() {
      seriesData.value = [80, 70, 110, 130, 120, 200, 150]
    }

    return { options, changeSeriesData }
  }
})
</script>
<style lang="scss" scoped>
.echarts {
  width: 300px;
  height: 200px;
}
</style>

```

- echarts-gl 渲染 3d 地图
  - 例子：src\example\EchartsGlMap.vue

## 实验

### css 使用 js 变量

```vue
<div class="plan3">plan</div>
<el-button type="primary" @click="test">测试</el-button>

<script lang="ts">
export default defineComponent({
  name: 'Plan',
  setup() {
    const color = ref('red')
    const font = reactive({ size: '30px' })

    function test() {
      console.log('test')
      color.value = 'green'
      font.size = '18px'
    }
    return { color, font, test }
  }
})
</script>

<style lang="scss" scoped>
.plan3 {
  color: v-bind(color);
  font-size: v-bind('font.size');
}
</style>
```

### Suspense

- 可以直接在组件内的 setup 函数上使用 async

```vue
<template>
  <suspense>
    <template #default>
      <upload />
    </template>
    <template #fallback>加载中...</template>
  </suspense>
</template>

<script setup lang="ts">
import upload from '@/components/upload/index.vue'
</script>
```

```vue
<!-- upload组件 -->
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  async setup() {
    return {}
  }
})
</script>
```

### script setup

```js
import { defineProps, getCurrentInstance, useContext } from 'vue'
const { expose } = useContext()

//ref sugar 语法糖
ref: num = 100 //==>  const num = ref(100)
onMounted: {
  console.log('onMounted', num)
}
```
