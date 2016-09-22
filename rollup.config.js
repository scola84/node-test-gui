import buble from 'rollup-plugin-buble';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: './src/index.js',
  dest: './dist/index.js',
  format: 'umd',
  globals: {
    'd3-selection': 'd3',
    'd3-transition': 'd3',
    'moment': 'moment',
    'moment-timezone': 'moment'
  },
  plugins: [
    builtins(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      skip: [
        'd3-selection',
        'd3-transition',
        'moment',
        'moment-timezone'
      ]
    }),
    commonjs({
      ignoreGlobal: true,
      exclude: ['**/lodash-es/**']
    }),
    json(),
    globals(),
    buble()
  ]
};
