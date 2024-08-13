export default {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-property-sort-order-smacss',
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss' // 配置vue中scss样式格式化
  ],
  plugins: ['stylelint-order', 'stylelint-prettier'],
  // 不同格式的文件指定自定义语法
  overrides: [
    { files: ['**/*.(scss|css|vue|html)'], customSyntax: 'postcss-scss' },
    { files: ['**/*.(html|vue)'], customSyntax: 'postcss-html' }
  ],
  rules: {
    'prettier/prettier': true,
    'media-feature-range-notation': null,
    'selector-not-notation': null,
    'import-notation': null,
    'function-no-unknown': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep']
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    // 'at-rule-no-unknown': [
    //   true,
    //   {
    //     ignoreAtRules: [
    //       'tailwind',
    //       'apply',
    //       'variants',
    //       'responsive',
    //       'screen',
    //       'function',
    //       'if',
    //       'each',
    //       'include',
    //       'mixin',
    //       'extend'
    //     ]
    //   }
    // ],
    'named-grid-areas-no-invalid': null,
    'font-family-no-missing-generic-family-keyword': null,
    // 'rule-empty-line-before': [
    //   'always',
    //   {
    //     ignore: ['after-comment', 'first-nested']
    //   }
    // ],
    // 'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    // 'order/order': [
    //   [
    //     'dollar-variables',
    //     'custom-properties',
    //     'at-rules',
    //     'declarations',
    //     {
    //       type: 'at-rule',
    //       name: 'supports'
    //     },
    //     {
    //       type: 'at-rule',
    //       name: 'media'
    //     },
    //     'rules'
    //   ],
    //   { severity: 'error' }
    // ],
    'value-keyword-case': null, // 在css中使用v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式
    'property-no-unknown': null, // 禁止未知的属性（true为不允许）
    // 'block-opening-brace-space-before': 'always', // 大括号之前必须有一个空格
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
    'function-url-quotes': null,
    'media-query-no-invalid': null,
    'selector-anb-no-unmatchable': null,
    'scss/double-slash-comment-whitespace-inside': null,
    'declaration-block-no-duplicate-properties': null
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts']
}
