# 文件上传

### 代码

- [web](https://github.com/lxy030988/vue3-element-template)
- [egg](https://github.com/lxy030988/egg-server)

### 基础版

- 点击上传
  - FormData
- 拖拽上传
  - 拖拽事件 dragover dragleave drop
- 进度条
  - onUploadProgress

### 进阶版

- 二进制信息确认文件类型

  - hexdump - vscode 插件 查看文件的十六进制信息

  - 通过校验文件十六进制信息的头部信息或者尾部信息 确认文件类型
    - 比如 png 开头 89 50 4E 47 0D 0A 1A 0A
    - jpg 开头 FF D8 结尾 FF D9
  - FileReader 读取文件二进制信息，再转成十六进制

  - 优点：和后缀名校验文件类型相比，可以避免因为修改后缀名造成的文件类型校验错误

- 计算文件的 md5 值

  - [spark-md5](https://www.npmjs.com/package/spark-md5) 可以增量计算 md5

  - web worker 计算 md5 值

    - 缺点：不能在 web worker 中引入 npm 包，只能通过 self 引入 js 文件；

      不能使用 window、document 对象

    - 优点：单独的线程，不会阻塞主线程，适合消耗时间的计算

  - 时间切片 计算 md5 值
    - 利用浏览器的空余时间进行计算 [window.requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)
  - 抽样 md5

    - 第一个切片 2M + 最后一个切片全部 + 中间的每一个切片取几个字节

    - 优点：快

    - 缺点：有很小的概率出现：文件不同，md5 相同

- 切片上传

  - 一个文件切分成一个数组，自定义切片大小

  - index：切片顺序 file：切片文件

- 切片合并

  - 根据 index 排序
  - fs-extra 操作文件流合并

- 文件秒传

  - 上传文件前，发送请求确认文件是否已存在

- 断点续传

  - 上传文件前，发送请求确认后台是否存在切片

- 请求并发控制

  - 原因：尝试连接的 TCP 请求过多，也会造成浏览器的卡顿

  - 限制请求的并发数量：自定义并发数（4-6）,等待一个请求结束再发起下一个请求

- 报错重试、报错次数限制

  - 当某个切片上传出错，重新发起请求

  - 当一个切片出错次数过多，停止整改文件的上传

- TCP 慢启动

  - 默认第一个切片大小，根据网速动态改变后面的切片大小
  - 优点：更好的利用网络资源

### 思考

- 切片下载
- 并发+慢启动+断点续传
- 慢启动切片大小变化更平滑
