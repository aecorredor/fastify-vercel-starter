module.exports = {
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: `${__dirname}/tsconfig.eslint.json`,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    // 'acc' is disabled because that is the convention we use in reducer
    // functions, and that value can usually be safely mutated.
    // 'req' is disabled because we can attach props to an express request.
    // 'draft' is disabled because we use it as the name for immer's draft state
    // argument.
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['acc', 'req', 'draft'] },
    ],
    'prettier/prettier': 'error',
    'no-underscore-dangle': 0,
    'no-void': 0
  },
  ignorePatterns: ['.eslintrc.js']
};
