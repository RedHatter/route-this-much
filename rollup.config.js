import * as fs from 'fs'
import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'example/src/main.js',
  output: {
    file: 'example/public/bundle.js',
    format: 'iife'
  },
  plugins: [
    svelte({
      css: css => css.write('example/public/main.css')
    }),
    resolve(),
    commonjs()
  ]
}
