/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  overrides: [
    {
      files: ['*.vue','*.js', '*jsx'],
      rules: {
        'no-undef': 'off',
      }
    },
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    }
  }
}
