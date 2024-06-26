module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: ['import', 'prettier', 'react', '@typescript-eslint'],
  extends: ['plugin:@web-bee-ru/next'],
  rules: {
    'import/default': 'off',
    'react/react-in-jsx-scope': ['off'],
    '@typescript-eslint/no-var-requires': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
