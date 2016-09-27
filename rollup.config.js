import buble from 'rollup-plugin-buble';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

export default {
  dest: './dist/index.min.js',
  entry: './src/index.js',
  format: 'umd',
  globals: {
    '@scola/api-http': 'api',
    '@scola/api-log': 'api',
    '@scola/api-model': 'api',
    '@scola/api-router': 'api',
    '@scola/api-ws': 'api',
    '@scola/d3-app': 'd3',
    '@scola/d3-gesture': 'd3',
    '@scola/d3-i18n': 'd3',
    '@scola/d3-list': 'd3',
    '@scola/d3-media': 'd3',
    '@scola/d3-menu': 'd3',
    '@scola/d3-model': 'd3',
    '@scola/d3-panel': 'd3',
    '@scola/d3-pop': 'd3',
    '@scola/d3-router': 'd3',
    '@scola/d3-scroller': 'd3',
    '@scola/d3-slider': 'd3',
    '@scola/d3-tab': 'd3',
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
        '@scola/api-http',
        '@scola/api-log',
        '@scola/api-model',
        '@scola/api-router',
        '@scola/api-ws',
        '@scola/d3-app',
        '@scola/d3-gesture',
        '@scola/d3-i18n',
        '@scola/d3-list',
        '@scola/d3-media',
        '@scola/d3-menu',
        '@scola/d3-model',
        '@scola/d3-panel',
        '@scola/d3-pop',
        '@scola/d3-router',
        '@scola/d3-scroller',
        '@scola/d3-slider',
        '@scola/d3-tab',
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
