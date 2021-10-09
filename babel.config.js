module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
        },
        corejs: 2, //新版本需要指定核⼼库版本
        useBuiltIns: 'usage' //按需注⼊
      }
    ],
    '@babel/preset-typescript'
  ]
}
