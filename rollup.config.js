import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

export default {
    input: 'src/index.js',
    output: {
        file: 'public/index.js',
        format: 'iife',
    },
    plugins: [
        resolve({
            exportConditions: ['development']     
        }),
        terser(),
        // Copy any static assets to build directory
        copy({
            targets: [
                { src: 'src/index.html', dest: 'public' },
                { src: 'src/images/**/*', dest: 'public/images' },
            ]
        }),
      ],
  };