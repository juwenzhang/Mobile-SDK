import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * ©${new Date().getFullYear()}
 */`;

export default [
  // ESM
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'esm',
      banner,
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ]
  },
  // CJS
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      banner,
      sourcemap: true,
      exports: 'auto'
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ]
  },
  // UMD
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/umd/index.js',
      format: 'umd',
      name: 'BaseMobile',
      banner,
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'styled-components': 'styled'
      }
    },
    external: ['react', 'react-dom', 'styled-components'],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser()
    ]
  }
];