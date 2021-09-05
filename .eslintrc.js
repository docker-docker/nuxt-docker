module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  globals: {
    BigInt: true
  },
  // add your custom rules here
  rules: {
    'quote-props': 'off',
    'indent': ['error', 2, {'SwitchCase': 1}],
    'no-irregular-whitespace': 'off',
    'no-useless-escape': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-v-html': 'off',
    'vue/no-template-shadow': 'off',
    'nuxt/no-cjs-in-config': 'off',
    'vue/require-default-prop': 'off'
  }
}
