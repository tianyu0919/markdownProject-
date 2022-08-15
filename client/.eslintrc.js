/*
 * @Author: 归宿
 * @Date: 2022-08-05 16:32:25
 * @Description: 
 */
const path = require('path');

module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "react-hooks"
  ],
  "parserOptions": {
    "sourceType": "module",
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
      "no-unused-vars": 1,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-var-requires": 0
    }
}