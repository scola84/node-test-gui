import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import buble from 'rollup-plugin-buble';

export default {
  entry: './src/index.js',
  dest: './dist/index.js',
  format: 'umd',
  globals: {
    'd3-selection': 'd3',
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
        'moment',
        'moment-timezone'
      ]
    }),
    commonjs({
      ignoreGlobal: true,
      exclude: ['**/lodash-es/**']
    }),
    globals(),
    buble()
  ]
};
