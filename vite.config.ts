import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'node14',
    outDir: 'bin',
    lib: {
      entry: './lib/index.ts',
      name: 'index',
      formats: ['cjs'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['commander', 'chalk', 'conf', '@inquirer/prompts', 'child_process'],
      output: {
        globals: {
          child_process: 'child_process',
          commander: 'commander',
          chalk: 'chalk',
          '@inquirer/prompts': '@inquirer/prompts',
        },
      },
    },
  }
})
