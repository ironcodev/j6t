"use strict";
module.exports = function(grunt) {
	grunt.initConfig({
		"babel": {
			options: {
				sourceMap: false
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src',
					src: ['*.js'],
					dest: 'src-compiled/',
					ext: '.js'
				}]
			}
		},
		clean: {
			task: ['src-compiled/**', 'dist/**'],
		},
		browserify: {
			dist: {
				files: {
					'dist/j6t.js': ['src-compiled/index.js']
				},
				options: {
					external: [
					  'jquery'
					]
				}
			}		
		},
		uglify: {
			options: {
				mangle: false,
				sourceMap: true
			},
			my_target: {
				files: {
					'dist/j6t.min.js': ['dist/j6t.js']
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-babel');

	grunt.registerTask('default', ['clean', 'babel', 'browserify', 'uglify']);
}
