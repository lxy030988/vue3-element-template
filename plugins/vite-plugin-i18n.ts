export default {
  // 将load进来的代码块进一步加工处理
  // code 是块的内容
  // id 是请求的url
  transform(code, id) {
    // i18n 信息写入组件配置
    if (/vue&type=i18n/.test(id)) {
      return `export default Comp => {
        Comp.i18n = ${code}
      }`
    }
    return null
  }
}