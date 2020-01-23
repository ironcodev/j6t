import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";
import pkg from './package.json';

export default [
	{
		input: 'src/index.js',
		external: ['jquery'],
		output: {
			name: 'j6t',
			file: pkg.browser,
			format: 'umd',
			globals: {
			  jquery: '$'
			}
		},
		plugins: [ resolve(), commonjs(), babel() ]
	},
	{
		input: 'src/index.js',
		external: ['jquery'],
		output: {
			name: 'j6t',
			file: pkg.browserMin,
			format: 'umd',
			globals: {
			  jquery: '$'
			}
		},
		plugins: [ resolve(), commonjs(), babel(), uglify() ]
	},
	{
		input: 'src/index.js',
		external: ['jquery'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];