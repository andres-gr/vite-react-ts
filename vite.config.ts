/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import {
  EsLinter,
  linterPlugin,
  TypeScriptLinter,
} from 'vite-plugin-linter'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(configEnv => ({
  plugins: [
    react({
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    linterPlugin({
      include: [
        './src/**/*.ts',
        './src/**/*.tsx',
      ],
      linters:  [
        new EsLinter({
          configEnv,
          serveOptions: { clearCacheOnStart: true },
        }),
        new TypeScriptLinter(),
      ],
    }),
    tsconfigPaths(),
  ],
}))
