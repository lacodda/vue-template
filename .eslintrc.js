// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  rules: {
    'vue/require-default-prop': 0,
    'flowtype-errors/show-errors': 2,
    'arrow-parens': [
      'error',
      'as-needed',
    ],
    // maximum length of string
    'max-len': [
      1, 120, 2,
      {
        'ignoreComments': true,
      },
    ],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': 'off',
    'vue/script-indent': [
      'warn', 2, {
        'baseIndent': 1,
      }],
  },
  // required to lint *.vue files
  plugins: [
    'vue',
    'html',
    'flowtype-errors',
  ],

  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.config.js',
      },
    },
  },
};
