module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    node: true,
    mocha: true,
    jquery: true
  },
  globals: {
    "expect": true,
    "global": true,
    "$": true,
    "_": true
  },
  extends: [
    'plugin:vue/recommended',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    //"off", "warn", or "error", or use 0 for off, 1 for warning, or 2 for error
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 'off',
    'quotes': 'off',
    'no-useless-escape': 'off',
    // Just warn
    'no-unused-vars': 'warn',
    'curly': 'off',

    // VUE
    'vue/max-attributes-per-line': 'off',
    'vue/attributes-order' : 'warn'

  }
}
