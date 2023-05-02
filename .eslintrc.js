module.exports = {
  extends: ['plugin:hydrogen/recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'node/no-missing-import': 'off',
    'no-console': 'warn',
    'no-warning-comments': [
      'warn',
      {terms: ['todo', 'fixme', 'xxx'], location: 'anywhere'},
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
