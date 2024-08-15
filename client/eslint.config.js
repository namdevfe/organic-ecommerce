import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-plugin-prettier'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    'eslint-config-prettier',
    'prettier'
  ],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist', 'node_modules', 'vite.config.ts'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    prettier: prettier
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'no-unused-vars': 'warn',
    'no-console': 1,
    'no-extra-boolean-cast': 0,
    'no-lonely-if': 1,
    'no-trailing-spaces': 1,
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': 1,
    'space-before-blocks': ['error', 'always'],
    'object-curly-spacing': [1, 'always'],
    indent: ['warn', 2],
    semi: [1, 'never'],
    quotes: ['error', 'single'],
    'array-bracket-spacing': 1,
    'linebreak-style': 0,
    'no-unexpected-multiline': 'warn',
    'keyword-spacing': 1,
    'comma-dangle': 1,
    'comma-spacing': 1,
    'arrow-spacing': 1,
    '@typescript-eslint/no-explicit-any': 0,

    // Prettier rules
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        // tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 80,
        jsxSingleQuote: true
      }
    ]
  }
})
