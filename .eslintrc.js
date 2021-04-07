module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    wx: 'readonly',
    App: 'readonly',
    Page: 'readonly',
    Component: 'readonly',
    getCurrentPages: 'readonly',
    getApp: 'readonly',
  },
  rules: {
    'prettier/prettier': 'error',

    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',

    'import/extensions': 'off',
  },
  overrides: [
    {
      files: ['./**/*.wxs'],
      parserOptions: {
        ecmaVersion: 5,
        sourceType: 'script',
      },
      globals: {
        getDate: 'readonly',
        getRegExp: 'readonly',
        MAX_VALUE: 'readonly',
        MIN_VALUE: 'readonly',
        NEGATIVE_INFINITY: 'readonly',
        POSITIVE_INFINITY: 'readonly',
      },
      extends: ['eslint:recommended'],
      rules: {
        strict: 'off',
        'no-var': 'off',
        'vars-on-top': 'off',
        'prefer-template': 'off',
        'object-shorthand': 'off',
        'prefer-destructuring': 'off',
      },
    },
  ],
};
