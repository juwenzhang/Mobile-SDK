module.exports = {
  printWidth: 100, // 单行最大长度
  tabWidth: 2, // 缩进空格数
  useTabs: false, // 使用空格代替制表符
  semi: true, // 语句末尾加分号
  singleQuote: true, // 使用单引号
  quoteProps: "as-needed", // 仅在必要时给对象属性加引号
  jsxSingleQuote: false, // JSX 中使用双引号
  trailingComma: "all", // 末尾逗号（对象、数组等）
  bracketSpacing: true, // 对象前后加空格 { foo: bar }
  bracketSameLine: false, // JSX 标签闭合符不换行
  arrowParens: "always", // 箭头函数参数必须加括号 (x) => x
  proseWrap: "preserve", // 保持 markdown 文本换行
  htmlWhitespaceSensitivity: "css", // HTML 空格敏感度
  vueIndentScriptAndStyle: false, // Vue 脚本和样式缩进
  endOfLine: "lf", // 行尾换行符
  embeddedLanguageFormatting: "auto", // 自动格式化嵌入代码
};
