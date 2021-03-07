module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  globals:{
    'BigInt':true
  },
  // add your custom rules here
  rules: {
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
