import jest from '@aboutbits/eslint-config/configs/jest'
import ts from '@aboutbits/eslint-config/configs/ts'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  ts,
  jest,
  {
    rules: {
      'import/order': 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
  {
    ignores: ['node_modules', 'dist'],
  },
])
