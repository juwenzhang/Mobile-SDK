module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier" // 放在 prettier 冲突
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"] // 类型检查需要
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "prettier"
  ],
  settings: {
    react: {
      version: "detect" // 自动检测 React 版本
    }
  },
  rules: {
    // 基础规则
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "warn",
    
    // TypeScript 规则
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": ["warn", { ignoreRestArgs: true }],
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    
    // React 规则
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off", // React 17+ 无需显式导入
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    
    // Prettier 集成（将 prettier 错误视为 eslint 错误）
    "prettier/prettier": "error"
  }
};