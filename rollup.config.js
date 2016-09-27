import buble from 'rollup-plugin-buble';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

export default {
  dest: './dist/index.js',
  entry: './src/index.js',
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
      preferBuiltins: true,
      skip: [
        'd3-selection',
        'd3-transition',
        'moment',
        'moment-timezone'
      ]
    }),
    commonjs({
      ignoreGlobal: true
    }),
    json(),
    globals(),
    buble()
  ]
};
