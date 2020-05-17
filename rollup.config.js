import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/request.js',
  output: [
    {
      name: 'request',
      file: './dist/request.min.js',
      format: 'iife'
    }
  ],
  plugins: [
    terser()
  ]
};
